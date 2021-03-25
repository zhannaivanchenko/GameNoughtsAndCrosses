import { matrix }from "./matrix.js";
import { playTable } from "./playTable.js";
import { clickHandler } from "./init.js";

class ResetGame {
    startButton = document.getElementById('button-start');
    gameStatus = document.getElementById('game-status');

    showResetGame() {
        this.startButton.innerHTML = 'Reset game!';
        playTable.addEventListener(this.startButton, 'click', this.resetGame.bind(this));
    }
     
    resetGame() {        
        playTable.removeEventListener(playTable.tdsArray, 'click', clickHandler);
        for (let i=0; i<matrix.getDb().length; i++) {
            for (let j=0; j<matrix.getDb()[i].length; j++) {
                matrix.setDb(i, j, 0);
            }
        }
        playTable.updateTableView(); 
        this.gameStatus.innerHTML = '';
        this.startButton.innerHTML = 'Good luck!'; 
        
    };
}

export const resetGame = new ResetGame();