import pool from "@/lib/db";

const GET = async () => {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM properties";
    const [rows] = await db.execute(query);
    db.release();

    return Response.json({ rows }, { status: 200 })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}

export default GET;