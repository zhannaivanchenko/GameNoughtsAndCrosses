// (function () { 

  // const tds = document.getElementsByTagName ('td');
  // const tdsArray = Array.from(tds);
  let tdsArray = [];
  const startButton = document.getElementById('button-start');
  const gameStatus = document.getElementById('game-status');

// tdsArray.forEach(e => e.addEventListener('click', putCross));
startButton.addEventListener('click', resetGame);

function isClicked(cell) {
  return cell.dataset.sign === 'cross' || cell.dataset.sign === 'nought' ? true : false;
};

function gameOver(sign) {
  if (sign === "cross") {
    gameStatus.innerHTML = 'You won! Play again?';
    gameStatus.classList.add('wonStatus');
    tdsArray.forEach(e => e.removeEventListener('click', putCross));
  } else if (sign === "nought") {
    gameStatus.innerHTML = 'Computer won! Play Again?';
    gameStatus.classList.add('lostStatus');
    tdsArray.forEach(e => e.removeEventListener('click', putCross));
}
}

function transformToMatrix(size) {
  let res = Array.from( new Array(size), function() { return []; } );;
  const cellsTable = [...document.getElementsByTagName('td')];
  const arrayOfSigns = cellsTable.map((el)=> el.dataset.sign);
  arrayOfSigns.forEach((el, i) => {
    const x = Math.floor(i / size);
    const y = i % size;
    res[x][y] = el;
  })
 return res;
}

function getColumns(array) {
  let columnsArray = [];
  columnsArray = array.map((el, i)=> el.map((_, j)=> array[j][i]));
  return columnsArray;
  }

function getDiagonals(array, size) {
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


function checkWinner(array) {
    const isCrossWin = array.some(row => row.every(data => data === 'cross'));
    const isNoughtWin = array.some(row => row.every(data => data === 'nought'));
    if (isCrossWin) { gameOver('cross') }
    else if (isNoughtWin) { gameOver('nought') };
}

function checkWinnerCombinations() {
  const result = transformToMatrix(3);
  const columns = getColumns(result);
  const diagonals = getDiagonals(result, 3);
  checkWinner(result);
  checkWinner(columns);
  checkWinner(diagonals);
}

function resetGame() {
  tdsArray.forEach(e => e.dataset.sign = '');
  tdsArray.forEach(e => e.addEventListener('click', putCross));
  gameStatus.innerHTML = '';
  startButton.innerHTML = 'Good luck!';
};

function putNought() {
 if (!tdsArray.length ) {
   const tds = document.getElementsByTagName ('td');
   tdsArray = Array.from(tds);
  }
  const min = 1;
  const max = 9;
  const cellNumber = Math.floor(Math.random()*(max-min)+min);
  const x = Math.floor(cellNumber / size);
  const y = cellNumber % size;
  // res[x][y] = el;
  

  if(this._db[x][y] === 0) {this._db[x][y] === 2}
  // document.getElementById(`${cellNumber}`);
  // if (!isClicked(cellNought)) { 
  // cellNought.dataset.sign = 'nought';
 else if (tdsArray.every(e => isClicked(e))) { 
  gameStatus.innerHTML = 'No place to go! Restart the game!';
  tdsArray.forEach(e => e.removeEventListener('click', putCross));
} 
else {
  putNought();
}  
};



// })()

function putCross(e) {
  if (!isClicked(e.currentTarget)) {
    
    e.currentTarget.dataset.sign = 'cross';
    startButton.innerHTML = 'Reset game!';
    checkWinnerCombinations();
    if (gameStatus.innerHTML === '') {
    putNought();
    checkWinnerCombinations(); 
  }
 } else {
    alert('This cell is already clicked! Click a blank one!')
  }
};

// module.exports={putCross};
