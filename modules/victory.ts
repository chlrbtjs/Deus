import { Iplayer } from "./player";
import Igamestate from "./state";

interface Ivictory {
  isVictory(state: Igamestate, player: Iplayer): boolean;
}

class KtuluVictory implements Ivictory {
  isVictory(state: Igamestate, player: Iplayer): boolean {
    if (state.players[player.order].sacrifice >= 20) {
      return true;
    }
    return false;
  }
}

export { Ivictory, KtuluVictory };