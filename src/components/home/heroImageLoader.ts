const decodedImages = new Map<string, Promise<void>>();

function remember(src: string, promise: Promise<void>) {
  decodedImages.set(src, promise);
  void promise.catch(() => {
    if (decodedImages.get(src) === promise) decodedImages.delete(src);
  });
  return promise;
}

export function rememberHeroImage(image: HTMLImageElement) {
  if (!decodedImages.has(image.src)) remember(image.src, image.decode());
}

export function loadHeroImage(src: string): Promise<void> {
  // Normalise the key so the initial DOM image and subsequent requests share a cache.
  const url = new URL(src, window.location.href).href;
  const existing = decodedImages.get(url);
  if (existing) return existing;

  return remember(
    url,
    new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        void image.decode().then(resolve, reject);
      };
      image.onerror = () => reject(new Error(`Could not load hero image: ${src}`));
      image.src = url;
    }),
  );
}
