import { openEffect, closeEffect, turnEndEffect } from "./effect";
import state from "./state";
import { IFieldSelectData } from "./data";

class noneEffect_openEffect extends openEffect {
  openEffect = (state: state, useOrder: number, data?: IFieldSelectData): state => {
    // have no any open effect
    return state;
  };
}

class noneEffect_closeEffect extends closeEffect {
  closeEffect = (state: state, useOrder: number, data?: IFieldSelectData): state => {
    // have no any close effect
    return state;
  }
}

class noneEffect_turnEndEffect extends turnEndEffect {
  turnEndEffect = (state: state, useOrder: number, data?: IFieldSelectData): state => {
    // have no any turnEnd effect
    return state;
  }
}

class goldenTeardropPriest_turnEndEffect extends turnEndEffect {
  turnEndEffect = (state: state, useOrder: number, data?: IFieldSelectData): state => {
    state.players[useOrder].sacrifice += 1;
    return state;
  }
}

export { goldenTeardropPriest_turnEndEffect, noneEffect_openEffect, noneEffect_closeEffect, noneEffect_turnEndEffect };