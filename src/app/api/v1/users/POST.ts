import pool from "@/lib/db";
import bcrypt from "bcryptjs";

const POST = async (req: Request) => {
  try {
    const userData = await req.formData();

    const email = userData.get("email");
    const username = userData.get("username");
    const password = userData.get("password");
    const confirm = userData.get("confirm");
    const photo = userData.get("photo");

    if (!email || !username || !password || !confirm) return Response.json({ error: true, msg: "all fields are required" }, { status: 500 });
    if (password !== confirm) return Response.json({ error: true, msg: "confirm password" }, { status: 500 });

    const db = await pool.getConnection();
    const query = `INSERT INTO users 
                  (email, username, password, photo)
                    VALUES
                  (?, ?, ?, ?)
                `;

    const hashedPassword = await bcrypt.hash(password as string, 10)
    await db.execute(query, [email, username, hashedPassword, photo]);
    db.release();

    return Response.json({ error: false, msg: "new user added success" }, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: true, msg: error.message }, { status: 500 });
  }
}

export default POST;