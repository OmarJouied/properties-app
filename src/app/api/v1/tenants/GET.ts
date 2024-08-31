import pool from "@/lib/db";

const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("tenant_id");

    const db = await pool.getConnection();
    const query = `SELECT * FROM tenants ${tenantId ? "WHERE TenantId=?" : ""}`;
    const [tenants] = await db.execute(query, [tenantId]);
    db.release();

    return Response.json({ tenants }, { status: 200 })
  } catch (error: any) {
    return Response.json({ error: true, msg: error.message }, { status: 500 })
  }
}

export default GET;