// /**
//  * SendMessageEvent is used to send messages to other clients
//  * */
// class SendMessageEvent {
//   constructor(message, from) {
//     this.message = message;
//     // this.from = from;
//   }
// }

/**
 * NewMessageEvent is messages comming from clients
 * */
class MarketData {
  constructor(Id, TS, Sym, BP, BQ, SP, SQ) {
    this.Id = Id;
    this.TS = TS;
    this.Sym = Sym;
    this.BP = BP;
    this.BQ = BQ;
    this.SP = SP;
    this.SQ = SQ;
  }
}

// /**
//  * sendMessage will send a new message onto the Chat
//  * */
// function sendMessage() {
//   var newmessage = document.getElementById("message");
//   if (newmessage != null) {
//     let outgoingEvent = new SendMessageEvent(newmessage.value, "percy");
//     sendEvent("send_message", outgoingEvent);
//   }
//   return false;
// }

// selectedchat is by default General.
var selectedchat = "general";

/**
 * Event is used to wrap all messages Send and Recieved
 * on the Websocket
 * The type is used as a RPC
 * */
class Event {
  // Each Event needs a Type
  // The payload is not required
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
}

/**
 * routeEvent is a proxy function that routes
 * events into their correct Handler
 * based on the type field
 * */
function routeEvent(event) {
  if (event.type === undefined) {
    alert("no 'type' field in event");
  }
  switch (event.type) {
    case "market_data":
      // Format payload
      const messageEvent = Object.assign(new MarketData(), event.payload);
      appendMarketData(messageEvent);
      break;
    default:
      console.error("unsupported message type");
      break;
  }
}

function appendMarketData(md) {
    var ts = new Date(md.TS);
  // format message
  const formattedMsg = `${ts.toLocaleString()}: ${md.Sym} 
Compra: ${Math.round(md.BP * 1000) / 1000}(${md.BQ}) - Venta: ${Math.round(md.SP * 1000) / 1000}(${md.SQ})`;
  // Append Message 
  textarea = document.getElementById("chatmessages");
  textarea.innerHTML = textarea.innerHTML + "\n" + formattedMsg;
  textarea.scrollTop = textarea.scrollHeight;

}
/**
 * appendChatMessage takes in new messages and adds them to the chat
 * */
function appendChatMessage(messageEvent) {
  var date = new Date(messageEvent.sent);
  // format message
  const formattedMsg = `${date.toLocaleString()}: ${messageEvent.message}`;
  // Append Message
  textarea = document.getElementById("chatmessages");
  textarea.innerHTML = textarea.innerHTML + "\n" + formattedMsg;
  textarea.scrollTop = textarea.scrollHeight;
}


// /**
//  * sendEvent
//  * eventname - the event name to send on
//  * payload - the data payload
//  * */
// function sendEvent(eventName, payload) {
//   // Create a event Object with a event named send_message
//   const event = new Event(eventName, payload);
//   // Format as JSON and send
//   conn.send(JSON.stringify(event));
// }

/**
 * ConnectWebsocket will connect to websocket and add listeners
 * */
function connectWebsocket() {
  // Check if the browser supports WebSocket
  if (window["WebSocket"]) {
    console.log("supports websockets");
    // Connect to websocket using OTP as a GET parameter
    conn = new WebSocket("ws://" + document.location.host + "/ws");

    // Onopen
    conn.onopen = function (evt) {
      document.getElementById("connection-header").innerHTML =
        "Connected to Websocket: true";
    };

    conn.onclose = function (evt) {
      // Set disconnected
      document.getElementById("connection-header").innerHTML =
        "Connected to Websocket: false";
    };

    // Add a listener to the onmessage event
    conn.onmessage = function (evt) {
      console.log(evt);
      // parse websocket message as JSON
      const eventData = JSON.parse(evt.data);
      // Assign JSON data to new Event Object
      const event = Object.assign(new Event(), eventData);
      // Let router manage message
      routeEvent(event);
    };
  } else {
    alert("Not supporting websockets");
  }
}
