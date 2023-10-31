// Mostramos el indicador de conectado
function onConnectionOpen(evt) {
  document.getElementById("estado").classList.remove("bg-danger");
  document.getElementById("estado").classList.add("bg-success");
  document.getElementById("estado").textContent = "ONLINE";
}

// Mostramos el indicador de desconectado
function onConnectionClose(evt) {
  document.getElementById("estado").classList.remove("bg-success");
  document.getElementById("estado").classList.add("bg-danger");
  document.getElementById("estado").textContent = "OFFLINE";
}

// Manejo de pantalla. Selectores de vista.
function onVerUltima() {
  document.getElementById("text-ultima-operacion").classList.remove("d-none");
  document.getElementById("text-historial").classList.add("d-none");
}

function onVerHistorial() {
  document.getElementById("text-ultima-operacion").classList.add("d-none");
  document.getElementById("text-historial").classList.remove("d-none");
}

function uiInit() {
  document.getElementById("ultima-operacion").onchange = onVerUltima;
  document.getElementById("historial").onchange = onVerHistorial;
}

function updateAssets(content) {
  const textarea = document.getElementById("text-ultima-operacion");
  textarea.textContent = content;
}

function updateHistory(newContent) {
  const textarea = document.getElementById("text-historial");
  textarea.innerHTML = textarea.innerHTML + "\n" + newContent;
  textarea.scrollTop = textarea.scrollHeight;
}

export { onConnectionOpen, onConnectionClose, uiInit, updateAssets, updateHistory };
