import type { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import pool from "@/lib/db"

export const options: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: { email: {}, password: {} },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const db = await pool.getConnection();
        const query = "SELECT * FROM users WHERE Email=?";
        const [rows] = await db.execute(query, [credentials?.email]);
        db.release();
        console.log(rows)
        const user = JSON.parse(JSON.stringify(rows))[0];
        if (user) {
          const isTheSame = await bcrypt.compare(credentials.password, user.Password);
          if (isTheSame) {
            return user;
          }
        }

        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      if (!url.startsWith('http')) return url;

      const callbackUrl = new URL(url).searchParams.get('callbackUrl');
      if (!callbackUrl) return url;

      return `${baseUrl}${callbackUrl}`;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.Username;
        token.email = user.Email;
        token.picture = user.Photo;
        token.sub = user.UserId;
        token.role = user.Role;
        token.phoneNumber = user.PhoneNumber;
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.Role = token.role;
        session.user.UserId = token.sub as string;
        session.user.Email = token.email as string;
        session.user.Username = token.name as string;
        session.user.Photo = token.picture as string;
        session.user.PhoneNumber = token.phoneNumber as number;
      }
      return session;
    }
  }
}
