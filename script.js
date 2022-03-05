const pScore = document.getElementById("playerScore")
const cScore = document.getElementById("computerScore")
const playerSelect = document.getElementById("playerSelect")
const computerSelect = document.getElementById("computerSelect")

const message = document.getElementById("message")
const submit = document.getElementById("submit")

let playerScore = 0
let computerScore = 0

let gameActive = false;

function displayBoards(){

    const start = document.getElementById("start")
    const boards = document.getElementById("boards")
    const select = document.getElementById("select")

    start.style.display = 'none'

    boards.style.display = 'block'
    select.style.display = 'block'

    gameActive = true

}

submit.addEventListener("click",displayBoards)

function gameFlow(playerSelection){

    const winnerObject = getMeWinner(playerSelection)

    const result = winnerObject.winner

    const {compMove} = winnerObject

    displaySelection('player', playerSelection, result)
    displaySelection('computer',compMove,result)

    scoreBoard(result)
    message.innerText = result

    whoWon()
}

function displaySelection(whoIsPlaying,selection,result){

    if(whoIsPlaying === 'player'){
        playerSelect.innerHTML = `<i class="fas fa-hand-${selection}"></i>`

        if(result === 'Player Won'){
            playerSelect.style.color = 'green'
            computerSelect.style.color = 'red'
        }
    }else{
            computerSelect.innerHTML = `<i class="fas fa-hand-${selection}"></i>`

            if(result === 'Computer Won'){
                playerSelect.style.color = 'red'
                computerSelect.style.color = 'green'
            }
    }
    if(result === "Draw !"){
        computerSelect.style.color = ""
        playerSelect.style.color = ""
    }
}

function scoreBoard(result){

    if(result === 'Player Won'){
        playerScore++
        pScore.innerText = playerScore
        cScore.innerText = computerScore
    }else if(result === 'Computer Won'){
        computerScore++
        pScore.innerText = playerScore
        cScore.innerText = computerScore
    }else{
        return false
    }
}

function gameFinished(){
    if(playerScore ===5 || computerScore===5){
        return true
    }else{
        return false
    }
}

function whoWon(){

    if(gameFinished()){
        if(playerScore === 5){
            message.innerText = 'Player is winner ! Congratulations'
        }else{
            message.innerText = 'Computer is the winner ! You loose'
        }
        reset()
    }
    
}

function reset(){

    setTimeout(function(){
        playerScore = 0;
        computerScore = 0;
        computerSelect.innerHTML=''
        playerSelect.innerHTML=''
        pScore.innerText = 0;
        cScore.innerText = 0;
        gameActive = false;
    },1000)
}

function computerPlay(){

    let arr = ['rock','paper','scissors']

    let random = arr[Math.floor(Math.random()*arr.length)]

    return random
}

function playRound(ps,cs){

    if(ps === cs){
        return "Draw !"
    }else if(ps =="rock" && cs == "scissors"){
        return "Player Won"
    }else if(ps == "rock" && cs == "paper"){
        return "Computer Won"
    }else if(ps == "paper" && cs == "scissors"){
        return "Computer Won"
    }else if(ps == "paper" && cs == "rock"){
        return "Player Won"
    }else if(ps == "scissors" && cs == "rock"){
        return "Computer Won"
    }else if(ps == "scissors" && cs== "paper"){
        return "Player Won"
    }
}

function getMeWinner(playerSelection){
    let computerSelection = computerPlay()
    let winner = playRound(playerSelection,computerSelection)

    return({
        winner : winner,
        compMove : computerSelection
    })
}

const rock = document.getElementById("rock")
const paper = document.getElementById("paper")
const scissors = document.getElementById("scissors")

rock.addEventListener("click",()=>gameFlow(rock.id))
paper.addEventListener("click",()=>gameFlow(paper.id))
scissors.addEventListener("click",()=>gameFlow(scissors.id))

