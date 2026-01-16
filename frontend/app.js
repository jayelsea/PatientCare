// Cambia SOLO esto si tu backend usa otro puerto:
const API_BASE = "http://localhost:8000"; // ejemplo FastAPI
// const API_BASE = "http://localhost:3000"; // ejemplo Express

const form = document.getElementById("pacienteForm");
const tbody = document.getElementById("tbodyPacientes");
const msg = document.getElementById("msg");
const btnRefresh = document.getElementById("btnRefresh");
const btnLimpiar = document.getElementById("btnLimpiar");

function setMessage(text, type) {
  msg.textContent = text || "";
  msg.className = "msg " + (type || "");
  if (text) setTimeout(() => { msg.textContent = ""; msg.className = "msg"; }, 3500);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatFecha(fecha) {
  if (!fecha) return "";
  // si viene como ISO string, lo dejamos legible
  try {
    const d = new Date(fecha);
    if (!isNaN(d.getTime())) return d.toLocaleString();
  } catch {}
  return String(fecha);
}

async function listarPacientes() {
  tbody.innerHTML = `<tr><td colspan="8">Cargando...</td></tr>`;
  try {
    const res = await fetch(`${API_BASE}/pacientes`);
    if (!res.ok) throw new Error(`GET /pacientes -> ${res.status}`);

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8">No hay pacientes registrados.</td></tr>`;
      return;
    }

    tbody.innerHTML = data.map((p) => `
      <tr>
        <td>${escapeHtml(p.id)}</td>
        <td>${escapeHtml(p.cedula)}</td>
        <td>${escapeHtml(p.nombre)}</td>
        <td>${escapeHtml(p.apellido)}</td>
        <td>${escapeHtml(p.edad)}</td>
        <td>${escapeHtml(p.telefono)}</td>
        <td>${escapeHtml(p.correo)}</td>
        <td>${escapeHtml(formatFecha(p.fecha_registro))}</td>
      </tr>
    `).join("");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="8">Error cargando pacientes.</td></tr>`;
    setMessage(`Error: ${e.message || e}`, "error");
  }
}

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const fd = new FormData(form);

  const payload = {
    cedula: String(fd.get("cedula") || "").trim(),
    nombre: String(fd.get("nombre") || "").trim(),
    apellido: String(fd.get("apellido") || "").trim(),
    edad: Number(fd.get("edad")),
    telefono: String(fd.get("telefono") || "").trim(),
    correo: String(fd.get("correo") || "").trim(),
    // fecha_registro normalmente la pone el backend/DB
  };

  // Validaciones rápidas
  if (!payload.cedula || !payload.nombre || !payload.apellido || !payload.telefono || !payload.correo) {
    setMessage("Completa todos los campos.", "error");
    return;
  }
  if (Number.isNaN(payload.edad)) {
    setMessage("Edad inválida.", "error");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/pacientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`POST /pacientes -> ${res.status} ${body}`);
    }

    setMessage("Paciente registrado ✅", "ok");
    form.reset();
    await listarPacientes();
  } catch (e) {
    setMessage(`Error: ${e.message || e}`, "error");
  }
});

btnRefresh.addEventListener("click", listarPacientes);
btnLimpiar.addEventListener("click", () => form.reset());

// Primera carga
listarPacientes();
