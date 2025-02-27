let currentMode = "";
let playerTurn = 1;
let chips = 100;
const deck = initializeDeck();

function startGame(mode) {
    currentMode = mode;
    document.getElementById("game-area").classList.remove("hidden");

    if (mode === 'pvp') {
        document.getElementById("toggleCards").classList.remove("hidden");
    } else {
        document.getElementById("toggleCards").classList.add("hidden");
    }

    dealCards();
}

function initializeDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    let deck = [];

    for (let suit of suits) {
        for (let value of values) {
            deck.push(`${value}${suit}.png`);
        }
    }

    return shuffle(deck);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function dealCards() {
    let player1Hand = deck.slice(0, 2);
    let player2Hand = deck.slice(2, 4);
    let communityCards = deck.slice(4, 9);

    document.getElementById("player1-hand").innerHTML = `
        <img src="${player1Hand[0]}" class="card">
        <img src="${player1Hand[1]}" class="card">
    `;
    document.getElementById("player2-hand").innerHTML = `
        <img src="${currentMode === 'pvp' ? 'RedPlaid.png' : player2Hand[0]}" class="card">
        <img src="${currentMode === 'pvp' ? 'RedPlaid.png' : player2Hand[1]}" class="card">
    `;
    document.getElementById("community-cards").innerHTML = `
        <img src="${communityCards[0]}" class="card">
        <img src="${communityCards[1]}" class="card">
        <img src="${communityCards[2]}" class="card">
        <img src="${communityCards[3]}" class="card">
        <img src="${communityCards[4]}" class="card">
    `;
}

function toggleCards() {
    document.getElementById("player1-hand").classList.toggle("hidden");
    document.getElementById("player2-hand").classList.toggle("hidden");

    playerTurn = playerTurn === 1 ? 2 : 1;
    document.getElementById("player-turn").innerText = `Player ${playerTurn}'s Turn`;
}

function placeBet(amount) {
    if (chips >= amount) {
        chips -= amount;
        document.getElementById("chip-count").innerText = chips;
    } else {
        alert("Not enough chips!");
    }
}

function fold() {
    alert(`Player ${playerTurn} folded!`);
    startGame(currentMode);
}
