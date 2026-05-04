import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { professions } from "../data";
import diskSvg from "../assets/Disk.svg";

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

  const carouselRef = useRef(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const width = carouselRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="profession-section">
      <div className="profession-inner">
        <h2>
          <span className="text-gradient">What Changes When You</span>{" "}
          <span className="highlight">Understand Crypto</span>
        </h2>

        {/* Desktop Layout */}
        <div className="profession-container desktop-only">
          <div className="profession-sidebar">
            <div className="timeline-wrapper">
              <div ref={svgContainerRef} className="timeline-line-container">
                <svg className="timeline-svg" width="6" height={svgHeight} viewBox={`0 0 6 ${svgHeight}`} fill="none">
                  <path d={`M3 0V${activeDot}`} stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" style={{ transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }} />
                  {activeIndex < professions.length - 1 && (
                    <path d={`M3 ${activeDot}V${lastDot + 16}`} stroke="#8E8E8E" strokeOpacity="0.5" strokeWidth="4" strokeDasharray="12 12" strokeDashoffset="6" strokeLinecap="round" style={{ transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }} />
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
                    <div className={`dot-container ${index <= activeIndex ? "reached" : ""}`} ref={(el) => (dotRefs.current[index] = el)}>
                      <img src={diskSvg} alt="disk" className="disk-icon" />
                      <div className={`milestone-dot ${index <= activeIndex ? "active" : ""}`}></div>
                    </div>
                    <span>{profession.title}</span>
                    {index === activeIndex && <ChevronRight className="tab-arrow" size={20} />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="profession-content">
            <div className="display-card">
              <img key={professions[activeIndex].image} src={professions[activeIndex].image} alt={professions[activeIndex].title} className="display-image" />
              <div className="display-overlay">
                <div key={activeIndex} className="overlay-content">
                  <p className="profession-desc">
                    <span className="yellow-dot"></span>
                    {professions[activeIndex].text}
                  </p>
                  <div className="learn-more-wrapper">
                    <a href="#" className="learn-more">
                      {professions[activeIndex].link} <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Carousel Layout */}
        <div className="profession-mobile-carousel mobile-only">
          <div 
            className="carousel-track" 
            ref={carouselRef}
            onScroll={handleScroll}
          >
            {professions.map((profession, index) => (
              <div className="carousel-card-wrapper" key={index}>
                <div className="display-card mobile-card">
                  <img src={profession.image} alt={profession.title} className="display-image" />
                  <div className="mobile-card-tag">{profession.title}</div>
                  <div className="display-overlay">
                    <div className="overlay-content">
                      <p className="profession-desc">
                        <span className="yellow-dot"></span>
                        {profession.text}
                      </p>
                      <div className="learn-more-wrapper">
                        <a href="#" className="learn-more">
                          {profession.link} <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-indicators">
            {professions.map((_, index) => (
              <div 
                key={index} 
                className={`indicator-dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => {
                  carouselRef.current?.scrollTo({
                    left: index * carouselRef.current.offsetWidth,
                    behavior: 'smooth'
                  });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}