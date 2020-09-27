import { injectable } from 'inversify';

@injectable()
export default class WinnerIdentifierEngine {
  public checkWinner(matrixStr: string, symbol: number): boolean {
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
    var flag = false;
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 4; j++) {
        if (matrix[i][j] != 0) {
          if (matrix[i][j] == matrix[i][j + 1]) {
            if (matrix[i][j + 1] == matrix[i][j + 2]) {
              if (matrix[i][j + 2] == matrix[i][j + 3]) {
                if (matrix[i][j + 3] == symbol) {
                  console.log('Wins horizontally');
                  flag = true;
                }
                break;
              }
              break;
            }
            break;
          }
        }
      }
      if (flag) {
        console.log(flag);
        return flag;
      }
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 7; j++) {
        if (matrix[i][j] != 0) {
          if (matrix[i][j] == matrix[i + 1][j]) {
            if (matrix[i + 1][j] == matrix[i + 2][j]) {
              if (matrix[i + 2][j] == matrix[i + 3][j]) {
                if (matrix[i + 3][j] == symbol) {
                  console.log('Wins vertically');
                  flag = true;
                }
                break;
              }
              break;
            }
            break;
          }
        }
      }
      if (flag) {
        console.log(flag);
        return flag;
      }
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if (matrix[i][j] != 0) {
          if (matrix[i][j] == matrix[i + 1][j + 1]) {
            if (matrix[i + 1][j + 1] == matrix[i + 2][j + 2]) {
              if (matrix[i + 2][j + 2] == matrix[i + 3][j + 3]) {
                if (matrix[i + 3][j + 3] == symbol) {
                  console.log('Wins diagonally');
                  flag = true;
                }
                break;
              }
              break;
            }
            break;
          }
        }
      }
      if (flag) {
        console.log(flag);
        return flag;
      }
      for (var j = 3; j < 7; j++) {
        if (matrix[i][j] != 0) {
          if (matrix[i][j] == matrix[i + 1][j - 1]) {
            if (matrix[i + 1][j - 1] == matrix[i + 2][j - 2]) {
              if (matrix[i + 2][j - 2] == matrix[i + 3][j - 3]) {
                if (matrix[i + 3][j - 3] == symbol) {
                  console.log('Wins diagonally');
                  flag = true;
                }
                break;
              }
              break;
            }
            break;
          }
        }
      }
      if (flag) {
        console.log(flag);
        return flag;
      }
    }
    return false;
  }
}
