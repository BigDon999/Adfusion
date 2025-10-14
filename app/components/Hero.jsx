import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="home"
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #000000 60%, #b8860b 120%)",
        color: "white",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT SIDE - TEXT */}
        <div
          style={{
            flex: "1 1 500px",
            padding: "20px",
            textAlign: "left",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              marginBottom: "20px",
              lineHeight: "1.2",
              color: "#fff",
            }}
          >
            <span style={{ color: "#D4AF37", fontSize: "3.5rem" }}>AI</span>{" "}
            That Tells Your Brand’s{" "}
            <span style={{ color: "#D4AF37", fontSize: "3.5rem" }}>Story</span>
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "30px",
              maxWidth: "500px",
              color: "#f0f0f0",
            }}
          >
            We create stunning storytelling, ad content, and AI-powered imagery
            that helps you cut production costs and stand out.
          </p>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            <a
              href="/Projects"
              style={{
                padding: "12px 25px",
                borderRadius: "30px",
                border: "2px solid #FFD700",
                background: "transparent",
                color: "#FFD700",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                display: "inline-block",
                textDecoration: "none",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#FFD700";
                e.target.style.color = "#000";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#FFD700";
              }}
            >
              View Projects
            </a>
            <a
              href="#Contact"
              style={{
                padding: "12px 25px",
                borderRadius: "30px",
                border: "none",
                background: "#FFD700",
                color: "#000",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                display: "inline-block",
                textDecoration: "none",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#FFD700";
                e.target.style.border = "2px solid #FFD700";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "#FFD700";
                e.target.style.color = "#000";
                e.target.style.border = "none";
              }}
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div
          style={{
            flex: "1 1 400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <img
            src="/assets/hero1.jpg"
            alt="AI Brand"
            style={{
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid #FFD700",
              boxShadow: "0 0 40px rgba(255, 215, 0, 0.6)",
              maxWidth: "100%",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
