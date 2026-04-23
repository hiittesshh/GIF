import React from "react";
import { ArrowRight } from "lucide-react";
import { professions } from "../data";

export default function ProfessionalSection() {
  return (
    <section className="profession-section">
      <div className="profession-inner">
        <h2>
          What Changes When You <span>Understand Crypto</span>
        </h2>
        <div className="profession-grid">
          {professions.map((profession) => (
            <article className="profession-card" key={profession.title}>
              <div>
                <small>{profession.title}</small>
                <p>{profession.text}</p>
              </div>
              <a href="#">
                {profession.link}
                <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
