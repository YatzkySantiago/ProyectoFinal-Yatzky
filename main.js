function spin(){
    generateDivs();
    for (let i = 0; i < 3; i++) {
        let colorPicker = rng();
        if (colorPicker > 9000) {
            figura = document.getElementById("fig" + (i + 1));
            figura.className += " cian";
        } else if (colorPicker < 6999 && colorPicker > 3999) {
            figura = document.getElementById("fig" + (i + 1));
            figura.className += " naranja";
        } else {
            let figura = document.getElementById("fig" + (i + 1));
            figura.className += " amarillo";
        }
    }
}

function generateDivs(){
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
    let numRandom = parseInt(Math.random()*10000);
    return numRandom;
}

function modificar(betBtnClick) {
    if (betBtnClick == "-" && bet > 1) {
        bet -= 1;
    } else if (betBtnClick == "+") {
        bet += 1;
    } else {
        bet = 0.5;
    }
    const betPrice = document.getElementById("bet-price");
    betPrice.innerText = bet;
}

let bet = 0.5;

const slotSpin = document.getElementById("btn");
const betHolder = document.getElementById("bet-holder");

const plusBtn = document.createElement("button");
const showBet = document.createElement("p");
const subBtn = document.createElement("button");

betHolder.appendChild(plusBtn);
betHolder.appendChild(showBet);
betHolder.appendChild(subBtn);

plusBtn.innerText = "+";
subBtn.innerText = "-";
showBet.innerText = bet;

showBet.id = "bet-price"
plusBtn.className = "btn btn-primary betBtn";
subBtn.className = "btn btn-primary betBtn2"

slotSpin.addEventListener("click", spin);
plusBtn.addEventListener("click", () => modificar("+"));
subBtn.addEventListener("click", () => modificar("-"));