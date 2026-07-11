import { renderOgImage, ogImageAlt, ogImageSize, ogImageContentType } from "./og-image";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage();
}
