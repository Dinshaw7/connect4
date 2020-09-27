
export interface IGameService {
  healthCheck(): Promise<string>;
  start(): Promise<any>;
  makeMove(
    playerToken: string,
    column: number
  ): Promise<{ playerToken: string; move: string; won: boolean }>;
  getMovesHistory(playerToken: string): Promise<{ playerToken: string; moves: number[] }>;
}
