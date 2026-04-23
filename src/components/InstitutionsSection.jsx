import React from "react";
import { institutions } from "../data";

export default function InstitutionsSection() {
  return (
    <section className="section institutions-section">
      <h2>
        The World's Leading Financial Institutions Have Entered <span>Crypto</span>
      </h2>
      <p>From asset management and investment banking to global payments and custody.</p>
      <div className="logo-grid">
        {institutions.map((institution) => (
          <div className="institution-logo" key={institution}>
            {institution}
          </div>
        ))}
      </div>
    </section>
  );
}
