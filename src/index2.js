// import { putCross } from './index';

class Matrix {
    _db = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    tdsArray = []

    getTds() {
        
        this.tdsArray = [...document.getElementsByTagName('td')];
    }
    
    addEventListener(element, eventName, handler) {
        if (!Array.isArray(element)) {element = [element]}
        console.log('111this._db=%', this._db)
        element.forEach(e => e.addEventListener(eventName, handler.bind(this), true));

    }
    removeEventListener(element, eventName, handler) {
        if (!Array.isArray(element)) {element = [element]}
        element.forEach(e => e.removeEventListener(eventName, handler.bind(this), true));
    }

    getTableView() {
        let table = '';
        const tableStart = "<table class='play-chart-table' > ";
        const tableRow = "<tr class='chart-row'>";
        const tableRowEnd = "</tr>";
        const tableEnd =  "</table> ";
        let i = 0;

        this._db.forEach(row => { 
            let cells = '';
            row.forEach(cell => {
                let sign = '';
                let tableCell = `<td class='chart-cell' id=${i} data-sign=${sign}></td>`;
                cells = cells + tableCell;
                i++;
            })
            table = table + tableRow + cells + tableRowEnd;
        });  
        return table = tableStart + table + tableEnd;
    }

   updateTableView() {
       const cellsTable = [...document.getElementsByTagName('td')];
       let j = 0;
       this._db.forEach(row => { 
            row.forEach(cell => {
               if (cell === 1) { cellsTable[j].dataset.sign = 'cross'}
               else if (cell === 2) { cellsTable[j].dataset.sign = 'nought'}
               else {cellsTable[j].dataset.sign = ''}
               j++;
        })
    })   
   }

    renderTable() {
        const playChart = document.getElementById('chart-table');
        playChart.innerHTML = this.getTableView();
    }

    getDomElement(element) {
        return document.getElementById(element);
    }

    launchNoPlace() {
        const gameStatus = this.getDomElement('game-status');
        gameStatus.innerHTML = 'No place to go! Restart the game!';
    }
    showResetGame() {
        const startButton = this.getDomElement('button-start');
        startButton.innerHTML = 'Reset game!';
        this.addEventListener(startButton, 'click', this.resetGame);
    }
    
    isClicked(cell) {
        console.log('cell=%o', cell);
        return cell.dataset.sign === 'cross' || cell.dataset.sign === 'nought' ? true : false;
    };
      
    gameOver(sign) {
        const gameStatus = this.getDomElement('game-status');
        if (sign === "cross") {
          gameStatus.innerHTML = 'You won! Play again?';
          gameStatus.classList.add('wonStatus');
          this.removeEventListener(this.tdsArray, 'click', this.putCross);
        } else if (sign === "nought") {
          gameStatus.innerHTML = 'Computer won! Play Again?';
          gameStatus.classList.add('lostStatus');
          this.removeEventListener(this.tdsArray, 'click', this.putCross);
      }
    }
      
    getColumns(array) {
        let columnsArray = [];
        columnsArray = array.map((el, i)=> el.map((_, j)=> array[j][i]));
        return columnsArray;
    }
      
    getDiagonals(array) {
        const size = array.length;  
        const diagonalsArray = [[],[]];
          for (let i=0; i<size; i++) {
            for (let j=0; j<size; j++) {
              if (i === j) { diagonalsArray[0].push(array[i][j]); 
              }}
          }
          for (let i= size-1; i>=0; i-- ) {
            for (let j=0; j<array.length; j++) {
              if ((i + j) === (size - 1)) { diagonalsArray[1].push(array[i][j]) ;
            }}
          }
          return diagonalsArray;  
    }
      
      
    checkWinner(array) {
          const isCrossWin = array.some(row => row.every(cell => cell === 1));
          const isNoughtWin = array.some(row => row.every(cell => cell === 2));
          if (isCrossWin) { this.gameOver('cross') }
          else if (isNoughtWin) { this.gameOver('nought') };
    }
      
    checkWinnerCombinations() {
        const columns = this.getColumns(this._db);
        const diagonals = this.getDiagonals(this._db);
        this.checkWinner(this._db);
        this.checkWinner(columns);
        this.checkWinner(diagonals);
    }
      
    resetGame() {
        const gameStatus = this.getDomElement('game-status');
        const startButton = this.getDomElement('button-start');
        // this.removeEventListener(this.tdsArray, 'click', this.putCross);
        for (let i=0; i<this._db.length; i++) {
            for (let j=0; j<this._db[i].length; j++) {
                this._db[i][j] = 0;
            }
        }
        this.updateTableView();
        console.log('this._db after clear=', this._db);
        // this.addEventListener(this.tdsArray, 'click', this.putCross);
        gameStatus.innerHTML = '';
        startButton.innerHTML = 'Good luck!';
        
    };

    putNought(size) {
         console.log('size=', size);
         console.log('dbNought=%o', this._db);
         const min = 0;
         const max = 8;

         const cellNumber = Math.floor(Math.random()*(max-min)+min);
         const x = Math.floor(cellNumber / size);
         const y = cellNumber % size;

         console.log('cellNumber=', cellNumber);
         console.log('x=', x);
         console.log('y=', y);
         if(this._db[x][y] === 0) {
             this._db[x][y] = 2;
             this.getTableView();
            }
         else if (this._db.forEach(row => row.forEach(el => el !== 0))) { 
            this.launchNoPlace();
            this.removeEventListener(this.tdsArray, 'click', this.putCross);
        } else {
         this.putNought(this._db.length);
       }  
    }


    putCross(e) {
        console.log('e=', e); 
        console.log('db=%o', this._db);
        const gameStatus = document.getElementById('game-status');  
        const cellNumber = e.currentTarget.id;
          const size = 3;
          const x = Math.floor(cellNumber / size);
          const y = cellNumber % size;
          console.log('cellNumber =', cellNumber);
          console.log('x=', x);
          console.log('y=', y);
          console.log('gameStatus.innerHTML=', gameStatus.innerHTML);
          console.log('this._db[x][y] =', this._db[x][y] )
          if (this._db[x][y] === 0) {
            this._db[x][y] = 1;
            this.updateTableView();
            this.showResetGame();
            this.checkWinnerCombinations();
            console.log('I am here!');
            if (!gameStatus.innerHTML) {
            this.putNought.call(this, this._db.length);
            this.updateTableView();
            this.checkWinnerCombinations(); 
        }
       } else {
          alert('This cell is already clicked! Click a blank one!')
        }
    };
}

let matrix = new Matrix();
matrix.renderTable();
matrix.getTds();
matrix.addEventListener(matrix.tdsArray, 'click', matrix.putCross);
// console.log('db222=%o', matrix._db);

