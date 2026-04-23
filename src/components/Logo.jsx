import React from "react";
import logoSvg from "../assets/logo.svg";

export default function Logo() {
  return (
    <a className="logo" href="#" aria-label="Grade Institute of Finance home">
      <img src={logoSvg} alt="Grade Institute of Finance" className="logo-image" />
    </a>
  );
}
