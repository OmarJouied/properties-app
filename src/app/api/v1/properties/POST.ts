import pool from "@/lib/db";

const POST = async (req: Request) => {
  try {
    const { name, address, type, unitsNumber, rentalCost } = await req.json();

    const db = await pool.getConnection();
    const query = `
      INSERT INTO properties (Name, Address, Type, UnitsNumber, RentalCost)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.execute(query, [name, address, type, unitsNumber, rentalCost]);
    db.release();

    return Response.json({ error: false, msg: "new property created success" }, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: true, msg: error.message }, { status: 500 });
  }
}

export default POST;