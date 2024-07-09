import state from "./state"

interface Icard {
  cardcode: number,
  cardname: string,
  classes: 1 | 2 | 3 | 4,
  canMissionary: boolean,
  keyWords: string[],
  createInfluence: number,

  whenOpen: (state: state) => state,
  whenInfluentialization: (state: state) => state,
}

abstract class card implements Icard {
  cardcode: number;
  cardname: string;
  classes: 1 | 2 | 3 | 4;
  canMissionary: boolean;
  keyWords: string[];
  createInfluence: number;

  constructor(cardcode: number, cardname: string, classes: 1 | 2 | 3 | 4, canMissionary: boolean, keyWords: string[]) {
    this.cardcode = cardcode;
    this.cardname = cardname;
    this.classes = classes;
    this.canMissionary = canMissionary;
    this.keyWords = keyWords;
  }
  
  whenOpen = (state: state): state => {
    // TODO: Open card logic
    return state;
  }
  
  whenInfluentialization = (state: state): state => {
    // TODO: Influentialization card logic
    return state;
  }
}


export { Icard, card };