import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { professions } from "../data";

export default function ProfessionalSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotPositions, setDotPositions] = useState([]);
  const dotRefs = useRef([]);
  const svgContainerRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (!svgContainerRef.current) return;
      const containerRect = svgContainerRef.current.getBoundingClientRect();

      const positions = dotRefs.current.map((dot) => {
        if (!dot) return 0;
        const dotRect = dot.getBoundingClientRect();
        return dotRect.top - containerRect.top + dotRect.height / 2;
      });
      setDotPositions(positions);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const svgHeight = dotPositions.length
    ? dotPositions[dotPositions.length - 1] + 40
    : 400;

  const activeDot = dotPositions[activeIndex] ?? 0;
  const lastDot = dotPositions[dotPositions.length - 1] ?? 0;

  return (
    <section className="profession-section">
      <div className="profession-inner">
        <h2>
          <span className="text-gradient">What Changes When You</span>{" "}
          <span className="highlight">Understand Crypto</span>
        </h2>

        <div className="profession-container">
          <div className="profession-sidebar">
            <div className="timeline-wrapper">
              <div
                ref={svgContainerRef}
                className="timeline-line-container"
              >
                <svg
                  className="timeline-svg"
                  width="6"
                  height={svgHeight}
                  viewBox={`0 0 6 ${svgHeight}`}
                  fill="none"
                >
                  {/* Solid line: top → active dot */}
                  <path
                    d={`M3 0V${activeDot}`}
                    stroke="#E9E8FF"
                    strokeOpacity="0.9"
                    strokeWidth="5"
                    style={{ transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }}
                  />

                  {/* Dashed line: active dot → last dot */}
                  {activeIndex < professions.length - 1 && (
                    <path
                      d={`M3 ${activeDot}V${lastDot}`}
                      stroke="#E9E8FF"
                      strokeOpacity="0.1"
                      strokeWidth="5"
                      strokeDasharray="12 12"
                      style={{ transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }}
                    />
                  )}
                </svg>
              </div>

              <div className="tabs-list">
                {professions.map((profession, index) => (
                  <div
                    key={profession.title}
                    className={`profession-tab ${index === activeIndex ? "active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div
                      className="dot-container"
                      ref={(el) => (dotRefs.current[index] = el)}
                    >
                      <div className="dot"></div>
                    </div>
                    <span>{profession.title}</span>
                    {index === activeIndex && (
                      <ChevronRight className="tab-arrow" size={20} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="profession-content">
            <div className="display-card">
              <img
                key={professions[activeIndex].image}
                src={professions[activeIndex].image}
                alt={professions[activeIndex].title}
                className="display-image"
              />
              <div className="display-overlay">
                <div key={activeIndex} className="overlay-content">
                  <p className="profession-desc">
                    <span className="yellow-dot"></span>
                    {professions[activeIndex].text}
                  </p>
                  <div className="learn-more-wrapper">
                    <a href="#" className="learn-more">
                      {professions[activeIndex].link}{" "}
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}