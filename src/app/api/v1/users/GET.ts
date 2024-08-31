import pool from "@/lib/db";

const GET = async () => {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM users";
    const [rows] = await db.execute(query);

    return Response.json({ users: rows }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: true, msg: error.message }, { status: 500 });
  }
}

export default GET;