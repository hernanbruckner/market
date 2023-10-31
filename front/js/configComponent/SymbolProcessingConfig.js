class SymbolProcessingConfig {
  // El símbolo
  symbol = "";
  // El mínimo intervalo entre actualizaciones
  minUpdateInterval = 0;
  // Callbacks a ejecutar en cada actualización
  callBacks = [];

  constructor(symbol, minUpdateInterval, callBacks) {
    this.symbol = symbol;
    this.minUpdateInterval = minUpdateInterval;
    this.callBacks = callBacks;
  }
}

export { SymbolProcessingConfig };
