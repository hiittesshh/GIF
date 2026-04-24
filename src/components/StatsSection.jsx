import React from "react";
import { stats } from "../data";

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="network-bg" aria-hidden="true" />
      <h2 className="stat-heading">
        <span className="text-gold-gradient">32% Financial Advisors</span>{" "}
        <span className="text-white-gradient">globally now invest</span>
        <br />
        <span className="text-white-gradient">
          crypto for client accounts — up from 11% in 2023
        </span>
      </h2>
      {/* <div className="stat-grid">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.value}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div> */}
    </section>
  );
}
