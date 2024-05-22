class newWin{
    constructor(betValue, multi, prize){
        this.betValue = betValue;
        this.multi = multi;
        this.prize = prize;
    }
}

function balanceMod(bet) {
    if (bet <= balance) {
        balance = balance - bet;
        spin();
        userInfo.innerText = "User: " + username +"\n Balance: " + balance;
    } else if (balance == 0) {
        userInfo.innerText = "NO MORE BALANCE";
    } else {
        userInfo.innerText = "User: " + username +"\n Balance: " + balance;
    }
}

function spin() {
    generateDivs();
    let figValA = 0;
    let figValB = 0;
    let figValC = 0;
    for (let i = 0; i < 3; i++) {
        let colorPicker = rng();
        if (colorPicker > 9000) {
            figura = document.getElementById("fig" + (i + 1));
            figura.className += " cian";
            figValA++;
        } else if (colorPicker < 6999 && colorPicker > 3000) {
            figura = document.getElementById("fig" + (i + 1));
            figura.className += " naranja";
            figValB++;
        } else {
            figura = document.getElementById("fig" + (i + 1));
            figura.className += " amarillo";
            figValC++;
        }
    }
    prizeFnc(figValA, figValB, figValC);
}

function prizeFnc(a, b, c) {
    if (a == 3) {
        balance = balance + (bet * 100);
        winText.innerText = "You won: " + (bet * 100);
        const win = new newWin(bet, "x100", (bet*100));
        winsArray.push(win);
        generateWinCards();
    } else if (b == 3) {
        balance = balance + (bet * 5);
        winText.innerText = "You won: " + (bet * 5);
        const win = new newWin(bet, "x5", (bet*5));
        winsArray.push(win);
        generateWinCards();
    } else if (c == 3) {
        balance = balance + (bet * 2);
        winText.innerText = "You won: " + (bet * 2);
        const win = new newWin(bet, "x2", (bet*2));
        winsArray.push(win);
        generateWinCards();
    } else {
        winText.innerText = "You won: 0";
    }
    if (winsArray.length > 5) {
        winsArray.shift();
    }
    
}

function generateWinCards() {
    const winsShowcase = document.getElementById("array-showcase");
    localStorage.setItem("spinWins", JSON.stringify(winsArray));
    let winnerSpin = JSON.parse(localStorage.getItem("spinWins"));
    while (winsShowcase.firstChild) {
        winsShowcase.removeChild(winsShowcase.firstChild);
    }
    for(i = 0 ; i < winnerSpin.length ; i++){
        let value = winnerSpin[i];
        const winCard = document.createElement("div");
        const winInfo = document.createElement("p");
        winsShowcase.appendChild(winCard);
        winCard.appendChild(winInfo);
        winCard.className = "card";
        winInfo.innerText = "$" + value["betValue"];
        winInfo.innerText += value["multi"];
        winInfo.innerText += "\n $" + value["prize"];
    }
}

function generateDivs() {
    const sectionContainer = document.getElementById("cont-fig");
    while (sectionContainer.firstChild) {
        sectionContainer.removeChild(sectionContainer.firstChild);
    }
    for (let i = 0; i < 3; i++) {
        const newDiv = document.createElement("div");
        const figCont = document.createElement("div");
        sectionContainer.appendChild(newDiv);
        newDiv.appendChild(figCont);
        newDiv.className = "figuras";
        figCont.className = "fig";
        figCont.id = "fig" + (i + 1);
    }
}

function rng() {
    let numRandom = parseInt(Math.random() * 10000);
    return numRandom;
}

function modBet(betBtnClick) {
    if (betBtnClick == "-" && bet > 1) {
        bet -= 1.5;
    } else if (betBtnClick == "+") {
        bet += 1.5;
    } else {
        bet = 0.5;
    }
    const betPrice = document.getElementById("bet-price");
    betPrice.innerText = bet;
}

function logFnc(e){
    e.preventDefault();
    let form = e.target;
    username = form.children[0].value;
    balance = parseInt(form.children[1].value);
    const loginSection = document.getElementById("section-login");
    const slotSection = document.getElementById("section-slot");
    slotSection.className = "a";
    loginSection.className += " displayNone";
    winsShowcase.className = "a";
    h2.className = "a";
}

function addBalanceFnc() {
    balanceForm.className = "a";
    addBalance.className += " displayNone";
}

function balFnc(e) {
    e.preventDefault();
    let balForm = e.target;
    balance = parseInt(balForm.children[0].value) + balance;
    userInfo.innerText = "User: " + username +"\n Balance: " + balance;
    balanceForm.className = " displayNone";
    addBalance.className += "a";
}

let winsArray = [];
let bet = 0.5;
let username = form.children[0].value;
let balance = form.children[1].value;
let colWins = JSON.parse(localStorage.getItem("spinWins"));

const slotSpin = document.getElementById("btn");
const betHolder = document.getElementById("bet-holder");
const formulary = document.getElementById("form");
const submitButton = document.getElementById("submitBtn");
const infoBox = document.getElementById("message-box");
const winLog = document.getElementById("win-log");
const balanceForm = document.getElementById("add-balance-form");
const balanceFormSubmit = document.getElementById("submit-balance-btn");
const winsShowcase = document.getElementById("array-showcase");
const h2 = document.getElementById("h2");

const plusBtn = document.createElement("button");
const showBet = document.createElement("p");
const subBtn = document.createElement("button");
const userInfo = document.createElement("p");
const addBalance = document.createElement("button");
const winText = document.createElement("p");


betHolder.appendChild(plusBtn);
betHolder.appendChild(showBet);
betHolder.appendChild(subBtn);
infoBox.appendChild(addBalance);
infoBox.appendChild(userInfo);
winLog.appendChild(winText);

plusBtn.innerText = "+";
subBtn.innerText = "-";
showBet.innerText = bet;
addBalance.innerText = "Add Balance";

showBet.id = "bet-price";
plusBtn.className = "btn btn-primary betBtn";
subBtn.className = "btn btn-primary betBtn2";
addBalance.className = "btn btn-primary";
balanceFormSubmit.className = "btn btn-primary";

slotSpin.onclick = () => balanceMod(bet);
plusBtn.onclick = () => modBet("+");
subBtn.onclick = () => modBet("-");
formulary.onsubmit = logFnc;
balanceForm.onsubmit = balFnc;
addBalance.onclick = () => addBalanceFnc();