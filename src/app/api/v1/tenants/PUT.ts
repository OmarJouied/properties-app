import pool from "@/lib/db";

const PATCH = async (req: Request) => {
  try {
    const formData = await req.json();

    if (!formData.tenant_id) return Response.json({ error: true, msg: "tenant_id should be exist" }, { status: 500 });

    const fields = Object.entries(formData).map(field => `${field[0].toUpperCase()}=${field[1]}`);

    const db = await pool.getConnection();
    const query = `
      UPDATE properties
      SET ${fields.join(",")}
      WHERE TenantId=${formData.tenant_id}
    `;
    await db.execute(query);
    db.release();

    return Response.json({ error: false, msg: "updated success" }, { status: 203 });
  } catch (error: any) {
    return Response.json({ error: true, msg: error.message }, { status: 500 });
  }
}

export default PATCH;