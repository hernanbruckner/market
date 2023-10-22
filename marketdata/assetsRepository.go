package marketdata

var assetsRepository = map[string]AssetConfig{
	"ALM":  {Asset: NewAsset("ALM", "Almaglobal"), TypicalPrice: 6, PriceRandomnessRatio: 0.1, TypicalSpread: 0.05, TypicalUpdateInterval: 4000},
	"MELI": {Asset: NewAsset("MELI", "Mercado Libre"), TypicalPrice: 10.5, PriceRandomnessRatio: 0.05, TypicalSpread: 0.08, TypicalUpdateInterval: 3000},
	"SPY":  {Asset: NewAsset("SPY", "SP 500"), TypicalPrice: 20.0, PriceRandomnessRatio: 0.01, TypicalSpread: 0.04, TypicalUpdateInterval: 5000},
	"ATT":  {Asset: NewAsset("ATT", "AT&T"), TypicalPrice: 8.4, PriceRandomnessRatio: 0.1, TypicalSpread: 0.07, TypicalUpdateInterval: 2000},
}

func GetAssetsConfigs() *map[string]AssetConfig {
	return &assetsRepository
}
