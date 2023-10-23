package bus

import (
	"math"
	"math/rand"
	"time"

	"bruck.com.ar/market/marketdata"
)

type AssetState struct {
	// Una referencia al activo
	asset *marketdata.AssetConfig
	// El momento en que se va a producir el próximo update
	NextUpdate time.Time
	// El timer que va a disparar los updates
	timer *time.Timer
}

// La función que se va a encargar de manejar el broadcasting
type BroadcastFunction func(marketdata.MarketData) error

var broadcastFn BroadcastFunction

// Traigo todas las definiciones de los activos desde el repositorio
var assetsConfig = *marketdata.GetAssetsConfigs()
var assetStates = make(map[string]AssetState)

func setTimer(ast *AssetState) {

	// Genero un intervalo de actualización para este activo. Usamos el intervalo típico +/- un 25%
	interval := int(math.Round(float64(ast.asset.TypicalUpdateInterval) * (0.75 + rand.Float64()*0.5)))

	nextUpd := time.Duration(interval) * time.Millisecond
	ast.NextUpdate = time.Now().Add(nextUpd)

	// Reseteo el timer
	if ast.timer == nil {
		timer := time.NewTimer(nextUpd)
		ast.timer = timer
	} else {
		ast.timer.Reset(nextUpd)
	}

	// log.Println(interval, nextUpd, ast.NextUpdate)

	go func(a *AssetState) {
		<-a.timer.C
		{
			// log.Println(ast.asset.Description + " - Next: " + ast.NextUpdate.Local().String())

			// Genero la MarketData para el activo
			md := ast.asset.MockMarketData(time.Now())

			// Hago el broadcast
			broadcastFn(md)
		}
		setTimer(a)
	}(ast)
}

func StartBus(broadcast BroadcastFunction) {

	broadcastFn = broadcast

	// Inicializo un estado para cada activo, y disparo la primer actualización dentro de 10 milisegundos
	for i, v := range assetsConfig {

		// Copio las variables de esta iteración
		asset := v
		i := i

		// Genero un AssetState por cada activo
		assetStates[i] = AssetState{asset: &asset}

		// Inicio el timer de cada activo
		go func(a AssetState) {
			setTimer(&a)
		}(assetStates[i])

	}
}
