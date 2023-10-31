import MarketData from "./classes/MarketData.js";
import { updateAssets, updateHistory } from "./ui.js";

// Diccionario donde voy a guardar el estado actual de cada activo
const mData = {};

function processMarketData(md) {
  // Actualizo el diccionario
  mData[md.Sym] = md;

  // Actualizo la pantalla con los últimos valores
  const mostrar = Object.values(mData).map((sym) => {
    const ts = new Date(sym.TS);
    return `${sym.Sym} Compra: ${Math.round(sym.BP * 1000) / 1000}(${sym.BQ}) - Venta: ${
      Math.round(sym.SP * 1000) / 1000
    }(${sym.SQ}) - Última actualización: ${ts.toLocaleTimeString()} `;
  });

  updateAssets(mostrar.join("\n"));

  // Agrego la novedad al log
  var ts = new Date(md.TS);
  const formattedMsg = `${ts.toLocaleTimeString()}: ${md.Sym} Compra: ${Math.round(md.BP * 1000) / 1000}(${
    md.BQ
  }) - Venta: ${Math.round(md.SP * 1000) / 1000}(${md.SQ})`;

  updateHistory(formattedMsg);
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

export { routeEvent };
