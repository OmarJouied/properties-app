"use client"
import { getSession, signOut } from "next-auth/react";

export default async function Home() {
  const logoutClient = () => {
    signOut({ redirect: false })
  }
  const session = await getSession();
  console.log(session)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={logoutClient}>logout</button>
    </main>
  );
}
