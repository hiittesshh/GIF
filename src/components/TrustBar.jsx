import React from "react";
import { CheckCircle2 } from "lucide-react";
import { trustItems } from "../data";

export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Program highlights">
      {trustItems.map((item) => (
        <div className="trust-item" key={item}>
          <CheckCircle2 size={20} />
          <span>{item}</span>
        </div>
      ))}
    </section>
  );
}
