"use client";
export default function ProjectCard({ project, onClick }) {
  const isVideo = project.type === "video";
  return (
    <div
      className="project-card"
      onClick={onClick}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        cursor: isVideo ? "pointer" : "pointer",
        border: "1px solid #222",
        transition: "transform 0.3s ease",
        backgroundColor: "#111",
      }}
    >
      {isVideo ? (
        <>
          <img
            src={project.img}
            alt={project.title}
            className="video-thumbnail"
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              borderRadius: "12px",
              transition: "all 0.3s ease",
              filter: "brightness(0.7)",
            }}
          />
          <span
            className="play-icon"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#FFD700",
              fontSize: "48px",
              background: "rgba(0,0,0,0.5)",
              borderRadius: "50%",
              width: "64px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            ▶
          </span>
        </>
      ) : (
        <img
          src={project.img}
          alt={project.title}
          className="project-image"
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            borderRadius: "12px",
            transition: "all 0.3s ease",
          }}
        />
      )}

      <div
        className="project-label"
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          background: "rgba(0, 0, 0, 0.7)",
          padding: "15px",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {project.title}
      </div>

      <style>{`
        .play-icon {
          font-family: Arial, sans-serif;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        /* Tablet (up to 1199px) */
        @media (max-width: 1199px) {
          .project-image, .video-thumbnail {
            height: 220px !important;
          }
        }

        /* Mobile (up to 767px) */
        @media (max-width: 767px) {
          .project-image, .video-thumbnail {
            height: 280px !important;
            width: 100% !important;
            border-radius: 12px !important;
            object-fit: cover !important;
          }
          .project-card {
            width: 100% !important;
            margin: 0 auto !important;
          }
          .play-icon {
            font-size: 36px !important;
            width: 48px !important;
            height: 48px !important;
          }
        }

        /* Small Mobile (up to 480px) */
        @media (max-width: 480px) {
          .project-image, .video-thumbnail {
            height: 200px !important;
            border-radius: 16px !important;
          }
          .play-icon {
            font-size: 28px !important;
            width: 36px !important;
            height: 36px !important;
          }
        }
      `}</style>
    </div>
  );
}
