import { matrix } from "./matrix.js";


class Game {
    gameStatus = document.getElementById('game-status')

    checkGameStatus() {
        return this.gameStatus.innerHTML ? false : true;
        }

    checkIfNoPlaceToGo() {
        let isAllNull = false;

        matrix.getDb().forEach(row => row.forEach(cell => {
            if (cell === 0) {
                isAllNull = true;
            } 
        }));

        if(!isAllNull){
            this.gameStatus.innerHTML = 'No place to go! Restart the game!';
        } else { return; }
    }  
} 

export const game = new Game();
    