import { clsx, type ClassValue } from "clsx";
import { getImageProps, ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

export function getBackgroundImageStyle(imageProps: Omit<ImageProps, "alt">) {
  const {
    props: { srcSet },
  } = getImageProps({ alt: "", ...imageProps });

  const backgroundImage = getBackgroundImage(srcSet);
  return { backgroundImage };
}
