import { playTable } from "./playTable.js";
import { clickHandler } from "./init.js";
import { matrix } from "./matrix.js";

class Game {
    gameStatus = document.getElementById('game-status')

    gameOver(sign) {
        playTable.getTds();
        if (sign === "cross") {
              this.gameStatus.innerHTML = 'You won! Play again?';
              this.gameStatus.classList.add('wonStatus');
              playTable.removeEventListener(playTable.tdsArray, 'click', clickHandler);
            } else if (sign === "nought") {
              this.gameStatus.innerHTML = 'Computer won! Play Again?';
              this.gameStatus.classList.add('lostStatus');
              playTable.removeEventListener(playTable.tdsArray, 'click', clickHandler);
          }
        }

    checkGameStatus() {
        return this.gameStatus.innerHTML ? false : true;
        }

    checkIfNoPlaceToGo() {
        let isAllNull = true;

        matrix.getDb().forEach(row => row.forEach(cell => {
            if (cell === 0) {
                isAllNull = true;
            } else {
                isAllNull = false;
            }
        }
        ))

        if(!isAllNull){
            this.gameStatus.innerHTML = 'No place to go! Restart the game!';
        } else { return; }
    }  
} 

export const game = new Game();
    