const GameBoard = (() => {
    let _board = [9]; 
    
    const getBoard = () => _board; 
    const makeMove = (mark, index) => {
        _board[index] = mark; 
        let square = document.querySelector(`.gameboard:nth-child(${index + 1})`); 
        square.textContent = mark; 
    }; 

    return {
        getBoard, 
        makeMove, 
    }; 
})(); 

const Player = () => {
    let _mark = ''; 
    const chooseMark = () => {
        if (document.getElementById('x-button').checked) _mark = 'X'; 
        else _mark = 'O'; 
    }; 
    const getMark = () => _mark; 
    const log = () => console.log('hi'); 
    return {
        log,
        chooseMark, 
        getMark
    }; 
}; 

const GamePlay = (() => {
    let player1 = Player(); 
    let player2 = Player(); 
    return {
        player1, 
        player2 
    }; 
})(); 

const DisplayController = (() => {
    const submitButton = document.querySelector('.submit-button'); 
    submitButton.addEventListener('click', () => GamePlay.player1.chooseMark()); 
})(); 