import { matrix } from "./matrix.js";
import { playTable } from "./playTable.js";
import { cross } from "./cross.js";

export let clickHandler;

playTable.renderTable(matrix.getDb());
playTable.getTds();
playTable.addEventListener(playTable.tdsArray, 'click', clickHandler = cross.putCross.bind(this));





   
