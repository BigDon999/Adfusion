import { promises as fs } from "fs";
import path from "path";

const assetsDir = path.join(process.cwd(), "public", "assets");

async function ensureAssets() {
  try {
    await fs.mkdir(assetsDir, { recursive: true });
  } catch (e) {}
}

async function uploadToFilesystem(filename, b64) {
  await ensureAssets();
  const buffer = Buffer.from(b64, "base64");
  const filePath = path.join(assetsDir, filename);
  await fs.writeFile(filePath, buffer);
  return `/assets/${filename}`;
}

async function uploadToS3(filename, b64) {
  // Lazy import AWS SDK to avoid adding dependency if not needed on local
  const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");
  const region = process.env.AWS_REGION;
  const bucket = process.env.AWS_S3_BUCKET;
  if (!region || !bucket) throw new Error("S3 env vars missing");
  const client = new S3Client({ region });
  const buffer = Buffer.from(b64, "base64");
  const key = filename;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: "image/jpeg",
      ACL: "public-read",
    })
  );
  // Construct URL (may vary by bucket settings)
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export async function POST(request) {
  const body = await request.json();
  const { filename, data } = body; // data = base64 without data:prefix
  if (!filename || !data) return new Response("Missing", { status: 400 });

  try {
    if (process.env.AWS_S3_BUCKET && process.env.AWS_REGION) {
      const url = await uploadToS3(filename, data);
      return new Response(JSON.stringify({ url }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    console.error("S3 upload failed, falling back to filesystem", e);
  }

  const url = await uploadToFilesystem(filename, data);
  return new Response(JSON.stringify({ url }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
