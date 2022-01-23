const GameBoard = (() => {
    let _board = []; 
    
    const getBoard = () => _board; 
    const makeMove = (mark, index) => {
        if (!_board[index]){
            _board[index] = mark; 
            let square = document.getElementById(index);
            square.textContent = mark; 
            GamePlay.changeTurns(); 
        }
    }; 

    return {
        getBoard, 
        makeMove, 
    }; 
})(); 

//factories are like classes, modules are like static classes
const Player = (id) => {
    let _id = id; 
    let _mark = ''; 
    let _score = 0; 
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
    return {
        chooseMark, 
        getMark, 
        getScore
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

    return {
        player1, 
        player2, 
        getTurn, 
        getTurns,
        changeTurns
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