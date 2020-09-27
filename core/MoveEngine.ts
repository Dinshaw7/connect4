import { injectable } from 'inversify';

@injectable()
export default class MoveEngine {
  public insertIntoMatrix(
    matrixStr: string,
    symbol: number,
    column: number
  ): { status: boolean; matrix: string } {
    var matrix = new Array(7);
    for (var i = 0; i < matrix.length; i++) {
      matrix[i] = [];
    }
    var h = 0;
    var s = matrixStr;
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 7; j++) {
        matrix[i][j] = s[h++];
      }
    }
    var k = column;
    var flag = false;
    for (var i = 5; i >= 0; i--) {
      if (matrix[i][k] == 0) {
        matrix[i][k] = symbol;
        flag = true;
        break;
      }
    }
    var matrixString = '';
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 7; j++) {
        matrixString = matrixString + matrix[i][j];
      }
    }
    console.log(flag);
    console.log(matrixString);
    return { status: flag, matrix: matrixString };
  }
}
