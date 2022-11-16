import { bakeryNames } from "./bakeryNames.js";
import { grandmaNames } from "./grandmaNames.js";


const cookie = document.querySelector('.cookie__img');
const cookieContainer = document.querySelector('.cookie');
const cookieCountText = document.querySelector('.cookie__count');
let totalCookies = 0;
let cookieCount = 0;
let instaCookieCount = 0;

// FORMAT NUMBERS
function formatNum(num, digits){
    let lookup = [
        { value: 1, symbol: ""},
        { value: 1e6, symbol: " milion"},
        { value: 1e9, symbol: " billion"},
        { value: 1e12, symbol: " trillion"},
        { value: 1e15, symbol: " quadrillion"},
        { value: 1e18, symbol: " quantillion"},
        { value: 1e21, symbol: " sextillion"},
        { value: 1e24, symbol: " septillion"},
        { value: 1e27, symbol: " octillion"},
        { value: 1e30, symbol: " nonillion"},
        { value: 1e33, symbol: " decillion"},
        { value: 1e36, symbol: " undecillion"},
        { value: 1e39, symbol: " duodecillion"},
        { value: 1e42, symbol: " tredecillion"},
        { value: 1e45, symbol: " quattuordecillion"},
    ];

    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

    let item = lookup.slice().reverse().find((item) => {
        return num >= item.value;
    });

    if(num < 1e6){
        return num.toLocaleString('en-Us');
    }
    else if(item){
        return (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol;
    }
    else{
        return "0";
    }
}


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
let intervalsCount = 0;
let intervalsCountArray = [];
let cookieClickStep = 50000897847494;
let remainingCookies = 0;
let remainingIntervalCount = 0;
let disableCookieInterval = false;
let runningCookieInterval = false;

cookie.addEventListener('mousedown', () => {
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
    totalCookies += cookieClickStep;
    remainingCookies += cookieClickStep;
    checkEnabledItems();
    checkItemPrize();

    remainingIntervalCount++;

    let intervalI = 0;
    let numDiff = 0;
    runningCookieInterval = true;

    intervalsCount++;
    intervalsCountArray.push(intervalsCount);

    window['cookieAddInterval' + intervalsCount] = setInterval(() => {
        if(cookieClickStep < 10000){
            cookieCount += 1;
            remainingCookies -= 1;

            intervalI++;
        }
        else{
            let numberLength = cookieClickStep.toString().length;
            let numberIncrement = Math.round(cookieClickStep / (numberLength * 100));

            cookieCount += numberIncrement;
            remainingCookies -= numberIncrement;
            intervalI += numberIncrement;
        }

        cookieCountText.innerText = formatNum(cookieCount, 3);

        if(intervalI >= cookieClickStep){
            clearInterval(window['cookieAddInterval' + intervalsCountArray[0]]);
            
            numDiff = intervalI % cookieClickStep;

            intervalsCountArray.shift();
            disableCookieInterval = false;
            if(intervalsCountArray.length === 0){
                runningCookieInterval = false;

                cookieCount -= remainingIntervalCount * numDiff;

                cookieCountText.innerText = formatNum(cookieCount, 3);
            }
        }
        if(disableCookieInterval === true){
            clearAllCookieIntervals(intervalsCount);
            intervalsCountArray = [];
            disableCookieInterval = false;

            cookieCount += remainingCookies;
            remainingCookies = 0;
            cookieCountText.innerText = formatNum(cookieCount, 3);
            // console.log(cookieCount);
        }
    });
}

// Disable all intervals
function clearAllCookieIntervals(intervalIndex){
    for (let i = 1; i <= intervalIndex; i++) {
        clearInterval(window['cookieAddInterval' + i]);
    }

    runningCookieInterval = false;
}


// COOKIE CLICK EFFECT
function cookieClickEffect(e){
    // Text
    let leftPos = e.pageX;
    let topPos = e.pageY;

    let newP = document.createElement('p');
    newP.innerText = `+${formatNum(cookieClickStep, 3)}`;
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
const itemCursor = document.querySelector('.itemCursor');
const itemGrandma = document.querySelector('.itemGrandma');
let itemFarm,
    itemMine,
    itemFactory,
    itemBank,
    itemTemple,
    itemWizard,
    itemShip,
    itemAlchemy,
    itemPortal,
    itemTime,
    itemCondenser,
    itemPrism,
    itemChance,
    itemEngine,
    itemJsconsole,
    itemIdle,
    itemCortex;


let itemCursorCount = 0,
    itemGrandmaCount = 0,
    itemFarmCount = 0,
    itemMineCount = 0,
    itemFactoryCount = 0,
    itemBankCount = 0,
    itemTempleCount = 0,
    itemWizardCount = 0,
    itemShipCount = 0,
    itemAlchemyCount = 0,
    itemPortalCount = 0,
    itemTimeCount = 0,
    itemCondenserCount = 0,
    itemPrismCount = 0,
    itemChanceCount = 0,
    itemEngineCount = 0,
    itemJsconsoleCount = 0,
    itemIdleCount = 0,
    itemCortexCount = 0;

let buildCountArr = [itemCursorCount, itemGrandmaCount, itemFarmCount, itemMineCount, itemFactoryCount, itemBankCount, itemTempleCount, itemWizardCount, itemShipCount, itemAlchemyCount, itemPortalCount, itemTimeCount, itemCondenserCount, itemPrismCount, itemChanceCount, itemEngineCount, itemJsconsoleCount, itemIdleCount, itemCortexCount];


// Total cookies produces by each building
let itemCursorCookieCount = 0,
    itemGrandmaCookieCount = 0,
    itemFarmCookieCount = 0,
    itemMineCookieCount = 0,
    itemFactoryCookieCount = 0,
    itemBankCookieCount = 0,
    itemTempleCookieCount = 0,
    itemWizardCookieCount = 0,
    itemShipCookieCount = 0,
    itemAlchemyCookieCount = 0,
    itemPortalCookieCount = 0,
    itemTimeCookieCount = 0,
    itemCondenserCookieCount = 0,
    itemPrismCookieCount = 0,
    itemChanceCookieCount = 0,
    itemEngineCookieCount = 0,
    itemJsconsoleCookieCount = 0,
    itemIdleCookieCount = 0,
    itemCortexCookieCount = 0;

let buildCookieCount = [itemCursorCookieCount, itemGrandmaCookieCount, itemFarmCookieCount, itemMineCookieCount, itemFactoryCookieCount, itemBankCookieCount, itemTempleCookieCount, itemWizardCookieCount, itemShipCookieCount, itemAlchemyCookieCount, itemPortalCookieCount, itemTimeCookieCount, itemCondenserCookieCount, itemPrismCookieCount, itemChanceCookieCount, itemEngineCookieCount, itemJsconsoleCookieCount, itemIdleCookieCount, itemCortexCookieCount];



function checkEnabledItems(){
    // Autoclick
    if(instaCookieCount >= 15 && itemCursor.classList.contains('itemDisabled')){
        itemCursor.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newFarmHtml);
        itemFarm = itemBx.querySelector('.itemFarm');

        buildingsMoovingDesc();
    }

    // Grandma
    else if(instaCookieCount >= 100 && itemGrandma.classList.contains('itemDisabled')){
        itemGrandma.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newMineHtml);
        itemMine = itemBx.querySelector('.itemMine');

        buildingsMoovingDesc();
    }

    // Farm
    else if(instaCookieCount >= 1100 && itemFarm.classList.contains('itemDisabled')){
        itemFarm.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newFactoryHtml);
        itemFactory = itemBx.querySelector('.itemFactory');

        buildingsMoovingDesc();
    }

    // Mine
    else if(instaCookieCount >= 12000 && itemMine.classList.contains('itemDisabled')){
        itemMine.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newBankHtml);
        itemBank = itemBx.querySelector('.itemBank');

        buildingsMoovingDesc();
    }

    // Factory
    else if(instaCookieCount >= 130000 && itemFactory.classList.contains('itemDisabled')){
        itemFactory.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newTempleHtml);
        itemTemple = itemBx.querySelector('.itemTemple');

        buildingsMoovingDesc();
    }

    // Bank
    else if(instaCookieCount >= 1400000 && itemBank.classList.contains('itemDisabled')){
        itemBank.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newWizardHtml);
        itemWizard = itemBx.querySelector('.itemWizard');

        buildingsMoovingDesc();
    }

    // Temple
    else if(instaCookieCount >= 20000000 && itemTemple.classList.contains('itemDisabled')){
        itemTemple.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newShipHtml);
        itemShip = itemBx.querySelector('.itemShip');

        buildingsMoovingDesc();
    }

    // Wizard
    else if(instaCookieCount >= 330000000 && itemWizard.classList.contains('itemDisabled')){
        itemWizard.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newAlchemyHtml);
        itemAlchemy = itemBx.querySelector('.itemAlchemy');

        buildingsMoovingDesc();
    }

    // Ship
    else if(instaCookieCount >= 5100000000 && itemShip.classList.contains('itemDisabled')){
        itemShip.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newPortalHtml);
        itemPortal = itemBx.querySelector('.itemPortal');

        buildingsMoovingDesc();
    }

    // Alchemy
    else if(instaCookieCount >= 75000000000 && itemAlchemy.classList.contains('itemDisabled')){
        itemAlchemy.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newTimeHtml);
        itemTime = itemBx.querySelector('.itemTime');

        buildingsMoovingDesc();
    }

    // Portal
    else if(instaCookieCount >= 1000000000000 && itemPortal.classList.contains('itemDisabled')){
        itemPortal.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newCondenserHtml);
        itemCondenser = itemBx.querySelector('.itemCondenser');

        buildingsMoovingDesc();
    }

    // Time
    else if(instaCookieCount >= 14000000000000 && itemTime.classList.contains('itemDisabled')){
        itemTime.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newPrismHtml);
        itemPrism = itemBx.querySelector('.itemPrism');

        buildingsMoovingDesc();
    }

    // Condenser
    else if(instaCookieCount >= 170000000000000 && itemCondenser.classList.contains('itemDisabled')){
        itemCondenser.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newChanceHtml);
        itemChance = itemBx.querySelector('.itemChance');

        buildingsMoovingDesc();
    }

    // Prism
    else if(instaCookieCount >= 2100000000000000 && itemPrism.classList.contains('itemDisabled')){
        itemPrism.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newEngineHtml);
        itemEngine = itemBx.querySelector('.itemEngine');

        buildingsMoovingDesc();
    }

    // Chance
    else if(instaCookieCount >= 26000000000000000 && itemChance.classList.contains('itemDisabled')){
        itemChance.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newJsconsoleHtml);
        itemJsconsole = itemBx.querySelector('.itemJsconsole');

        buildingsMoovingDesc();
    }

    // Engine
    else if(instaCookieCount >= 310000000000000000 && itemEngine.classList.contains('itemDisabled')){
        itemEngine.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newIdleHtml);
        itemIdle = itemBx.querySelector('.itemIdle');

        buildingsMoovingDesc();
    }

    // Jsconsole
    else if(instaCookieCount >= 71000000000000000000 && itemJsconsole.classList.contains('itemDisabled')){
        itemJsconsole.classList.remove('itemDisabled');

        itemBx.insertAdjacentHTML('beforeend', newCortexHtml);
        itemCortex = itemBx.querySelector('.itemCortex');

        buildingsMoovingDesc();
    }

    // Idle
    else if(instaCookieCount >= 12000000000000000000000 && itemIdle.classList.contains('itemDisabled')){
        itemIdle.classList.remove('itemDisabled');
        buildingsMoovingDesc();
    }

    // Cortex
    else if(instaCookieCount >= 1900000000000000000000000 && itemCortex.classList.contains('itemDisabled')){
        itemCortex.classList.remove('itemDisabled');
        buildingsMoovingDesc();
    }
}


// GENERATE ALL BUILDINGS
let cursorPrize = 15,
    grandmaPrize = 100,
    farmPrize = 1100,
    minePrize = 12000,
    factoryPrize = 130000,
    bankPrize = 1400000,
    templePrize = 20000000,
    wizardPrize = 330000000,
    shipPrize = 5100000000,
    alchemyPrize = 75000000000,
    portalPrize = 1000000000000,
    timePrize = 14000000000000,
    condenserPrize = 170000000000000,
    prismPrize = 2100000000000000,
    chancePrize = 26000000000000000,
    enginePrize = 310000000000000000,
    jsconsolePrize = 71000000000000000000,
    idlePrize = 12000000000000000000000,
    cortexPrize = 1900000000000000000000000;

let buildPrizesArr = [cursorPrize, grandmaPrize, farmPrize, minePrize, factoryPrize, bankPrize, templePrize, wizardPrize, shipPrize, alchemyPrize, portalPrize, timePrize, condenserPrize, prismPrize, chancePrize, enginePrize, jsconsolePrize, idlePrize, cortexPrize];


// Generate all buildings
const newFarmHtml = generateNewBuilding("Farma", "Farm", farmPrize.toLocaleString('en-Us'), "Tady se z keksových semínek pěstují keksové rostliny.", "234.4", 3, -101);
const newMineHtml = generateNewBuilding("Důl", "Mine", minePrize.toLocaleString('en-Us'), "Těží sušenkové těsto a čokoládové střípky.", "1,065", 4, -148);
const newFactoryHtml = generateNewBuilding("Továrna", "Factory", factoryPrize.toLocaleString('en-Us'), "Produkuje velké množství keksů.", "5,893", 5, -196);
const newBankHtml = generateNewBuilding("Banka", "Bank", bankPrize.toLocaleString('de-De'), "Generuje keksy z úroku.", "31,733", 6, -726);
const newTempleHtml = generateNewBuilding("Chrám", "Temple", templePrize.toLocaleString('de-De'), "Plné vzácné, starodávné čokolády.", "176,802", 7, -774);
const newWizardHtml = generateNewBuilding("Čarodějná věž", "Wizard", wizardPrize.toLocaleString('de-De'), "Vyvolává keksy pomocí kouzel.", "997,347", 8, -821);
const newShipHtml = generateNewBuilding("Dodávka", "Ship", shipPrize.toLocaleString('de-De'), "Přiváží čerstvé keksy z keksové planety.", "2.947 milion", 9, -244);
const newAlchemyHtml = generateNewBuilding("Alchymistická laboratoř", "Alchemy", alchemyPrize.toLocaleString('de-De'), "Přetváří zlato na keksy.", "36.267 milion", 10, -292);
const newPortalHtml = generateNewBuilding("Portál", "Portal", portalPrize.toLocaleString('de-De'), "Otevírá brány do Keksmíru.", "113.335 milion", 11, -340);
const newTimeHtml = generateNewBuilding("Stroj času", "Time", timePrize.toLocaleString('de-De'), "Přinášejte keksy z minulosti, které ještě nikdo nesnědl.", "736.677 milion", 12, -387);
const newCondenserHtml = generateNewBuilding("Antihmotový kondenzátor", "Condenser", condenserPrize.toLocaleString('de-De'), "Kondenzuje antihmotu ve vesmíru na keksy.", "4.873 bilion", 13, -628);
const newPrismHtml = generateNewBuilding("Prizma", "Prism", prismPrize.toLocaleString('de-De'), "Samotné světlo přeměňuje na keksy.", "32.867", 14, -674);
const newChanceHtml = generateNewBuilding("Šancovač", "Chance", chancePrize.toLocaleString('de-De'), "Generuje keksy jen tak z ničeho, čistě na bázi štěstí.", "238.003 bilion", 15, -914);
const newEngineHtml = generateNewBuilding("Fraktální motor", "Engine", enginePrize.toLocaleString('de-De'), "Přeměňuje keksy na ještě více keksů.", "1.7 trillion", 16, -966);
const newJsconsoleHtml = generateNewBuilding("Konzole javascript", "Jsconsole", jsconsolePrize.toLocaleString('de-De'), "Vytváří keksy přímo v kódu, ve kterém je psána tato hra.", "6.233 trillion", 17, -1541);
const newIdleHtml = generateNewBuilding("Nečinný vesmír", "Idle", idlePrize.toLocaleString('de-De'), "Vedle našeho vesmíru existuje i několik dalších, nečinných vesmírů. Konečně jste objevili způsob, jak se nabourat do jejich produkce a cokoliv, co vyrábějí, přeměnit na keksy.", "47.034 trillion", 18, -1590);
const newCortexHtml = generateNewBuilding("Kortexový pekař", "Cortex", cortexPrize.toLocaleString('de-De'), "Tyto umělé mozky o velikosti planety jsou schopné zhmotnit sny o keksech. Čas a prostor jsou nepodstatné. Realita je svévolná.", "101.506 septillion", 19, -1637);

function generateNewBuilding(name, buildClass, prize, citation, productionPerSec, buldingIndex, descIconPos){
    return (`
        <div class="buy__item item${buildClass} itemDisabled">
            <img src="./res/img/buildings.png" alt="" style="object-position: 0px -${buldingIndex * 64}px;" class="item__icon" draggable="false">
            <div class="item__textBx">
                <h4 class="item__name">???</h4>
                <h4 class="item__name itmNameDis">${name}</h4>
                <div class="item__info">
                    <p class="info__prize prizeGreen">
                        <img src="./res/img/money.png" alt="" class="prize__icon" draggable="false">
                        <span class="info__prizeText">${prize}</span>
                    </p>
                </div>
            </div>
            <h4 class="item__count"></h4>
            <div class="item__desc">
                <div class="desc__top">
                    <img src="./res/img/icons.png" alt="" style="object-position: ${descIconPos}px 0px;" class="desc__icon" draggable="false">
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
                        <span class="infoProduces whiteT">0</span>
                        <span class="whiteT">keksy</span>
                        dosud vyprodukováno
                    </li>
                </ul>
            </div>
        </div>
    `);
}



// MOOVING BUILDING DESCRIPTION, TRIGGERING ALSO BUY ITEMS
let buildings = function(){ return document.querySelectorAll('.buy__item')};


function buildingsMoovingDesc(){
    buildings().forEach((building) => {
        let buildingDesc = building.querySelector('.item__desc');
    
        building.addEventListener('mouseenter', () => {
            buildingDesc.style.display = "block";
        })
    
        building.addEventListener('mousemove', (e) => {
            let currentY = e.clientY;
            let updatedY = currentY - 344;
            let updatedBodyHeight = document.body.scrollHeight - buildingDesc.offsetHeight + 40;

            if(updatedBodyHeight > currentY){
                buildingDesc.style.bottom = "";
                buildingDesc.style.top = `${updatedY}px`;
            }
            else{
                buildingDesc.style.top = "";
                buildingDesc.style.bottom = 0;
            }
        })
    
        building.addEventListener('mouseleave', () => {
            buildingDesc.style.display = "none";
        })


        building.addEventListener('click', buyItemBuilding, false);
        building.myParam = [building];
        // Buy item function
        // buyItemBuilding(buildings, building);
    })
}

function buyItemBuilding(e){
    let building = e.currentTarget.myParam[0];
    
    const buildingsArray = Array.prototype.slice.call(buildings());
    
    let buildingIndex = buildingsArray.indexOf(building); // 0
    
    if(instaCookieCount >= buildPrizesArr[buildingIndex]){
        let infoPrizeText = building.querySelector('.info__prizeText');
        let descPrizeText = building.querySelector('.desc__count');
        let itemCountText = building.querySelector('.item__count');

        // Cookie count
        decrementCookies(buildPrizesArr[buildingIndex]);
        checkItemPrize();
        buyBuilding(buildingsArray[buildingIndex], buildCountArr[buildingIndex], buildingIndex);

        if(runningCookieInterval === true) disableCookieInterval = true;

        // Prize
        let minusCookies = Math.round(buildPrizesArr[buildingIndex] / 5);
        buildPrizesArr[buildingIndex] += minusCookies;
        
        infoPrizeText.innerText = buildPrizesArr[buildingIndex];
        descPrizeText.innerText = buildPrizesArr[buildingIndex];
        
        // Count
        buildCountArr[buildingIndex]++;
        itemCountText.innerText = buildCountArr[buildingIndex];
    }
    else{
        console.log("you dont have enought money");
        console.log(instaCookieCount);
    }
}

buildingsMoovingDesc();


function decrementCookies(cookies){
    cookieCount -= cookies;
    instaCookieCount -= cookies;

    cookieCountText.innerText = formatNum(cookieCount, 3);
}


// CHECK ITEM COST - IF THERE IS ENOUGHT COOKIES, THE PRIZE TEXT WILL BE GREEN AND VICE-VERSA
function checkItemPrize(){
    buildings().forEach((building) => {
        const buildingsArray = Array.prototype.slice.call(buildings());
        let buildingIndex = buildingsArray.indexOf(building);

        if(instaCookieCount < buildPrizesArr[buildingIndex]){
            building.classList.add('noEnoughtCookies');
        }
        else{
            building.classList.remove('noEnoughtCookies');
        }
    })
}


// BUY BUILDING - ADD UTILS
const middleBuildingsBx = document.querySelector('.middle__buildings');

// Generate random age for grandmas
function generateRandomGrandma(){
    let minAge = 80;
    let maxAge = 115;
    let randomAge = Math.floor(Math.random() * (maxAge - minAge)) + minAge;

    let randomGrandmaName = grandmaNames[(Math.random() * grandmaNames.length) | 0];
    
    return {
        age: randomAge,
        name: randomGrandmaName
    };
}

function buyBuilding(building, buildingCount, buildingIndex){
    let buildingNameUpper = building.classList[1].replace('item', '');
    let buildingNameLow = building.classList[1].replace('item', '').toLowerCase();

    // Only cursor
    if(buildingNameLow === "cursor"){
        let currentCursor = document.querySelector(`.cookie__upgrade.id${buildingCount}`);

        currentCursor.style.display = "block";

        setBuildingInterval(buildingNameUpper, buildingIndex);
    }

    // Create buildings background - only grandmas
    else if(buildingCount === 0 && buildingNameLow === "grandma"){
        let grandmaInfo = generateRandomGrandma();

        let grandmaBx = `
            <div class="buildBx buildGrandma" style="background-image: url('./res/img/buildings/grandmaBg.png');">
                <div class="buildContainer build__grandmaContainer">
                    <div class="grandmaImgBx" style="--graNum: 1; --graName: '${grandmaInfo.name}, věk ${grandmaInfo.age}'">
                        <img src="./res/img/buildings/grandma.png" alt="" draggable="false">
                    </div>
                </div>
            </div>
        `;

        middleBuildingsBx.insertAdjacentHTML('beforeend', grandmaBx);

        setBuildingInterval(buildingNameUpper, buildingIndex);
    }
    
    // Create buildings background - not cursor and grandmas
    else if(buildingCount === 0){
        let buildingBx = `
            <div class="buildBx build${buildingNameUpper}" style="background-image: url('./res/img/buildings/${buildingNameLow}Bg.png');">
                <div class="buildContainer build__${buildingNameLow}Container">
                    <img src="./res/img/buildings/${buildingNameLow}.png" alt="" style="--${buildingNameLow}Num: 1;" draggable="false">
                </div>
            </div>
        `;

        middleBuildingsBx.insertAdjacentHTML('beforeend', buildingBx);

        setBuildingInterval(buildingNameUpper, buildingIndex);
    }

    // IF THERE IS BUILDING BACKGROUND - just add building
    // Add building - Only grandmas
    else if(buildingCount > 0 && buildingNameLow === "grandma"){
        let grandmaBuildingBx = middleBuildingsBx.querySelector('.buildGrandma .build__grandmaContainer');
        let grandmaInfo = generateRandomGrandma();

        let newGrandma = `
            <div class="grandmaImgBx" style="--graNum: ${buildingCount + 1}; --graName: '${grandmaInfo.name}, věk ${grandmaInfo.age}'">
                <img src="./res/img/buildings/grandma.png" alt="" draggable="false">
            </div>
        `;

        grandmaBuildingBx.insertAdjacentHTML('beforeend', newGrandma);

        setBuildingInterval(buildingNameUpper, buildingIndex);
    }


    // Add building - not cursor and grandmas
    else if(buildingCount > 0){
        let currentBuildingBgBx = middleBuildingsBx.querySelector(`.buildBx.build${buildingNameUpper}`);
        let currentBuildingBg = currentBuildingBgBx.querySelector('.buildContainer');

        let newBuilding = `
            <img src="./res/img/buildings/${buildingNameLow}.png" alt="" style="--${buildingNameLow}Num: ${buildingCount + 1};" draggable="false">
        `;

        currentBuildingBg.insertAdjacentHTML('beforeend', newBuilding);

        setBuildingInterval(buildingNameUpper, buildingIndex);
    }
}


// BUILDING INTERVALS
// Variables - check if there is interval
let runningCursorInterval = false,
    runningGrandmaInterval = false,
    runningFarmInterval = false,
    runningMineInterval = false,
    runningFactoryInterval = false,
    runningBankInterval = false,
    runningTempleInterval = false,
    runningWizardInterval = false,
    runningShipInterval = false,
    runningAlchemyInterval = false,
    runningPortalInterval = false,
    runningTimeInterval = false,
    runningCondenserInterval = false,
    runningPrismInterval = false,
    runningChanceInterval = false,
    runningEngineInterval = false,
    runningJsconsoleInterval = false,
    runningIdleInterval = false,
    runningCortexInterval = false;

let runningIntervalsArr = [runningCursorInterval, runningGrandmaInterval, runningFarmInterval, runningMineInterval, runningFactoryInterval, runningBankInterval, runningTempleInterval, runningWizardInterval, runningShipInterval, runningAlchemyInterval, runningPortalInterval, runningTimeInterval, runningCondenserInterval, runningPrismInterval, runningChanceInterval, runningEngineInterval, runningJsconsoleInterval, runningIdleInterval, runningCortexInterval];

// Variables for each building interval
let cursorInterval = false,
    grandmaInterval = false,
    farmInterval = false,
    mineInterval = false,
    factoryInterval = false,
    bankInterval = false,
    templeInterval = false,
    wizardInterval = false,
    shipInterval = false,
    alchemyInterval = false,
    portalInterval = false,
    timeInterval = false,
    condenserInterval = false,
    prismInterval = false,
    chanceInterval = false,
    engineInterval = false,
    jsconsoleInterval = false,
    idleInterval = false,
    cortexInterval = false;

let buildingIntervals = [cursorInterval, grandmaInterval, farmInterval, mineInterval, factoryInterval, bankInterval, templeInterval, wizardInterval, shipInterval, alchemyInterval, portalInterval, timeInterval, condenserInterval, prismInterval, chanceInterval, engineInterval, jsconsoleInterval, idleInterval, cortexInterval];

// Variables for buildings - cookies per second
let cursorPerSecond = 0.1,
    grandmaPerSecond = 1,
    farmPerSecond = 8,
    minePerSecond = 47,
    factoryPerSecond = 260,
    bankPerSecond = 1400,
    templePerSecond = 7800,
    wizardPerSecond = 44000,
    shipPerSecond = 260000,
    alchemyPerSecond = 1600000,
    portalPerSecond = 10000000,
    timePerSecond = 65000000,
    condenserPerSecond = 430000000,
    prismPerSecond = 2900000000,
    chancePerSecond = 21000000000,
    enginePerSecond = 150000000000,
    jsconsolePerSecond = 1100000000000,
    idlePerSecond = 8300000000000,
    cortexPerSecond = 64000000000000;

let buildingsPerSecond = [cursorPerSecond, grandmaPerSecond, farmPerSecond, minePerSecond, factoryPerSecond, bankPerSecond, templePerSecond, wizardPerSecond, shipPerSecond, alchemyPerSecond, portalPerSecond, timePerSecond, condenserPerSecond, prismPerSecond, chancePerSecond, enginePerSecond, jsconsolePerSecond, idlePerSecond, cortexPerSecond];



// SET BUILDINGS INTERVAL
function setBuildingInterval(buildingNameUpper, buildingIndex){
    // console.log(buildingNameUpper, buildingIndex);

    let infoItemCount = document.querySelector(`.item${buildingNameUpper} .infoCount`);
    let infoPerSec = document.querySelector(`.item${buildingNameUpper} .infoPerSec`);
    let infoProducesCookies = document.querySelector(`.item${buildingNameUpper} .infoProduces`);

    let itemBuildCount = (buildCountArr[buildingIndex] + 1);

    infoItemCount.innerText = itemBuildCount;
    infoPerSec.innerText = (itemBuildCount * buildingsPerSecond[buildingIndex]).toFixed(1);
    
    // Show information
    buildings()[buildingIndex].classList.add('descInfoEnabled');

    // Cookie incrementing
    if(runningIntervalsArr[buildingIndex] === true){
        clearInterval(buildingIntervals[buildingIndex]);
    }

    runningIntervalsArr[buildingIndex] = true;


    if((1000 / (Math.round(buildingsPerSecond[buildingIndex] * itemBuildCount * 10) / 10)) > 6){
        buildingIntervals[buildingIndex] = setInterval(() => {
            totalCookies += 1;
            cookieCount += 1;
            instaCookieCount += 1;
            buildCookieCount[buildingIndex] += 1;
    
            infoProducesCookies.innerText = formatNum(buildCookieCount[buildingIndex], 3);
            cookieCountText.innerText = formatNum(instaCookieCount, 3);
    
            checkItemPrize();
        }, (1000 / (Math.round(buildingsPerSecond[buildingIndex] * itemBuildCount * 10) / 10)));
    }
    else{
        let startNum = buildingsPerSecond[buildingIndex] * itemBuildCount;

        let arr = startNum.toString().split("");
        let lastNonzero;

        arr.forEach((num, index) => {
            if(num != 0){
                lastNonzero = index;
            }
        })

        let newNumArr = arr;
        let finalNumber = '';
        newNumArr.length = (lastNonzero + 1);

        newNumArr.forEach((newNum) => {
            finalNumber += newNum;
        })

        let smallerStartNum = parseInt(finalNumber);

        if((1000 / (startNum / smallerStartNum)) > 6){
            cursorInterval = setInterval(() => {
                totalCookies += smallerStartNum;
                cookieCount += smallerStartNum;
                instaCookieCount += smallerStartNum;
                itemCursorCookieCount += smallerStartNum;

                infoProducesCookies.innerText = formatNum(itemCursorCookieCount, 3);
                cookieCountText.innerText = formatNum(instaCookieCount, 3);

                checkItemPrize();
            }, (1000 / (startNum / smallerStartNum)));
        }
        else{
            let whileActive = false;
            let i = 0;

            while(whileActive === false){
                i++;

                smallerStartNum *= i;

                if((1000 / (startNum / smallerStartNum)) > 7){
                    whileActive = true;
                }
            }

            cursorInterval = setInterval(() => {
                totalCookies += smallerStartNum;
                cookieCount += smallerStartNum;
                instaCookieCount += smallerStartNum;
                itemCursorCookieCount += smallerStartNum;

                infoProducesCookies.innerText = formatNum(itemCursorCookieCount, 3);
                cookieCountText.innerText = formatNum(instaCookieCount, 3);

                checkItemPrize();
            }, (1000 / (Math.round(startNum / smallerStartNum))));
        }
    }
}