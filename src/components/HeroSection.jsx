import React from "react";
import CtaButton from "./CtaButton";

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <img src="/assets/imagewithvignette.png" alt="Hero background" />
      </div>

      <div className="hero-content">
        <p className="eyebrow">Professional Crypto Education</p>
        <h1 id="hero-title">
          India's Premier Crypto Education Institute for{" "}
          <span>Finance Professionals</span>
        </h1>
        <CtaButton className="hero-cta">Register Now</CtaButton>
      </div>
    </section>
  );
}
