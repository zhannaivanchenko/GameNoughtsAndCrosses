import { matrix }from "./matrix.js";
import { playTable } from "./playTable.js";
import { eventListener } from "./eventListener.js";
import { game } from "./game.js";

class HandleResetGame {
    startButton = document.getElementById('button-start');
    
    handleResetGame() {        
        if (game.gameStatus.innerHTML === '') {
            eventListener.removeEventListenerCross();
        }
        for (let i=0; i<matrix.getDb().length; i++) {
            for (let j=0; j<matrix.getDb()[i].length; j++) {
                matrix.setDb(i, j, 0);
            }
        }

        playTable.updateTableView(); 
        game.gameStatus.innerHTML = '';
        this.startButton.innerHTML = 'Good luck!';
        eventListener.addEventListenerCross();
  
    };
}

export const handleResetGame = new HandleResetGame();