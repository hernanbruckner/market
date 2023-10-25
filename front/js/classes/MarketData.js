
/**
 * NewMessageEvent is messages comming from clients
 * */
export default class MarketData {
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