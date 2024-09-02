import pool from "@/lib/db";

const POST = async (req: Request) => {
  try {
    const { Name, Address, Type, UnitsNumber, RentalCost } = await req.json();

    const db = await pool.getConnection();
    const query = `
      INSERT INTO properties (Name, Address, Type, UnitsNumber, RentalCost)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.execute(query, [Name, Address, Type, UnitsNumber, RentalCost]);
    db.release();

    return Response.json({ error: false, msg: "new property created success" }, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: true, msg: error.message }, { status: 500 });
  }
}

export default POST;