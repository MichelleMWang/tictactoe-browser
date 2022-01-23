const GameBoard = (() => {
    let _board = []; 
    
    const getBoard = () => _board; 
    const getField = (index) => _board[index]; 
    const makeMove = (mark, index) => {
        if (!_board[index]){
            _board[index] = mark; 
            let square = document.getElementById(index);
            square.textContent = mark; 
            if (GamePlay.checkWin()) { //win 
                console.log(GamePlay.getTurn() + ' won!'); 
            } else if (GamePlay.getTurns() == 9){ // draw -- no one won but last 
                console.log('it was a draw!');
            } else {
                GamePlay.changeTurns(); 
            }
        }
    }; 


    return {
        getBoard, 
        makeMove, 
        getField
    }; 
})(); 

//factories are like classes, modules are like static classes
const Player = (id) => {
    let _id = id; 
    let _mark = ''; 
    let _score = 0; 
    let _name = 'player ' + _id; 

    const chooseMark = () => {
        if (document.getElementById(`p${_id}-x-button`).checked) {
            _mark = 'X'; 
            return true; 
        }
        else if (document.getElementById(`p${_id}-o-button`).checked){
            _mark = 'O'; 
            return true; 
        } else return false; 
    }; 
    const getMark = () => _mark; 
    const getScore = () => _score; 
    const getName = () => _name; 
    return {
        chooseMark, 
        getMark, 
        getScore, 
        getName
    }; 
}; 

const GamePlay = (() => {
    let player1 = Player(1); 
    let player2 = Player(2); 
    let turns = 0; 
    let turn = player1; 

    const changeTurns = () => {
        turns++; 
        if (turns % 2 == 0) turn = player1; 
        else turn = player2; 
    }
    const getTurn = () => turn; 
    const getTurns = () => turns; 

    //checking for wins
    const _checkRows = () => {
        for (let i = 0; i < 3; i+=3){
            let row = []; 
            for (let j = i; j < i + 3; j++){
                row.push(GameBoard.getField(j)); 
            }
            if (row.every(field => field == turn.getMark())) return true; 
        }
        return false; 
    }

    const _checkCols = () => {
        for (let i = 0; i < 3; i++){
            let col = []; 
            for (let j = i; j < i + +3+3; j+=3){
                col.push(GameBoard.getField(j)); 
            }
            if (col.every(field => field == turn.getMark())) return true; 
        }
        return false; 
    }

    const _checkDiag = () => {
        if (GameBoard.getField(0) == turn.getMark() && GameBoard.getField(4) == turn.getMark() && GameBoard.getField(8) == turn.getMark()) return true; 
        else if (GameBoard.getField(2) == turn.getMark() && GameBoard.getField(4) == turn.getMark() && GameBoard.getField(6) == turn.getMark()) return true; 
        else return false; 
    }

    const checkWin = () => {
        if (_checkCols() || _checkRows() || _checkDiag()) return true; 
        else return false; 
    }

    return {
        player1, 
        player2, 
        getTurn, 
        getTurns,
        changeTurns, 
        checkWin
    }; 
})(); 

const DisplayController = (() => {
    const submitButton = document.querySelector('.submit-button'); 
    let chooseSection = document.querySelector('.second-section'); 
    let scoresSection = document.querySelector('.scores-section'); 
    let gameBoard = document.querySelector('.game'); 
        
    submitButton.addEventListener('click', () => {
        if (GamePlay.player1.chooseMark() && GamePlay.player2.chooseMark() ){ 
            GamePlay.player1.chooseMark(); 
            GamePlay.player2.chooseMark();  
            initializeGame();                   
            
        } else {
            let warning = document.createElement('p')
            warning.classList.add('warning'); 
            warning.textContent = 'please select a mark'; 
            chooseSection.appendChild(warning); 
        }        
    }); 

    const initializeGame = () => {
        chooseSection.classList.add('hide'); 
        scoresSection.classList.toggle('hide');                    
        gameBoard.classList.toggle('hide');
        
        let boardBoxes = document.querySelectorAll('.board-square'); 
        boardBoxes.forEach(box => {
            box.addEventListener('click', () => {
                let id = box.id; 
                let mark = GamePlay.getTurn().getMark(); 
                GameBoard.makeMove(mark, id); 
            }); 
        }); 

    }
    const setScores = () => {
        
    }

    return {
        initializeGame, 
        setScores
    }
})(); 