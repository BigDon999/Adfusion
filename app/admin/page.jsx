"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    img: "",
    type: "image",
    videoUrl: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    if (editingId) {
      await fetch("/api/projects", {
        method: "PUT",
        body: JSON.stringify({ ...form, id: editingId }),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(form),
      });
    }
    setForm({ title: "", img: "", type: "image", videoUrl: "" });
    setEditingId(null);
    await fetchProjects();
  };

  const edit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      img: p.img,
      type: p.type || "image",
      videoUrl: p.videoUrl || "",
    });
  };

  const remove = async (id) => {
    if (!confirm("Delete project?")) return;
    await fetch("/api/projects?id=" + id, { method: "DELETE" });
    await fetchProjects();
  };

  return (
    <section
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        padding: "60px 20px",
        color: "#e0e0e0",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "600",
          color: "#FFD700",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Admin - Projects
      </h1>

      {/* === Form Section (unchanged) === */}
      <form
        onSubmit={save}
        style={{
          marginBottom: "30px",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          backgroundColor: "#1e1e1e",
          padding: "16px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(255, 215, 0, 0.2)",
        }}
      >
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          style={inputStyle}
        />
        <input
          placeholder="Image URL"
          value={form.img}
          onChange={(e) => setForm((f) => ({ ...f, img: e.target.value }))}
          style={inputStyle}
        />
        {/* File upload */}
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            // sanitize filename and create a unique name
            const filename = `${Date.now()}_${file.name.replace(
              /[^a-zA-Z0-9.\-_]/g,
              ""
            )}`;

            // Try presign + PUT (preferred for Vercel + S3)
            try {
              const presignRes = await fetch("/api/upload/presign", {
                method: "POST",
                body: JSON.stringify({ filename, contentType: file.type }),
              });
              if (presignRes.ok) {
                const { url, publicUrl } = await presignRes.json();
                // PUT the file bytes to S3
                const putRes = await fetch(url, {
                  method: "PUT",
                  headers: { "Content-Type": file.type },
                  body: file,
                });
                if (!putRes.ok) throw new Error("PUT to S3 failed");
                setForm((f) => ({ ...f, img: publicUrl }));
                return;
              }
            } catch (err) {
              console.warn(
                "Presign+PUT failed, falling back to server upload",
                err
              );
            }

            // Fallback: read as base64 and POST to /api/upload (server will store locally or to S3)
            try {
              const reader = new FileReader();
              reader.onload = async () => {
                const base64 = (reader.result || "").toString();
                const match = base64.match(/^data:(.*);base64,(.*)$/);
                const b64 = match ? match[2] : base64;
                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: JSON.stringify({
                    filename,
                    data: b64,
                    contentType: file.type,
                  }),
                });
                if (res.ok) {
                  const json = await res.json();
                  setForm((f) => ({ ...f, img: json.url }));
                } else {
                  alert("Upload failed");
                }
              };
              reader.readAsDataURL(file);
            } catch (err) {
              console.error("Fallback upload failed", err);
              alert("Upload failed");
            }
          }}
          style={inputStyle}
        />
        <select
          value={form.type}
          onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
          style={inputStyle}
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <input
          placeholder="Video URL (optional)"
          value={form.videoUrl}
          onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))}
          style={inputStyle}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              ...buttonStyle,
              backgroundColor: "#FFD700",
              color: "#121212",
            }}
          >
            {editingId ? "Update" : "Add"} Project
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ title: "", img: "", type: "image", videoUrl: "" });
              }}
              style={{
                ...buttonStyle,
                backgroundColor: "transparent",
                border: "1px solid #FFD700",
                color: "#FFD700",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* === Table Section === */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading…</p>
      ) : (
        <div
          style={{
            overflowX: "auto",
            backgroundColor: "#1e1e1e",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(255, 215, 0, 0.15)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "700px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#2a2a2a", color: "#FFD700" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Video</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.id}
                  style={{
                    ...trStyle,
                    backgroundColor: "#1c1c1c",
                    borderBottom: "1px solid #333",
                  }}
                >
                  <td style={tdStyle}>{p.id}</td>
                  <td style={tdStyle}>{p.title}</td>
                  <td style={tdStyle}>{p.type}</td>
                  <td style={{ ...tdStyle, wordBreak: "break-word" }}>
                    {p.img}
                  </td>
                  <td style={{ ...tdStyle, wordBreak: "break-word" }}>
                    {p.videoUrl || ""}
                  </td>
                  <td style={tdStyle}>
                    <div className="action-buttons">
                      <button
                        onClick={() => edit(p)}
                        style={{
                          ...buttonStyle,
                          backgroundColor: "#FFD700",
                          color: "#121212",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(p.id)}
                        style={{
                          ...buttonStyle,
                          backgroundColor: "transparent",
                          border: "1px solid #FFD700",
                          color: "#FFD700",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* === MEDIA QUERIES (for Table only) === */}
      <style>{`
        @media (max-width: 1024px) {
          table {
            font-size: 14px;
          }
        }

        @media (max-width: 768px) {
          table {
            font-size: 13px;
            min-width: 600px;
          }

          .action-buttons {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .action-buttons button {
            font-size: 12px;
            padding: 8px;
          }
        }

        @media (max-width: 480px) {
          table {
            min-width: 500px;
            font-size: 12px;
          }

          th, td {
            padding: 8px;
          }

          .action-buttons {
            flex-direction: column;
          }

          .action-buttons button {
            width: 100%;
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}

const inputStyle = {
  flex: "1 1 220px",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #FFD700",
  backgroundColor: "#2a2a2a",
  color: "#fff",
  outline: "none",
};

const buttonStyle = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "all 0.3s ease",
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "600",
  borderBottom: "2px solid #FFD700",
};

const tdStyle = {
  padding: "12px",
  verticalAlign: "middle",
};

const trStyle = {
  transition: "background 0.3s",
};
