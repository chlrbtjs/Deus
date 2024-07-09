import state from "./state";

interface Ieffects {
  openEffect?: (state: state) => state;
  closeEffect?: (state: state) => state;
}

abstract class openEffect implements Ieffects {
  openEffect: (state: state) => state;
}

abstract class closeEffect implements Ieffects {
  closeEffect: (state: state) => state;
}

class goldenTeardropPriest_OpenEffect extends openEffect {
  openEffect = (state: state): state => {
    // TODO: goldenTeardropPriest_OpenEffect implementation
    return state;
  }
}

export { goldenTeardropPriest_OpenEffect };