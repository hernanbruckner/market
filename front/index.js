/**
 * NewMessageEvent is messages comming from clients
 * */
class MarketData {
  constructor(Id, TS, Sym, BP, BQ, SP, SQ) {
    this.Id = Id;
    this.TS = TS;
    this.Sym = Sym;
    this.BP = BP;
    this.BQ = BQ;
    this.SP = SP;
    this.SQ = SQ;
  }
}

// Diccionario donde voy a guardar el estado actual de cada activo
const mData = {};

/**
 * Event is used to wrap all messages Send and Recieved
 * on the Websocket
 * The type is used as a RPC
 * */
class Event {
  // Each Event needs a Type
  // The payload is not required
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
}

/**
 * routeEvent is a proxy function that routes
 * events into their correct Handler
 * based on the type field
 * */
function routeEvent(event) {
  if (event.type === undefined) {
    alert("no 'type' field in event");
  }
  switch (event.type) {
    case "market_data":
      // Format payload
      const messageEvent = Object.assign(new MarketData(), event.payload);
      processMarketData(messageEvent);
      break;
    default:
      console.error("unsupported message type");
      break;
  }
}

function processMarketData(md) {
  // Actualizo el diccionario
  mData[md.Sym] = md;
  let textarea = document.getElementById("text-ultima-operacion");

  // Actualizo la pantalla con los últimos valores, aunque esté invisible
  const mostrar = Object.values(mData).map((sym) => {
    // const sym = mData[i];
    const ts = new Date(sym.TS);
    return `${sym.Sym} Compra: ${Math.round(sym.BP * 1000) / 1000}(${sym.BQ}) - Venta: ${
      Math.round(sym.SP * 1000) / 1000
    }(${sym.SQ}) - Última actualización: ${ts.toLocaleTimeString()} `;
  });

  textarea.textContent = mostrar.join('\n');

  // Agrego la novedad al log, aunque esté invisible
  var ts = new Date(md.TS);
  const formattedMsg = `${ts.toLocaleTimeString()}: ${md.Sym} Compra: ${Math.round(md.BP * 1000) / 1000}(${
    md.BQ
  }) - Venta: ${Math.round(md.SP * 1000) / 1000}(${md.SQ})`;
  textarea = document.getElementById("text-historial");
  textarea.innerHTML = textarea.innerHTML + "\n" + formattedMsg;
  textarea.scrollTop = textarea.scrollHeight;
}

function onVerUltima() {
  document.getElementById("text-ultima-operacion").classList.remove("d-none");
  document.getElementById("text-historial").classList.add("d-none");
}

function onVerHistorial() {
  document.getElementById("text-ultima-operacion").classList.add("d-none");
  document.getElementById("text-historial").classList.remove("d-none");
}

/**
 * ConnectWebsocket will connect to websocket and add listeners
 * */
function connectWebsocket() {
  // Check if the browser supports WebSocket
  if (window["WebSocket"]) {
    // console.log("supports websockets");
    // Connect to websocket using OTP as a GET parameter
    conn = new WebSocket("ws://" + document.location.host + "/ws");

    // Onopen
    conn.onopen = function (evt) {
      document.getElementById("estado").classList.remove("bg-danger");
      document.getElementById("estado").classList.add("bg-success");
      document.getElementById("estado").textContent = "ONLINE";
    };

    conn.onclose = function (evt) {
      document.getElementById("estado").classList.remove("bg-success");
      document.getElementById("estado").classList.add("bg-danger");
      document.getElementById("estado").textContent = "OFFLINE";
    };

    // Add a listener to the onmessage event
    conn.onmessage = function (evt) {
      // console.log(evt);
      // parse websocket message as JSON
      const eventData = JSON.parse(evt.data);
      // Assign JSON data to new Event Object
      const event = Object.assign(new Event(), eventData);
      // Let router manage message
      routeEvent(event);
    };
  } else {
    alert("Not supporting websockets");
  }
}
