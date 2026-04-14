import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const rows = await sql`
      SELECT * FROM events ORDER BY created_at DESC LIMIT 1
    `;
    if (rows.length === 0) {
      return res.status(404).json({ error: "No events found" });
    }
    return res.status(200).json(rows[0]);
  }

  if (req.method === "POST") {
    const {
      title,
      subtitle,
      event_date,
      part,
      name,
      start_time,
      reception_start,
    } = req.body;

    const rows = await sql`
      INSERT INTO events (title, subtitle, event_date, part, name, start_time, reception_start)
      VALUES (${title}, ${subtitle}, ${event_date}, ${part}, ${name}, ${start_time}, ${reception_start})
      RETURNING *
    `;
    return res.status(201).json(rows[0]);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
