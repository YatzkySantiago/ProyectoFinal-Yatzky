class newWin{ //Clase que genera un objeto con los datos de cada tirada ganadora.
    constructor(betValue, multi, prize){
        this.betValue = betValue;
        this.multi = multi;
        this.prize = prize;
    }
}

function balanceMod(bet) { //Funcion que se encarga de restar la apuesta del balance por cada tirada.
    if (bet <= balance) {
        balance = balance - bet;
        spin();
        userInfo.innerText = "User: " + username +"\n Balance: " + balance;
    } else if (balance == 0) {
        Toastify({
            text: "No more balance!",
            duration: 3000,
            className: "badToast",
        }).showToast();
    } else {
        userInfo.innerText = "User: " + username +"\n Balance: " + balance;
    }
}

function spin() { //Funcion que se encarga de la asignacion de valor a las figuras asi como tambien de la animación de tirada.
    generateDivs();
    let figValA = 0;
    let figValB = 0;
    let figValC = 0;
    for (let i = 0; i < 3; i++) {
        let figId = "fig" + (i + 1);
        let spinInterval = setInterval(() => {
            let colorPicker = rng();
            let figura = document.getElementById(figId);
            figura.className = '';
            if (colorPicker > 9000) {
                figura.className += " cian";
            } else if (colorPicker < 6999 && colorPicker > 3000) {
                figura.className += " naranja";
            } else {
                figura.className += " amarillo";
            }
        }, 25);
        setTimeout(() => {
            clearInterval(spinInterval);
            let colorPicker = rng();
            let figura = document.getElementById(figId);
            figura.className = '';
            if (colorPicker > 9000) {
                figura.className += " cian";
                figValA++;
            } else if (colorPicker < 6999 && colorPicker > 3000) {
                figura.className += " naranja";
                figValB++;
            } else {
                figura.className += " amarillo";
                figValC++;
            }
            if (i === 2) {
                prizeFnc(figValA, figValB, figValC);
            }
        }, 1000 + i * 500);
    }
}

function realRng() {
    let numRandom2 = Math.floor(Math.random() * 19) + 1;
    return numRandom2;
}

function prizeFnc(a, b, c) { //Funcion que se encarga de calcular la ganancia de cada tirada.
    if (a == 3) {
        balance = balance + (bet * 100);
        Toastify({
            text: "You won: $" + (bet * 100),
            duration: 3000,
            className: "goodToast",
        }).showToast();
        const win = new newWin(bet, "x100", (bet*100));
        winsArray.push(win);
        generateWinCards();
    } else if (b == 3) {
        balance = balance + (bet * 5);
        Toastify({
            text: "You won: $" + (bet * 5),
            duration: 3000,
            className: "goodToast",
        }).showToast();
        const win = new newWin(bet, "x5", (bet*5));
        winsArray.push(win);
        generateWinCards();
    } else if (c == 3) {
        balance = balance + (bet * 2);
        Toastify({
            text: "You won: $" + (bet * 2),
            duration: 3000,
            className: "goodToast",
        }).showToast();
        const win = new newWin(bet, "x2", (bet*2));
        winsArray.push(win);
        generateWinCards();
    } else {
        Toastify({
            text: "You lose!",
            duration: 3000,
            className: "badToast",
        }).showToast();
    }
    if (winsArray.length > 5) {
        winsArray.shift();
    }
    userInfo.innerText = "User: " + username + "\n Balance: " + balance;
}

function generateWinCards() { //Genera las tarjetas que muestran las ultimas ganancias.
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
        winCard.className = "card text-bg-primary";
        winInfo.innerText = "$" + value["betValue"];
        winInfo.innerText += value["multi"];
        winInfo.innerText += "\n $" + value["prize"];
    }
}

function generateDivs() { //Genera los contenedores del slot y las figuras.
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

function rng() { //Generador de numero aleatorio para asignar a cada figura.
    let numRandom = parseInt(Math.random() * 10000);
    return numRandom;
}

function modBet(betBtnClick) { //Esta funcion se encarga de aumentar la apuesta de cada tirada.
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

function logFnc(e) { //Funcion para el submit del login, recibe usuario y saldo inicial.
    e.preventDefault();
    let form = e.target;
    username = form.children[0].value;
    balance = parseInt(form.children[1].value);
    document.getElementById("section-login").classList.add("displayNone");
    document.getElementById("section-slot").classList.remove("displayNone");
    winsShowcase.classList.remove("displayNone");
    h2.classList.remove("displayNone");
    userInfo.innerText = `User: ${username}\n Balance: ${balance}`;
}

function addBalanceFnc() { //Esta funcion muestra/esconde elementos del HTML al presionar un boton.
    balanceForm.className = "a";
    addBalance.className += " displayNone";
}

function balFnc(e) { //Esta funcion se encarga de agregar fondos a la cuenta.
    e.preventDefault();
    let balForm = e.target;
    if (parseInt(balForm.children[0].value) >= 0) {
        balance = parseInt(balForm.children[0].value) + balance;
        userInfo.innerText = "User: " + username +"\n Balance: " + balance;
        balanceForm.className = " displayNone";
        addBalance.className += "a";
    }
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
const balanceForm = document.getElementById("add-balance-form");
const balanceFormSubmit = document.getElementById("submit-balance-btn");
const winsShowcase = document.getElementById("array-showcase");
const h2 = document.getElementById("h2");

const plusBtn = document.createElement("button");
const showBet = document.createElement("p");
const subBtn = document.createElement("button");
const userInfo = document.createElement("p");
const addBalance = document.createElement("button");

plusBtn.innerText = "+";
subBtn.innerText = "-";
showBet.innerText = bet;
addBalance.innerText = "Add Balance";

betHolder.append(plusBtn, showBet, subBtn);
document.getElementById("message-box").append(addBalance, userInfo);

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