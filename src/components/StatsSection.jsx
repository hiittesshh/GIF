import React, { useRef, useState, useEffect } from "react";
import { stats } from "../data";

export default function StatsSection() {
  const sectionRef = useRef(null);
  const [showCards, setShowCards] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const preventDefault = (e) => {
      if (e.cancelable) e.preventDefault();
    };

    const handleWheel = (e) => {
      if (isLocked) {
        preventDefault(e);
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportMid = window.innerHeight / 2;
      const sectionMid = rect.top + rect.height / 2;

      // Only hijack if section is nearly centered
      if (Math.abs(sectionMid - viewportMid) < 60) {
        if (!showCards && e.deltaY > 0) {
          // If moving down and text is showing: lock and show cards
          preventDefault(e);
          setIsLocked(true);
          setShowCards(true);

          window.scrollTo({
            top: window.scrollY + (sectionMid - viewportMid),
            behavior: "smooth"
          });

          setTimeout(() => setIsLocked(false), 1200);
        } else if (showCards && e.deltaY < 0) {
          // If moving up and cards are showing: lock and show text
          preventDefault(e);
          setIsLocked(true);
          setShowCards(false);

          window.scrollTo({
            top: window.scrollY + (sectionMid - viewportMid),
            behavior: "smooth"
          });

          setTimeout(() => setIsLocked(false), 1200);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [showCards, isLocked]);

  const HeadingContent = () => (
    <>
      <span className="text-gold-gradient">32% Financial Advisors</span>{" "}
      <span className="text-white-gradient">globally now invest</span>
      <br />
      <span className="text-white-gradient">
        crypto for client accounts — up from 11% in 2023
      </span>
    </>
  );

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="network-bg" aria-hidden="true" />
      
      <div className="stats-content-inner">
        {/* Split Text Animation Layer */}
        <div className="split-text-container" style={{ pointerEvents: showCards ? 'none' : 'auto' }}>
          <h2 
            className="stat-heading split left"
            style={{ 
              opacity: showCards ? 0 : 1,
              transform: `translate(calc(-50% - ${showCards ? '60vw' : '0px'}), -50%)`,
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <HeadingContent />
          </h2>
          <h2 
            className="stat-heading split right"
            style={{ 
              opacity: showCards ? 0 : 1,
              transform: `translate(calc(-50% + ${showCards ? '60vw' : '0px'}), -50%)`,
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <HeadingContent />
          </h2>
        </div>

        {/* Cards Animation Layer */}
        <div 
          className="stat-grid"
          style={{ 
            opacity: showCards ? 1 : 0,
            transform: `translate(-50%, -50%) scale(${showCards ? 1 : 0.95})`,
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: showCards ? 'auto' : 'none'
          }}
        >
          {stats.map((stat, idx) => (
            <article 
              className="stat-card" 
              key={stat.value}
              style={{
                transform: `translateX(${showCards ? '0px' : (idx < 2 ? '-80px' : '80px')})`,
                transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.05 + idx * 0.08}s, opacity 0.8s ease ${idx * 0.08}s`,
                opacity: showCards ? 1 : 0
              }}
            >
              <div className="stat-number-box">
                <span className="stat-value-ghost">{stat.value}</span>
                <span className="stat-value-main">{stat.value}</span>
              </div>
              <p className="stat-label-text">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
