/* Cat Productivity — premium redesign engine.
   Professional interface. Goofy cat.
   Preserves: PDF page picker, sessions, workspace, distractions. */
const TIMING = { first: [8000, 8000], gap: [8000, 8000], gapCalm: [12000, 12000], gapIntense: [5000, 5000] };
const POOL = [
  ["feed", 16], ["pet", 15], ["yarn", 13], ["find", 10], ["clean", 9], ["boxes", 7],
  ["nap", 12], ["zoom", 9], ["boss", 7], ["chaos", 2],
];
const RANKS = [
  { n: "Distraction Intern", at: 0 },
  { n: "Attention Coordinator", at: 3 },
  { n: "Productivity Prevention Manager", at: 7 },
  { n: "Director of Human Interruption", at: 12 },
  { n: "Chief Distraction Officer", at: 18 },
  { n: "CEO", at: 26 },
];

const LS = { get: (k, f) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch (e) { return f; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const todayStr = () => new Date().toISOString().slice(0, 10);
const reducedMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= MILO — premium editorial mascot ================= */
function miloSVG(size, opts = {}) {
  const tie = opts.tie ? `<rect x="98" y="128" width="14" height="34" rx="4" fill="#8e2f32"/><polygon points="105,162 96,172 105,184 114,172" fill="#8e2f32"/>` : "";
  const badge = opts.badge ? `<circle cx="132" cy="140" r="9" fill="#A89A76" stroke="#20211E" stroke-width="2"/><text x="132" y="144" text-anchor="middle" font-size="9" font-weight="800" fill="#fff">M</text>` : "";
  const acc = { "🎩": `<rect x="72" y="8" width="66" height="26" rx="4" fill="#20211E"/><rect x="62" y="30" width="86" height="10" rx="5" fill="#20211E"/>`, "👓": `<circle cx="88" cy="92" r="14" fill="none" stroke="#20211E" stroke-width="3"/><circle cx="132" cy="92" r="14" fill="none" stroke="#20211E" stroke-width="3"/><line x1="102" y1="92" x2="118" y2="92" stroke="#20211E" stroke-width="3"/>`, "🎀": `<polygon points="70,40 52,30 54,50" fill="#C98A94"/><polygon points="70,40 88,30 86,50" fill="#C98A94"/><circle cx="70" cy="40" r="7" fill="#A86A74"/>`, "👑": `<polygon points="75,28 85,10 95,26 105,8 115,26 125,10 135,28 135,40 75,40" fill="#D9B45C" stroke="#806C56" stroke-width="2"/>` }[opts.acc] || "";
  return `<div class="milo-wrap ${size || ""} ${opts.state || ""}" id="${opts.id || "miloMain"}">
    <svg viewBox="0 0 210 190" role="img" aria-label="Milo the cat">
      <path class="m-tail" d="M38 150 Q 8 150 12 118 Q 14 100 30 104 Q 40 108 36 124 Q 33 140 48 142 Z" fill="#E8A34F" stroke="#20211E" stroke-width="4" stroke-linejoin="round"/>
      <ellipse cx="105" cy="160" rx="52" ry="24" fill="#F2B45C" stroke="#20211E" stroke-width="4"/>
      <ellipse cx="78" cy="168" rx="12" ry="8" fill="#F7DCB4" stroke="#20211E" stroke-width="3"/>
      <ellipse cx="132" cy="168" rx="12" ry="8" fill="#F7DCB4" stroke="#20211E" stroke-width="3"/>
      <ellipse cx="105" cy="158" rx="20" ry="12" fill="#F7DCB4"/>
      <polygon class="m-ear-l" points="62,58 52,18 92,40" fill="#F2B45C" stroke="#20211E" stroke-width="4" stroke-linejoin="round"/>
      <polygon class="m-ear-r" points="148,58 158,18 118,40" fill="#F2B45C" stroke="#20211E" stroke-width="4" stroke-linejoin="round"/>
      <polygon points="64,50 59,28 80,40" fill="#E5A3A3"/>
      <polygon points="146,50 151,28 130,40" fill="#E5A3A3"/>
      <circle cx="105" cy="100" r="52" fill="#F7C87E" stroke="#20211E" stroke-width="4"/>
      <g class="m-eye-open">
        <ellipse cx="86" cy="94" rx="13" ry="15" fill="#fff" stroke="#20211E" stroke-width="3"/>
        <ellipse cx="124" cy="94" rx="13" ry="15" fill="#fff" stroke="#20211E" stroke-width="3"/>
        <g class="m-pupil"><ellipse cx="86" cy="96" rx="5.5" ry="8" fill="#20211E"/><circle cx="88" cy="93" r="2" fill="#fff"/><ellipse cx="124" cy="96" rx="5.5" ry="8" fill="#20211E"/><circle cx="126" cy="93" r="2" fill="#fff"/></g>
      </g>
      <g class="m-eye-shut" stroke="#20211E" stroke-width="4" stroke-linecap="round"><path d="M74 94 Q86 102 98 94"/><path d="M112 94 Q124 102 136 94"/></g>
      <path d="M100 108 L110 108 L105 114 Z" fill="#C98A94" stroke="#20211E" stroke-width="2.5" stroke-linejoin="round"/>
      <path class="m-mouth-base" d="M105 114 Q105 120 98 121 M105 114 Q105 120 112 121" fill="none" stroke="#20211E" stroke-width="2.5" stroke-linecap="round"/>
      <path class="m-mouth-happy" d="M94 116 Q105 128 116 116" fill="none" stroke="#20211E" stroke-width="3" stroke-linecap="round"/>
      <g stroke="#E8A34F" stroke-width="2.5" stroke-linecap="round"><line x1="60" y1="104" x2="44" y2="100"/><line x1="60" y1="110" x2="45" y2="112"/><line x1="150" y1="104" x2="166" y2="100"/><line x1="150" y1="110" x2="165" y2="112"/></g>
      <g fill="#E8A34F" stroke="#20211E" stroke-width="2"><ellipse cx="70" cy="70" rx="7" ry="5" transform="rotate(-20 70 70)"/><ellipse cx="140" cy="70" rx="7" ry="5" transform="rotate(20 140 70)"/></g>
      ${tie}${badge}${acc}
    </svg></div>`;
}
document.addEventListener("pointermove", (e) => {
  if (reducedMotion()) return;
  document.querySelectorAll(".milo-wrap").forEach(w => {
    const r = w.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width, dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    w.querySelectorAll(".m-pupil").forEach(p => p.style.transform = `translate(${Math.max(-6, Math.min(6, dx * 10))}px,${Math.max(-5, Math.min(5, dy * 8))}px)`);
  });
});

/* ================= state ================= */
let sessions = LS.get("cp_sessions_v3", []).filter(s => s.id !== "s1" && s.id !== "s2");
let records = LS.get("cp_records_v3", []);
let cat = LS.get("cp_cat_v3", { name: "Milo", acc: "" });
let settings = LS.get("cp_settings_v3", { intensity: "normal", defaultMode: "cat" });
let liveFiles = {}, pendingUpload = null;
function persist() { LS.set("cp_sessions_v3", sessions); LS.set("cp_records_v3", records); }
function dtOf(s) { return new Date(s.date + "T" + s.time + ":00"); }
function miloRank() {
  const total = records.length;
  let r = RANKS[0];
  RANKS.forEach(x => { if (total >= x.at) r = x; });
  return { ...r, sessions: total };
}

/* ================= PDF page picker (unchanged logic) ================= */
if (window.pdfjsLib) { pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"; }
let pdfDoc = null, pdfTotalPages = 0, pdfFileName = "", pdfBytes = null, pdfSelectedPages = [];

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToUint8Array(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function parsePageSelection(raw, total) {
  const input = String(raw || "").trim();
  if (!input) return { ok: false, error: "Enter at least one page number." };
  if (!total || total < 1) return { ok: false, error: "Upload a PDF first." };
  const pages = new Set();
  const parts = input.split(",").map(p => p.trim()).filter(Boolean);
  if (!parts.length) return { ok: false, error: "Enter at least one page number." };
  for (const part of parts) {
    const m = part.match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!m) return { ok: false, error: `Invalid entry: "${part}". Use e.g. 5, 5-10, 2, 5, 8.` };
    let a = parseInt(m[1], 10), b = m[2] ? parseInt(m[2], 10) : a;
    if (a < 1 || b < 1) return { ok: false, error: `Page numbers must start at 1 (got "${part}").` };
    if (b < a) return { ok: false, error: `Invalid range "${part}": end page is before start page.` };
    if (a > total || b > total) return { ok: false, error: `"${part}" is outside this PDF (1–${total}).` };
    for (let p = a; p <= b; p++) pages.add(p);
  }
  return { ok: true, pages: [...pages].sort((x, y) => x - y) };
}
function pdfMsg(text, kind) { const el = $("pdfPickMsg"); if (!el) return; el.textContent = text || ""; el.className = "muted" + (kind ? " " + kind : ""); }
function syncRangeFromBoxes() {
  const s = parseInt($("pdfStart")?.value, 10), e = parseInt($("pdfEnd")?.value, 10);
  if (Number.isFinite(s) && Number.isFinite(e) && $("pdfRange")) $("pdfRange").value = (s === e) ? String(s) : `${s}-${e}`;
}
function syncRangeIfNeeded() { if (!$("pdfRange")?.value.trim() && $("pdfStart")?.value && $("pdfEnd")?.value) syncRangeFromBoxes(); }

function updateSelectedPagesFromInputs() {
  if (!pdfDoc) return;
  syncRangeIfNeeded();
  const res = parsePageSelection($("pdfRange").value, pdfTotalPages);
  if (res.ok && res.pages.length) {
    pdfSelectedPages = res.pages;
    pendingUpload = { kind: "pdf", name: pdfFileName, bytes: pdfBytes, pages: [...pdfSelectedPages] };
    pdfMsg(`Selected ${pdfSelectedPages.length} page(s): ${pdfSelectedPages.join(", ")}`, "ok");
    renderPdfPreview();
  }
}

function openSelectedPages() {
  if (!pdfDoc) { pdfMsg("Upload a PDF first.", "err"); return; }
  updateSelectedPagesFromInputs();
  toast(`Pages ${pdfSelectedPages.join(", ")} ready — schedule the session to open them.`);
}
function clearPdfPicker(silent) {
  pdfDoc = null; pdfTotalPages = 0; pdfFileName = ""; pdfBytes = null; pdfSelectedPages = [];
  if ($("pdfPicker")) $("pdfPicker").classList.add("hidden");
  if ($("pdfPreview")) $("pdfPreview").innerHTML = "";
  if ($("pdfRange")) $("pdfRange").value = "";
  if (!silent) { pendingUpload = null; if ($("cFile")) $("cFile").value = ""; if ($("fileInfo")) $("fileInfo").textContent = ""; pdfMsg("", ""); }
}
async function handlePdfFile(file) {
  pdfMsg("Reading PDF…", "");
  try {
    const buf = await file.arrayBuffer();
    pdfBytes = buf.slice(0);
    pdfDoc = await pdfjsLib.getDocument({ data: buf.slice(0) }).promise;
    pdfTotalPages = pdfDoc.numPages;
    pdfFileName = file.name || "notes.pdf";
    $("pdfPicker").classList.remove("hidden");
    $("pdfFileName").textContent = "Uploaded File: " + pdfFileName;
    $("pdfTotalPages").textContent = `${pdfTotalPages} page(s) total. Pick pages between 1 and ${pdfTotalPages}.`;
    $("pdfStart").max = pdfTotalPages; $("pdfEnd").max = pdfTotalPages;
    $("pdfStart").value = 1;
    $("pdfEnd").value = Math.min(10, pdfTotalPages);
    syncRangeFromBoxes();

    const res = parsePageSelection($("pdfRange").value, pdfTotalPages);
    pdfSelectedPages = res.ok ? res.pages : Array.from({ length: Math.min(10, pdfTotalPages) }, (_, i) => i + 1);
    pendingUpload = { kind: "pdf", name: pdfFileName, bytes: pdfBytes, pages: [...pdfSelectedPages] };
    pdfMsg(`Selected ${pdfSelectedPages.length} page(s): ${pdfSelectedPages.join(", ")}`, "ok");
    renderPdfPreview();
  } catch (err) { console.error(err); pdfMsg("Could not read that PDF. Try another file.", "err"); }
}
async function renderPdfPreview() {
  const box = $("pdfPreview"); box.innerHTML = "";
  if (!pdfDoc || !pdfSelectedPages.length) return;
  box.innerHTML = `<p class="muted">Preview — only selected pages:</p>`;
  for (const n of pdfSelectedPages) {
    const label = document.createElement("div");
    label.className = "pdf-page-label"; label.textContent = `Page ${n}`;
    const canvas = document.createElement("canvas");
    box.appendChild(label); box.appendChild(canvas);
    try {
      const page = await pdfDoc.getPage(n);
      const viewport = page.getViewport({ scale: 1.4 });
      canvas.width = viewport.width; canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    } catch (e) { label.textContent += " (failed to render)"; }
  }
}
async function renderSelectedPagesInto(container, bytesOrDoc, pages, name) {
  try {
    let doc = null;
    if (bytesOrDoc && typeof bytesOrDoc.getPage === "function") {
      doc = bytesOrDoc;
    } else if (pdfDoc) {
      doc = pdfDoc;
    } else if (bytesOrDoc) {
      const data = bytesOrDoc instanceof Uint8Array ? bytesOrDoc : (bytesOrDoc.slice ? bytesOrDoc.slice(0) : bytesOrDoc);
      doc = await pdfjsLib.getDocument({ data }).promise;
    }

    if (!doc) {
      container.innerHTML = `<p class="muted">Could not load PDF pages.</p>`;
      return;
    }

    const total = doc.numPages;
    const pList = (pages && pages.length) ? pages : Array.from({ length: total }, (_, i) => i + 1);
    const valid = [...new Set(pList)].filter(p => Number.isInteger(p) && p >= 1 && p <= total).sort((a, b) => a - b);
    if (!valid.length) { container.innerHTML = `<p class="muted">No valid pages selected (PDF has ${total} pages).</p>`; return; }

    container.innerHTML = `<p class="muted" style="margin-bottom:10px">${esc(name || "PDF")} — showing ${valid.length} of ${total} pages: ${valid.join(", ")}</p>`;
    for (const n of valid) {
      const label = document.createElement("div");
      label.className = "pdf-page-label"; label.textContent = `Page ${n}`;
      const canvas = document.createElement("canvas");
      canvas.className = "pdf-page-canvas";
      container.appendChild(label); container.appendChild(canvas);
      const page = await doc.getPage(n);
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.width = viewport.width; canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    }
  } catch (e) { console.error(e); container.innerHTML = `<p class="muted">Could not render selected pages.</p>`; }
}

/* ================= nav + dashboard ================= */
function nav(view) {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.view === view));
  ["overview", "workspace", "reminders", "sessions", "cat", "settingsEl", "report"].forEach(v => { const el = $("view-" + v); if (el) el.classList.toggle("hidden", v !== view); });
  document.getElementById("appShell").classList.toggle("focus", view === "workspace");
  if (view === "overview") renderOverview();
  if (view === "reminders") { if (!$("cDate").value) $("cDate").value = todayStr(); }
  if (view === "sessions") renderSessions();
  if (view === "cat") renderCatView();
  window.scrollTo(0, 0);
}
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning, Zozo.";
  if (h < 17) return "Good afternoon, Zozo.";
  return "Good evening, Zozo.";
}
function renderOverview() {
  $("ovGreet").textContent = greeting();
  $("ovDay").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const up = sessions.filter(s => s.status === "upcoming").sort((a, b) => dtOf(a) - dtOf(b));
  const next = up[0];
  $("ovNext").innerHTML = next
    ? `<div class="eyebrow">Up next</div><h2>${esc(next.task)}</h2><p class="muted">${esc(next.desc || "")}</p><p class="muted">Today · ${esc(next.time)} · ${next.dur} min</p><div class="row" style="margin-top:12px"><button class="btn small" onclick="beginSession('${next.id}')">Start Session</button></div>`
    : `<div class="eyebrow">Up next</div><h2>Nothing scheduled.</h2><p class="muted">Milo strongly supports this decision.</p><div class="row" style="margin-top:12px"><button class="btn small" onclick="nav('reminders')">Schedule Session</button></div>`;
  $("quietMilo").innerHTML = miloSVG("small", { acc: cat.acc }) + `<div class="tail-hang">～</div>`;
  $("quietMilo").onclick = () => toast(["Supervising.", "Watching.", "Not asleep. Monitoring.", "Carry on."][Math.floor(Math.random() * 4)]);
  const done = sessions.filter(s => s.status === "completed" && s.date === todayStr()).length;
  const todayList = sessions.filter(s => s.date === todayStr()).sort((a, b) => dtOf(a) - dtOf(b));
  $("ovStats").innerHTML = `<div class="metric">${todayList.length}</div><p class="muted">Sessions today · ${done} completed</p>`;
  $("ovUp").innerHTML = todayList.length ? todayList.map(s => {
    const st = s.status === "completed" ? `<span class="pill done">Completed</span>` : (next && s.id === next.id ? `<span class="pill next">Up next</span>` : `<span class="pill">Scheduled</span>`);
    return `<div class="tl-row"><div class="tl-time">${esc(s.time)}</div><div class="tl-task">${esc(s.task)}<small>${esc(s.desc || "")} · ${s.dur} min</small></div><div>${st}</div></div>`;
  }).join("") : `<div class="empty-state"><p class="muted">Nothing scheduled.<br/>Milo strongly supports this decision.</p><div class="row" style="justify-content:center;margin-top:10px"><button class="btn small" onclick="nav('reminders')">Schedule Session</button></div></div>`;
  const words = ["Suspicious", "Watching", "Judging quietly", "Extremely nearby", "On duty"];
  $("miloStatusWord").textContent = words[Math.floor(Math.random() * words.length)];
  $("miloStatusSub").textContent = ["Watching.", "Close enough to intervene.", "Morale: adequate.", "Blink rate: normal."][Math.floor(Math.random() * 4)];
  $("profileInit").textContent = (cat.name || "M")[0].toUpperCase();
  $("profileName").textContent = cat.name || "Milo";
  const r = miloRank();
  $("navRank").textContent = r.n;
  maybeSidebarPeek();
}
function maybeSidebarPeek() {
  if (reducedMotion() || Math.random() > 0.55) return;
  const peek = $("sidebarPeek"), tail = $("sidebarTail");
  setTimeout(() => {
    peek.classList.add("show");
    setTimeout(() => peek.classList.remove("show"), 2600);
  }, 1200);
  if (Math.random() > 0.6) {
    setTimeout(() => { tail.classList.add("show"); setTimeout(() => tail.classList.remove("show"), 3000); }, 3000);
  }
}
function matTab(k) { ["upload", "paste", "write"].forEach(x => $("mat-" + x).classList.toggle("hidden", x !== k)); }
function handleImgFile(file) {
  const r = new FileReader();
  r.onload = () => {
    pendingUpload = { kind: "image", name: file.name, dataUrl: r.result };
    if ($("imgPicker")) $("imgPicker").classList.remove("hidden");
    if ($("imgPreview")) $("imgPreview").innerHTML = `<img src="${esc(r.result)}" alt="${esc(file.name)}" style="max-width:100%;max-height:180px;border-radius:10px;border:1px solid var(--border);" />`;
    toast("Image ready — schedule session to attach it.");
  };
  r.readAsDataURL(file);
}
function clearImgPicker() {
  if ($("imgPicker")) $("imgPicker").classList.add("hidden");
  if ($("imgPreview")) $("imgPreview").innerHTML = "";
  if (pendingUpload?.kind === "image") pendingUpload = null;
  if ($("cFile")) $("cFile").value = "";
  if ($("fileInfo")) $("fileInfo").textContent = "";
}
function saveSession() {
  const task = $("cTask").value.trim() || "Untitled Session";
  const id = "s" + Date.now();
  let material = { type: "text", text: $("cPaste").value || $("cWrite").value || "No material added yet." };
  if (pendingUpload?.kind === "pdf") {
    if (!(pendingUpload.pages || []).length) {
      syncRangeIfNeeded();
      const res = parsePageSelection($("pdfRange")?.value || "", pdfTotalPages || 1);
      pendingUpload.pages = (res.ok && res.pages.length) ? res.pages : Array.from({ length: pdfTotalPages || 1 }, (_, i) => i + 1);
    }
    material = { type: "pdf", name: pendingUpload.name, pages: [...pendingUpload.pages] };
    liveFiles[id] = { type: "pdf", bytes: pendingUpload.bytes, name: pendingUpload.name, pages: [...pendingUpload.pages] };
    try {
      if (pendingUpload.bytes) {
        const b64 = arrayBufferToBase64(pendingUpload.bytes);
        sessionStorage.setItem("cp_pdf_" + id, JSON.stringify({ b64, name: pendingUpload.name, pages: [...pendingUpload.pages] }));
      }
    } catch(e) {}
  } else if (pendingUpload?.kind === "image") {
    material = { type: "image", name: pendingUpload.name, dataUrl: pendingUpload.dataUrl };
    liveFiles[id] = { type: "image", dataUrl: pendingUpload.dataUrl, name: pendingUpload.name };
    try {
      sessionStorage.setItem("cp_img_" + id, JSON.stringify({ dataUrl: pendingUpload.dataUrl, name: pendingUpload.name }));
    } catch(e) {}
  } else if (pendingUpload?.kind === "text") {
    material = { type: "text", text: pendingUpload.text, name: pendingUpload.name };
    liveFiles[id] = { type: "text", text: pendingUpload.text, name: pendingUpload.name };
  }
  const storeMat = (material.type === "text" && material.text.length < 9000) ? material : (material.type === "image" ? { type: "image", name: material.name, dataUrl: material.dataUrl } : (material.type === "pdf" ? { type: "pdf", name: material.name, pages: material.pages } : { type: "text", text: "(Uploaded document)" }));
  const mode = $("cMode") ? $("cMode").value : (settings.defaultMode || "cat");
  sessions.push({ id, task, desc: $("cDesc").value.trim(), date: $("cDate").value || todayStr(), time: $("cTime").value || "19:00", dur: parseInt($("cDur").value) || 30, mode, status: "upcoming", material: storeMat, _live: material });
  persist(); pendingUpload = null; if ($("cFile")) $("cFile").value = ""; clearPdfPicker(true); clearImgPicker(); toast("Session scheduled. Milo has been informed.");
  nav("sessions");
}
function toast(m) { let t = $("toast"); if (!t) { t = document.createElement("div"); t.id = "toast"; document.body.appendChild(t); } t.textContent = m; t.style.display = "block"; clearTimeout(t._h); t._h = setTimeout(() => t.style.display = "none", 2600); }
function deleteSession(id) {
  if (confirm("Cancel and delete this session?")) {
    sessions = sessions.filter(s => s.id !== id);
    persist();
    renderSessions();
    if (S && S.id === id && S.active) finishSession();
    toast("Session deleted.");
  }
}
function renderSessions() {
  const up = [...sessions].sort((a, b) => dtOf(a) - dtOf(b));
  $("sessList").innerHTML = up.length ? up.map(s => `<div class="list-item"><div><b>${esc(s.task)}</b><br/><span class="muted">${esc(s.date)} ${esc(s.time)} · ${s.dur} min · ${esc(s.status)}${s._live?.type === "pdf" ? " · pages " + esc((s._live.pages || []).join(", ")) : ""}</span></div><div class="row" style="gap:6px"><button class="btn small" onclick="beginSession('${s.id}')">Open</button><button class="btn small ghost danger" onclick="deleteSession('${s.id}')">Delete</button></div></div>`).join("") : `<div class="empty-state">${miloSVG("small", { state: "sleeping", acc: cat.acc })}<p class="muted">Nothing scheduled.<br/>Milo strongly supports this decision.</p></div>`;
  $("histList").innerHTML = [...records].reverse().length ? [...records].reverse().map(h => `<div class="list-item"><div><b>${esc(h.task)}</b><br/><span class="muted">${h.dur} min · ${h.interruptions} interruptions · ${esc(h.date || "")}</span></div><button class="btn small ghost" onclick="viewHistorySession('${h.id}')">View</button></div>`).join("") : `<div class="empty-state"><p class="muted" style="font-size:2rem">📦</p><p class="muted">Nothing here yet.<br/>Suspicious.</p></div>`;
}
async function viewHistorySession(id) {
  const h = records.find(x => x.id === id);
  if (!h) return;
  $("histTaskTitle").textContent = h.task;
  $("histTaskMeta").textContent = `${h.date || ""} at ${h.time || ""} · ${h.dur} min · ${h.interruptions} total interruptions`;
  const st = h.stats || {};
  $("histStatsGrid").innerHTML = [
    ["Total Interruptions", h.interruptions || 0],
    ["Attention Requests", st.pet || 0],
    ["Feedings", st.feed || 0],
    ["Recreation", st.yarn || 0],
    ["Recoveries", st.find || 0],
    ["Cleanups", st.clean || 0]
  ].map(([k, v]) => `<div class="card" style="padding:14px;text-align:center"><div class="eyebrow">${k}</div><div class="metric" style="font-size:1.4rem;margin-top:2px">${v}</div></div>`).join("");
  const mBox = $("histMaterialBody");
  mBox.innerHTML = "";
  let lf = liveFiles[h.sessionId || h.id];
  if (!lf && h.material?.type === "pdf") {
    try {
      const sData = sessionStorage.getItem("cp_pdf_" + (h.sessionId || h.id));
      if (sData) {
        const parsed = JSON.parse(sData);
        lf = { type: "pdf", bytes: base64ToUint8Array(parsed.b64), name: parsed.name, pages: parsed.pages };
        liveFiles[h.sessionId || h.id] = lf;
      }
    } catch(e) {}
  }
  const mat = lf || h.material || { type: "text", text: h.materialText || "No material text recorded." };
  if (mat.type === "image" || mat.dataUrl) {
    mBox.innerHTML = `<div style="text-align:center"><img src="${esc(mat.dataUrl)}" alt="${esc(mat.name || "Image")}" style="max-width:100%;height:auto;border-radius:10px;border:1px solid var(--border);" /><p class="muted" style="margin-top:6px">${esc(mat.name || "")}</p></div>`;
  } else if (mat.type === "pdf" && lf && lf.bytes) {
    renderSelectedPagesInto(mBox, lf.bytes, mat.pages || lf.pages, mat.name || lf.name);
  } else if (mat.type === "pdf" && mat.bytes) {
    renderSelectedPagesInto(mBox, mat.bytes, mat.pages, mat.name);
  } else if (mat.type === "pdf") {
    mBox.innerHTML = `<p class="muted">PDF file: <b>${esc(mat.name || "document.pdf")}</b> (Selected pages: ${(mat.pages || []).join(", ") || "all"}).</p>`;
  } else {
    const text = mat.text || h.materialText || "No material text recorded.";
    mBox.innerHTML = `<p style="white-space:pre-wrap;font-size:.93rem;color:var(--ink)">${esc(text)}</p>`;
  }
  const notes = h.notes || "";
  $("histNotesWrap").classList.toggle("hidden", !notes);
  $("histNotesText").textContent = notes;
  $("histModal").classList.remove("hidden");
}
function closeHistoryModal() {
  $("histModal").classList.add("hidden");
}
function renderCatView() {
  const r = miloRank();
  $("catBig").innerHTML = miloSVG("", { acc: cat.acc, badge: r.at >= 7 });
  $("catName").value = cat.name || "Milo";
  $("rankPill").textContent = r.n;
  const next = RANKS.find(x => x.at > r.sessions);
  $("rankSub").textContent = next ? `${r.sessions} session(s) supervised · ${next.at - r.sessions} more to ${next.n}.` : `${r.sessions} sessions supervised · Maximum authority achieved.`;
  const pct = next ? Math.min(100, Math.round(r.sessions / next.at * 100)) : 100;
  $("rankBar").style.width = pct + "%";
  document.querySelectorAll("#accRow button").forEach(b => b.classList.toggle("sel", b.dataset.acc === cat.acc));
}
function saveCat() { cat.name = $("catName").value.trim() || "Milo"; LS.set("cp_cat_v3", cat); renderCatView(); renderOverview(); toast("Saved. " + cat.name + " is unimpressed."); }
function saveSettings() { settings.intensity = $("setIntensity").value; if ($("setDefaultMode")) settings.defaultMode = $("setDefaultMode").value; LS.set("cp_settings_v3", settings); toast("Settings saved."); }

/* session mode helpers */
function setSessionMode(mode) {
  const pill = $("wsMode");
  const bar = $("takeoverBar");
  if (!pill) return;
  if (mode === "cat") {
    pill.textContent = "Cat Mode 🐾";
    pill.classList.add("cat-mode");
    pill.title = "Cat Mode active! Click to switch to Focus Mode.";
    if (bar) {
      bar.textContent = "Cat Mode Active: Milo is supervising this session with maximum authority.";
      bar.classList.remove("hidden");
    }
  } else {
    pill.textContent = "Focus Mode";
    pill.classList.remove("cat-mode");
    pill.title = "Focus Mode active! Click to switch to Cat Mode.";
    if (bar && (!S || S.stats.total < 3)) {
      bar.classList.add("hidden");
    }
  }
}
function toggleWsMode() {
  if (!S) return;
  const isCat = $("wsMode").classList.contains("cat-mode");
  if (isCat) {
    setSessionMode("focus");
    toast("Switched to Focus Mode.");
  } else {
    setSessionMode("cat");
    toast("Cat Mode enabled! Milo has taken over.");
  }
}
function triggerDistractionManually() {
  if (!S || !S.active) {
    toast("No active session.");
    return;
  }
  if (S.paused) {
    S.paused = false;
    if ($("pauseBtn")) $("pauseBtn").textContent = "Pause";
  }
  if (document.getElementById("catOverlay") || document.querySelector(".scene")) {
    toast("A distraction is already active!");
    return;
  }
  isDistractionActive = false;
  fire();
  toast("Milo summoned!");
}

/* reminder */
let reminded = new Set();
setInterval(() => { const now = new Date(); sessions.forEach(s => { if (s.status !== "upcoming" || reminded.has(s.id)) return; const d = now - dtOf(s); if (d >= 0 && d < 65000) { reminded.add(s.id); document.body.insertAdjacentHTML("beforeend", `<div id="remModal" style="position:fixed;inset:0;background:rgba(32,33,30,.45);z-index:1500;display:flex;align-items:center;justify-content:center;padding:20px;"><div class="card" style="max-width:440px;text-align:center"><div class="eyebrow">Notification</div><h3>Your study session is ready.</h3><p class="muted">${esc(s.task)} · ${s.dur} min</p><div class="row" style="justify-content:center;margin-top:10px"><button class="btn" onclick="document.getElementById('remModal').remove();beginSession('${s.id}')">Begin Session</button><button class="btn ghost" onclick="document.getElementById('remModal').remove()">Later</button></div></div></div>`); } }); }, 1000);

/* ================= session engine ================= */
let S = null;
function beginSession(id) {
  const s = sessions.find(x => x.id === id); if (!s) return;
  const m = $("remModal"); if (m) m.remove();
  nav("workspace");
  $("wsTask").textContent = s.task;
  $("wsDesc").textContent = (s.desc || "") + " · started " + new Date().toLocaleTimeString();
  const startMode = s.mode || settings.defaultMode || "cat";
  setSessionMode(startMode);

  let lf = liveFiles[id];
  if (!lf && s.material?.type === "pdf") {
    try {
      const sData = sessionStorage.getItem("cp_pdf_" + id);
      if (sData) {
        const parsed = JSON.parse(sData);
        lf = { type: "pdf", bytes: base64ToUint8Array(parsed.b64), name: parsed.name, pages: parsed.pages };
        liveFiles[id] = lf;
      }
    } catch(e) {}
  } else if (!lf && s.material?.type === "image") {
    try {
      const sData = sessionStorage.getItem("cp_img_" + id);
      if (sData) {
        const parsed = JSON.parse(sData);
        lf = { type: "image", dataUrl: parsed.dataUrl, name: parsed.name };
        liveFiles[id] = lf;
      }
    } catch(e) {}
  }

  const live = lf || s._live || s.material;
  const box = $("docBody"); box.innerHTML = "";
  const pagesToRender = (lf?.pages && lf.pages.length) ? lf.pages : ((live.pages && live.pages.length) ? live.pages : [1]);

  if (live.type === "image" || live.dataUrl) {
    box.innerHTML = `<div style="text-align:center"><img src="${esc(live.dataUrl)}" alt="${esc(live.name || "Uploaded Image")}" style="max-width:100%;height:auto;border-radius:12px;border:1px solid var(--border);box-shadow:var(--shadow-sm);" /><p class="muted" style="margin-top:8px">${esc(live.name || "Uploaded Image")}</p></div>`;
  } else if (live.type === "pdf" && lf && lf.bytes) {
    renderSelectedPagesInto(box, lf.bytes, pagesToRender, live.name || lf.name);
  } else if (live.type === "pdf" && live.bytes) {
    renderSelectedPagesInto(box, live.bytes, pagesToRender, live.name);
  } else if (live.type === "pdf") {
    box.innerHTML = `<p class="muted">Loading PDF file <b>${esc(live.name || "document.pdf")}</b>…</p>`;
  } else {
    const lines = String(live.text || "").split("\n");
    lines.forEach((ln, i) => { const el = document.createElement(i === 0 ? "h2" : "p"); el.textContent = ln; box.appendChild(el); });
  }
  $("wsNotes").value = "";
  S = { id, task: s.task, desc: s.desc, dur: s.dur, remaining: s.dur * 60, active: true, paused: false, last: null, recent: [], date: s.date, time: s.time, material: live, materialText: String(live.text || live.name || "").slice(0, 2000), stats: { total: 0, feed: 0, pet: 0, yarn: 0, find: 0, clean: 0, boxes: 0, nap: 0, zoom: 0, boss: 0, chaos: 0 } };
  tick(); S.clock = setInterval(() => { if (!S || !S.active || S.paused) return; S.remaining--; tick(); if (S.remaining <= 0) finishSession(); }, 1000);
  const [a, b] = TIMING.first; schedule(a, b);
  note(startMode === "cat" ? "Session started in Cat Mode. Milo is supervising." : "Session started. Focus detected. Monitoring…");
}
function tick() { if (!S) return; const m = Math.floor(Math.max(0, S.remaining) / 60), s2 = Math.max(0, S.remaining) % 60; $("wsTimer").textContent = String(m).padStart(2, "0") + ":" + String(s2).padStart(2, "0"); }
function togglePause() { if (!S) return; S.paused = !S.paused; $("pauseBtn").textContent = S.paused ? "Resume" : "Pause"; }
function note(m) { $("wsNotice").innerHTML = `<div class="notice"><b>System Notice</b> — ${esc(m)}</div>`; setTimeout(() => { const n = $("wsNotice"); if (n) n.innerHTML = ""; }, 4500); }
function gapR() { return settings.intensity === "calm" ? TIMING.gapCalm : settings.intensity === "intense" ? TIMING.gapIntense : TIMING.gap; }
function schedule(a, b) { if (!S || !S.active) return; clearTimeout(S.t); S.t = setTimeout(() => { if (S?.active && !S.paused) fire(); else if (S?.active) schedule(a, b); }, a + Math.random() * (b - a)); }
function pick() {
  const bag = []; POOL.forEach(([k, w]) => { if (!S.recent.includes(k)) for (let i = 0; i < w; i++) bag.push(k); });
  const src = bag.length ? bag : POOL.flatMap(([k, w]) => Array(w).fill(k));
  const p = src[Math.floor(Math.random() * src.length)];
  S.recent.push(p); if (S.recent.length > 3) S.recent.shift(); S.last = p; return p;
}
/* Milo physically triggers the transition: paws grab the page */
function miloGrabTransition(next) {
  if (reducedMotion()) {
    next();
    return;
  }

  const t = $("miloTransition");
  if (!t) {
    next();
    return;
  }

  t.classList.add("on");
  requestAnimationFrame(() => t.classList.add("grab"));
  setTimeout(() => {
    t.classList.remove("on", "grab");
    next();
  }, 750);
}
let isDistractionActive = false;

function fire() {
  if (!S?.active || S.paused) return;
  if (isDistractionActive || document.getElementById("catOverlay") || document.querySelector(".scene")) return;

  isDistractionActive = true;
  miloGrabTransition(() => {
    if (!S?.active || S.paused) { isDistractionActive = false; return; }
    const k = pick(); S.stats.total++; S.stats[k]++;
    maybeTakeover();
    ({ feed: dFeed, pet: dPet, yarn: dYarn, find: dFind, clean: dClean, boxes: dBoxes, nap: dNap, zoom: dZoom, boss: dBoss, chaos: dChaos })[k]();
  });
}
function maybeTakeover() {
  const n = S.stats.total;
  const bar = $("takeoverBar");
  if (n === 3) { setSessionMode("cat"); if (bar) bar.textContent = "Note: this Study Session is now a Milo Session. Terminology updated for accuracy."; }
  else if (n === 6) { if (bar) { bar.textContent = "SYSTEM ADMIN · Milo — access level: total."; bar.classList.remove("hidden"); } }
}
function done() {
  closeScene();
  const [a, b] = gapR();
  schedule(a, b);
}

/* overlay */
function openScene(html, dark) {
  closeScene();
  const o = document.createElement("div"); o.id = "catOverlay";
  o.innerHTML = `<div class="scene ${dark ? "dark" : ""}"><div class="scene-inner">${html}</div></div><button id="exitControl" onclick="finishSession()">End Session</button>`;
  document.body.appendChild(o); return o;
}
function closeScene() {
  isDistractionActive = false;
  const o = $("catOverlay"); if (o) o.remove();
  document.querySelectorAll(".pawprint-fx,.zoomie,.meow,.peek-paw,.eyes-behind").forEach(e => e.remove());
  document.body.classList.remove("shake-all");
}
function head(t, s) { return `<div class="eyebrow">Cat Productivity · Internal System</div><div class="fs-title">${t}</div><p class="fs-sub">${s}</p>`; }
function hearts(el) { const h = document.createElement("div"); h.className = "heart-p"; h.textContent = "💗"; h.style.left = (20 + Math.random() * 60) + "%"; h.style.top = "60%"; el.appendChild(h); setTimeout(() => h.remove(), 1400); }

/* ---- FEED: illustrated kitchen ---- */
function dFeed() {
  const foods = [["🐟", "Fish"], ["🍗", "Chicken"], ["🥫", "Cat food"], ["🍪", "Treat"]];
  openScene(`${head("Nutritional Incident", "Milo's food reserves have reached critical levels. Drag provisions into the bowl.")}
    <div class="env env-kitchen"><div style="padding:16px;position:relative;z-index:2">${miloSVG("small", { id: "feedMilo", acc: cat.acc })}<div class="bowl" id="bowl"><div class="bowl-food" id="bowlFood"></div></div><div class="rug"></div></div></div>
    <div class="food-tray" id="tray">${foods.map(([e, n]) => `<div class="food" data-n="${n}" title="${n}">${e}<small style="display:block;font-size:.6rem">${n}</small></div>`).join("")}</div>
    <p class="muted" id="feedMsg">Milo is watching. Pupils dilating…</p>`);
  const milo = $("feedMilo"); milo.classList.add("excited");
  const bowl = $("bowl");
  document.querySelectorAll(".food").forEach(f => {
    let sx = 0, sy = 0, on = false;
    const start = (x, y) => { on = true; sx = x; sy = y; f.classList.add("dragging"); f.style.zIndex = 60; };
    const move = (x, y) => { if (!on) return; f.style.transform = `translate(${x - sx}px,${y - sy}px) scale(1.14)`; const b = bowl.getBoundingClientRect(), r = f.getBoundingClientRect(); bowl.classList.toggle("over", !(r.right < b.left || r.left > b.right || r.bottom < b.top || r.top > b.bottom)); };
    const end = () => {
      if (!on) return; on = false; f.classList.remove("dragging");
      const b = bowl.getBoundingClientRect(), r = f.getBoundingClientRect();
      const hit = !(r.right < b.left || r.left > b.right || r.bottom < b.top || r.top > b.bottom);
      f.style.transform = ""; bowl.classList.remove("over");
      if (hit) feedSuccess(f.dataset.n);
    };
    f.addEventListener("pointerdown", e => { start(e.clientX, e.clientY); f.setPointerCapture(e.pointerId); });
    f.addEventListener("pointermove", e => move(e.clientX, e.clientY));
    f.addEventListener("pointerup", end); f.addEventListener("pointercancel", end);
  });
}
function feedSuccess(name) {
  $("bowlFood").textContent = "🍽️"; $("feedMsg").textContent = `${esc(name)} accepted. Eating…`;
  const milo = $("feedMilo"); milo.classList.remove("excited"); milo.classList.add("happy");
  setTimeout(() => { if (!$("catOverlay")) return; $("catOverlay").querySelector(".scene-inner").innerHTML = `${head("Incident resolved.", "")}${miloSVG("small", { state: "happy", acc: cat.acc })}<div class="fs-title">“Acceptable.”</div><p class="fs-sub">— ${esc(cat.name)}</p>`; setTimeout(() => { closeScene(); done(); }, 1400); }, 1600);
}

/* ---- PET: cozy living room ---- */
function dPet() {
  let sat = 0;
  openScene(`${head("Attention Request", "Management requires immediate appreciation. Move your cursor or finger over Milo.")}
    <div class="env env-living"><div class="rug"></div><div id="petZone" style="cursor:pointer;position:relative;z-index:2;padding:10px">${miloSVG("", { id: "petMilo", acc: cat.acc })}</div></div>
    <div class="meter-label">Cat satisfaction</div><div class="progress"><i id="satBar"></i></div><p class="muted" id="satMsg">2% — critically low</p>`);
  const zone = $("petZone"), milo = $("petMilo");
  let last = 0;
  const stroke = () => {
    const now = Date.now(); if (now - last < 90) return; last = now;
    if (sat >= 100) return;
    sat = Math.min(100, sat + 7);
    $("satBar").style.width = sat + "%"; $("satMsg").textContent = sat + "%";
    milo.classList.add("happy"); hearts(zone);
    if (sat >= 100) { $("satMsg").textContent = "100% — Management satisfied."; setTimeout(() => { closeScene(); done(); }, 1200); }
    else setTimeout(() => { if (sat < 100) milo.classList.remove("happy"); }, 600);
  };
  zone.addEventListener("pointermove", stroke);
  zone.addEventListener("pointerdown", stroke);
}

/* ---- YARN ---- */
function dYarn() {
  let catches = 0, caught = false;
  openScene(`${head("Mandatory Recreation", `Drag the yarn. ${esc(cat.name)} is on duty. Catches: <b id="yC">0</b>/6`)}
    <div class="env env-living"><div class="rug"></div><div id="yarnStage"><div id="yarnBall">🧶</div><div id="chaseCat">${miloSVG("small", { id: "chaseMilo", acc: cat.acc })}</div></div></div>`);
  const ball = $("yarnBall"), stage = $("yarnStage"), chaser = $("chaseCat");
  ball.style.left = "60%"; ball.style.top = "30%"; chaser.style.left = "10%"; chaser.style.top = "40%";
  let drag = false, ox = 0, oy = 0, bx = 0, by = 0;
  const pos = (el) => ({ x: parseFloat(el.style.left) || 0, y: parseFloat(el.style.top) || 0 });
  ball.addEventListener("pointerdown", e => { drag = true; ox = e.clientX; oy = e.clientY; const p = pos(ball); bx = p.x; by = p.y; ball.setPointerCapture(e.pointerId); });
  ball.addEventListener("pointermove", e => {
    if (!drag) return;
    const r = stage.getBoundingClientRect();
    let nx = bx + ((e.clientX - ox) / r.width) * 100, ny = by + ((e.clientY - oy) / r.height) * 100;
    nx = Math.max(0, Math.min(88, nx)); ny = Math.max(0, Math.min(75, ny));
    ball.style.left = nx + "%"; ball.style.top = ny + "%";
    const c = pos(chaser);
    chaser.style.left = (c.x + (nx - c.x) * .25) + "%"; chaser.style.top = (c.y + (ny - c.y) * .25) + "%";
    if (Math.hypot(nx - c.x, ny - c.y) < 12 && !caught) {
      caught = true; catches++; $("yC").textContent = catches;
      $("chaseMilo").classList.add("pounce"); setTimeout(() => $("chaseMilo")?.classList.remove("pounce"), 650);
      setTimeout(() => caught = false, 700);
      if (catches >= 6) { drag = false; $("catOverlay").querySelector(".scene-inner").innerHTML = `${head("Recreation requirement fulfilled.", "")}${miloSVG("small", { state: "sleeping", acc: cat.acc })}<p class="fs-sub">${esc(cat.name)} lies down.</p>`; setTimeout(() => { closeScene(); done(); }, 1400); }
    }
  });
  ["pointerup", "pointercancel"].forEach(ev => ball.addEventListener(ev, () => drag = false));
  const iv = setInterval(() => { if (!$("catOverlay")) { clearInterval(iv); return; } if (!drag && Math.random() > .5) { ball.style.left = (5 + Math.random() * 80) + "%"; ball.style.top = (5 + Math.random() * 65) + "%"; } }, 2200);
}

/* ---- FIND MILO: study room ---- */
function dFind() {
  const spots = [["couch", "Behind couch", "12%", "58%"], ["box", "Inside box", "38%", "62%"], ["curtain", "Behind curtain", "66%", "30%"], ["desk", "Under desk", "60%", "62%"], ["plant", "Behind plant", "82%", "55%"], ["shelf", "Inside shelf", "30%", "28%"]];
  const win = spots[Math.floor(Math.random() * spots.length)][0];
  openScene(`${head("Asset Unavailable", "Locate Milo. Visual clues only — no further instructions.")}
    <div class="env env-room" id="room" style="height:300px">
      <div class="furniture" style="left:8%;top:52%">🛋️</div><div class="furniture" style="left:36%;top:58%">📦</div>
      <div class="furniture" style="left:64%;top:18%">🪟</div><div class="furniture" style="left:58%;top:56%">🪑</div>
      <div class="furniture" style="left:80%;top:50%">🪴</div><div class="furniture" style="left:26%;top:20%">📚</div>
      <div class="furniture" style="left:46%;top:12%">💡</div>
      ${spots.map(([k, label, l, t]) => `<button class="hotspot" data-k="${k}" style="left:${l};top:${t}">${label}</button>`).join("")}
    </div><p class="muted" id="findMsg">Something in this room is slightly wrong.</p>`);
  document.querySelectorAll(".hotspot").forEach(h => h.onclick = () => {
    if (h.dataset.k === win) {
      $("room").insertAdjacentHTML("beforeend", `<div style="position:absolute;left:50%;top:40%;transform:translate(-50%,-50%);font-size:3rem;animation:sceneIn .3s">👀</div>`);
      $("findMsg").textContent = "Eyes detected.";
      setTimeout(() => { if (!$("catOverlay")) return; $("catOverlay").querySelector(".scene-inner").innerHTML = `${head("Asset recovered.", "")}${miloSVG("", { state: "happy", acc: cat.acc })}<div class="fs-title">“Found me.”</div>`; setTimeout(() => { closeScene(); done(); }, 1400); }, 900);
    } else { h.classList.add("wrong"); $("findMsg").textContent = "Nothing. But something shifted…"; setTimeout(() => h.classList.remove("wrong"), 400); }
  });
}

/* ---- CLEANUP ---- */
function dClean() {
  const N = 18; let gone = 0;
  openScene(`${head("Workspace Contamination", `${esc(cat.name)} crossed the workspace with dirty paws. Restore cleanliness.`)}
    <div class="meter-label">Workspace cleanliness</div><div class="progress"><i id="cleanBar"></i></div>
    <div id="wipeField"></div><p class="muted">Drag like a cloth. Clicks work too.</p>`);
  const f = $("wipeField");
  for (let i = 0; i < N; i++) { const p = document.createElement("div"); p.className = "pawprint"; p.textContent = "🐾"; p.style.left = Math.random() * 88 + "%"; p.style.top = Math.random() * 80 + "%"; p.style.fontSize = (1.4 + Math.random() * 1.4) + "rem"; p.style.transform = `rotate(${Math.random() * 60 - 30}deg)`; f.appendChild(p); }
  const wipe = (x, y) => {
    document.querySelectorAll("#wipeField .pawprint:not(.gone)").forEach(p => {
      const pr = p.getBoundingClientRect();
      if (Math.hypot(pr.left + 14 - x, pr.top + 14 - y) < 46) { p.classList.add("gone"); gone++; $("cleanBar").style.width = Math.round(gone / N * 100) + "%"; }
    });
    if (gone >= N) {
      $("catOverlay").querySelector(".scene-inner").innerHTML = `${head("Workspace restored.", "")}${miloSVG("small", { state: "walking", acc: cat.acc })}<p class="fs-sub">${esc(cat.name)} walks across… leaving one tiny paw. For comedy.</p><div style="font-size:1.2rem">🐾</div>`;
      setTimeout(() => { closeScene(); done(); }, 1800);
    }
  };
  f.addEventListener("pointermove", e => { if (e.buttons) wipe(e.clientX, e.clientY); });
  f.addEventListener("pointerdown", e => wipe(e.clientX, e.clientY));
}

/* ---- BOXES ---- */
function dBoxes() {
  const N = 4; const win = Math.floor(Math.random() * N);
  openScene(`${head("Cat Location Required", "One box contains Milo. Observe carefully.")}
    <div class="boxes-row" id="boxes">${Array.from({ length: N }, (_, i) => `<div class="cbox" data-i="${i}"><div class="flap"></div>📦</div>`).join("")}</div>
    <p class="muted" id="boxMsg">Shuffling…</p>`);
  const boxes = [...document.querySelectorAll(".cbox")];
  let k = 0;
  const iv = setInterval(() => {
    boxes.forEach(b => b.style.transform = `translateX(${(Math.random() * 60 - 30).toFixed(0)}px)`);
    if (++k > 5) {
      clearInterval(iv); boxes.forEach(b => b.style.transform = "");
      $("boxMsg").textContent = "Choose a box.";
      boxes.forEach(b => b.onclick = () => {
        if (+b.dataset.i === win) { b.innerHTML = `<div class="flap"></div>${miloSVG("small", { acc: cat.acc })}`; $("boxMsg").innerHTML = `<b>“Found me.”</b> — ${esc(cat.name)}`; setTimeout(() => { closeScene(); done(); }, 1600); }
        else { b.innerHTML = `<div class="flap"></div><span class="muted">Empty.</span>`; b.style.opacity = .55; b.onclick = null; $("boxMsg").textContent = "Empty. Another box shifts…"; const rest = boxes.filter(x => x.onclick); if (rest.length) rest[Math.floor(Math.random() * rest.length)].style.transform = "translateY(-10px)"; }
      });
    }
  }, 420);
}

/* ---- NAP: Milo sleeps ON the document ---- */
function dNap() {
  const doc = $("docBody");
  const nap = document.createElement("div");
  nap.className = "doc-nap-milo"; nap.id = "docNapMilo";
  nap.innerHTML = miloSVG("small", { state: "sleeping", id: "napDocMilo", acc: cat.acc });
  doc.style.position = "relative";
  doc.appendChild(nap);
  note("Workspace unavailable. Reason: Milo.");
  openScene(`${head("Workspace Unavailable", "Reason: Milo. A nap is in progress on your document.")}
    ${miloSVG("", { state: "sleeping", id: "napMilo", acc: cat.acc })}
    <div class="pill">NAP IN PROGRESS</div><div class="progress"><i id="napP"></i></div>
    <p class="muted">Do not disturb. Seriously.</p>`);
  $("napMilo").insertAdjacentHTML("afterend", `<div class="zZ" style="left:60%;top:10%">z</div><div class="zZ" style="left:66%;top:16%;animation-delay:1s">z</div><div class="zZ" style="left:62%;top:22%;animation-delay:2s">Z</div>`);
  requestAnimationFrame(() => { const p = $("napP"); if (p) p.style.width = "85%"; });
  setTimeout(() => {
    if (!$("catOverlay")) return;
    closeScene(); note("Nap concluded. Workspace restored.");
    const d = $("docNapMilo"); if (d) d.remove();
    done();
  }, 5200);
}
/* ---- ZOOMIES ---- */
function dZoom() {
  openScene(`${head("Unexpected system activity detected.", "Investigating…")}${miloSVG("small", { state: "walking", acc: cat.acc })}`, true);
  setTimeout(() => {
    if (!$("catOverlay")) return;
    $("catOverlay").querySelector(".scene-inner").innerHTML = `${head("CAT ZOOMIES.", "Please remain seated.")}${miloSVG("small", { state: "walking", acc: cat.acc })}`;
    let n = 0;
    const iv = setInterval(() => {
      if (!$("catOverlay") || n > 6) { clearInterval(iv); if ($("catOverlay")) { $("catOverlay").querySelector(".scene-inner").innerHTML = head("Activity resolved.", "Returning to workspace."); setTimeout(() => { closeScene(); done(); }, 1000); } return; }
      n++;
      const z = document.createElement("div"); z.className = "zoomie"; z.innerHTML = miloSVG("small", { state: n % 2 ? "walking" : "", acc: cat.acc });
      const fromL = Math.random() > .5; z.style.top = (12 + Math.random() * 65) + "vh"; z.style.left = fromL ? "-190px" : "105vw";
      document.body.appendChild(z);
      requestAnimationFrame(() => { z.style.transition = "left .85s linear"; z.style.left = fromL ? "105vw" : "-190px"; });
      setTimeout(() => z.remove(), 950);
      const m = document.createElement("div"); m.className = "meow"; m.textContent = "MEOW"; m.style.left = (10 + Math.random() * 70) + "vw"; m.style.top = "20vh"; document.body.appendChild(m); setTimeout(() => m.remove(), 2000);
    }, 650);
  }, 1300);
}
/* ---- BOSS: productivity review ---- */
function dBoss() {
  openScene(`<div class="eyebrow">Cat Productivity · Mandatory performance review</div>
    ${miloSVG("small", { tie: true, id: "bossMilo", acc: cat.acc })}
    <div class="fs-title">${esc(cat.name)} — ${esc(miloRank().n)}</div>
    <p class="fs-sub" id="bossMsg">Connecting…</p>
    <div class="chart" id="chart" style="display:none"><i style="height:40px"></i><i style="height:64px"></i><i style="height:88px;animation-delay:.15s"></i><i style="height:112px;animation-delay:.3s;background:#B45D55"></i></div>
    <p class="muted" id="chartCap"></p>`, true);
  const msgs = ["Slide 1 — Your productivity: ↗ +38%. Concerning.", "Slide 2 — Risk: sustained concentration detected.", "Slide 3 — Recommendation: immediate intervention."];
  let i = 0;
  const iv = setInterval(() => {
    if (!$("catOverlay")) { clearInterval(iv); return; }
    if (i < msgs.length) { $("bossMsg").textContent = msgs[i]; i++; }
    else {
      clearInterval(iv);
      $("chart").style.display = "flex"; $("chartCap").textContent = "PRODUCTIVITY ↗ +38% — under review.";
      setTimeout(() => { if (!$("catOverlay")) return; $("chart").classList.add("knocked"); $("bossMsg").textContent = "Corrective measures initiated."; $("chartCap").textContent = "(chart removed by management)"; }, 1800);
      setTimeout(() => { if (!$("catOverlay")) return; closeScene(); note("Meeting concluded. Productivity corrected."); done(); }, 3600);
    }
  }, 1300);
}
/* ---- CHAOS ---- */
function dChaos() {
  openScene(`${head("Something went wrong.", "Escalating…")}${miloSVG("small", { state: "excited", acc: cat.acc })}`);
  setTimeout(() => {
    if (!$("catOverlay")) return;
    document.body.classList.add("shake-all");
    let n = 0;
    const iv = setInterval(() => {
      if (n > 8 || !$("catOverlay")) {
        clearInterval(iv); document.body.classList.remove("shake-all");
        if ($("catOverlay")) $("catOverlay").innerHTML = `<div class="scene"><div class="scene-inner">${miloSVG("", { acc: cat.acc })}<p class="fs-sub">All systems operational.</p><div class="fs-title">“Probably.”</div></div></div><button id="exitControl" onclick="finishSession()">End Session</button>`;
        setTimeout(() => { closeScene(); note("System health — Cat: Excellent. Productivity: Critical."); done(); }, 1800);
        return;
      }
      n++;
      const z = document.createElement("div"); z.className = "zoomie"; z.innerHTML = miloSVG("small", { acc: cat.acc });
      z.style.left = Math.random() * 85 + "vw"; z.style.top = Math.random() * 70 + "vh"; document.body.appendChild(z); setTimeout(() => z.remove(), 900);
      const m = document.createElement("div"); m.className = "meow"; m.textContent = ["MEOW", "MEEOW", "Productivity detected."][n % 3]; m.style.left = Math.random() * 75 + "vw"; m.style.top = Math.random() * 60 + "vh"; document.body.appendChild(m); setTimeout(() => m.remove(), 2000);
    }, 480);
  }, 1100);
}

/* ================= finish / report ================= */
function finishSession() {
  if (!S?.active) { closeScene(); return; }
  S.active = false; clearTimeout(S.t); clearInterval(S.clock); closeScene();
  const m = $("remModal"); if (m) m.remove();
  const d = $("docNapMilo"); if (d) d.remove();
  const s = sessions.find(x => x.id === S.id); if (s) s.status = "completed";
  const notes = $("wsNotes") ? $("wsNotes").value : "";
  records.push({ id: "h" + Date.now(), sessionId: S.id, task: S.task, desc: S.desc || "", date: S.date, time: S.time, dur: S.dur, interruptions: S.stats.total, status: "completed", material: S.material || { type: "text", text: S.materialText }, materialText: S.materialText, notes: notes, stats: { ...S.stats } });
  persist();
  const st = S.stats;
  const r = miloRank();
  $("repTask").textContent = S.task;
  $("repMeta").textContent = `${S.dur} min scheduled · ${st.total} interruptions · Supervised by ${cat.name}`;
  $("repGrid").innerHTML = [["Interruptions", st.total], ["Attention requests", st.pet], ["Feedings", st.feed], ["Recreation", st.yarn], ["Recoveries", st.find], ["Cleanups", st.clean], ["Boxes", st.boxes], ["Nap incidents", st.nap], ["Zoomies", st.zoom]].map(([k, v]) => `<div class="card"><div class="eyebrow">${k}</div><div class="metric">${v}</div></div>`).join("");
  $("repCat").innerHTML = miloSVG("small", { acc: cat.acc, badge: true });
  $("repRank").textContent = r.n;
  nav("report"); S = null;
}

/* ================= init ================= */
document.addEventListener("DOMContentLoaded", () => {
  $("cFile").addEventListener("change", (e) => {
    const f = e.target.files[0]; if (!f) return;
    $("fileInfo").textContent = f.name + " (" + Math.round(f.size / 1024) + " KB)";
    const isPdf = f.type === "application/pdf" || /\.pdf$/i.test(f.name || "");
    const isImg = f.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|svg)$/i.test(f.name || "");
    if (isPdf) { clearImgPicker(); clearPdfPicker(true); handlePdfFile(f); }
    else if (isImg) { clearPdfPicker(true); clearImgPicker(); handleImgFile(f); }
    else { clearPdfPicker(true); clearImgPicker(); const r = new FileReader(); r.onload = () => pendingUpload = { kind: "text", text: String(r.result).slice(0, 200000), name: f.name }; r.readAsText(f); }
  });
  if ($("pdfStart") && $("pdfEnd")) {
    $("pdfStart").addEventListener("input", () => { if ($("pdfRange")) $("pdfRange").value = ""; pdfMsg("", ""); });
    $("pdfEnd").addEventListener("input", () => { if ($("pdfRange")) $("pdfRange").value = ""; pdfMsg("", ""); });
    $("pdfStart").addEventListener("change", () => { if (!$("pdfRange").value.trim()) syncRangeFromBoxes(); });
    $("pdfEnd").addEventListener("change", () => { if (!$("pdfRange").value.trim()) syncRangeFromBoxes(); });
  }
  document.querySelectorAll("#accRow button").forEach(b => b.onclick = () => { cat.acc = (cat.acc === b.dataset.acc) ? "" : b.dataset.acc; renderCatView(); });
  if ($("setIntensity")) $("setIntensity").value = settings.intensity || "normal";
  if ($("setDefaultMode")) $("setDefaultMode").value = settings.defaultMode || "cat";
  if (!$("cDate").value) $("cDate").value = todayStr();
  renderOverview(); renderCatView(); nav("overview");
});
window.nav = nav; window.matTab = matTab; window.saveSession = saveSession; window.beginSession = beginSession;
window.togglePause = togglePause; window.finishSession = finishSession; window.saveCat = saveCat; window.saveSettings = saveSettings;
window.openSelectedPages = openSelectedPages; window.clearPdfPicker = clearPdfPicker; window.clearImgPicker = clearImgPicker; window.parsePageSelection = parsePageSelection; window.deleteSession = deleteSession; window.viewHistorySession = viewHistorySession; window.closeHistoryModal = closeHistoryModal;
window.setSessionMode = setSessionMode; window.toggleWsMode = toggleWsMode; window.triggerDistractionManually = triggerDistractionManually;
