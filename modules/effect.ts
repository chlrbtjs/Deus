import state from "./state";
import { IFieldSelectData } from "./data";

interface Ieffects {
  openEffect?: (state: state, useOrder: number, data?: IFieldSelectData) => state;
  closeEffect?: (state: state, useOrder: number, data?: IFieldSelectData) => state;
  turnEndEffect?: (state: state, useOrder: number, data?: IFieldSelectData) => state;
}

abstract class openEffect implements Ieffects {
  abstract openEffect: (state: state, useOrder: number, data?: IFieldSelectData) => state;
}

abstract class closeEffect implements Ieffects {
  abstract closeEffect: (state: state, useOrder: number, data?: IFieldSelectData) => state;
}

abstract class turnEndEffect implements Ieffects {
  abstract turnEndEffect: (state: state, useOrder: number, data?: IFieldSelectData) => state;
}


export { openEffect, closeEffect, turnEndEffect };