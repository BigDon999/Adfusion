"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const projects = [
    { id: 1, title: "Brand Storytelling", img: "/assets/AI1.jpg", type: "image" },
    { id: 2, title: "AI Product Ads", img: "/assets/AI1.jpg", type: "image" },
    { id: 3, title: "Social Media Campaign", img: "/assets/AI1.jpg", type: "image" },
  ];

  return (
    <section
      id="projects"
      style={{
        background: "black",
        color: "white",
        padding: "100px 20px",
        textAlign: "center",
      }}
      className="projects-section"
    >
      <h2
        style={{
          fontSize: "36px",
          marginBottom: "40px",
          fontWeight: "bold",
        }}
        className="projects-title"
      >
        Featured <span style={{ color: "#FFD700" }}>Projects</span>
      </h2>

      {/* Projects Grid */}
      <div
        className="projects-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() =>
              setSelectedMedia({
                type: "image",
                src: project.img,
                title: project.title,
              })
            }
          />
        ))}
      </div>

      {/* View More Button with Link */}
      <a href="/Projects" style={{ textDecoration: "none" }}>
        <button
          style={{
            marginTop: "50px",
            background: "#FFD700",
            color: "#000",
            border: "none",
            padding: "14px 32px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background 0.3s ease, transform 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#FFB400";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#FFD700";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          View More Projects
        </button>
      </a>

      {/* Modal */}
      {selectedMedia && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setSelectedMedia(null)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: "100%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                background: "#FFD700",
                border: "none",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "24px",
                color: "#000",
                fontWeight: "bold",
              }}
              onClick={() => setSelectedMedia(null)}
            >
              ✕
            </button>

            <img
              src={selectedMedia.src}
              alt={selectedMedia.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "16px",
                maxHeight: "85vh",
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
              }}
              className="modal-image"
            />
            <p
              style={{
                color: "#FFD700",
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "16px",
                textAlign: "center",
              }}
            >
              {selectedMedia.title}
            </p>
          </div>
        </div>
      )}

      {/* Responsive Grid & Modal Image */}
      <style>{`
        @media (max-width: 1199px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 767px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .projects-section {
            padding: 70px 16px !important;
          }
          .modal-image {
            max-width: 95vw !important;
            max-height: 70vh !important;
            border-radius: 20px !important;
            display: block !important;
            margin: 0 auto !important;
          }
        }

        @media (max-width: 480px) {
          .modal-image {
            max-width: 98vw !important;
            max-height: 80vh !important;
            border-radius: 24px !important;
            display: block !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  );
}
