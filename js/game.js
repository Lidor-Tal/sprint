'use strict'
const MINES = '💣'
const FLAG = '🚩'
var gElCells = [];



var gCell = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: true


}
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gMINESCOUNT = 0
var isShawn = true

var gBoard

function initGame(level) {
    gBoard = []
    if (gGame.isOn === true) {
        gLevel = level
        gBoard = buildBoard(level.SIZE)
        renderBoard(gBoard)
        getRandomBombCell(gBoard)
    }
}


function buildBoard(boardSize) {
    var board = [];
    for (var i = 0; i < boardSize; i++) {
        board.push([]);
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = {
                i,
                j,
                isClicked: false,
                isMine: false,
                isMarked: false,
                minesAroundCount: 0,
            };
        }
    }
    return board;
}
function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j];
            const className = `cell cell-${i}-${j}`
            strHTML += `
        <td>
        <button class='${className}',
                id="${i}-${j}"
                data-i="${i}" 
                data-j="${j}",
               onclick="setOnClick(this, ${i}, ${j})"></button>
        </td>`;
        }
        strHTML += '</tr>';
    }
    const elBoard = document.querySelector('.board');
    elBoard.innerHTML = null;
    elBoard.innerHTML += strHTML;
    gElCells = document.querySelectorAll('.cell');
}
function setOnClick(elCell) {
    if (gGame.isOn === true) {
        // console.table(gBoard)
        var rowCell = elCell.id[0]
        var colCell = elCell.id[2]
        numOfMinesArounMe(rowCell, colCell)
        var cell = gBoard[rowCell][colCell]
        if (cell.isMine === true) {
            renderCell({ i: rowCell, j: colCell }, MINES)
            gameOver()
        }
        if (cell.isMine !== true) {
            renderCell({ i: rowCell, j: colCell }, gCell.minesAroundCount)
        }
        return
    }
}
function setMinesNegsCount(board) {
    console.table(board)
    var newBoard = []
    for (var i = 0; i < board.length; i++) {
        var currCell = board[i]
        newBoard.push([])
        for (var j = 0; j < board[0].length; j++) {
            currCell = board[i][j]
            if (currCell === MINES) {
                gMINESCOUNT++
            }

        }
    }
}
function numOfMinesArounMe(rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gBoard[0].length) continue
            var cell = gBoard[i][j]
            if (cell.isMine === true) {
                count++
            }
        }
        gCell.minesAroundCount = count
    }
    return
}
function getRandomBombCell(board) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var indexI = getRandomInt(0, gLevel.SIZE)
        var indexJ = getRandomInt(0, gLevel.SIZE)
        board[indexI][indexJ].isMine = true
        console.log(board[indexI][indexJ])
    }
}
function gameOver() {
    const el = document.getElementById("end")
    el.classList.toggle("hide")
    gGame.isOn = false
}
function gameRestart() {
    const el = document.getElementById("end")
    el.classList.toggle("hide")
    gGame.isOn = true
    initGame(gLevel)
}
function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location) // cell-i-j
    const elCell = document.querySelector(cellSelector)
    console.log(elCell)
    elCell.innerHTML = value
}
