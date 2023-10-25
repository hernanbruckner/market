import { connectWebsocket } from "./Connection.js";
import { onConnectionOpen, onConnectionClose, uiInit } from "./ui.js";
import { init } from "./Init.js";

let conn = null;
const config = {};

// Inicializamos
window.onload = function () {
  conn = connectWebsocket();

  // Mostramos el indicador de conectado
  conn.onopen = onConnectionOpen;

  // Mostramos el indicador de desconectado
  conn.onclose = onConnectionClose;

  // Inicializo
  const cfg = init();
  Object.assign(config, cfg);

  uiInit();
};
