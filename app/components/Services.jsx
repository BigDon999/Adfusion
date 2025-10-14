import React from "react";
import {
  FaRobot,
  FaBullhorn,
  FaPaintBrush,
  FaVideo,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";

const Services = () => {
  const services = [
    { icon: <FaRobot size={40} />, title: "AI Storytelling" },
    { icon: <FaBullhorn size={40} />, title: "Ad Campaigns" },
    { icon: <FaPaintBrush size={40} />, title: "Creative Design" },
    { icon: <FaVideo size={40} />, title: "Video Production" },
    { icon: <FaChartLine size={40} />, title: "Brand Growth" },
    { icon: <FaLightbulb size={40} />, title: "Futuristic Ideas" },
  ];

  return (
    <section
      id="services"
      style={{
        background: "linear-gradient(180deg, #000000, #0a0a0a)",
        color: "white",
        padding: "100px 20px",
        textAlign: "center",
      }}
    >
      {/* Header */}
      <h2
        style={{
          fontSize: "38px",
          fontWeight: "bold",
          marginBottom: "50px",
        }}
      >
        Our <span style={{ color: "#d4af37" }}>Services</span>
      </h2>

      {/* Services Grid */}
      <div
        className="services-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#d4af37";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "white";
            }}
          >
            <div style={{ marginBottom: "10px" }}>{service.icon}</div>
            <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>
              {service.title}
            </h3>
          </div>
        ))}
      </div>

      {/* Responsive Media Queries */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 25px;
          }
        }
        @media (max-width: 480px) {
          .services-grid {
            grid-template-columns: repeat(1, 1fr) !important;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
