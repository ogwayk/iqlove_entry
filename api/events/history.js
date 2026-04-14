import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const rows = await sql`
      SELECT * FROM events ORDER BY created_at DESC
    `;
    return res.status(200).json(rows);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
