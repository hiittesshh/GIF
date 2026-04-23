import React from "react";
import { stats } from "../data";

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="network-bg" aria-hidden="true" />
      <p className="stat-intro">
        <strong>32% Financial Advisors</strong> globally now invest crypto for client
        accounts, up from 12% in 2023.
      </p>
      <div className="stat-grid">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.value}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
