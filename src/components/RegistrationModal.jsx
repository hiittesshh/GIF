import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function RegistrationModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = new URLSearchParams();
    for (const pair of formData) {
      data.append(pair[0], pair[1]);
    }

    const scriptUrl = "https://script.google.com/macros/s/AKfycbw26_v9vYO0dy1gCnxlXQVDC3H2oAx7jRfyYZ7baiRf4P-lGimNX-D1YfRHxr09SEDhCA/exec"; 

    try {
      await fetch(`${scriptUrl}?${data.toString()}`, {
        method: "GET",
        mode: "no-cors",
      });
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose} aria-label="Close modal">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {isSuccess ? (
          <div className="success-message" style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center",
            width: "100%",
            padding: "80px 20px",
            textAlign: "center"
          }}>
            <div style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "rgba(254, 190, 47, 0.15)",
              border: "2px solid rgba(254, 190, 47, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px"
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#FEBE2F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="form-heading" style={{ color: "#fff", marginBottom: "16px", fontSize: "28px" }}>Registration Successful</h2>
            <p className="form-subheading" style={{ fontSize: "16px", color: "#D1D5DC", maxWidth: "85%", margin: "0 auto", lineHeight: "1.6" }}>
              Thank you for your interest! Our team will review your details and reach out to you shortly.
            </p>
          </div>
        ) : (
          <>
            <h2 className="form-heading">Register Your Interest</h2>
            <p className="form-subheading">
              Our team will reach out to you with program details,<br />
              upcoming batches, and certification information.
            </p>
            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" required />
              </div>
              <div className="form-group">
                <label>Profession</label>
                <div className="select-wrapper">
                  <select name="profession" defaultValue="" required>
                    <option value="" disabled hidden>Select your profession</option>
                    <option value="student">Student</option>
                    <option value="professional">Working Professional</option>
                    <option value="business">Business Owner</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" required />
              </div>
              
              <div className="form-submit-wrapper">
                <button type="submit" className="button submit-btn" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
