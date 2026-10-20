import { useEffect, useLayoutEffect, useReducer, useRef } from "react";
import { heroImageReducer, initialHeroImage } from "./heroImageState";
import { loadHeroImage, rememberHeroImage } from "./heroImageLoader";

export function HeroBackground({ src }: { src: string }) {
  const [images, dispatch] = useReducer(heroImageReducer, src, initialHeroImage);
  const requested = useRef(src);

  useLayoutEffect(() => {
    requested.current = src;
  }, [src]);

  useEffect(() => {
    let current = true;
    void loadHeroImage(src)
      .then(() => {
        if (current && requested.current === src) {
          dispatch({
            type: "ready",
            src,
            reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          });
        }
      })
      .catch(() => {
        // Leave the existing photograph in place if the next image cannot be decoded.
      });
    return () => {
      current = false;
    };
  }, [src]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (preference.matches)
        dispatch({ type: "reduce-motion", requested: requested.current });
    };
    preference.addEventListener("change", onChange);
    return () => preference.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 -z-20 h-full w-full md:w-[min(100%,96rem)] md:[mask-image:linear-gradient(to_right,transparent,black_32%)]"
    >
      <img
        src={images.base}
        alt=""
        fetchPriority="high"
        width={1536}
        height={2048}
        onLoad={(event) => rememberHeroImage(event.currentTarget)}
        className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
      />
      {images.incoming && (
        <img
          key={images.incoming}
          src={images.incoming}
          alt=""
          width={1536}
          height={2048}
          className="hero-image-crossfade absolute inset-0 h-full w-full object-cover object-[center_42%]"
          onAnimationEnd={() =>
            dispatch({ type: "finished", requested: requested.current })
          }
        />
      )}
    </div>
  );
}
