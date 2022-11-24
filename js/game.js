'use strict'
const MINES = '💣'
const FLAG = '🚩'

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

function initGame() {
    if (gGame.isOn === true) {
        gBoard = buildBoard()
        renderBoard(gBoard)
        getRandomBombCell(gBoard)
        // cellRightClicked(gBoard)
    }
}


function buildBoard() {
    var size = gLevel.SIZE
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = '⬜'
        }
    }
    setMinesNegsCount(board)

    return board
}
function renderBoard(mat) {
    var strHTML = '<table border="1"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td 
            onclick="cellClicked(this, ${i}, ${j})" data-i="${i}" data-j="${j}", class="${className}">
            ${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
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
                // console.log(gMINESCOUNT)
            }

        }
    }
}
function numOfMinesArounMe(board, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gBoard[0].length) continue
            var cell = gBoard[i][j]
            // console.log(cell)
            if (cell === MINES) {
                count++
            }
            gCell.minesAroundCount = count

        }
    }
}
function getRandomBombCell(board) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var indexI = getRandomInt(0, gLevel.SIZE)
        var indexJ = getRandomInt(0, gLevel.SIZE)
        board[indexI][indexJ] = MINES
    }
}

function cellClicked(elCell, i, j) {
    elCell.oncontextmenu = function (e) {
        e.preventDefault()
        addFlag()
    }
    // cellRightClicked(i, j)
    if (gGame.isOn === true) {
        if (cellClicked)
            numOfMinesArounMe(elCell, i, j)

        renderCell({ i: i, j: j }, gCell.minesAroundCount)
        var cell = gBoard[i][j]
        if (cell === MINES) {
            gCell.isMine = true
            renderCell({ i: i, j: j }, MINES)
            gGame.isOn = false
            gameOver()
        }
        return
    }
}
function gameOver() {
    if (gGame.isOn === false)
        var myBtn = document.getElementById('mybtn')
    myBtn.addEventListener("click", gameRestart)
}
function gameRestart() {
    gGame.isOn = true
    gBoard = buildBoard()
    renderBoard(gBoard)
    getRandomBombCell(gBoard)
    gCell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: true
    }
}
function addFlag(gBoard) {
    gBoard.classList.toggle('FLAG')
    gBoard.innerHTML = '🚩'
}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

// function start() {
//     stop();
//     value = 0;
//     timerInterval = setInterval(changeValue, 1000);
// }
// var stop = function () {
//     clearInterval(timerInterval);
// }
