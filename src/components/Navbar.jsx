import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import CtaButton from "./CtaButton";
import { navItems } from "../data";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
        <button 
          className="menu-button" 
          type="button" 
          aria-label="Open navigation"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <a href="#" key={item} onClick={() => setIsMobileMenuOpen(false)}>
              {item}
            </a>
          ))}
          <CtaButton className="nav-cta" onClick={() => setIsMobileMenuOpen(false)}>
            Register Now
          </CtaButton>
        </div>
      )}
    </nav>
  );
}
