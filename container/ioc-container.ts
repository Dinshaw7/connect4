import 'reflect-metadata';
import { Container } from 'inversify';
import { IGameRepository } from '../dao/IGameRepository';
import TYPES from './types';
import GameRepositoryMongoDbImpl from '../dao/MongoDb/GameRepositoryMongoDbImpl';
import GameService from '../service/GameService';
import { IGameService } from '../service/IGameService';
import WinnerIdentifierEngine from '../core/WinnerIdentifierEngine';
import MoveEngine from '../core/MoveEngine';

const container = new Container();
container.bind<IGameRepository>(TYPES.IGameRepository).to(GameRepositoryMongoDbImpl);
container.bind<IGameService>(TYPES.IGameService).to(GameService);
container.bind<WinnerIdentifierEngine>(TYPES.WinnerIdentifierEngine).to(WinnerIdentifierEngine);
container.bind<MoveEngine>(TYPES.MoveEngine).to(MoveEngine);

export default container;
