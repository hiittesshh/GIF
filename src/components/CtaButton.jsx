import React from "react";

export default function CtaButton({ children, className = "" }) {
  return (
    <a className={`button ${className}`} href="#">
      {children}
    </a>
  );
}
