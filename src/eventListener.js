import { cross } from "./cross.js";
import { handleResetGame } from "./handleResetGame.js";

class EventListener {
    tdsArray = []
    listerFunction = '';
   
    getTds() {
        this.tdsArray = [...document.getElementsByTagName('td')];
    }
    
    addEventListenerCross() {
        if (!Array.isArray(this.tdsArray)) { this.tdsArray = [ this.tdsArray] }

        this.listerFunction = cross.putCross.bind(this)
        this.tdsArray.forEach(e => e.addEventListener('click', this.listerFunction, true))
    }

    addEventListenerButton() {
        handleResetGame.startButton.addEventListener('click', handleResetGame.handleResetGame.bind(handleResetGame), true);
    }

    removeEventListenerCross() {
        if (!Array.isArray(this.tdsArray)) { this.tdsArray = [ this.tdsArray] }
        this.tdsArray.forEach(e => e.removeEventListener('click', this.listerFunction, true));
    }
}

export const eventListener = new EventListener();