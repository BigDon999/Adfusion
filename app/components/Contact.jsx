"use client";
import React from "react";

const Contact = () => {
  return (
    <section
      id="Contact"
      style={{
        background: "linear-gradient(180deg, #000000, #0a0a0a)",
        color: "white",
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      {/* Header */}
      <h2
        style={{
          fontSize: "38px",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        Get in <span style={{ color: "#d4af37" }}>Touch</span>
      </h2>
      <p
        style={{
          fontSize: "16px",
          color: "#ccc",
          marginBottom: "40px",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Have a project in mind? Let’s create something futuristic for your
        brand.
      </p>

      {/* Contact Form */}
      <form
        action="https://formspree.io/f/xnngwvjl"
        method="POST"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          style={{
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid rgba(212,175,55,0.3)",
            background: "rgba(0,0,0,0.6)",
            color: "white",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          style={{
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid rgba(212,175,55,0.3)",
            background: "rgba(0,0,0,0.6)",
            color: "white",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          style={{
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid rgba(212,175,55,0.3)",
            background: "rgba(0,0,0,0.6)",
            color: "white",
            fontSize: "16px",
            outline: "none",
            resize: "none",
          }}
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: "15px",
            borderRadius: "8px",
            background: "#d4af37",
            color: "#000",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#d4af37";
            e.currentTarget.style.border = "1px solid #d4af37";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#d4af37";
            e.currentTarget.style.color = "#000";
            e.currentTarget.style.border = "none";
          }}
        >
          Send Message
        </button>
      </form>

      {/* Responsive */}
      <style>
        {`
          @media (max-width: 600px) {
            h2 {
              font-size: 28px !important;
            }
            p {
              font-size: 14px !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Contact;
