import victory from "./victory";
import state from "./state";
import player from "./player";

class KtuluVictory extends victory {
  isVictory = (state: state, player: player) => {
    if (state.players[player.order].sacrifice >= 20) {
      state.players[player.order].isWin = true;
    }
    return;
  }
}

export { KtuluVictory };