import player from "./player";
import state from "./state";
//TODO: victory class 만들기, default로 export하기, victorys 파일 분리하기.
interface Ivictory {
  isVictory: (state: state, player: player) => boolean;
}

abstract class victory implements Ivictory {
  isVictory: (state: state, player: player) => boolean
}

export default victory;