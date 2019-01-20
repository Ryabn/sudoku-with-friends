import './style.css'
import './share-modal.css'
import './sudoku-board.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import sudoku from 'sudoku'

const SUDOKU_BOARD_LENGTH = 81;
const SUDOKU_SUBGRID_LENGTH = 9;
let sudokuInit, sudokuSolution;

document.addEventListener("DOMContentLoaded", function(event) {
    let options = {};
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, options);
    createShare(window.location.href);
    createSudokuBoard();
    document.getElementById('sudoku-submit').addEventListener('click', checkSolution);
});

function createSudokuBoard(){
    sudokuInit  = sudoku.makepuzzle();
    sudokuSolution = sudoku.solvepuzzle(sudokuInit);
    generateBoard();
    console.log(sudokuInit);
}
function generateBoard(){
    let boardHTML = ``;
    // for(let i = 0; i < SUDOKU_SUBGRID_LENGTH; i++){
    //     boardHTML += `<div class="sudoku-board--region">`;
    //     for(let j = 0; j < SUDOKU_SUBGRID_LENGTH; j++){
    //         let index = i * SUDOKU_SUBGRID_LENGTH + j;
    //         boardHTML += `<div class="sudoku-board--block valign-wrapper">${
    //             sudokuInit[index] == null
    //             ?`<input id="block-${index}" class="sudoku-block--value">`
    //             : `<div id="block-${index}" class="sudoku-block--value">${sudokuInit[index] + 1}</div>`
    //         }</div>`;
    //     }
    //     boardHTML += `</div>`;
    // }
    for(let i = 0; i < 3; i++){
        // current index is i*27;
        for(let j = 0; j < 3; j++){
            boardHTML += `<div class="sudoku-board--region">`;
            for(let k = 0; k < 3; k++){
                for(let l = 0; l < 3; l++){
                    let index = (i*27) + (j*3) + (k*9) + l;
                    boardHTML += `<div class="sudoku-board--block valign-wrapper">${
                        sudokuInit[index] == null
                            ?`<input id="block-${index}" class="sudoku-block--value">`
                            : `<div id="block-${index}" class="sudoku-block--value">${sudokuInit[index] + 1}</div>`
                    }</div>`;
                }
            }
            boardHTML += `</div>`;
        }
    }
    document.getElementById('sudoku-board').insertAdjacentHTML("beforeend", boardHTML);
}
function checkSolution(){
    let userSudoku = getUserSolution();
    console.log(userSudoku);
    if(answerMatches(userSudoku)){
        console.log("Matches!");
    }else{
        console.log("Incorrect!");
        console.log(sudokuSolution);
    }
}
function getUserSolution(){
    let userSolution = sudokuInit;
    for(let i = 0; i < userSolution.length; i++){
        if(document.getElementById(`block-${i}`).tagName === 'INPUT'){
            userSolution[i] = parseInt(document.getElementById(`block-${i}`).value) - 1;
        }
    }
    return userSolution;
}
function answerMatches(userSudoku){
    for( let i = 0; i < SUDOKU_BOARD_LENGTH; i++ ){
        if(userSudoku[i] !== sudokuSolution[i]){
            return false;
        }
    }
    return true;
}
function createShare(link){
    let templ = `                
    <div id="copy-url">
        <i class="material-icons link-icon" onclick="navigator.clipboard.writeText('${link}'); M.toast({html: 'Link copied to clipboard!'});">link</i>
        <div>${link}</div>
    </div>
    Share your plan with your friends on social media
    <div class="icons">
        <a href="mailto:?Subject=Join My Plan&amp;Body=Join My Plan! ${link}" target="_blank">
        <img src="assets/gmail.jpg" alt="Email" />
        </a>
        <a href="http://www.facebook.com/sharer.php?u=${link}" target="_blank">
            <img src="assets/facebook.jpg" alt="Facebook" />
        </a>
        <a href="https://plus.google.com/share?url=${link}" target="_blank">
            <img src="assets/google.plus.jpg" alt="Google" />
        </a>
        <a href="https://twitter.com/share?url=${link}&amp;text=Join My Plan&amp;hashtags=planmysocial" target="_blank">
            <img src="assets/twitter.jpg" alt="Twitter" />
        </a>
    </div>
    `
    document.getElementById('share-urls').insertAdjacentHTML('beforeend', templ);
    shareModal();
}
function shareModal(){
    M.Modal.getInstance(document.getElementById('share-plan')).open();
}