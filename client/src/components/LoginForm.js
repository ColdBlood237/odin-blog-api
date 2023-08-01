"use client";

import { Button, Label, TextInput } from "flowbite-react";

export default function LoginForm() {
  return (
    <form
      method="POST"
      action="/admin-login"
      className="flex max-w-md flex-col gap-4"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Your email" />
        </div>
        <TextInput name="username" id="username" required type="text" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput name="password" id="password" required type="password" />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
