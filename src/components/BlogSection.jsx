import React from "react";
import { Clock } from "lucide-react";
import CtaButton from "./CtaButton";
import { blogs } from "../data";

export default function BlogSection() {
  return (
    <section className="section blog-section">
      <h2>
        From the <span className="highlight">Blog</span>
      </h2>
      <p>Research, analysis, and insights on crypto written for finance professionals, not traders.</p>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <article className="blog-card" key={blog.title}>
            <div className="blog-image">
              <span>{blog.tag}</span>
            </div>
            <div className="blog-body">
              <h3>{blog.title}</h3>
              <i />
              <p>{blog.text}</p>
              <div className="blog-card-footer">
                <Clock size={20} />
                <span>{blog.time}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <CtaButton className="knowledge-cta" href="https://blogs.grade.capital" target="_blank">
        <span className="cta-text">Visit the Knowledge Hub</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 4.16602L13.3333 9.99935L7.5 15.8327" stroke="#FEBE2F" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </CtaButton>
    </section>
  );
}
