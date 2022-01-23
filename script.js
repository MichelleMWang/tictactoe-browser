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
                //console.log(_board); 
                GamePlay.win(GamePlay.getTurn()); 
            } else if (GamePlay.getTurns() == 9){ // draw -- no one won but last 
                console.log('it was a draw!');
                GamePlay.draw(); 
            } else {
                GamePlay.changeTurns(); 
            }
        }
    }; 
    const clearBoard = () => {
        _board = []; 
    }

    return {
        getBoard, 
        makeMove, 
        getField, 
        clearBoard 
    }; 
})(); 

//factories are like classes, modules are like static classes
const Player = (id) => {
    let _id = id; 
    let _mark = ''; 
    //let _score = 0; 
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
    const getName = () => _name; 
    const getID = () => _id; 
    return {
        chooseMark, 
        getMark, 
        getName, 
        getID
    }; 
}; 

const GamePlay = (() => {
    let player1 = Player(1); 
    let player2 = Player(2); 
    let _turns = 0; 
    let _turn = player1; 

    const changeTurns = () => {
        _turns++; 
        if (_turns % 2 == 0) _turn = player1; 
        else _turn = player2; 
    }
    const getTurn = () => _turn; 
    const getTurns = () => _turns; 

    //checking for wins
    const _checkRows = () => {
        for (let i = 0; i < 3; i+=3){
            let row = []; 
            for (let j = i; j < i + 3; j++){
                row.push(GameBoard.getField(j)); 
            }
            if (row.every(field => field == _turn.getMark())) return true; 
        }
        return false; 
    }

    const _checkCols = () => {
        for (let i = 0; i < 3; i++){
            let col = []; 
            for (let j = i; j < i+3+3+1; j+=3){
                col.push(GameBoard.getField(j)); 
            }
            if (col.every(field => field == _turn.getMark())) return true; 
        }
        return false; 
    }

    const _checkDiag = () => {
        if (GameBoard.getField(0) == _turn.getMark() && GameBoard.getField(4) == _turn.getMark() && GameBoard.getField(8) == _turn.getMark()) return true; 
        else if (GameBoard.getField(2) == _turn.getMark() && GameBoard.getField(4) == _turn.getMark() && GameBoard.getField(6) == _turn.getMark()) return true; 
        else return false; 
    }

    const checkWin = () => {
        if (_checkCols() || _checkRows() || _checkDiag()) {
            //console.log('cols: ' + _checkCols() + ' rows: ' + _checkRows() + ' diags: ' + _checkDiag()); 
            return true; 
        }
        else return false; 
    }

    const win = (player) => {
        _turns = 0; 
        GameBoard.clearBoard(); //clears array 
        DisplayController.setScores(player); //updates score
        DisplayController.clearBoard(); //clears buttons 
        
    }
    const draw = () => {
        _turns = 0; 
        GameBoard.clearBoard();
        DisplayController.clearBoard(); 
    }

    return {
        player1, 
        player2, 
        getTurn, 
        getTurns,
        changeTurns, 
        checkWin, 
        win, 
        draw
    }; 
})(); 

const DisplayController = (() => {
    const submitButton = document.querySelector('.submit-button'); 
    let chooseSection = document.querySelector('.second-section'); 
    let scoresSection = document.querySelector('.scores-section'); 
    let gameBoard = document.querySelector('.game'); 
    let boardBoxes = document.querySelectorAll('.board-square'); 
        
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
        
        boardBoxes.forEach(box => {
            box.addEventListener('click', () => {
                let id = box.id; 
                let mark = GamePlay.getTurn().getMark(); 
                GameBoard.makeMove(mark, id); 
            }); 
        }); 

    }
    const setScores = (player) => {
        let currScore = document.getElementById(`p${player.getID()}-score`); 
        let newScore = parseInt(currScore.textContent); 
        newScore++; 
        currScore.textContent = newScore; 
    }
    const clearBoard = () => {
        boardBoxes.forEach(box => box.textContent = ''); 
    }

    return {
        initializeGame, 
        setScores, 
        clearBoard
    }
})(); 