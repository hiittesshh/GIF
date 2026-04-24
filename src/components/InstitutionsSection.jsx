import React from "react";
import { institutions } from "../data";
import institutePlaceholder from "../assets/InstitutePlaceholder.svg";
import visaLogo from "../assets/visa.svg";

export default function InstitutionsSection() {
  return (
    <section className="section institutions-section">
      <h2 className="institutions-title">
        <span className="underlined text-gradient">The World's Leading</span>{" "}
        <span className="highlight">Financial Institutions</span>{" "}
        <span className="muted-text text-gradient">Have Entered Crypto</span>
      </h2>
      {/* <h3 className="institutions-subheading">
        Your Clients Are Already Looking for <span className="highlight">Answers</span>
      </h3> */}
      <p className="institutions-description">
        From asset management and investment banking to global payments —
        institutions managing trillions in assets are building dedicated crypto infrastructure.
      </p>
      <div className="logo-grid-v2">
        {institutions.map((institution) => (
          <div className="institution-placeholder-card" key={institution.name}>
            <img src={institutePlaceholder} alt="placeholder" className="institute-bg-svg" />
            <div className="card-content-inner">
              <div className="logo-area">
                <img src={visaLogo} alt="VISA" className="institution-logo-img" />
              </div>
              <div className="description-area">
                <p>{institution.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
