"use client"
import { getSession, signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react"

const page = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const session = await getSession();

    if (!session) {
      await signIn("credentials", {
        ...userData,
        redirect: false
      });
    }
  }


  return (
    <form onSubmit={submitHandler}>
      <label>
        <span>email</span>
        <input type="email" value={userData.email} onChange={({ target: { value } }) => setUserData(prev => ({ ...prev, email: value }))} />
      </label>
      <label>
        <span>password</span>
        <input type="password" value={userData.password} onChange={({ target: { value } }) => setUserData(prev => ({ ...prev, password: value }))} />
      </label>
      <button type="submit">save</button>
    </form>
  )
}

export default page