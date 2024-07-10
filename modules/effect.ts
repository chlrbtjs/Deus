import state from "./state";

interface Ieffects {
  openEffect?: (state: state, useOrder: number) => state,
  closeEffect?: (state: state, useOrder: number) => state,
  turnEndEffect?: (state: state, useOrder: number) => state,
}

abstract class openEffect implements Ieffects {
  abstract openEffect: (state: state, useOrder: number) => state;
}

abstract class closeEffect implements Ieffects {
  abstract closeEffect: (state: state, useOrder: number) => state;
}

abstract class turnEndEffect implements Ieffects {
  abstract turnEndEffect: (state: state, useOrder: number) => state;
}


export { openEffect, closeEffect, turnEndEffect };