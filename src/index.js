let tds = document.getElementsByTagName ('td');
console.log('tds= ', tds);

const tdsArray = Array.from(tds);
console.log('tdsArray= ', tdsArray);

const startButton = document.getElementById('button-start');

const winningConditions = [
  ['cell-1', 'cell-2', 'cell-3'],
  ['cell-4', 'cell-5', 'cell-6'],
  ['cell-7', 'cell-8', 'cell-9'],
  ['cell-1', 'cell-4', 'cell-7'],
  ['cell-2', 'cell-5', 'cell-8'],
  ['cell-3', 'cell-6', 'cell-9'],
  ['cell-1', 'cell-5', 'cell-9'],
  ['cell-3', 'cell-5', 'cell-7'],
]


function gameOver() {
  let crossArray = [];
  let noughtArray = [];
  for (var i = 0; i < tdsArray.length; i++) {
    if (tdsArray[i].outerHTML.includes('white-cross')) {
      crossArray.push(tdsArray[i].id);
    } else if (tdsArray[i].outerHTML.includes('nought')) {
      noughtArray.push(tdsArray[i].id);
    }
  } 
 for (var i = 0; i < winningConditions.length; i++)  {
   if (winningConditions[i].every( e => crossArray.includes (e))) {
     document.getElementById('game-status').innerHTML = 'You won! Play again?'
     document.getElementById('game-status').style.visibility = 'visible';
     document.getElementById('game-status').style.color = '#00ffff';
     for (var i=0; i<tds.length; i++) {
      tds[i].removeEventListener('click', putCross);
    };
   } else if (winningConditions[i].every( e => noughtArray.includes (e))){
     document.getElementById('game-status').innerHTML = 'Computer won! Play Again?';
     document.getElementById('game-status').style.color = '#eb6536';
     document.getElementById('game-status').style.visibility = 'visible';
     for (var i=0; i<tds.length; i++) {
      tds[i].removeEventListener('click', putCross);
    };
   }
 }

}


function isClicked(cell) {
  if (cell.style.backgroundImage.length !== 0 ) {
  return true 
} else {
  return false
}
};

function putNought() {
  const min = Math.ceil(1);
  const max = Math.floor(9);
  const cellNumber = Math.floor(Math.random()*(max-min)+min);
  const cellNought = document.getElementById(`cell-${cellNumber}`);
  if (!isClicked(cellNought)) { 
  cellNought.style.backgroundImage = 'url(./public/blue-nought.png)';
  cellNought.style.backgroundSize = '50%';
  cellNought.style.backgroundRepeat = 'no-repeat';
  cellNought.style.backgroundPosition = 'center';
} else {
  putNought();
} 
};


function putCross(e) {
  if (!isClicked(e.currentTarget)) {
    e.currentTarget.style.backgroundImage = 'url(./public/white-cross2.png)';
    e.currentTarget.style.backgroundSize = '50%';
    e.currentTarget.style.backgroundRepeat = 'no-repeat';
    e.currentTarget.style.backgroundPosition = 'center';
    document.getElementById('button-start').innerHTML = 'Reset game!';
    gameOver();

    if (document.getElementById('game-status').innerHTML === '') {
      putNought();
      gameOver();
    }
    
  } else {
    alert('This cell is already clicked! Click a blank one!')
  }
  
};

for (var i=0; i<tds.length; i++) {
  tds[i].addEventListener('click', putCross);
};

function resetGame() {
  for (i=0; i<tdsArray.length; i++) {
    document.getElementById(tdsArray[i].id).style.backgroundImage = '';
  }
  document.getElementById('game-status').innerHTML = '';
  document.getElementById('game-status').style.visibility = 'hidden';
  document.getElementById('button-start').innerHTML = 'Good luck!';
  for (var i=0; i<tds.length; i++) {
    tds[i].addEventListener('click', putCross);
  };
}

startButton.onclick = resetGame;








