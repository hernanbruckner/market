package bus

import (
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

	// Reseteo el timer
	nextUpd := time.Millisecond * time.Duration(ast.asset.TypicalUpdateInterval)
	ast.NextUpdate = time.Now().Add(nextUpd)

	if ast.timer == nil {
		timer := time.NewTimer(nextUpd)
		ast.timer = timer
	} else {
		ast.timer.Reset(nextUpd)
	}

	go func(a *AssetState) {
		<-a.timer.C
		{
			// fmt.Println(ast.asset.Description + " - Next: " + ast.NextUpdate.Local().String())

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
		// assetStm := assetStates[i]

		// Genero un AssetState por cada activo
		assetStates[i] = AssetState{asset: &asset}

		// Inicio el timer de cada activo
		go func(a AssetState) {
			setTimer(&a)
		}(assetStates[i])

		// mu.Unlock()
	}

	// // Acá se van a generar las novedades
	// busInterval := time.NewTicker(intervalo)
	// done := make(chan bool)

	// // Tengo que cambiar el ticker por el timer

	// for {
	// 	select {
	// 	case <-done:
	// 		return
	// 	case t := <-busInterval.C:
	// 		// Busca todos los activos que tienen pendiente el update y los dispara
	// 		for _, ac := range assetStates {
	// 			if ac.NextUpdate.Compare(time.Now()) <= 0 {
	// 				md := marketdata.MockMarketData(t)
	// 				broadcast(md)
	// 				// Reseteo el timer
	// 				ac.NextUpdate = time.Now().Add(time.Millisecond * time.Duration(ac.asset.TypicalUpdateInterval))
	// 			}
	// 		}
	// 		fmt.Println("Tick at", t)
	// 	}
	// }
}
