'use strict'
const PACMAN = '😍'; 
// `<img src="images/pacman.PNG">`;
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
        direction: 'down'
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) updateScore(1);
    else if (nextCell === CHERRY) updateScore(10);

    else if (nextCell === GHOST) {
        if (gPacman.isSuper) killingGhost(nextLocation);
        else {
            gIsVictory = false;
            gameOver();
            renderCell(gPacman.location, EMPTY)
            return;
        }
    }
    else if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return;
        console.log('Super Mode!')
        activateSuperMode();
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    var pacmanDirrectiom =`<img class="${gPacman.direction}" src="imges/pacman.png">`
    // console.log(pacmanDirrectiom)
    renderCell(gPacman.location, pacmanDirrectiom);
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gPacman.direction = 'up';
            nextLocation.i--;
            break;
        case 'ArrowDown':
            gPacman.direction = 'down';
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            gPacman.direction = 'left';
            nextLocation.j--;
            break;
        case 'ArrowRight':
            gPacman.direction = 'right';
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}