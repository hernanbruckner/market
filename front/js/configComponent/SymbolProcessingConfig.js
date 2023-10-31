class SymbolProcessingConfig {
  // El símbolo
  Symbol = "";
  // El mínimo intervalo entre actualizaciones
  MinUpdateInterval = 0;
  // Preprocesos a ejecutar antes de cada actualización
  Preprocess = [];
  // Callbacks a ejecutar después de cada actualización
  CallBacks = [];

  constructor(symbol, minUpdateInterval, preProcess, callBacks) {
    this.Symbol = symbol;
    this.MinUpdateInterval = minUpdateInterval;
    this.Preprocess = preProcess;
    this.CallBacks = callBacks;
  }
}

export { SymbolProcessingConfig };
