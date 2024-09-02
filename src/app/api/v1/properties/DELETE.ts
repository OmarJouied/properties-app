import pool from "@/lib/db";

const DELETE = async (req: Request) => {
  try {
    const { PropertyId } = await req.json();

    const db = await pool.getConnection();
    const query = "DELETE FROM properties WHERE PropertyId=?";
    await db.execute(query, [PropertyId]);
    db.release();

    return Response.json({ error: false, msg: "deleted success" });
  } catch (error: any) {
    return Response.json({ error: true, msg: error.message });
  }
}

export default DELETE;