import React from "react";
import Logo from "./Logo";

export default function Footer() {
  const columns = [
    ["Programs", "Crypto Literacy Program", "Certified Crypto Advisor", "Grade Certified Professional"],
    ["For Professionals", "Chartered Accountants", "Mutual Fund Distributors", "Wealth Advisors"],
    ["Resources", "Blog", "Fact Check", "Premium Resources"],
    ["Company", "About", "Contact", "Privacy Policy", "Terms of Use"],
  ];

  return (
    <footer className="footer">
      <div className="footer-brand">
        <Logo />
        <p>A Grade Capital Initiative</p>
        <p>institute.grade.capital</p>
      </div>
      {columns.map(([title, ...links]) => (
        <div className="footer-col" key={title}>
          <h3>{title}</h3>
          {links.map((link) => (
            <a href="#" key={link}>
              {link}
            </a>
          ))}
        </div>
      ))}
      <div className="footer-bottom">
        <span>© 2026 Grade Institute of Finance. All rights reserved.</span>
        <span>Data sources: Chainalysis, CoinGecko, Bitwise, ETFGI, Coinbase Institutional</span>
      </div>
    </footer>
  );
}
