import React from "react";
import { ArrowRight } from "lucide-react";
import CtaButton from "./CtaButton";
import { blogs } from "../data";

export default function BlogSection() {
  return (
    <section className="section blog-section">
      <h2>
        From the <span>Blog</span>
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
              <small>{blog.time}</small>
            </div>
          </article>
        ))}
      </div>
      <CtaButton className="knowledge-cta">
        Visit the Knowledge Hub
        <ArrowRight size={18} />
      </CtaButton>
    </section>
  );
}
