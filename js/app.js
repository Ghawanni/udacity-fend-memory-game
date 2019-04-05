/*
 * Create a list that holds all of your cards
 */

// var cards = document.querySelectorAll(".deck li");
let numMoves = 0;
let cardDeck = [];
let openCards = [];
let cardsClasses = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bomb',
    'fa-bicycle',
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bomb',
    'fa-bicycle'
];
let timerStarted = false;
let timerInterval;
let timer = 0;
let matchedCards = 0;
let totalCards = 0;
let gameFinished = true;
let timerHtml = document.querySelector('.fa-clock-o');
console.log(timerHtml);
let stars = document.querySelector('.stars');
let starsList = stars.querySelectorAll('li .fa-star');
let movesDisplay = document.querySelector('.moves');

restart();
let restartBtn = document.getElementsByClassName('restart')[0];
restartBtn.addEventListener('click', restart);

function _listener() {
    cardClicked(this);
};

//* Display the cards on the page
//*   - shuffle the list of cards using the provided "shuffle" method below

function restart() {
    matchedCards = 0;
    timer = 0;
    numMoves = 0;
    counterStarted = false;
    timerHtml.innerHTML = timer;
    clearInterval(timerInterval);

    movesDisplay.innerHTML = "Moves:" + numMoves;

    while(stars.children.length < 3){
        stars.innerHTML += ('<li><i class="fa fa-star"></i></li>');
    }
    cardsClasses = shuffle(cardsClasses);

    //*   - loop through each card and create its HTML

    let board = document.querySelector('.deck');

    while (board.firstChild) {
        board.removeChild(board.firstChild);
        //  console.log(board);
    }

    //*   - add each card's HTML to the page
    for (let i = 0; i < cardsClasses.length; i++) {
        let card = document.createElement('li');
        card.classList.add('card');
        let cardContent = document.createElement('i');
        cardContent.classList.add('fa');
        cardContent.classList.add(cardsClasses[i]);
        card.appendChild(cardContent);

        card.addEventListener("click", _listener);
        cardDeck.push(card);

        board.appendChild(card);

    }

        //save total number of cards
        totalCards = cardDeck.length;
}





// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// action fire if the card is clicked
function cardClicked(card) {
    if(!timerStarted){
        timerStarted = true;
        startTimer();
    }
    openCards.push(card);
    card.classList.add('open');
    card.classList.add('show');
    card.classList.add('stop-mouse');
    if (openCards.length > 1) {
        //disable mouse
        cardDeck.forEach(card => {
            card.classList.add('stop-mouse');
        })
        setTimeout(checkOpenCards, 1000)
    }
}


function checkOpenCards() {

    // check if the open cards are correct
    if (openCards[0].firstChild.classList[1] === openCards[1].firstChild.classList[1]) {
        openCards.forEach(card => {
            card.classList.add('match');
            matchedCards ++;
            console.log("matched cards= " + matchedCards + "\t total cards= " + totalCards);
        });
    } else {
        openCards.forEach(card => {
            card.classList.remove('open');
            card.classList.remove('show');
        });
        numMoves++;
        movesDisplay.innerHTML = "Moves: " + numMoves;
        if (numMoves % 3 == 0 && numMoves > 0) {
            if (stars.children.length > 1) {
                stars.children[0].remove();
            }
        }
    }
    cardDeck.forEach(card => {
        // console.log(card.classList + ' has contains class: ' + card.classList.contains('match'));
        if (!card.classList.contains('match')) {
            gameFinished = false;
            card.classList.remove('stop-mouse');
        }
    })

    if(matchedCards == totalCards){
        gameFinished = true;
        finishGame();
    }

    openCards = [];
}

function startTimer(){
    timerInterval = setInterval(() => {
        timer++;
        timerHtml.innerHTML = timer;
    }, 1000);
}

function finishGame(){
    clearInterval(timerInterval);
    $('#win-modal').modal();
    document.querySelector('#move-win').innerHTML = 'Total number of moves:' + numMoves;
    document.querySelector('#time-win').innerHTML = 'Time to win:' + timer;
    document.querySelector('#star-rating-win').innerHTML = 'You star rating:' + stars.innerHTML;
}