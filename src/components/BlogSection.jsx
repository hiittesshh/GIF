import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { Clock } from "lucide-react";
import CtaButton from "./CtaButton";

function BlogCard({ blog }) {
  return (
    <a 
      href={`https://blogs.grade.capital/blog/${blog.slug}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="blog-card" 
      style={{ textDecoration: 'none' }}
    >
      <div 
        className="blog-image"
        style={{ 
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(21, 21, 23, 0.20) 50%, #151517 100%), url('${blog.image || '/assets/blog-tax.png'}')` 
        }}
      >
        <span>{blog.category}</span>
      </div>
      <div className="blog-body">
        <h3>{blog.title}</h3>
        <i></i>
        <p>{blog.excerpt}</p>
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
          <span>{blog.readTime || '5 min read'}</span>
        </div>
      </div>
    </a>
  );
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const marqueeX = useMotionValue(0);
  const speed = 0.8; 

  useEffect(() => {
    fetch("https://blogs.grade.capital/api/posts")
      .then((res) => res.json())
      .then((data) => {
        const posts = Array.isArray(data) ? data : (data?.Value || data?.posts || []);
        setBlogs(posts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardWidth = isMobile ? 280 : 320;
  const gap = isMobile ? 16 : 32;
  const totalWidth = blogs.length * (cardWidth + gap);

  useAnimationFrame(() => {
    if (loading || blogs.length === 0) return;
    
    const currentX = marqueeX.get();
    let nextX = currentX - speed;
    
    if (nextX <= -totalWidth) {
      nextX += totalWidth;
    }
    
    marqueeX.set(nextX);
  });

  if (loading) {
    return (
      <section className="section blog-section">
        <h2>From the <span className="highlight">Blog</span></h2>
        <div style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.5)" }}>
          Loading latest insights...
        </div>
      </section>
    );
  }

  return (
    <section className="section blog-section" ref={containerRef}>
      <h2>
        From the <span className="highlight">Blog</span>
      </h2>
      <p>Research, analysis, and insights on crypto written for finance professionals, not traders.</p>
      
      <div className="blog-marquee-container">
        <motion.div 
          className="blog-marquee-content"
          style={{ x: marqueeX, animation: 'none' }}
        >
          {blogs.map((blog, index) => (
            <BlogCard blog={blog} key={`${blog.id}-${index}`} />
          ))}
          {/* Duplicate set for seamless looping */}
          {blogs.map((blog, index) => (
            <BlogCard blog={blog} key={`${blog.id}-${index}-dup`} />
          ))}
        </motion.div>
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
