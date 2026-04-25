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
      <div className="blog-marquee-container">
        <div className="blog-marquee-content">
          {[...blogs, ...blogs].map((blog, index) => (
            <div className="blog-card" key={index}>
              <div className="blog-image">
                <span>{blog.tag}</span>
              </div>
              <div className="blog-body">
                <h3>{blog.title}</h3>
                <i></i>
                <p>{blog.text}</p>
                <div className="blog-card-footer">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{blog.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
