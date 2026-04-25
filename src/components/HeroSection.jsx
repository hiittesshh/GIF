import React, { useState } from "react";
import CtaButton from "./CtaButton";
import TrustBar from "./TrustBar";
import RegistrationModal from "./RegistrationModal";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <img src="/assets/imagewithvignette.png" alt="Hero background" />
      </div>

      <div className="hero-content">
        <p className="eyebrow">Professional Crypto Education</p>
        <div className="hero-text-wrapper">
          <h1 id="hero-title">
            India's Premier Crypto Education Institute for{" "}
            <span>Finance Professionals</span>
          </h1>
          <CtaButton className="hero-cta" onClick={() => setIsModalOpen(true)}>Register Now</CtaButton>
        </div>
        <TrustBar />
      </div>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
