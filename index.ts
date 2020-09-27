import 'reflect-metadata';
import './controller/GameController';

import * as bodyParser from 'body-parser';
import { blue, cyan, green, red, yellow } from 'colors/safe';
import { InversifyExpressServer } from 'inversify-express-utils';

import container from './container/ioc-container';
import TYPES from './container/types';
import { IGameRepository } from './dao/IGameRepository';
import MongoDBConnection from './utils/MongoDBConnection';

require('dotenv').config();

const port = process.env.SERVER_PORT;

try {
  MongoDBConnection.getConnection(async () => {
    const gameRepository = container.get<IGameRepository>(TYPES.IGameRepository);
    try{
      await gameRepository.drop();
    } catch (err){
      console.warn(`${yellow('gameRepository')} ${red('collection does not exists!')}`);
    }
    
    await gameRepository.init();
  });
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());
  });
  const app = server.build();
  app.listen(port, () => {
    console.log(`${blue('Server ')}${cyan('started on port :')} ${green(port!.toString())}`);
  });
  exports = app;
  module.exports = app;
} catch (error) {}
