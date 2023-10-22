package marketdata

import "github.com/google/uuid"

// Esto es un activo que se va a usar en el mercado
type Asset struct {
	Id          string `json:"Id"`
	Symbol      string `json:"Symbol"`
	Description string `json:"Description"`
}

func NewAsset(symbol string, description string) (asset Asset) {
	asset = Asset{Id: uuid.NewString(), Symbol: symbol, Description: description}
	return
}

// Esta es la configuración que se va a usar para generar los datos random de cada activo
type AssetConfig struct {
	Asset
	// El precio "normal" del activo
	TypicalPrice float64
	// El ratio de variación del precio para generar el random
	PriceRandomnessRatio float64
	// El spread típico entre compra y venta
	TypicalSpread float64
	// El intervalo de actualización típico en milisegundos
	TypicalUpdateInterval uint32
}
