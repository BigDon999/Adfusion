import { promises as fs } from "fs";
import path from "path";

const assetsDir = path.join(process.cwd(), "public", "assets");

async function ensureAssets() {
  try {
    await fs.mkdir(assetsDir, { recursive: true });
  } catch (e) {}
}

export async function POST(request) {
  const body = await request.json();
  const { filename, data } = body; // data = base64 without data:prefix
  if (!filename || !data) return new Response("Missing", { status: 400 });
  await ensureAssets();
  const buffer = Buffer.from(data, "base64");
  const filePath = path.join(assetsDir, filename);
  await fs.writeFile(filePath, buffer);
  const url = `/assets/${filename}`;
  return new Response(JSON.stringify({ url }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
