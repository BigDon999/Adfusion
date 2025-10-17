import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "projects.json");

async function readData() {
  const content = await fs.readFile(dataPath, "utf8");
  return JSON.parse(content || "[]");
}

async function writeData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");
}

export async function GET() {
  const projects = await readData();
  return new Response(JSON.stringify(projects), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const body = await request.json();
  const projects = await readData();
  // assign id if missing
  const id =
    body.id ??
    (projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1);
  const newItem = { ...body, id };
  projects.push(newItem);
  await writeData(projects);
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function PUT(request) {
  const body = await request.json();
  if (!body.id) return new Response("Missing id", { status: 400 });
  const projects = await readData();
  const idx = projects.findIndex((p) => p.id === body.id);
  if (idx === -1) return new Response("Not found", { status: 404 });
  projects[idx] = { ...projects[idx], ...body };
  await writeData(projects);
  return new Response(JSON.stringify(projects[idx]), { status: 200 });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!id) return new Response("Missing id", { status: 400 });
  const projects = await readData();
  const filtered = projects.filter((p) => p.id !== id);
  await writeData(filtered);
  return new Response("{}", { status: 200 });
}
