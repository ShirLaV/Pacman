function printMat(mat, selector) {
  var strHTML = '';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      if (i===3 && j===5) {
        cell =`<img src="imges/pacman.png">`
      }
      if(i===0 || i===mat.length-1){
        strHTML += '<td class="' + className + '" style="transform: rotate(90deg)"> ' + cell + ' </td>'
        continue;
      }
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getEmptyCells(board) {
	var emptyCells = [];
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];
			if (currCell === EMPTY) {
				emptyCells.push({ i, j });
			}
		}
	}
	// console.log('emptyCells', emptyCells)
	return emptyCells;
}