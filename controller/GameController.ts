import { magenta, yellow } from 'colors/safe';
import * as express from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  request,
  requestParam,
  response,
} from 'inversify-express-utils';

import TYPES from '../container/types';
import { IGameService } from '../service/IGameService';

const API_VERSION = 'v1';
@controller(`/${API_VERSION}/connect4`)
export default class GameController {
  private response: { apiVersion: string; data: any; error: any } = {
    apiVersion: API_VERSION,
    data: {},
    error: {},
  };
  constructor(@inject(TYPES.IGameService) private gameService: IGameService) { }

  @httpGet('/healthCheck')
  private async healthCheck(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<express.Response> {
    console.log(`${magenta('/connect4/healthCheck')} : ${yellow(`${new Date()}`)}`);
    try {
      this.response.data = await this.gameService.healthCheck();
      return res.status(200).send(this.response);
    } catch (error) {
      this.response.error = error.message;
      return res.status(500).send(this.response);
    }
  }

  @httpGet('/start')
  private async start(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<express.Response> {
    console.log(`${magenta('/connect4/start')} : ${yellow(`${new Date()}`)}`);
    try {
      this.response.data = await this.gameService.start();
      return res.status(200).send(this.response);
    } catch (error) {
      this.response.error = error.message;
      return res.status(500).send(this.response);
    }
  }

  @httpPost('/makeMove')
  private async makeMove(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<express.Response> {
    console.log(`${magenta('/connect4/makeMove')} : ${yellow(`${new Date()}`)}`);
    try {
      const { playerToken } = req.body;
      const { column } = req.body;
      this.response.data = await this.gameService.makeMove(playerToken, +column);
      return res.status(200).send(this.response);
    } catch (error) {
      this.response.error = error.message;
      return res.status(500).send(this.response);
    }
  }

  @httpGet('/getMovesHistory/:playerToken')
  private async getMovesHistory(
    @requestParam('playerToken') playerToken: string,
    @response() res: express.Response
  ): Promise<express.Response> {
    console.log(`${magenta('/connect4/getMovesHistory')} : ${yellow(`${new Date()}`)}`);
    try {
      this.response.data = await this.gameService.getMovesHistory(playerToken);
      return res.status(200).send(this.response);
    } catch (error) {
      this.response.error = error.message;
      return res.status(500).send(this.response);
    }
  }
}
