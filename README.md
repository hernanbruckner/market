# market
Una simulación de datos de mercado.
Se compone de un servidor desarrollado en GO, al que se conecta un frontend mediante websockets. Se envían actualizaciones de transacciones y el front las muestra en pantalla.

## Características
- Los mensajes se envían mediante WebSockets
- El backend detecta automáticamente las conexiones nuevas y las conexiones que se cierran y mantiene actualizada una lista de clientes
- Se generan datos random según reglas y se realizan broadcasts de los mismos para todos los clientes conectados
- Esas reglas soportan un grado de configuración, mediante un repositorio simulado de assets (assetsRepository.go)
- El frontend además soporta otra capa de configuración: se permite definir el intervalo mínimo de actualización de cada activo, e incluir llamadas antes y después de producido cada update

## Data técnica
### Backend
La implementación de los websockets se basó en este tutorial: https://programmingpercy.tech/blog/mastering-websockets-with-go/
Se utilizó la lib gorilla websocket para las conexiones. (github.com/gorilla/websocket)
Se desarrolló con GO versión 1.21.1 pero seguramente sea compatible con versiones anteriores
Se utilizan goroutines para todas las acciones que sean posibles, para probar la ejecución multihilo

#### Pruebas unitarias
Para demostrar la funcionalidad de unit testing en GO, se escribió un test sobre el procedimiento `marketdara.MockMarketData`.

### Frontend
- Es un sitio web muy básico, que usa estilos de bootstrap v5
- Se levanta usando el mismo host del backend, sus fuentes están en la carpeta "front" y se hostea en localhost:8080
- Todo el funcionamiento se basa en Javascript puro, desarrollado utilizando módulos ES6
- Existe una clase llamada "configComponent" cuyo objetivo es abstraer las configuraciones de los activos que se modelan, y facilitar alguna posible extensión
- Esta permite configurar frecuencias máximas de actualización, e implementar acciones a realizar pre y post update de cualquier activo

## Instalación
- Se debe descargar el repo y simplemente ejecutarlo con "go run ."
- Navegar a http://localhost:8080
- Para ejecutar los tests sobre marketdara.MockMarketData, ejecutar `"go test -v"` en la carpeta \marketdata.