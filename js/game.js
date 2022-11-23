'use strict'
const MINES = '💣'
var gBoard = 3

var gCell = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: true


}
var gMINESCOUNT = 0
var isShawn = true



function initGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)
}
function buildBoard() {
    var size = gBoard
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = '⬜'
        }
    }
    board[0][2] = MINES

    board[2][0] = MINES
    setMinesNegsCount(board)
    // console.log(board)
    return board
}
function renderBoard(mat) {
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td onclick="cellClicked(this, ${i}, ${j})" data-i="${i}" data-j="${j}",${Event} class="${className}">
            ${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}
function setMinesNegsCount(board) {
    console.log(board)
    var newBoard = []
    for (var i = 0; i < board.length; i++) {
        var currCell = board[i]
        newBoard.push([])
        for (var j = 0; j < board[0].length; j++) {
            currCell = board[i][j]
            if (currCell === MINES) {
                newBoard[i][j] = i, j
                gMINESCOUNT++
                console.log(gMINESCOUNT)
                console.log(newBoard, newBoard)
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
            if (cell === MINES) {
                count++
                gCell.minesAroundCount = count
                console.log(gCell)
            }
        }
    }
    console.log(count)
}

function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j]
    if (cell === MINES) {
        gCell.isShown = true
        console.log(gCell)
    }
    numOfMinesArounMe(elCell, i, j)
}

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}
