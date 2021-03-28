import { matrix }from "./matrix.js";

class Nought {
    getNoughtCelllNumber() {
        const min = 0;
        const max = 8;
        const cellNumber = Math.floor(Math.random()*(max-min)+min);
        return cellNumber;
    }
    
    putNought() {
        const cellNumber = this.getNoughtCelllNumber();
        const size = 3;
        const x = Math.floor(cellNumber / size);
        const y = cellNumber % size;
    
        if(matrix.getDbCell(x, y) === 0) {
            matrix.setDb(x, y, 2);
           
           }
         else {
        this.putNought();
      }  
   }
}

export const nought = new Nought();