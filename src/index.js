(function () { 

  const tds = document.getElementsByTagName ('td');
  const tdsArray = Array.from(tds);
  const startButton = document.getElementById('button-start');
  const gameStatus = document.getElementById('game-status');

tdsArray.forEach(e => e.addEventListener('click', putCross));
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

function checkWinner() {
  if (tdsArray[0].dataset.sign && tdsArray[0].dataset.sign === tdsArray[1].dataset.sign && tdsArray[0].dataset.sign === tdsArray[2].dataset.sign ) {
    winnerSign = tdsArray[0].dataset.sign;
    gameOver(winnerSign);
  } else if (tdsArray[3].dataset.sign && tdsArray[3].dataset.sign === tdsArray[4].dataset.sign && tdsArray[3].dataset.sign === tdsArray[5].dataset.sign ) {
    winnerSign = tdsArray[3].dataset.sign;
    gameOver(winnerSign);
} else if (tdsArray[6].dataset.sign && tdsArray[6].dataset.sign === tdsArray[7].dataset.sign && tdsArray[6].dataset.sign === tdsArray[8].dataset.sign ) {
    winnerSign = tdsArray[6].dataset.sign;
    gameOver(winnerSign);
} else if (tdsArray[0].dataset.sign && tdsArray[0].dataset.sign === tdsArray[5].dataset.sign && tdsArray[0].dataset.sign === tdsArray[8].dataset.sign ) {
  winnerSign = tdsArray[0].dataset.sign;
  gameOver(winnerSign);
} else if (tdsArray[6].dataset.sign && tdsArray[6].dataset.sign === tdsArray[4].dataset.sign && tdsArray[6].dataset.sign === tdsArray[2].dataset.sign ) {
  winnerSign = tdsArray[6].dataset.sign;
  gameOver(winnerSign);
} else if (tdsArray[0].dataset.sign && tdsArray[0].dataset.sign === tdsArray[3].dataset.sign && tdsArray[0].dataset.sign === tdsArray[6].dataset.sign ) {
  winnerSign = tdsArray[0].dataset.sign;
  gameOver(winnerSign);
} else if (tdsArray[1].dataset.sign && tdsArray[1].dataset.sign === tdsArray[4].dataset.sign && tdsArray[1].dataset.sign === tdsArray[7].dataset.sign ) {
  winnerSign = tdsArray[1].dataset.sign;
  gameOver(winnerSign);
} else if (tdsArray[2].dataset.sign && tdsArray[2].dataset.sign === tdsArray[5].dataset.sign && tdsArray[2].dataset.sign === tdsArray[8].dataset.sign ) {
  winnerSign = tdsArray[2].dataset.sign;
  gameOver(winnerSign);
}
}

function resetGame() {
  tdsArray.forEach(e => e.dataset.sign = '');
  tdsArray.forEach(e => e.addEventListener('click', putCross));
  gameStatus.innerHTML = '';
  startButton.innerHTML = 'Good luck!';
};

function putNought() {
  const min = 1;
  const max = 9;
  const cellNumber = Math.floor(Math.random()*(max-min)+min);
  const cellNought = document.getElementById(`cell-${cellNumber}`);
  if (!isClicked(cellNought)) { 
  cellNought.dataset.sign = 'nought';
} else if (tdsArray.every(e => isClicked(e))) { 
  gameStatus.innerHTML = 'No place to go! Restart the game!';
  tdsArray.forEach(e => e.removeEventListener('click', putCross));
} 
else {
  putNought();
}  
};

function putCross(e) {
  if (!isClicked(e.currentTarget)) {
    e.currentTarget.dataset.sign = 'cross';
    startButton.innerHTML = 'Reset game!';
    checkWinner();
    if (gameStatus.innerHTML === '') {
    putNought();
    checkWinner(); 
  }
 } else {
    alert('This cell is already clicked! Click a blank one!')
  } 

};

})()
