# market
Una simulación de datos de mercado usada para armar un servidor de mensajería implementado en GO.

## Características
- Los mensajes se envían mediante WebSockets
- Se detectan automáticamente las conexiones nuevas y las conexiones que se cierran y se mantiene actualizada una lista de clientes
- Se realizan broadcasts para todos los clientes conectados

## Instalación
- Se debe descargar el repo y simplemente ejecutarlo con GO

## Data técnica
Se utilizó la lib gorilla websocket para las conexiones. (github.com/gorilla/websocket)
Se desarrolló con GO versión 1.21.1 pero seguramente sea compatible con versiones anteriores
Se utilizan goroutines para todas las acciones que sean posibles
