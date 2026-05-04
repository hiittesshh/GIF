import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import CtaButton from "./CtaButton";
import { navItems } from "../data";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <nav className={`site-nav ${scrolled ? "scrolled" : ""} ${isMobileMenuOpen ? "menu-open" : ""}`} aria-label="Main navigation">
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
          className={`menu-button-v2 ${isMobileMenuOpen ? "active" : ""}`}
          type="button" 
          aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
          onClick={toggleMobileMenu}
        >
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </button>
      </div>
      
      <div className={`mobile-menu-v2 ${isMobileMenuOpen ? "is-open" : ""}`}>
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
        <div className="mobile-menu-content">
          <div className="mobile-nav-links">
            {navItems.map((item, index) => (
              <a 
                href="#" 
                key={item} 
                onClick={closeMobileMenu}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <span className="link-number">0{index + 1}</span>
                <span className="link-text">{item}</span>
              </a>
            ))}
            <div className="mobile-cta-wrapper" style={{ transitionDelay: `${navItems.length * 0.1}s` }}>
              <CtaButton className="nav-cta-mobile" onClick={closeMobileMenu}>
                Register Now
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
