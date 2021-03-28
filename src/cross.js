import { matrix }from "./matrix.js";
import { playTable } from "./playTable.js";
import { nought } from "./nought.js";
import { winner } from "./winner.js";
import { game } from "./game.js";
import { resetGame } from "./resetGame.js";

class Cross {
    putCross(e) {
        const size = 3;
        const cellNumber = e.currentTarget.id;
        const x = Math.floor(cellNumber / size);
        const y = cellNumber % size;
        
        if (matrix.getDbCell(x,y) === 0) {
            matrix.setDb(x, y, 1);
            playTable.updateTableView();
            resetGame.showResetGame();
            winner.checkWinnerCombinations();
            game.checkIfNoPlaceToGo();
            
            if (game.checkGameStatus()) {
                nought.putNought();
                playTable.updateTableView();
                winner.checkWinnerCombinations();
                game.checkIfNoPlaceToGo();
            }
         } else {
            alert('This cell is already clicked! Click a blank one!');
        }
    }
}

export const cross = new Cross();
