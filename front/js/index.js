import { connectWebsocket } from "./Connection.js";
import Event from "./classes/Event.js";
import { SetConfig, routeEvent } from "./Process.js";

import { onConnectionOpen, onConnectionClose, uiInit } from "./ui.js";
import { init } from "./Init.js";

let conn = null;

// Inicializamos
window.onload = function () {
  // Inicializo
  const cfg = init();
  SetConfig(cfg.SymbolProcessing);

  // Inicializo UI
  uiInit();

  // Conecto
  conn = connectWebsocket();

  // Mostramos el indicador de conectado
  conn.onopen = onConnectionOpen;

  // Mostramos el indicador de desconectado
  conn.onclose = onConnectionClose;

  // Manejamos los mensajes entrantes
  conn.onmessage = function (evt) {
    // Parseamos el mensaje
    const eventData = JSON.parse(evt.data);
    const event = Object.assign(new Event(), eventData);
    // Lo enrutamos al processor
    routeEvent(event);
  };
};
