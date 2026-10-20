import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import { test } from "node:test";
import ts from "typescript";

function loadModule(file, globals = {}) {
  const context = createContext({ exports: {}, URL, ...globals });
  const source = readFileSync(
    new URL(`../src/components/home/${file}.ts`, import.meta.url),
    "utf8",
  );
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  runInContext(compiled, context);
  return context.exports;
}

const { initialHeroImage, heroImageReducer } = loadModule("heroImageState");
const ready = (state, src, reducedMotion = false) =>
  heroImageReducer(state, { type: "ready", src, reducedMotion });
const finish = (state, requested) =>
  heroImageReducer(state, { type: "finished", requested });
const stateEqual = (actual, expected) =>
  assert.deepEqual(JSON.parse(JSON.stringify(actual)), expected);

test("keeps an opaque outgoing image until the decoded incoming fade finishes", () => {
  const initial = initialHeroImage("home");
  assert.equal(ready(initial, "home"), initial);
  const fading = ready(initial, "projects");
  stateEqual(fading, { base: "home", incoming: "projects", queued: null });
  stateEqual(finish(fading, "projects"), {
    base: "projects",
    incoming: null,
    queued: null,
  });
});

test("rapid navigation keeps the live fade and queues only the latest decoded target", () => {
  const fading = ready(initialHeroImage("home"), "projects");
  const queued = ready(ready(fading, "about"), "home");
  stateEqual(queued, { base: "home", incoming: "projects", queued: "home" });
  const returning = finish(queued, "home");
  stateEqual(returning, { base: "projects", incoming: "home", queued: null });
  assert.equal(finish(returning, "home").base, "home");
});

test("does not start a stale queued destination after the requested route changes", () => {
  const queued = ready(ready(initialHeroImage("home"), "projects"), "about");
  stateEqual(finish(queued, "home"), { base: "projects", incoming: null, queued: null });
  stateEqual(ready(queued, "projects"), {
    base: "home",
    incoming: "projects",
    queued: null,
  });
});

test("reduced motion swaps decoded images immediately, including during a live fade", () => {
  const queued = ready(ready(initialHeroImage("home"), "projects"), "about");
  stateEqual(ready(queued, "home", true), { base: "home", incoming: null, queued: null });
  stateEqual(heroImageReducer(queued, { type: "reduce-motion", requested: "about" }), {
    base: "about",
    incoming: null,
    queued: null,
  });
});

function loaderHarness() {
  const created = [];
  class FakeImage {
    constructor() {
      created.push(this);
      this.decoded = new Promise((resolve, reject) => {
        this.resolveDecode = resolve;
        this.rejectDecode = reject;
      });
    }
    decode() {
      return this.decoded;
    }
  }
  const loader = loadModule("heroImageLoader", {
    Image: FakeImage,
    window: { location: { href: "https://portfolio.test/about" } },
  });
  return { ...loader, created };
}

test("waits for decoding and shares pending/completed requests across routes", async () => {
  const loader = loaderHarness();
  const pending = loader.loadHeroImage("/projects.webp");
  assert.equal(loader.loadHeroImage("https://portfolio.test/projects.webp"), pending);
  assert.equal(loader.created.length, 1);
  let resolved = false;
  void pending.then(() => {
    resolved = true;
  });
  loader.created[0].onload();
  await Promise.resolve();
  assert.equal(resolved, false);
  loader.created[0].resolveDecode();
  await pending;
  assert.equal(resolved, true);
  assert.equal(loader.loadHeroImage("/projects.webp"), pending);
});

test("reuses the initially rendered image and permits retry after loading failure", async () => {
  const loader = loaderHarness();
  loader.rememberHeroImage({
    src: "https://portfolio.test/home.jpg",
    decode: () => Promise.resolve(),
  });
  await loader.loadHeroImage("/home.jpg");
  assert.equal(loader.created.length, 0);
  const failed = loader.loadHeroImage("/missing.webp");
  loader.created[0].onerror();
  await assert.rejects(failed, /Could not load hero image/);
  const retry = loader.loadHeroImage("/missing.webp");
  assert.notEqual(retry, failed);
  assert.equal(loader.created.length, 2);
  loader.created[1].onload();
  loader.created[1].resolveDecode();
  await retry;
});

test("a decode failure is not considered ready and can be retried", async () => {
  const loader = loaderHarness();
  const pending = loader.loadHeroImage("/undecodable.webp");
  loader.created[0].onload();
  loader.created[0].rejectDecode(new Error("Decode failed"));
  await assert.rejects(pending, /Decode failed/);
  const retry = loader.loadHeroImage("/undecodable.webp");
  assert.equal(loader.created.length, 2);
  loader.created[1].onload();
  loader.created[1].resolveDecode();
  await retry;
});
