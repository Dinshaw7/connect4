import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';

import PLAYERS from '../constant/players';
import TYPES from '../container/types';
import MoveEngine from '../core/MoveEngine';
import WinnerIdentifierEngine from '../core/WinnerIdentifierEngine';
import { IGameRepository } from '../dao/IGameRepository';
import { IGameService } from './IGameService';

@injectable()
export default class GameService implements IGameService {
  constructor(
    @inject(TYPES.IGameRepository) private gameRepository: IGameRepository,
    @inject(TYPES.MoveEngine) private moveEngine: MoveEngine,
    @inject(TYPES.WinnerIdentifierEngine) private winnerIdentifierEngine: WinnerIdentifierEngine
  ) { }

  public async healthCheck(): Promise<string> {
    const isHealth = await this.gameRepository.healthCheck();
    if (isHealth) {
      return 'I am Alive!';
    }
    return 'I am Dead!';
  }

  public async start(): Promise<any> {
    const playerOneToken = uuidv4();
    const playerTwoToken = uuidv4();
    const isMatrixInit = await this.gameRepository.start(playerOneToken, playerTwoToken);
    const playerOneColor = await this.gameRepository.getPlayerColor(playerOneToken);
    const playerTwoColor = await this.gameRepository.getPlayerColor(playerTwoToken);
    const res = {
      status: isMatrixInit ? 'READY' : 'NOT-READY',
      playerOne: { token: playerOneToken, color: playerOneColor },
      playerTwo: { token: playerTwoToken, color: playerTwoColor }
    };
    return res;
  }

  public async makeMove(
    playerToken: string,
    column: number
  ): Promise<{ playerToken: string; move: string; won: boolean; winner: string }> {
    let isWon: boolean = false;
    let isMoveValid: boolean = false;
    let isInsertedSuccessfully = false;
    let winner = "None";

    let gameStatus = await this.gameRepository.getGameActiveStatus() as boolean;
    if (gameStatus) {
      let matrix = await this.gameRepository.getMatrix();

      let currentPlayer = await this.gameRepository.getCurrentPlayerToken();

      if (currentPlayer === playerToken) isMoveValid = true;
      if (isMoveValid) {
        const symbol =
          (await this.gameRepository.getPlayerColor(currentPlayer)) === 'Yellow'
            ? PLAYERS.Yellow
            : PLAYERS.Red;

        let insertResponse: {
          status: boolean;
          matrix: string;
        } = this.moveEngine.insertIntoMatrix(matrix, symbol, column);
        isInsertedSuccessfully = insertResponse.status;
        if (isInsertedSuccessfully) {
          matrix = insertResponse.matrix;
          isWon = this.winnerIdentifierEngine.checkWinner(matrix, symbol);
          if (isWon) {
            winner = await this.gameRepository.getPlayerColor(currentPlayer);
            await this.gameRepository.setGameActiveStatus(false);
          }
          const moves = await this.gameRepository.getPlayerMoves(currentPlayer);
          moves.push(column);
          await this.gameRepository.setPlayerMoves(currentPlayer, moves);
          await this.gameRepository.toggleCurrentPlayer(currentPlayer);
          await this.gameRepository.setMatrix(matrix);
        }
      }
    }

    return {
      playerToken,
      move: isMoveValid && isInsertedSuccessfully && gameStatus ? 'VALID' : 'INVALID',
      won: isWon,
      winner
    };
  }
  public async getMovesHistory(
    playerToken: string
  ): Promise<{ playerToken: string; color: string; moves: number[] }> {
    const res = await this.gameRepository.getPlayerMoves(playerToken);
    const color = await this.gameRepository.getPlayerColor(playerToken);
    return { playerToken, color, moves: res };
  }
}
