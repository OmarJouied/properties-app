"use client"
import { FormEventHandler, useState } from "react"

const page = () => {
  const [userData, setUserData] = useState({ email: "", username: "", password: "", confirm: "", photo: "" });

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", userData.email);
    formData.append("username", userData.username);
    formData.append("password", userData.password);
    formData.append("confirm", userData.confirm);

    await fetch('/api/v1/users', {
      method: "POST",
      body: formData
    })
  }

  return (
    <form onSubmit={submitHandler}>
      <label>
        <span>email</span>
        <input type="email" value={userData.email} onChange={({ target: { value } }) => setUserData(prev => ({ ...prev, email: value }))} />
      </label>
      <label>
        <span>username</span>
        <input type="text" value={userData.username} onChange={({ target: { value } }) => setUserData(prev => ({ ...prev, username: value }))} />
      </label>
      <label>
        <span>password</span>
        <input type="password" value={userData.password} onChange={({ target: { value } }) => setUserData(prev => ({ ...prev, password: value }))} />
      </label>
      <label>
        <span>confirm</span>
        <input type="password" value={userData.confirm} onChange={({ target: { value } }) => setUserData(prev => ({ ...prev, confirm: value }))} />
      </label>
      <label>
        <span>photo</span>
        <input type="file" />
      </label>
      <button type="submit">save</button>
    </form>
  )
}

export default page