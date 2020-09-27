export interface IGameRepository {
  healthCheck(): Promise<boolean>;

  drop(): Promise<boolean>;
  init(): Promise<boolean>;
  start(playerOneToken: string, playerTwoToken: string): Promise<boolean>;

  setPlayerMoves(playerToken: string, moves: number[]): Promise<boolean>;
  getPlayerMoves(playerToken: string): Promise<number[]>;

  getMatrix(): Promise<string>;
  setMatrix(matrix: string): Promise<boolean>;

  getCurrentPlayerToken(): Promise<string>;
  toggleCurrentPlayer(playerToken: string): Promise<boolean>;

  getPlayerColor(playerToken: string): Promise<string>;

  getGameActiveStatus(): Promise<boolean>;
  setGameActiveStatus(status: boolean): Promise<boolean>;
}
