'use strict'
const MINES = '💣'
var gBoard = 10
var gMINESCOUNT = 0
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
    board[7][6] = MINES
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

            strHTML += `<td data-i="${i}" data-j="${j}" class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}
function setMinesNegsCount(board) {
    console.log(board)
    for (var i = 0; i < board.length; i++) {
        var currCell = board[i]
        for (var j = 0; j < board[0].length; j++) {
            currCell = board[i][j]
            if (currCell[i + 1])
                if (currCell === MINES) gMINESCOUNT++
        }
    }
    console.log(gMINESCOUNT)
}






function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}