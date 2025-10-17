"use client";
import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setProjects(data);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

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
        More <span style={{ color: "#FFD700" }}>Projects</span>
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
              } else if (project.type === "video" && project.videoUrl) {
                window.open(project.videoUrl, "_blank");
              }
            }}
          />
        ))}
      </div>

      {/* Modal for Larger View - Images Only */}
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

      {/* Responsive Media Queries & Animations */}
      <style>{`
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

        /* Desktop (1200px and above) */
        @media (min-width: 1200px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          .projects-section {
            padding: 80px 20px !important;
          }
          .projects-title {
            font-size: 36px !important;
            margin-bottom: 40px !important;
          }
          .project-image {
            height: 250px !important;
          }
          .video-thumbnail {
            height: 250px !important;
          }
        }

        /* Tablet (768px to 1199px) */
        @media (max-width: 1199px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 18px !important;
          }
          .projects-section {
            padding: 70px 20px !important;
          }
          .projects-title {
            font-size: 32px !important;
            margin-bottom: 35px !important;
          }
          .project-image {
            height: 220px !important;
          }
          .video-thumbnail {
            height: 220px !important;
          }
          .project-label {
            padding: 12px !important;
            font-size: 14px !important;
          }
          .close-btn {
            top: -30px !important;
            width: 32px !important;
            height: 32px !important;
            font-size: 20px !important;
          }
        }

        /* Mobile (up to 767px) */
        @media (max-width: 767px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .project-card {
            margin-bottom: 10px !important;
          }
          .projects-section {
            padding: 60px 16px !important;
          }
          .projects-title {
            font-size: 28px !important;
            margin-bottom: 30px !important;
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
          .modal-content {
            max-width: 95vw !important;
            max-height: 80vh !important;
          }
          .close-btn {
            top: -35px !important;
            right: 5px !important;
            width: 32px !important;
            height: 32px !important;
            font-size: 18px !important;
          }
        }

        /* Small Mobile (up to 480px) */
        @media (max-width: 480px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
          .projects-section {
            padding: 50px 12px !important;
          }
          .projects-title {
            font-size: 24px !important;
            margin-bottom: 25px !important;
          }
          .project-image {
            height: 180px !important;
          }
          .video-thumbnail {
            height: 180px !important;
          }
          .project-label {
            padding: 10px !important;
            font-size: 12px !important;
          }
          .play-button {
            width: 50px !important;
            height: 50px !important;
            font-size: 22px !important;
          }
          .modal-overlay {
            padding: 10px !important;
          }
          .modal-content {
            max-width: 98vw !important;
            max-height: 75vh !important;
          }
          .close-btn {
            top: -28px !important;
            right: 0px !important;
            width: 28px !important;
            height: 28px !important;
            font-size: 16px !important;
          }
        }

        /* Touch devices */
        @media (hover: none) and (pointer: coarse) {
          .project-image:hover {
            transform: scale(1) !important;
          }
          .video-thumbnail:hover {
            transform: scale(1) !important;
          }
        }
      `}</style>
    </section>
  );
}
