import state from "./state"
import { openEffect, closeEffect, turnEndEffect } from "./effect";

interface Icard {
  cardcode: number,           // 카드 코드, 코드 부여 규칙은 미정
  cardname: string,           // 카드 이름
  classes: 1 | 2 | 3 | 5,     // 계급
  canMissionary: boolean,     // 포교 할 수 있는지
  keyWords: string[],         // 도발등의 키워드
  createInfluence: number,    // 세력 생성치
  religion: string[],         // 종교, 혹시 모르니까 배열로

  whenOpen: openEffect,                 // 오픈 시 효과
  whenClose: closeEffect,               // 세력화 시 효과
  whenTurnEnd: turnEndEffect,           // 턴 종료시 효과
  toJson(): object,                 // JSON 표현
}

abstract class card implements Icard {
  cardcode: number;
  cardname: string;
  classes: 1 | 2 | 3 | 5;
  canMissionary: boolean;
  keyWords: string[];
  createInfluence: number;
  religion: string[];
  whenOpen: openEffect;
  whenClose: closeEffect;
  whenTurnEnd: turnEndEffect;

  constructor(cardcode: number, cardname: string, classes: 1 | 2 | 3 | 5, canMissionary: boolean, keyWords: string[], religion: string[]) {
    this.cardcode = cardcode;
    this.cardname = cardname;
    this.classes = classes;
    this.canMissionary = canMissionary;
    this.keyWords = keyWords;
    this.createInfluence = this.classes;
    this.religion = [...religion];
  }

  abstract toJson() : object;
}


export default card;