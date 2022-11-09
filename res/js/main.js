import { bakeryNames } from "./bakeryNames.js";


const cookie = document.querySelector('.cookie__img');
const cookieContainer = document.querySelector('.cookie');
const cookieCountText = document.querySelector('.cookie__count');
let totalCookies = 0;
let cookieCount = 0;
let instaCookieCount = 0;


// Cookie hover animation
cookie.addEventListener('mouseenter', () => {
    cookie.style.animation = "cookieHoverIn 550ms linear forwards";
})

cookie.addEventListener('mouseleave', () => {
    cookie.style.animation = "cookieHoverOut 500ms linear forwards";
})

// Cookie upgrade cursor around cookie
const cookieUpgradeContainer = document.querySelector('.cookie__upgradesContainer');
let cookieSize = 256;
let numberOfBoxes = 20;
let cookieId = 0;

window.onload = () => {
    // Create boxes for cursors
    for (let i = 0; i < numberOfBoxes; i++) {
        let newCursorBx = document.createElement("div");
        newCursorBx.classList.add('cookie__upgradesBx');
    
        cookieUpgradeContainer.appendChild(newCursorBx);
    }

    let cookieUpgradeBxs = document.querySelectorAll('.cookie__upgradesBx');
    
    cookieUpgradeBxs.forEach((cookieUpgradeBx, cookieIndex) => {
        // Create cursors
        let numberOfCursors = 50 + (cookieIndex * 2);

        let div = 360 / numberOfCursors;
        let radius = 150 + (cookieIndex * 20);
        let offsetToParentCenter = parseInt(cookieUpgradeBx.offsetWidth / 2);//assumes parent is square
        let offsetToChildCenter = 10;
        let totalOffset = offsetToParentCenter - offsetToChildCenter;
        let angles = [285];
        let angleStep = 360 / (numberOfCursors + 1);
        let index = 0;
    
        for (let i = 0; i < numberOfCursors; i++) {
            index++
            let newImg = document.createElement('img');
            newImg.src = "./res/img/cursor-pointer.png";
            newImg.setAttribute('draggable', "false");
            newImg.classList.add("cookie__upgrade", `id${cookieId}`);
            cookieUpgradeBx.appendChild(newImg);
            
            let y = Math.sin((div * index) * (Math.PI / 180)) * radius;
            let x = Math.cos((div * index) * (Math.PI / 180)) * radius;
            newImg.style.top = (y + totalOffset).toString() + "px";
            newImg.style.left = (x + totalOffset).toString() + "px";
            
            newImg.style.rotate = angles[i] + "deg";
            newImg.style.display = "none";
            angles.push((angles[i] + angleStep) % 360);
            cookieId++;
        }

        let allCursorsInBx = cookieUpgradeBx.querySelectorAll('.cookie__upgrade');
        let cursorsIndex = 0;
        let halfCursorIndex = Math.round(allCursorsInBx.length / 2);

        allCursorsInBx[cursorsIndex].classList.add('active');
        allCursorsInBx[halfCursorIndex].classList.add('active');

        setInterval(() => {
            allCursorsInBx[cursorsIndex].classList.remove('active');
            allCursorsInBx[halfCursorIndex].classList.remove('active');

            cursorsIndex++;
            halfCursorIndex++;

            if(cursorsIndex === allCursorsInBx.length) cursorsIndex = 0;
            if(halfCursorIndex === allCursorsInBx.length) halfCursorIndex = 0;

            allCursorsInBx[cursorsIndex].classList.add('active');
            allCursorsInBx[halfCursorIndex].classList.add('active');
        }, 300);
    })

    // document.querySelector('.cookie__upgrade.id0').style.display = "block";
}

// Mooving upgrades description
const upgrades = document.querySelectorAll('.upgrade__bx');

upgrades.forEach((upgrade) => {
    let upgradeDesc = upgrade.querySelector('.item__desc');

    upgrade.addEventListener('mouseenter', () => {
        upgradeDesc.style.display = "block";
    })

    upgrade.addEventListener('mouseleave', () => {
        upgradeDesc.style.display = "none";
    })
})

// BAKERY NAME - GENERATE AND CHANGE
const bakeryNameBx = document.querySelector('.cookie__name');
const bakeryName = document.querySelector('.cookie__bakeryName');
const customBakery = document.querySelector('.customBakeryName');
const customBInput = document.querySelector('.custom__input');
const customSubmitBtn = document.querySelector('.custom__btn.customSubmit');
const customRandomBtn = document.querySelector('.custom__btn.customRandom');
const customEscBtn = document.querySelector('.custom__btn.customEsc');
const customCloseIcon = document.querySelector('.custom__close');
const customBakeryError = document.querySelector('.custom__error');

function randomBakeryName(){
    return bakeryNames[(Math.random() * bakeryNames.length) | 0];
};

let onLoadBakeryName = randomBakeryName();
bakeryName.innerText = onLoadBakeryName;


// Bakery event listeners
bakeryNameBx.addEventListener('click', () => {
    customBakery.style.animation = "fadeIn 200ms ease-in-out forwards";
    customBInput.value = onLoadBakeryName;

    setTimeout(() => {
        customBInput.focus();
        customBInput.select();
    }, 20);

    document.body.addEventListener('keydown', checkBakeryEsc);
})

customBakery.addEventListener('click', (e) => {
    if(e.target === customBakery){
        customBakeryEsc();
    }
})

customEscBtn.addEventListener('click', customBakeryEsc);
customCloseIcon.addEventListener('click', customBakeryEsc);

customRandomBtn.addEventListener('click', () => {
    customBInput.value = randomBakeryName();
})

customSubmitBtn.addEventListener('click', customBNameValidation);
customBInput.addEventListener('keydown', (e) => {
    e.key === "Enter" ? customBNameValidation() : null;
})


// Bakery functions
function checkBakeryEsc(e){
    if(e.key === "Escape"){
        customBakeryEsc();
    }
}

function customBakeryEsc(){
    customBakery.style.animation = "fadeOut 200ms ease-in-out forwards";

    document.body.removeEventListener('keydown', checkBakeryEsc);

    setTimeout(() => {
        customBakeryError.style.display = "none";
    }, 150);
}

function customBNameValidation(){
    if(customBInput.value.length <= 2){
        customBakeryError.style.display = "block";
    }
    else{
        customBakeryError.style.display = "none";

        bakeryName.innerText = customBInput.value;

        customBakeryEsc();
    }
}


// COOKIE CLICKING
let clickInSound = new Audio('./res/img/sounds/clickIn.mp3');
let clickOutSound = new Audio('./res/img/sounds/clickOut.mp3');
clickInSound.volume = 0.16;
clickOutSound.volume = 0.16;
let cookieClickStep = 500;

cookie.addEventListener('mousedown', (e) => {
    cookie.style.animation = "cookieHoverOut 400ms linear forwards";
    clickInSound.play();
})
cookie.addEventListener('mouseup', (e) => {
    cookie.style.animation = "cookieHoverIn 400ms linear forwards";
    clickOutSound.play();
    
    cookieClickIncrease();
    cookieClickEffect(e);
})


function cookieClickIncrease(){
    instaCookieCount += cookieClickStep;
    checkEnabledItems();

    let intervalI = 0;
    let cookieAddInterval = setInterval(() => {
        cookieCount += 1;
        totalCookies += 1;
        cookieCountText.innerText = cookieCount;

        intervalI++
        if(intervalI === cookieClickStep) clearInterval(cookieAddInterval);
    });
}

function cookieClickEffect(e){
    // Text
    let leftPos = e.pageX;
    let topPos = e.pageY;

    let newP = document.createElement('p');
    newP.innerText = `+${cookieClickStep}`;
    newP.classList.add('floatingCookieEffect');

    let randomPLeft = Math.floor(Math.random() * ((leftPos + 2) - (leftPos - 2) + 1) + (leftPos - 2))

    newP.style.left = `${randomPLeft}px`;
    newP.style.top = `10%`;
    newP.style.opacity = 0;
    
    cookieContainer.appendChild(newP);

    newP.animate([
        // Keyframes
        {   top: `${topPos}px`,
            opacity: 1
        },
        {   top: '10%',
            opacity: 0
        },
    ], {
        duration: 4000,
    });

    setTimeout(() => {
        newP.remove();
    }, 4000);


    // Cookie
    let newCookieIcon = document.createElement('img');
    newCookieIcon.classList.add('floatingCookieIcon');
    newCookieIcon.src = "./res/img/icons.png";

    let centeredLeftPos = leftPos - 19;
    let randomLeftPos = Math.floor(Math.random() * ((centeredLeftPos + 5) - (centeredLeftPos - 5) + 1) + (centeredLeftPos - 5));

    newCookieIcon.style.left = `${randomLeftPos}px`;
    newCookieIcon.style.top = `${topPos}px`;
    newCookieIcon.style.opacity = 0;

    cookieContainer.appendChild(newCookieIcon);

    let animateTop = Math.floor(Math.random() * ((topPos + 100) - (topPos + 50) + 1) + (topPos + 50))

    newCookieIcon.animate([
        {
            left: `${randomLeftPos}px`,
            top: `${topPos}px`,
            opacity: 1
        },
        {
            left: `${randomLeftPos}px`,
            top: `${animateTop}px`,
            opacity: 0
        }
    ], {
        duration: 1000
    })

    setInterval(() => {
        newCookieIcon.remove();
    }, 1000);
}


// IF THERE IS ENOUGHT TOTAL COOKIES, ENABLE BUY ITEM
const itemBx = document.querySelector('.buy__itemBx');
const itemAutoClick = document.querySelector('.itemAutoClick');
const itemGrandma = document.querySelector('.itemGrandma');
let itemFarm;

function checkEnabledItems(){
    // Autoclick
    if(instaCookieCount >= 15 && itemAutoClick.classList.contains('itemDisabled')){
        itemAutoClick.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newFarmHtml);
        itemFarm = itemBx.querySelector('.itemFarm');

        buildingsMoovingDesc();
    }

    // Grandma
    else if(instaCookieCount >= 100 && itemGrandma.classList.contains('itemDisabled')){
        itemGrandma.classList.remove('itemDisabled');

        buildingsMoovingDesc();
    }

    // Farm
    else if(instaCookieCount >= 1100 && itemFarm.classList.contains('itemDisabled')){
        itemFarm.classList.remove('itemDisabled');

        buildingsMoovingDesc();
    }
}


// GENERATE ALL BUILDINGS
let cursorPrize = 15;
let grandmaPrize = 100;
let farmPrize = 1100;
let minePrize = 12000;

let buildPrizes = [cursorPrize, grandmaPrize, farmPrize];

const newFarmHtml = generateNewBuilding("Farma", "Farm", farmPrize.toLocaleString('de-DE'), "Tady se z keksových semínek pěstují keksové rostliny.", "234.4", 3);
const newMineHtml = generateNewBuilding("Důl", "Mine", "12,000", "Těží sušenkové těsto a čokoládové střípky.", "1,065", 4);
const newFactoryHtml = generateNewBuilding("Továrna", "Factory", "130,000", "Produkuje velké množství keksů.", "5,893", 5);
// toLocalString(de-DE) - dot instead of comma
// const newMineHtml = generateNewBuilding("Důl", "mine", "12,000", ".", "234.4", 3);
// const newMineHtml = generateNewBuilding("Důl", "mine", "12,000", ".", "234.4", 3);
// const newMineHtml = generateNewBuilding("Důl", "mine", "12,000", ".", "234.4", 3);
// const newMineHtml = generateNewBuilding("Důl", "mine", "12,000", ".", "234.4", 3);
// const newMineHtml = generateNewBuilding("Důl", "mine", "12,000", ".", "234.4", 3);
// const newMineHtml = generateNewBuilding("Důl", "mine", "12,000", ".", "234.4", 3);
// const newMineHtml = generateNewBuilding("Důl", "mine", "12,000", ".", "234.4", 3);
// const newMineHtml = generateNewBuilding("Důl", "mine", "12,000", ".", "234.4", 3);
// const newMineHtml = generateNewBuilding("Důl", "mine", "12,000", ".", "234.4", 3);
// const newMineHtml = generateNewBuilding("Důl", "mine", "12,000", ".", "234.4", 3);
// const newMineHtml = generateNewBuilding("Důl", "mine", "12,000", ".", "234.4", 3);
// const newMineHtml = generateNewBuilding("Důl", "mine", "12,000", ".", "234.4", 3);

function generateNewBuilding(name, buildClass, prize, citation, productionPerSec, buldingIndex){
    return (`
        <div class="buy__item item${buildClass} itemDisabled">
            <img src="./res/img/buildings.png" alt="" style="object-position: 0px -${buldingIndex * 64}px;" class="item__icon" draggable="false">
            <div class="item__textBx">
                <h4 class="item__name">???</h4>
                <h4 class="item__name itmNameDis">${name}</h4>
                <div class="item__info">
                    <p class="info__prize prizeGreen"><img src="./res/img/money.png" alt="" class="prize__icon" draggable="false">${prize}</p>
                </div>
            </div>
            <h4 class="item__count"></h4>
            <div class="item__desc">
                <div class="desc__top">
                    <img src="./res/img/icons.png" alt="" style="object-position: -${(buldingIndex - 1) * 50}px 0px;" class="desc__icon" draggable="false">
                    <div class="desc__nameBx">
                        <p class="desc__name">???</p>
                        <p class="desc__name descNameDis">${name}</p>
                        <p class="desc__own">vlastněno: <span>0</span></p>
                    </div>
                    <div class="desc__countBx">
                        <img src="./res/img/money.png" alt="" class="desc__countImg" draggable="false">
                        <p class="desc__count prizeGreen">${prize}</p>
                    </div>
                </div>
                <p class="desc__citation">"???"</p>
                <p class="desc__citation descCitDis">"${citation}"</p>

                <ul class="desc__infoBx">
                    <li class="desc__info">každé ${name.toLowerCase()} produkuje <span class="whiteT">${productionPerSec} keksy</span> za sekundu</li>
                    <li class="desc__info">
                        <span class="infoCount">5</span>
                        ${name.toLowerCase()} produkuje
                        <span class="infoPerSec whiteT">0.5</span>
                        <span class="whiteT">keksy</span>
                        za sekundu
                        (<span class="infoProduction whiteT">100</span><span class="whiteT">%</span> z celkových K/s)
                    </li>
                    <li class="desc__info">
                        <span class="infoProduces whiteT">4,277</span>
                        <span class="whiteT">keksy</span>
                        dosud vyprodukováno
                    </li>
                </ul>
            </div>
        </div>
    `);
}



// BUY ITEM - BUILDING
function buyItemBuilding(buildingsNode, building){
    building.addEventListener('click', () => {
        const buildingsArray = Array.prototype.slice.call(buildingsNode);

        let buildingIndex = buildingsArray.indexOf(building);

        console.log(buildPrizes[buildingIndex]);

        if(totalCookies >= buildPrizes[buildingIndex]){
            console.log('just buy it (no, its not that simple there :()');
        }
    })
}


// MOOVING BUILDING DESCRIPTION, TRIGGERING ALSO BUY ITEMS
function buildingsMoovingDesc(){
    const buildings = document.querySelectorAll('.buy__item');
    buildings.forEach((building) => {
        let buildingDesc = building.querySelector('.item__desc');
    
        building.addEventListener('mouseenter', () => {
            buildingDesc.style.display = "block";
        })
    
        building.addEventListener('mousemove', (e) => {
            let currentY = e.clientY;
            let updatedY = currentY - 344;
    
            buildingDesc.style.top = `${updatedY}px`;
        })
    
        building.addEventListener('mouseleave', () => {
            buildingDesc.style.display = "none";
        })

        // Buy item function
        buyItemBuilding(buildings, building);
    })
}

buildingsMoovingDesc();