import React from "react";

const About = () => {
  return (
    <section
      id="about"
      style={{
        width: "100%",
        minHeight: "20vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "white",
        padding: "80px 20px",
        overflow: "hidden",
      }}
    >
      <div id="whyus"></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1400px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT TEXT */}
        <div
          style={{
            flex: "1 1 500px",
            padding: "30px",
            textAlign: "left",
          }}
        >
          <h2
            style={{
              fontSize: "3.5rem",
              marginBottom: "30px",
              color: "#FFD700",
            }}
          >
            About Us
          </h2>
          <p
            style={{
              fontSize: "1.5rem",
              lineHeight: "1.8",
              color: "#f0f0f0",
              maxWidth: "600px",
            }}
          >
            We are an AI-powered brand storytelling agency that helps businesses
            reduce costs while amplifying creativity. From cinematic brand
            stories to eye-catching ad visuals, our technology allows you to
            create premium content faster, smarter, and more affordably.
          </p>
        </div>

        {/* RIGHT IMAGES CAROUSEL */}
        <div
          style={{
            flex: "1 1 700px",
            position: "relative",
            overflow: "hidden",
            padding: "30px",
          }}
        >
          {/* SCROLLING IMAGES */}
          <div
            style={{
              display: "flex",
              gap: "30px",
              animation: "scroll 18s linear infinite",
              width: "max-content",
            }}
          >
            <img
              src="/assets/AI1.jpg"
              alt="AI Work"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
            <img
              src="/assets/AI2.jpg"
              alt="AI Work"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
            <img
              src="/assets/AI3.jpg"
              alt="AI Work"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
            <img
              src="/assets/AI2.jpg"
              alt="AI Work"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
            {/* duplicate for smooth loop */}
            <img
              src="/assets/AI1.jpg"
              alt="AI Work"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
            <img
              src="/assets/AI2.jpg"
              alt="AI Work"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* BLACK FADE EDGES */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100px",
              height: "100%",
              background: "linear-gradient(to right, #000 85%, transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100px",
              height: "100%",
              background: "linear-gradient(to left, #000 85%, transparent)",
            }}
          />
        </div>
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @media (max-width: 768px) {
            section div {
              text-align: center !important;
            }
            section h2 {
              font-size: 2.5rem !important;
            }
            section p {
              font-size: 1.2rem !important;
            }
            section img {
              width: 200px !important;
              height: 200px !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default About;
