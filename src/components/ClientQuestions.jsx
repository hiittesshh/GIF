import React from "react";
import { Search, TrendingUp, BookOpen } from "lucide-react";
import { searches, questions } from "../data";

export default function ClientQuestions() {
  return (
    <section className="section questions-section">
      <h2>
        Your Clients Are Already Looking for <span className="highlight">Answers</span>
      </h2>
      <p>Search interest for crypto professionals in India has been rising steadily since 2024.</p>
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
      <h3 className="questions-subheading">
        Questions Your Clients Will Ask This Year
      </h3>
      <div className="question-grid">
        {questions.map((question) => (
          <article className="question-card" key={question}>
            <div className="card-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83333 6.66732H14.1667M5.83333 10.0007H9.16667M10 16.6673L6.66667 13.334H4.16667C3.72464 13.334 3.30072 13.1584 2.98816 12.8458C2.67559 12.5333 2.5 12.1093 2.5 11.6673V5.00065C2.5 4.55862 2.67559 4.1347 2.98816 3.82214C3.30072 3.50958 3.72464 3.33398 4.16667 3.33398H15.8333C16.2754 3.33398 16.6993 3.50958 17.0118 3.82214C17.3244 4.1347 17.5 4.55862 17.5 5.00065V11.6673C17.5 12.1093 17.3244 12.5333 17.0118 12.8458C16.6993 13.1584 16.2754 13.334 15.8333 13.334H13.3333L10 16.6673Z" stroke="#151517" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p>"{question}"</p>
          </article>
        ))}
      </div>
    </section>
  );
}
