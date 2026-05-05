import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { institutions } from "../data";
import institutePlaceholder from "../assets/InstitutePlaceholder.svg";
import visaLogo from "../assets/visa.svg";
import blackrockLogo from "../assets/blackrock.svg";
import mastercardLogo from "../assets/Mastercard.svg";
import scLogo from "../assets/Standard Chartered.svg";
import fidelityLogo from "../assets/Fidelity.svg";
import boaLogo from "../assets/Bank of America.svg";
import dbsLogo from "../assets/DBS.svg";
import msLogo from "../assets/Morgan Stanley.svg";
import strategyLogo from "../assets/strategy.svg";
import goldmanLogo from "../assets/goldman.svg";
import jpmLogo from "../assets/jpmorgan.svg";
import defaultLogo from "../assets/logo.svg";
import hsbcLogo from "../assets/HSBC.svg";

const logoMap = {
  "BlackRock": blackrockLogo,
  "Mastercard": mastercardLogo,
  "VISA": visaLogo,
  "Standard Chartered": scLogo,
  "Fidelity": fidelityLogo,
  "Bank of America": boaLogo,
  "DBS": dbsLogo,
  "Morgan Stanley": msLogo,
  "Strategy": strategyLogo,
  "Goldman Sachs": goldmanLogo,
  "J.P. Morgan": jpmLogo,
  "HSBC": hsbcLogo,
};

export default function InstitutionsSection() {
  const [activeCard, setActiveCard] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      const desktop = window.innerWidth >= 1024;
      setIsMobile(mobile);
      setIsDesktop(desktop);
      
      if (desktop) {
        setVisibleCount(institutions.length);
      }
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleTouch = (name) => {
    setActiveCard(activeCard === name ? null : name);
  };

  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  const toggleShow = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (visibleCount > 4) {
      // Show Less: decrease one by one
      intervalRef.current = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev <= 4) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 4;
          }
          return prev - 1;
        });
      }, 80); 
    } else {
      // Show More: increase one by one
      intervalRef.current = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev >= institutions.length) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return institutions.length;
          }
          return prev + 1;
        });
      }, 80); 
    }
  };

  const visibleInstitutions = institutions.slice(0, visibleCount);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scale: 0.99
    },
    visible: (i) => ({
      opacity: 1, 
      y: 0,
      scale: 1, 
      transition: { 
        duration: 0.3, 
        ease: "easeOut",
        delay: i < 4 && visibleCount === 4 ? i * 0.1 : 0
      }
    }),
    exit: {
      opacity: 0, 
      y: 8,
      transition: { duration: 0.2, ease: "easeIn" } 
    }
  };

  return (
    <section className="section institutions-section" ref={sectionRef}>
      <h2 className="institutions-title">
        <span className="underlined">The World's Leading</span>{" "}
        <span className="highlight">Financial Institutions</span>{" "}
        <span className="muted-text text-gradient">Have Entered Crypto</span>
      </h2>
      <p className="institutions-description">
        From asset management and investment banking to global payments —
        institutions managing trillions in assets are building dedicated crypto infrastructure.
      </p>
      <div className="logo-grid-v2">
        <AnimatePresence>
          {visibleInstitutions.map((institution, index) => (
            <motion.div 
              key={institution.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`institution-placeholder-card ${activeCard === institution.name ? "touch-active" : ""}`} 
              onClick={() => handleTouch(institution.name)}
            >
              <img src={institutePlaceholder} alt="placeholder" className="institute-bg-svg" />
              <div className="card-content-inner">
                <div className="logo-area">
                  <img src={logoMap[institution.name] || defaultLogo} alt={institution.name} className="institution-logo-img" />
                </div>
                <div className="description-area">
                  <p>{institution.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!isDesktop && institutions.length > 4 && (
        <div className="load-more-wrapper">
          <button className="load-more-btn" onClick={toggleShow}>
            {visibleCount <= 4 ? "Show More" : "Show Less"}
          </button>
        </div>
      )}
    </section>
  );
}
