import { eventListener } from "./eventListener.js";
import { handleResetGame } from "./handleResetGame.js";

class ShowResetGame {
   isListenerAdded = false

    showResetGame() {
       handleResetGame.startButton.innerHTML = 'Reset game!';
        if(!this.isListenerAdded){
            eventListener.addEventListenerButton();
            this.isListenerAdded = true;
        }
        
    }
}

export const showResetGame = new ShowResetGame();