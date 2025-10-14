"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Brand Storytelling",
      img: "/assets/AI1.jpg",
      type: "image",
    },
    { id: 2, title: "AI Product Ads", img: "/assets/AI2.jpg", type: "image" },
    {
      id: 3,
      title: "TikTok Video",
      img: "/assets/AI1.jpg",
      videoUrl: "https://vm.tiktok.com/ZNdWboL5r/",
      type: "video",
    },
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
        Our <span style={{ color: "#FFD700" }}>Projects</span>
      </h2>

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
            onClick={() => {
              if (project.type === "image") {
                setSelectedMedia({
                  type: "image",
                  src: project.img,
                  title: project.title,
                });
              }
            }}
          />
        ))}
      </div>

      <div style={{ marginTop: "40px" }}>
        <a
          href="/Projects"
          style={{
            padding: "12px 30px",
            borderRadius: "30px",
            background: "#FFD700",
            color: "#000",
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: "18px",
            transition: "all 0.3s ease",
            display: "inline-block",
          }}
          className="view-more-btn"
          onMouseOver={(e) => {
            e.target.style.background = "#000";
            e.target.style.color = "#FFD700";
            e.target.style.border = "2px solid #FFD700";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#FFD700";
            e.target.style.color = "#000";
            e.target.style.border = "none";
          }}
        >
          View More
        </a>
      </div>

      {/* Modal for Image Pop-up */}
      {selectedMedia && selectedMedia.type === "image" && (
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
            animation: "fadeIn 0.3s ease",
            overflowY: "auto",
          }}
          className="modal-overlay"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: "100%",
              animation: "zoomIn 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
            className="modal-content"
          >
            {/* Close Button */}
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
                transition: "all 0.3s ease",
                zIndex: 1001,
              }}
              className="close-btn"
              onClick={() => setSelectedMedia(null)}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#FFB400";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#FFD700";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              ✕
            </button>

            {/* Display Image */}
            <img
              src={selectedMedia.src}
              alt={selectedMedia.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
                maxHeight: "85vh",
                objectFit: "contain",
              }}
            />

            {/* Title */}
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

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes zoomIn {
            from {
              transform: scale(0.8);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          /* Tablet Screens (1024px and below) */
          @media (max-width: 1024px) {
            .projects-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
            }

            .project-image {
              height: 220px !important;
            }

            .video-thumbnail {
              height: 220px !important;
            }
          }

          /* Mobile Screens (768px and below) */
          @media (max-width: 768px) {
            .projects-section {
              padding: 60px 16px !important;
            }

            .projects-title {
              font-size: 28px !important;
              margin-bottom: 30px !important;
            }

            .projects-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .project-card {
              margin-bottom: 10px !important;
            }

            .project-image {
              height: 200px !important;
            }

            .video-thumbnail {
              height: 200px !important;
            }

            .project-label {
              padding: 12px !important;
              font-size: 14px !important;
            }

            .view-more-btn {
              padding: 10px 24px !important;
              font-size: 16px !important;
            }

            .close-btn {
              top: -30px !important;
              width: 32px !important;
              height: 32px !important;
              font-size: 20px !important;
            }
          }

          /* Small Mobile Screens (480px and below) */
          @media (max-width: 480px) {
            .projects-section {
              padding: 50px 12px !important;
            }

            .projects-title {
              font-size: 24px !important;
              margin-bottom: 25px !important;
            }

            .projects-grid {
              grid-template-columns: 1fr;
              gap: 10px;
            }

            .project-image {
              height: 180px !important;
            }

            .video-thumbnail {
              height: 180px !important;
            }

            .project-label {
              padding: 10px !important;
              font-size: 13px !important;
            }

            .view-more-btn {
              padding: 10px 20px !important;
              font-size: 14px !important;
            }

            .play-button {
              width: 50px !important;
              height: 50px !important;
              font-size: 22px !important;
            }

            .close-btn {
              top: -28px !important;
              right: 0px !important;
              width: 28px !important;
              height: 28px !important;
              font-size: 16px !important;
            }
          }

          /* Touch devices - disable hover effects on mobile */
          @media (hover: none) and (pointer: coarse) {
            .project-image:hover {
              transform: scale(1) !important;
            }

            .video-thumbnail:hover {
              transform: scale(1) !important;
            }
          }
        `}
      </style>
    </section>
  );
}
