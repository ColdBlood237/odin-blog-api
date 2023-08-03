"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

export default function LoginForm({ logged, setLogged }) {
  const [usernameValue, setUsernameValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://odin-blog-api-k82n.onrender.com/admin-login",
        {
          username: usernameValue,
          password: pwdValue,
        }
      );
      const { token } = response.data;
      console.log(token);
      setLogged(true);
      localStorage.setItem("authToken", token);
    } catch (error) {
      setErrorMessage("Invalid credentials.");
    }
  }

  return (
    <form
      method=""
      action=""
      className="flex max-w-md flex-col gap-4 mx-auto"
      onSubmit={handleLogin}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput
          value={usernameValue}
          onChange={(e) => {
            setUsernameValue(e.target.value);
          }}
          name="username"
          id="username"
          required
          type="text"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          value={pwdValue}
          onChange={(e) => {
            setPwdValue(e.target.value);
          }}
          name="password"
          id="password"
          required
          type="password"
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
