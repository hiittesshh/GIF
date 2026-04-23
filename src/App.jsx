import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import IntroSection from "./components/IntroSection";
import TrustBar from "./components/TrustBar";
import StatsSection from "./components/StatsSection";
import InstitutionsSection from "./components/InstitutionsSection";
import ClientQuestions from "./components/ClientQuestions";
import ProfessionalSection from "./components/ProfessionalSection";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import "./styles.css";

export default function App() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <IntroSection />
      <TrustBar />
      <StatsSection />
      <InstitutionsSection />
      <ClientQuestions />
      <ProfessionalSection />
      <BlogSection />
      <Footer />
    </main>
  );
}
