import Event from "./classes/Event.js";
import { routeEvent } from "./Process.js";

/**
 * ConnectWebsocket will connect to websocket and add listeners
 * */
function connectWebsocket() {
  // Check if the browser supports WebSocket
  if (window["WebSocket"]) {
    // console.log("supports websockets");
    // Connect to websocket using OTP as a GET parameter
    let conn = new WebSocket("ws://" + document.location.host + "/ws");

    // Add a listener to the onmessage event
    conn.onmessage = function (evt) {
      // parse websocket message as JSON
      const eventData = JSON.parse(evt.data);
      // Assign JSON data to new Event Object
      const event = Object.assign(new Event(), eventData);
      // Let router manage message
      routeEvent(event);
    };

    return conn;
  } else {
    alert("Not supporting websockets");
  }
}

export { connectWebsocket };
