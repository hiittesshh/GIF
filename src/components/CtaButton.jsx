import React from "react";

export default function CtaButton({ children, className = "", href, target = "_self", onClick }) {
  if (onClick) {
    return (
      <button className={`button ${className}`} onClick={onClick} type="button">
        {children}
      </button>
    );
  }
  return (
    <a className={`button ${className}`} href={href || "#"} target={target}>
      {children}
    </a>
  );
}
