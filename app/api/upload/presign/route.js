import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(request) {
  const body = await request.json();
  const { filename, contentType } = body;
  if (!filename)
    return new Response(JSON.stringify({ error: "Missing filename" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });

  const region = process.env.AWS_REGION;
  const bucket = process.env.AWS_S3_BUCKET;
  if (!region || !bucket) {
    return new Response(JSON.stringify({ error: "S3 env vars missing" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const client = new S3Client({ region });
  const key = filename;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType || "application/octet-stream",
    ACL: "public-read",
  });

  try {
    const url = await getSignedUrl(client, command, { expiresIn: 900 }); // 15 minutes
    return new Response(
      JSON.stringify({
        url,
        publicUrl: `https://${bucket}.s3.${region}.amazonaws.com/${key}`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Presign failed", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
