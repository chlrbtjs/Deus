import card from "./card";
import * as effects  from "./effects";

class goldenTeardropPriest extends card {
  constructor() { 
    super(1010101, 'goldenTeardropPriest', 3, true, [], ['Ktulu']);
    this.whenOpen = new effects.noneEffect_openEffect();
    this.whenClose = new effects.noneEffect_closeEffect();
    this.whenTurnEnd = new effects.goldenTeardropPriest_turnEndEffect();
  }

  toJson() {
    return {
      cardcode: this.cardcode,
      cardname: this.cardname,
      classes: this.classes,
      canMissionary: this.canMissionary,
      keyWords: this.keyWords,
      religion: this.religion,
    };
  };
}