import pool from "@/lib/db";

const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("property_id");

    const db = await pool.getConnection();
    const query = `SELECT * FROM properties ${propertyId ? "WHERE PropertyId=?" : ""}`;
    const [properties] = await db.execute(query, [propertyId]);
    db.release();

    return Response.json({ properties }, { status: 200 })
  } catch (error: any) {
    return Response.json({ error: true, msg: error.message }, { status: 500 })
  }
}

export default GET;