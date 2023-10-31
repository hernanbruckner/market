package marketdata

import (
	"errors"
	"math/rand"
	"time"

	"github.com/google/uuid"
)

type MarketData struct {
	// El Id del evento
	EventId string `json:"Id"`
	// Timestamp
	Timestamp time.Time `json:"TS"`
	// Símbolo
	Symbol string `json:"Sym"`
	// Precio de compra
	BuyingPrice float64 `json:"BP"`
	// Cantidad de compra
	BuyingQt uint64 `json:"BQ"`
	// Precio de venta
	SellingPrice float64 `json:"SP"`
	// Cantidad de venta
	SellingQt uint64 `json:"SQ"`
}

func NewMarketData() MarketData {
	md := MarketData{
		EventId:   uuid.NewString(),
		Timestamp: time.Now(),
	}

	return md
}

func (aCfg AssetConfig) MockMarketData(t time.Time) (MarketData, error) {

	if t.IsZero() {
		return MarketData{}, errors.New("fecha incorrecta")
	}

	md := MarketData{
		EventId:      uuid.NewString(),
		Timestamp:    t,
		Symbol:       aCfg.Symbol,
		BuyingPrice:  aCfg.TypicalPrice - (aCfg.TypicalSpread * aCfg.PriceRandomnessRatio * rand.Float64()),
		BuyingQt:     uint64(rand.Intn(999) + 1),
		SellingPrice: aCfg.TypicalPrice + (aCfg.TypicalSpread * aCfg.PriceRandomnessRatio * rand.Float64()),
		SellingQt:    uint64(rand.Intn(999) + 1),
	}

	return md, nil
}
