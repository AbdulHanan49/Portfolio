import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const ogImageAlt = "Abdul Hanan — Full-Stack Software Engineer";
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const AVATAR_SIZE = 420;

export async function renderOgImage() {
  const original = await readFile(join(process.cwd(), "public", "profile.png"));
  const avatar = await sharp(original)
    .resize(AVATAR_SIZE * 2, null, { fit: "cover" })
    .extract({ left: 0, top: 0, width: AVATAR_SIZE * 2, height: AVATAR_SIZE * 2 })
    .png()
    .toBuffer();
  const photoSrc = `data:image/png;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a192f 0%, #0d2b4e 100%)",
        }}
      >
        <div
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: 32,
            overflow: "hidden",
            display: "flex",
            border: "3px solid #64ffda",
            boxShadow: "0 0 60px rgba(100,255,218,0.25)",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoSrc} width={AVATAR_SIZE} height={AVATAR_SIZE} />
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
