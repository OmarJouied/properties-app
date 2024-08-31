import pool from "@/lib/db";

const POST = async (req: Request) => {
  try {
    const formData = await req.json();

    const fields = Object.keys(formData).map(field => field.toUpperCase());

    const db = await pool.getConnection();
    const query = `
      INSERT INTO properties (${fields.join(",")})
      VALUES (${"?,".repeat(fields.length)})
    `;
    await db.execute(query, Object.values(formData));
    db.release();

    return Response.json({ error: false, msg: "updated success" }, { status: 203 });
  } catch (error: any) {
    return Response.json({ error: true, msg: error.message }, { status: 500 });
  }
}

export default POST;