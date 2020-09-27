import { injectable } from 'inversify';
import { Db } from 'mongodb';

import MongoDBConnection from '../../utils/MongoDBConnection';
import { IGameRepository } from '../IGameRepository';

@injectable()
export default class GameRepositoryMongoDbImpl implements IGameRepository {
  db!: Db;
  constructor() {
    MongoDBConnection.getConnection((connection) => {
      this.db = connection;
    });
  }
  public async healthCheck(): Promise<boolean> {
    if (this.db === null || this.db === undefined) {
      return false;
    }
    return true;
  }
  public async drop(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.collection('connect4').drop((error: any, drop: boolean | PromiseLike<boolean> | undefined) => {
        if (error) {
          reject(error);
        }
        if (drop) {
          resolve(drop);
        }
        reject(new Error('Error while dropping the collection!'));
      });
    });
  }
  public async init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = { id: 1, matrix: '000000000000000000000000000000000000000000' };
      this.db.collection('connect4').insertOne(query, (error: { message: any; }, insert: any) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        const query = { id: 2, moves: [], token: '', color: '' };
        this.db.collection('connect4').insertOne(query, (error: { message: any; }, insert: any) => {
          if (error) {
            console.error(error.message);
            reject(error);
          }
          const query = { id: 3, moves: [], token: '', color: '' };
          this.db.collection('connect4').insertOne(query, (error: { message: any; }, insert: any) => {
            if (error) {
              console.error(error.message);
              reject(error);
            }
            const query = { id: 4, allPlayers: [], currentPlayer: '' };
            this.db.collection('connect4').insertOne(query, (error: { message: any; }, insert: any) => {
              if (error) {
                console.error(error.message);
                reject(error);
              }
              const query = { id: 5, isGameActive: false };
              this.db.collection('connect4').insertOne(query, (error: { message: any; }, insert: any) => {
                if (error) {
                  console.error(error.message);
                  reject(error);
                }
                resolve(true);
              });
            });
          });
        });
      });
    });
  }
  public async start(playerOneToken: string, playerTwoToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('connect4')
        .findOneAndUpdate(
          { id: 1 },
          { $set: { matrix: '000000000000000000000000000000000000000000' } },
          (error: { message: any; }, update: any) => {
            if (error) {
              console.error(error.message);
              reject(error);
            }
            this.db
              .collection('connect4')
              .findOneAndUpdate(
                { id: 2 },
                { $set: { moves: [], token: playerOneToken, color: 'Yellow' } },
                (error: { message: any; }, update: any) => {
                  if (error) {
                    console.error(error.message);
                    reject(error);
                  }
                  this.db
                    .collection('connect4')
                    .findOneAndUpdate(
                      { id: 3 },
                      { $set: { moves: [], token: playerTwoToken, color: 'Red' } },
                      (error: { message: any; }, update: any) => {
                        if (error) {
                          console.error(error.message);
                          reject(error);
                        }
                        this.db.collection('connect4').findOneAndUpdate(
                          { id: 4 },
                          {
                            $set: {
                              allPlayers: [playerOneToken, playerTwoToken],
                              currentPlayer: playerOneToken,
                            },
                          },
                          (error: { message: any; }, update: any) => {
                            if (error) {
                              console.error(error.message);
                              reject(error);
                            }
                            this.db.collection('connect4').findOneAndUpdate(
                              { id: 5 },
                              {
                                $set: {
                                  isGameActive: true
                                },
                              },
                              (error: { message: any; }, update: any) => {
                                if (error) {
                                  console.error(error.message);
                                  reject(error);
                                }
                                resolve(true);
                              }
                            );
                          }
                        );
                      }
                    );
                }
              );
          }
        );
    });
  }
  public async setPlayerMoves(playerToken: string, moves: number[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = { token: playerToken };
      this.db
        .collection('connect4')
        .findOneAndUpdate(query, { $set: { moves } }, (error: { message: any; }, update: any) => {
          if (error) {
            console.error(error.message);
            reject(error);
          }
          resolve(true);
        });
    });
  }
  public async getPlayerMoves(playerToken: string): Promise<number[]> {
    return new Promise((resolve, reject) => {
      const query = { token: playerToken };
      this.db.collection('connect4').findOne(query, (error: { message: any; }, data: { moves: number[] | PromiseLike<number[]> | undefined; }) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        if (data) {
          resolve(data.moves);
        }
        reject(new Error('Player Token not found!'));
      });
    });
  }
  public async getMatrix(): Promise<string> {
    return new Promise((resolve, reject) => {
      const query = { id: 1 };
      this.db.collection('connect4').findOne(query, (error: { message: any; }, data: { matrix: string | PromiseLike<string> | undefined; }) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }

        if (data) {
          resolve(data.matrix);
        }
        reject(new Error('Error while getting the matrix!'));
      });
    });
  }
  public async setMatrix(matrix: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = { id: 1 };
      this.db
        .collection('connect4')
        .findOneAndUpdate(query, { $set: { matrix } }, (error: { message: any; }, data: any) => {
          if (error) {
            console.error(error.message);
            reject(error);
          }
          resolve(true);
        });
    });
  }
  public async getCurrentPlayerToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const query = { id: 4 };
      this.db.collection('connect4').findOne(query, (error: { message: any; }, data: { currentPlayer: string | PromiseLike<string> | undefined; }) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        if (data) {
          resolve(data.currentPlayer);
        }
        reject(new Error('Error while fetching current player token!'));
      });
    });
  }
  public async toggleCurrentPlayer(playerToken: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = { id: 4 };
      this.db.collection('connect4').findOne(query, (error: { message: any; }, data: { allPlayers?: any; currentPlayer?: any; }) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        const { allPlayers } = data;
        let { currentPlayer } = data;
        currentPlayer = allPlayers[0] === currentPlayer ? allPlayers[1] : allPlayers[0];
        this.db
          .collection('connect4')
          .findOneAndUpdate({ id: 4 }, { $set: { currentPlayer } }, (error: { message: any; }, update: any) => {
            if (error) {
              console.error(error.message);
              reject(error);
            }
            resolve(true);
          });
      });
    });
  }
  public async getPlayerColor(playerToken: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const query = { token: playerToken };
      this.db.collection('connect4').findOne(query, (error: { message: any; }, data: { color: string | PromiseLike<string> | undefined; }) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        if (data) {
          resolve(data.color);
        }
        reject(new Error('Player Token not found!'));
      });
    });
  }
  public async getGameActiveStatus(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = { id: 5 };
      this.db.collection('connect4').findOne(query, (error, data) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        if (data) {
          resolve(data.isGameActive as boolean);
        }
        reject(new Error('Error while getting game active status!'));
      });
    });
  }
  setGameActiveStatus(status: boolean): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = { id: 5 };
      this.db
        .collection('connect4')
        .findOneAndUpdate(query, { $set: { isGameActive: status } }, (error: { message: any; }, data: any) => {
          if (error) {
            console.error(error.message);
            reject(error);
          }
          resolve(true);
        });
    });
  }
}
