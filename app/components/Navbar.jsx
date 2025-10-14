"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          transition: "all 0.3s ease",
          backgroundColor: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 24px",
          }}
        >
          {/* Logo */}
          <div style={{ flex: "1" }}>
            <a
              href="/"
              style={{
                textDecoration: "none",
              }}
            >
              <img
                src="/assets/logo.png"
                alt="AdFusion Studios"
                style={{
                  height: "60px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </a>
          </div>

          {/* Nav Links (Desktop) */}
          <ul
            style={{
              flex: "2",
              display: "flex",
              justifyContent: "center",
              gap: "32px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="nav-links"
          > 
          <li>
              <a
                href="/"
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  textDecoration: "none",
                  position: "relative",
                  cursor: "pointer",
                }}
                className="nav-link"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  textDecoration: "none",
                  position: "relative",
                  cursor: "pointer",
                }}
                className="nav-link"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  textDecoration: "none",
                  position: "relative",
                  cursor: "pointer",
                }}
                className="nav-link"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#projects"
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  textDecoration: "none",
                  position: "relative",
                  cursor: "pointer",
                }}
                className="nav-link"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#whyus"
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  textDecoration: "none",
                  position: "relative",
                  cursor: "pointer",
                }}
                className="nav-link"
              >
                Why Us
              </a>
            </li>
          </ul>

          {/* Contact Button (Desktop) */}
          <div
            style={{ flex: "1", display: "flex", justifyContent: "flex-end" }}
            className="desktop-contact"
          >
            <Link
              href="#Contact"
              style={{
                background: "linear-gradient(to right, #FFD700, #D4AF37)",
                color: "#000",
                padding: "8px 20px",
                borderRadius: "9999px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              className="contact-btn"
            >
              Contact
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button
            style={{
              display: "none",
              flexDirection: "column",
              gap: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div
              style={{
                width: "24px",
                height: "2px",
                background: "#fff",
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? "rotate(45deg) translate(10px, 10px)"
                  : "none",
              }}
            ></div>
            <div
              style={{
                width: "24px",
                height: "2px",
                background: "#fff",
                transition: "all 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            ></div>
            <div
              style={{
                width: "24px",
                height: "2px",
                background: "#fff",
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? "rotate(-45deg) translate(7px, -7px)"
                  : "none",
              }}
            ></div>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: "70px",
            left: 0,
            right: 0,
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(8px)",
            padding: "20px",
            zIndex: 99,
            animation: "slideDown 0.3s ease",
          }}
          className="mobile-menu"
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li style={{ marginBottom: "16px" }}>
              <a
                href="/"
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  textDecoration: "none",
                  display: "block",
                  padding: "10px",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                }}
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                Home
              </a>
            </li>
            <li style={{ marginBottom: "16px" }}>
              <a
                href="#about"
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  textDecoration: "none",
                  display: "block",
                  padding: "10px",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                }}
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                About
              </a>
            </li>
            <li style={{ marginBottom: "16px" }}>
              <a
                href="#services"
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  textDecoration: "none",
                  display: "block",
                  padding: "10px",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                }}
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                Services
              </a>
            </li>
            <li style={{ marginBottom: "16px" }}>
              <a
                href="#projects"
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  textDecoration: "none",
                  display: "block",
                  padding: "10px",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                }}
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                Portfolio
              </a>
            </li>
            <li style={{ marginBottom: "16px" }}>
              <a
                href="#whyus"
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  textDecoration: "none",
                  display: "block",
                  padding: "10px",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                }}
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                Why Us
              </a>
            </li>
            <li
              style={{
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <a
                href="#contact"
                style={{
                  display: "inline-block",
                  background: "linear-gradient(to right, #FFD700, #D4AF37)",
                  color: "#000",
                  padding: "10px 20px",
                  borderRadius: "9999px",
                  fontWeight: "600",
                  textDecoration: "none",
                  width: "100%",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                className="mobile-contact-btn"
                onClick={closeMenu}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          .desktop-contact {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0;
          height: 2px;
          background: #ffb400;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .mobile-nav-link:hover {
          background: rgba(255, 215, 0, 0.1) !important;
          color: #ffd700 !important;
        }

        .mobile-contact-btn:hover {
          transform: scale(1.02);
        }
      `}</style>
    </>
  );
}