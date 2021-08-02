'use strict'
const WALL = '|'
const FOOD = '*'
const EMPTY = ' ';
const POWER_FOOD = '⚪';
const CHERRY = '🍒'

var gBoard;
var gTotalFoodCount;
var gIsVictory;
var gSuperGhostInterval;
var gCherryPos;
var gCherryInterval;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    // console.log('hello')
    gTotalFoodCount = -1;
    gGame.score = 0;
    document.querySelector('h2 span').innerText = gGame.score
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.game-board')
    gCherryInterval = setInterval(addCherry, 6000)
    gGame.isOn = true;
}
function buildBoard() {
    var SIZE = 12;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 2 && i !== 7 && i > 1 && i < SIZE - 2) ||
                (j === 6 && i !== 6 && i > 1 && i < SIZE - 1)
                || (j === 9 && i !== 4 && i > 1 && i < SIZE - 2)) {
                board[i][j] = WALL;
            } else if ((i === 1 && (j === 1 || j === SIZE - 2)) || (i === SIZE - 2 && (j === 1 || j === SIZE - 2))) {
                board[i][j] = POWER_FOOD;
            } else {
                board[i][j] = FOOD;
                gTotalFoodCount++;
            }
        }
    }
    console.log('gTotalFoodCount', gTotalFoodCount);
    return board;
}
function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
    if (gTotalFoodCount <= gGame.score) {
        gIsVictory = true;
        gameOver();
    }
}
function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    openModal();
}
function newGame() {
    closeModal();
    clearInterval(gIntervalGhosts);
    init();
}
function openModal() {
    var elModal = document.querySelector('.modal');
    var annoucment = (gIsVictory) ? '✨YOU WON!✨' : '💀GAME OVER!💀';
    document.querySelector('.modal h1').innerText = annoucment;
    elModal.style.display = 'block';
}
function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}
function activateSuperMode() {
    gPacman.isSuper = true;
    gSuperGhostInterval = setInterval(chageGhostSuperColor);
    setTimeout(endSuperMode, 5000);
}
function endSuperMode() {
    gPacman.isSuper = false;
    clearInterval(gSuperGhostInterval);
    gGhosts = gGhosts.concat(gDeadGhosts);
    gDeadGhosts = [];
}
function chageGhostSuperColor() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        var ghostSuperHTML = `<span style="color: #0000FF">${GHOST}</span>`
        renderCell(ghost.location, ghostSuperHTML);
    }
}
function addCherry() {
    var emptyCells = getEmptyCells(gBoard);
    if (emptyCells.length === 0) return;
    var randomIdx = getRandomInt(0, emptyCells.length);
    var iIdx = emptyCells[randomIdx].i;
    var jIdx = emptyCells[randomIdx].j;
    gCherryPos = { i: iIdx, j: jIdx };
    gBoard[iIdx][jIdx] = CHERRY;
    renderCell(gCherryPos, CHERRY);
    gTotalFoodCount += 10;
}




