"use client";

import { Navbar } from "flowbite-react";

export default function NavbarCTA() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Ryan's Blog
        </span>
      </Navbar.Brand>

      <Navbar.Collapse>
        <Navbar.Link active href="#">
          <p>Home</p>
        </Navbar.Link>
        <Navbar.Link href="#posts">Posts</Navbar.Link>
        <Navbar.Link href="#admin-login">Admin login</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
