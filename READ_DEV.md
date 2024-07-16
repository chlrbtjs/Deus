## index.ts 파일 생성
- (개발시) ts-node index.ts 실행
- (배포시) tsc > node index.js 실행

## state vs game
- game은 state의 메소드만을 이용
- state가 내부의 카드 효과들을 nextState에 적용하고 game 에 넘겨줌

TODO
user / player 클래스 정리
user: server.ts와 game class에서 사용, socket과 관련, 추후 db 연동 가능성
player: state안에서만 사용