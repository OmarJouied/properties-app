import pool from "@/lib/db";

const DELETE = async (req: Request) => {
  try {
    const { tenant_id } = await req.json();

    const db = await pool.getConnection();
    const query = "DELETE FROM tenants WHERE TenantId=?";
    await db.execute(query, [tenant_id]);
    db.release();

    return Response.json({ error: false, msg: "deleted success" });
  } catch (error: any) {
    return Response.json({ error: true, msg: error.message });
  }
}

export default DELETE;