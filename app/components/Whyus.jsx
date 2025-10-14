"use client";

export default function WhyUs() {
  return (
    <section
     id="whyus"
      style={{
        background: "black",
        color: "white",
        padding: "10px 20px",
        textAlign: "center",
      }}
    >
      {/* HEADER */}
      <div style={{ maxWidth: "800px", margin: "0 auto 60px auto" }}>
        <h2 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "20px" }}>
          Why <span style={{ color: "#FFD700" }}>Choose Us</span>
        </h2>
        <p style={{ fontSize: "20px", color: "#ccc", lineHeight: "1.6" }}>
          We merge storytelling, AI, and design to create impactful, cost-effective, and
          futuristic brand content that truly stands out.
        </p>
      </div>

      {/* FEATURES GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "50px",
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        {/* Feature 1 */}
        <div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#FFD700",
              marginBottom: "10px",
            }}
          >
            01
          </div>
          <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "10px" }}>
            AI-Powered Creativity
          </h3>
          <p style={{ fontSize: "18px", color: "#aaa", lineHeight: "1.5" }}>
            Smarter content generation that saves cost and time.
          </p>
        </div>

        {/* Feature 2 */}
        <div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#FFD700",
              marginBottom: "10px",
            }}
          >
            02
          </div>
          <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "10px" }}>
            Realistic AI Imagery
          </h3>
          <p style={{ fontSize: "18px", color: "#aaa", lineHeight: "1.5" }}>
            Ultra-real visuals without the heavy production costs.
          </p>
        </div>

        {/* Feature 3 */}
        <div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#FFD700",
              marginBottom: "10px",
            }}
          >
            03
          </div>
          <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "10px" }}>
            Storytelling First
          </h3>
          <p style={{ fontSize: "18px", color: "#aaa", lineHeight: "1.5" }}>
            Every ad is more than a design — it’s your story.
          </p>
        </div>

        {/* Feature 4 */}
        <div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#FFD700",
              marginBottom: "10px",
            }}
          >
            04
          </div>
          <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "10px" }}>
            Future-Ready
          </h3>
          <p style={{ fontSize: "18px", color: "#aaa", lineHeight: "1.5" }}>
            Stay ahead with innovative AI tools built for tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
}
