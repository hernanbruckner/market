
/**
 * Event is used to wrap all messages Send and Recieved
 * on the Websocket
 * The type is used as a RPC
 * */
export default class Event {
    // Each Event needs a Type
    // The payload is not required
    constructor(type, payload) {
      this.type = type;
      this.payload = payload;
    }
  }
  