"use client";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        background: "black",
        color: "white",
        padding: "60px 20px 20px 20px",
        textAlign: "center",
      }}
    >
      {/* Top Section */}
      <div
        className="footer-top"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          marginBottom: "10px",
        }}
      >
        {/* Logo/Brand */}
        <div
          className="footer-logo"
          style={{ flex: "1 1 80px", textAlign: "left" }}
        >
          <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>
            <span style={{ color: "#FFD700" }}>AdFusion</span> Studios
          </h2>
          <p style={{ fontSize: "16px", color: "#aaa", marginTop: "10px" }}>
            Where Ads Become Art
          </p>
        </div>

        {/* Nav Links */}
        <div
          className="footer-links"
          style={{ flex: "1 1 80px", textAlign: "center" }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              justifyContent: "center",
              gap: "25px",
              flexWrap: "wrap",
            }}
          >
            <li style={{ fontSize: "16px", cursor: "pointer" }}>
              <a
                href="#home"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Home
              </a>
            </li>
            <li style={{ fontSize: "16px", cursor: "pointer" }}>
              <a
                href="#about"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                About
              </a>
            </li>
            <li style={{ fontSize: "16px", cursor: "pointer" }}>
              <a
                href="#services"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Services
              </a>
            </li>
            <li style={{ fontSize: "16px", cursor: "pointer" }}>
              <a
                href="#whyus"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Why Us
              </a>
            </li>
            <li style={{ fontSize: "16px", cursor: "pointer" }}>
              <a
                href="#Contact"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div
          className="footer-socials"
          style={{ flex: "1 1 80px", textAlign: "center" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://www.instagram.com/adfusion_studios?igsh=a3hyeDMyb294Znd0&utm_source=qr"
              style={{ color: "#FFD700", fontSize: "20px" }}
            >
              <FaInstagram />
            </a>
            instagram
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid #333",
          paddingTop: "15px",
          fontSize: "14px",
          color: "#aaa",
        }}
      >
        © {new Date().getFullYear()}{" "}
        <span style={{ color: "#FFD700" }}>AdFusion Studios</span>. All Rights
        Reserved.
      </div>

      {/* Inline Media Queries */}
      <style>
        {`
          @media (max-width: 1024px) {
            .footer-top {
              flex-direction: column;
              text-align: center;
              gap: 20px;
            }
            .footer-logo,
            .footer-links,
            .footer-socials {
              text-align: center !important;
            }
            .footer-socials div {
              justify-content: center !important;
            }
          }

          @media (max-width: 600px) {
            .footer-links ul {
              display: grid !important;
              grid-template-columns: repeat(2, auto);
              gap: 15px 25px;
              justify-content: center;
            }
          }
        `}
      </style>
    </footer>
  );
}
