# market
Una simulación de datos de mercado usada para armar un servidor de mensajería implementado en GO.

## Características
- Los mensajes se envían mediante WebSockets
- Se detectan automáticamente las conexiones nuevas y las conexiones que se cierran y se mantiene actualizada una lista de clientes
- Se generan datos random según reglas y se realizan broadcasts de los mismos para todos los clientes conectados

## Instalación
- Se debe descargar el repo y simplemente ejecutarlo con "go run ."

## Data técnica
### Backend
La implementación de los websockets se basó en este tutorial: https://programmingpercy.tech/blog/mastering-websockets-with-go/
Se utilizó la lib gorilla websocket para las conexiones. (github.com/gorilla/websocket)
Se desarrolló con GO versión 1.21.1 pero seguramente sea compatible con versiones anteriores
Se utilizan goroutines para todas las acciones que sean posibles

### Frontend
Se hizo con módulos ES6