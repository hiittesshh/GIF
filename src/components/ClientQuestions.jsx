import React from "react";
import { Search, TrendingUp, BookOpen } from "lucide-react";
import { searches, questions } from "../data";

export default function ClientQuestions() {
  return (
    <section className="section questions-section">
      <h2>
        Your Clients Are Already Looking for <span>Answers</span>
      </h2>
      <p>Search interest for crypto professionals in India is rising across advisory categories.</p>
      <div className="search-row">
        {searches.map((search) => (
          <div className="search-pill" key={search}>
            <Search size={18} />
            <span>{search}</span>
            <em>
              <TrendingUp size={14} />
              Rising
            </em>
          </div>
        ))}
      </div>
      <div className="question-grid">
        {questions.map((question) => (
          <article className="question-card" key={question}>
            <BookOpen size={18} />
            <p>"{question}"</p>
          </article>
        ))}
      </div>
    </section>
  );
}
