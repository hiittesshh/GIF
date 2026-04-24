import React from "react";

export default function CtaButton({ children, className = "", href = "#", target = "_self" }) {
  return (
    <a className={`button ${className}`} href={href} target={target}>
      {children}
    </a>
  );
}
