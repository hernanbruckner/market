import { SymbolProcessingConfig } from "./configComponent/SymbolProcessingConfig.js";

function init() {
  const config = {
    SymbolProcessing: [new SymbolProcessingConfig("MELI", 15000, ["console.log('MELI actualizado')"])],
  };

  return config;
}

export { init };
