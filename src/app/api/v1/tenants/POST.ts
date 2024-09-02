import pool from "@/lib/db";

const POST = async (req: Request) => {
  try {
    const { Name, PhoneNumber, Email, PropertyId } = await req.json();

    const db = await pool.getConnection();
    const query = `
      INSERT INTO tenants (Name, PhoneNumber, Email, PropertyId)
      VALUES (?, ?, ?, ?)
    `;
    await db.execute(query, [Name, PhoneNumber, Email, PropertyId]);
    db.release();

    return Response.json({ error: false, msg: "new tenant added success" }, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: true, msg: error.message }, { status: 500 });
  }
}

export default POST;