import MarketData from "./classes/MarketData.js";
import { updateAssets, updateHistory } from "./ui.js";

// Diccionario donde voy a guardar el estado actual de cada activo
const mData = {};
const config = {};
const status = {};

// Recibimos y guardamos la configuración del display de los activos
function SetConfig(cfg) {
  Object.assign(config, cfg);

  for (var i in config) {
    const symCfg = config[i];
    console.log(symCfg);
    status[symCfg.Symbol] = { NextUpdate: null, Config: symCfg };
  }
}

function processMarketData(md) {
  let procesar = true;

  // Veo si hay configuración para este símbolo
  const st = status[md.Sym];

  // Veo si hay configuración de intervalo de actualización
  if (st && st.Config && st.Config.MinUpdateInterval) {
    if (st.NextUpdate && st.NextUpdate > new Date()) {
      procesar = false;
    } else {
      // Actualizo el momento del próximo update
      const next = new Date();
      next.setMilliseconds(next.getMilliseconds() + st.Config.MinUpdateInterval);
      st.NextUpdate = next;
    }
  }

  if (procesar) {
    // Actualizo el diccionario
    mData[md.Sym] = md;

    // Veo si hay acciones a realizar pre update
    if (st && st.Config.Preprocess) {
      for (var i in st.Config.Preprocess) {
        eval(st.Config.Preprocess[i]);
      }
    }

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

    // Veo si hay acciones a realizar post update
    if (st && st.Config.CallBacks && st.Config.CallBacks.length) {
      for (var i in st.Config.CallBacks) {
        eval(st.Config.CallBacks[i]);
      }
    }
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

export { SetConfig, routeEvent };
