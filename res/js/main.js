import { bakeryNames } from "./bakeryNames.js";


const cookie = document.querySelector('.cookie__img');

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

    const one = document.querySelector('.cookie__upgrade.id0').style.display = "block";
}

// Mooving building description
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
})

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