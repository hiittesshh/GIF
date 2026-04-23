import React from "react";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import CtaButton from "./CtaButton";
import { navItems } from "../data";

export default function Navbar() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="nav-inner">
        <Logo />
        <div className="nav-links">
          {navItems.map((item) => (
            <a href="#" key={item}>
              {item}
            </a>
          ))}
          <CtaButton className="nav-cta">Register Now</CtaButton>
        </div>
        <button className="menu-button" type="button" aria-label="Open navigation">
          <Menu size={22} strokeWidth={2.2} />
        </button>
      </div>
    </nav>
  );
}
