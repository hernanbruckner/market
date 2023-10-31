/**
 * ConnectWebsocket will connect to websocket and add listeners
 * */
function connectWebsocket() {
  // Check if the browser supports WebSocket
  if (window["WebSocket"]) {
    // console.log("supports websockets");
    // Connect to websocket using OTP as a GET parameter
    let conn = new WebSocket("ws://" + document.location.host + "/ws");

    return conn;
  } else {
    alert("Not supporting websockets");
  }
}

export { connectWebsocket };
