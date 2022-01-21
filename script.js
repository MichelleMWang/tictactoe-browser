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
    let _score = 0; 
    const chooseMark = () => {
        if (document.getElementById('x-button').checked) {
            _mark = 'X'; 
            return true; 
        }
        else if (document.getElementById('o-button').checked){
            _mark = 'O'; 
            return true; 
        } else return false; 
    }; 
    const getMark = () => _mark; 
    const getScore = () => _score; 
    const log = () => console.log('hi'); 
    return {
        log,
        chooseMark, 
        getMark, 
        getScore
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
    const chooseMark = () => {
        const submitButton = document.querySelector('.submit-button'); 
        let chooseSection = document.querySelector('.choose-mark'); 
        
        button.addEventListener('click', () => {
            if (GamePlay.player1.chooseMark()){ 

                chooseSection.classList.add('hide');
            } else {
                let warning = document.createElement('p')
                warning.classList.add('warning'); 
                warning.textContent = 'please select a mark'; 
                chooseSection.appendChild(warning); 
            }        
        }); 
    }
    const setScores = () => {

    }

    return {
        chooseMark
    }
})(); 