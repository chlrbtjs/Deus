import state from "./state"

interface Icard {
  cardcode: number,           // 카드 코드, 코드 부여 규칙은 미정
  cardname: string,           // 카드 이름
  classes: 1 | 2 | 3 | 4,     // 계급
  canMissionary: boolean,     // 포교 할 수 있는지
  keyWords: string[],         // 도발등의 키워드
  createInfluence: number,    // 세력 생성치

  whenOpen: (state: state) => state,                // 오픈 시 효과
  whenInfluentialization: (state: state) => state,  // 세력화 시 효과
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
    this.createInfluence = this.classes;
    if (this.classes === 4) {
      this.createInfluence = 5;
    }
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