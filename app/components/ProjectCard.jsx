import React from "react";

export default function ProjectCard({ project, onClick }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease",
      }}
      className="project-card"
      onClick={onClick}
    >
      {/* Image or Video Thumbnail */}
      {project.type === "image" ? (
        <img
          src={project.img}
          alt={project.title}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          className="project-image"
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "250px",
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
          }}
          className="video-thumbnail"
        >
          <img
            src={project.img}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease, filter 0.3s ease",
            }}
            className="video-background"
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.filter = "brightness(0.6)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.filter = "brightness(1)";
            }}
          />
          {/* Play Button */}
          <button
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#FFD700",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              fontSize: "28px",
              color: "#000",
              zIndex: 10,
            }}
            className="play-button"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.videoUrl, "_blank");
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform =
                "translate(-50%, -50%) scale(1.1)";
              e.currentTarget.style.background = "#FFB400";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform =
                "translate(-50%, -50%) scale(1)";
              e.currentTarget.style.background = "#FFD700";
            }}
          >
            ▶
          </button>
        </div>
      )}
      {/* Title Label */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          padding: "15px",
          background: "rgba(0, 0, 0, 0.6)",
          color: "#FFD700",
          fontWeight: "bold",
        }}
        className="project-label"
      >
        {project.title}
      </div>
    </div>
  );
}
