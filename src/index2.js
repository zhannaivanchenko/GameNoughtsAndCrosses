
class Matrix {
    _db = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

}

class PlayTable {
    tdsArray = []
    
    addEventListener(element, eventName, handler) {
        if (!Array.isArray(element)) {element = [element]}
        element.forEach(e => e.addEventListener(eventName, handler.bind(this), true));

    }
    removeEventListener(element, eventName, handler) {
        if (!Array.isArray(element)) {element = [element]}
        element.forEach(e => e.removeEventListener(eventName, handler.bind(this), true));
    }

    getTds() {
        this.tdsArray = [...document.getElementsByTagName('td')];
    }

    getTableView(matrix) {
        let table = '';
        const tableStart = "<table class='play-chart-table' > ";
        const tableRow = "<tr class='chart-row'>";
        const tableRowEnd = "</tr>";
        const tableEnd =  "</table> ";
        let i = 0;

        matrix.forEach(row => { 
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

   updateTableView(matrix) {
       const cellsTable = [...document.getElementsByTagName('td')];
       let j = 0;
       matrix.forEach(row => { 
            row.forEach(cell => {
               if (cell === 1) { cellsTable[j].dataset.sign = 'cross'}
               else if (cell === 2) { cellsTable[j].dataset.sign = 'nought'}
               else {cellsTable[j].dataset.sign = ''}
               j++;
        })
    })   
   }

    renderTable(matrix) {
        const playChart = document.getElementById('chart-table');
        playChart.innerHTML = this.getTableView(matrix);
    }

}
      
class Winner {
    getColumns(matrix) {
        let columnsArray = [];
        columnsArray = matrix.map((el, i)=> el.map((_, j)=> matrix[j][i]));
        return columnsArray;
    }
      
    getDiagonals(matrix) {
        const size = matrix.length;  
        const diagonalsArray = [[],[]];
          for (let i=0; i<size; i++) {
            for (let j=0; j<size; j++) {
              if (i === j) { diagonalsArray[0].push(matrix[i][j]); 
              }}
          }
          for (let i= size-1; i>=0; i-- ) {
            for (let j=0; j<matrix.length; j++) {
              if ((i + j) === (size - 1)) { diagonalsArray[1].push(matrix[i][j]) ;
            }}
          }
        return diagonalsArray;  
    }   
    
    checkWinner(matrix) {
            const isCrossWin = matrix.some(row => row.every(cell => cell === 1));
            const isNoughtWin = matrix.some(row => row.every(cell => cell === 2));
            if (isCrossWin) { game.gameOver('cross') }
            else if (isNoughtWin) { game.gameOver('nought') };
    }
        
    checkWinnerCombinations(matrix) {
          const columns = this.getColumns(matrix);
          const diagonals = this.getDiagonals(matrix);
          this.checkWinner(matrix);
          this.checkWinner(columns);
          this.checkWinner(diagonals);
      }   
}  
    
class Game {
    gameStatus = document.getElementById('game-status'); 
    startButton = document.getElementById('button-start');

    addEventListener(element, eventName, handler) {
        element.addEventListener(eventName, handler.bind(this), true);
    }
    
    showResetGame() {
        this.startButton.innerHTML = 'Reset game!';
        this.addEventListener(this.startButton, 'click', this.resetGame);
    }
     
    resetGame(matrix) {
        // this.removeEventListener(this.tdsArray, 'click', this.putCross);
        for (let i=0; i<matrix.length; i++) {
            for (let j=0; j<matrix[i].length; j++) {
                matrix[i][j] = 0;
            }
        }
        // this.addEventListener(this.tdsArray, 'click', this.putCross);
        this.gameStatus.innerHTML = '';
        this.startButton.innerHTML = 'Good luck!'; 
        playTable.updateTableView(matrix); 
    };

    gameOver(sign) {
        if (sign === "cross") {
              this.gameStatus.innerHTML = 'You won! Play again?';
              this.gameStatus.classList.add('wonStatus');
            //   this.removeEventListener(array, 'click', this.putCross);
            } else if (sign === "nought") {
              this.gameStatus.innerHTML = 'Computer won! Play Again?';
              this.gameStatus.classList.add('lostStatus');
            //   this.removeEventListener(array, 'click', this.putCross);
          }
        }

    checkGameStatus() {
        console.log('gamestatus2=%o', this.gameStatus); 
        return this.gameStatus.innerHTML ? false : true;
        }

    noPlaceToGo(matrix) {
        if (matrix.forEach(row => row.forEach(el => el !== 0))) { 
        this.gameStatus.innerHTML = 'No place to go! Restart the game!';
        } else {return;}
    } 
}   
    
 
class Nought {
    getNoughtCelllNumber() {
        const min = 0;
        const max = 8;
        const cellNumber = Math.floor(Math.random()*(max-min)+min);
        return cellNumber;
    }
    
    putNought(size, matrix) {
        const cellNumber = this.getNoughtCelllNumber();
        const x = Math.floor(cellNumber / size);
        const y = cellNumber % size;
        console.log('cellNumber=', cellNumber);
        console.log('x=', x);
        console.log('y=', y);
        if(matrix[x][y] === 0) {
            matrix[x][y] = 2;
           
           }
         else {
        this.putNought(size, matrix);
      }  
   }
}
    
class Cross {
 
    putCross(e) {
        
        const size = 3;
        const cellNumber = e.currentTarget.id;
        const x = Math.floor(cellNumber / size);
        const y = cellNumber % size;
        console.log('cellNumber =', cellNumber);
        console.log('x=', x);
        console.log('y=', y);
        
        if (matrix._db[x][y] === 0) {
            matrix._db[x][y] = 1;
            playTable.updateTableView(matrix._db);
            game.showResetGame();
            winner.checkWinnerCombinations(matrix._db, game.gameOver);
            game.noPlaceToGo(matrix._db);
            console.log('checkGamestatus=', game.checkGameStatus() )
            if (game.checkGameStatus()) {
                nought.putNought(3, matrix._db);
                playTable.updateTableView(matrix._db);
                winner.checkWinnerCombinations(matrix._db, game.gameOver);
                game.noPlaceToGo(matrix._db);
            }
            } else {
                alert('This cell is already clicked! Click a blank one!');
                }
            }
        }

const matrix = new Matrix();
const playTable = new PlayTable();
const cross = new Cross();
const nought = new Nought();
const winner = new Winner();
const game = new Game();


playTable.renderTable(matrix._db);
playTable.getTds();
playTable.addEventListener(playTable.tdsArray, 'click', cross.putCross.bind(this));


    // cross.putCross(e, matrix._db);
    // console.log('I ran putCross function');
    // playTable.updateTableView(matrix._db);
    // game.showResetGame();
    // winner.checkWinnerCombinations(matrix._db, game.gameOver);
    // game.noPlaceToGo(matrix._db);
    // if (game.checkGameStatus()) {
    //     nought.putNought(3, matrix._db);
    //     playTable.updateTableView(matrix._db);
    //     winner.checkWinnerCombinations(matrix._db, game.gameOver);
    //     game.noPlaceToGo(matrix._db);
    // }



   
