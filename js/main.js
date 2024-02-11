
const KEYBOARD_CONTAINER = document.querySelector(".keyboard__container");
const INPUT = document.querySelector("textarea");
const BODY =  document.querySelector('body');
const MENU_LANGUAGE = document.querySelector('.menu__language')
const MENU_LANGUAGE_BTN = document.querySelector('.menu__language_icon')
const MENU_LANGUAGE_LIST = document.querySelector('.menu__language_available')
let MENU_LANGUAGE_FAVORITE_BTN = null

const MENU_LANGUAGE_FAVORITE = document.querySelector('.menu__language_favorite')

let holdOrClick,cursorPos = null
let checkHoldClick = false
const toggleButton = (coder) => `<div class="toggle"><div class="toggle__off"></div><div class="toggle__on" id=${'key_'+coder}></div></div>`
let chechToggleButton = {
    "code20":false,
    "code17":false,
    "code18":false,
    "code9":false,
}
let favorite = localStorage.favorite ? JSON.parse(localStorage.favorite) : []
let language = allLanguage.en

function renderFavorite (){
    MENU_LANGUAGE_FAVORITE.innerHTML = ''
    if (favorite.length>0) {
        favorite.forEach(i=>{
        MENU_LANGUAGE_FAVORITE.innerHTML +=  `<div class="menu__language_available-lang" data-langCode="${i}"> <span>${allLanguage[i].name}</span> <i data-langCode="${i}" class=" menu__language_favorite_btn ${favorite.includes(i) && 'menu__language_available-favorite'} fa-solid fa-star"></i></div>`
        })
    } else {
        MENU_LANGUAGE_FAVORITE.innerHTML = '<p class="menu__language_favorite-list"> No favorite language...</p>'
    }
}

function renderSymbol (){
    let  allKey = document.querySelectorAll('[data-keyCode]')
    allKey.forEach(i=>{
        i.children[0].innerHTML = ''
    })
    allKey.forEach(i=>{
        let coder = i.getAttribute('data-keyCode')
        language[coder].forEach((symbol,index)=>{
            switch (coder) {
              case "code20":
              case "code17":
              case "code18":
              case "code9":
                i.children[0].innerHTML += `${toggleButton(coder)} <span class="keyboard__simbol-text keyboard__special-text ${"key_" + index}">${symbol}</span>`;
                i.children[0].onclick = () => {
                    document.querySelectorAll(`${'#key_' + coder}`).forEach(item=>{item.classList.toggle('active')});
                    chechToggleButton[coder] = !chechToggleButton[coder]
                }
                break;
              case "code8":
              case "code13":
              case "code16":
              case "code37":
              case "code38":
              case "code39":
              case "code40":
              case "code46":
              case "code91":
              case "code145":
                i.children[0].innerHTML += `<span class="keyboard__simbol-text keyboard__special-text ${"key_" + index}">${symbol}</span>`;
                break;
              default:
                i.children[0].innerHTML += `<span class="keyboard__simbol-text">${symbol}</span>`;
            }
        })
    })
}

function eventMousedown(event) {
    checkHoldClick = false
    let pressedKey = event.target.closest(".keyboard__simbol-key") 
    holdOrClick = setTimeout(()=>printSecondSymbol(pressedKey),1000)

}

function eventMouseup(event) {        
    let pressedKey = event.target.closest(".keyboard__simbol-key") 
    let pressedKeyCode = pressedKey.parentElement.getAttribute('data-keyCode')

    if (pressedKeyCode == 'code8'){
        if (window.getSelection().toString()){
            let cutForSelected = window.getSelection().toString()
            let newString = INPUT.value.replace(cutForSelected,'')
            INPUT.value = newString
        } else if (cursorPos != 0) {
            INPUT.setSelectionRange(cursorPos,cursorPos)
            let newString = INPUT.value.slice(0,INPUT.selectionStart-1)
            let newString2 = INPUT.value.slice(INPUT.selectionStart)
            INPUT.value = newString + newString2
            cursorPos -= 1
        }
    } else if (pressedKeyCode == 'code46'){
        INPUT.setSelectionRange(cursorPos,cursorPos)
        let newString = INPUT.value.slice(0,INPUT.selectionStart)
        let newString2 = INPUT.value.slice(INPUT.selectionStart+1)
        INPUT.value = newString + newString2
    }

    if (checkHoldClick == false){
        clearTimeout(holdOrClick)
        printFirstSymbol(pressedKey)
    }

}

function printSymbol_global (pressedKey) {
    if (window.getSelection().toString()){
        let cutForSelected = window.getSelection().toString()
        let newString = INPUT.value.replace(cutForSelected,pressedKey)
        INPUT.value = newString
        cursorPos +=1
    } else {     
        let newString = INPUT.value.slice(0,cursorPos)
        let newString2 = INPUT.value.slice(cursorPos)
        INPUT.value = newString + pressedKey + newString2
        cursorPos +=1
    }
}

function printFirstSymbol(pressedKey){  
    if (pressedKey.classList.contains("keyboard__simbol-key") && !pressedKey.classList.contains("keyboard__special-key")) {
        pressedKey = pressedKey.children[0].innerText == 'Space' ? ' '
            : chechToggleButton.code20 ?  pressedKey.children[0].innerText.toUpperCase() // check CaspLK 
            : pressedKey.children[0].innerText.toLowerCase()
        printSymbol_global(pressedKey)
    }                        
}

function printSecondSymbol(pressedKey){
    checkHoldClick = true
    if (pressedKey.classList.contains("keyboard__simbol-key") && !pressedKey.classList.contains("keyboard__special-key")) {
        pressedKey = pressedKey.children[1].innerText.toLowerCase();
        printSymbol_global(pressedKey)
    }   
}

function changeLanguage (event) {
    if (event.target.closest('.menu__language_available-lang')  &&  !event.target.closest('i')){
        let newLanguage = event.target.closest('.menu__language_available-lang').getAttribute('data-langCode')
        console.log(newLanguage )
        language = allLanguage[newLanguage]
        renderSymbol()
    }
}

function changeFavorite(event) {
    let eventCode = event.target.closest('.menu__language_favorite_btn').getAttribute('data-langCode')
    if (favorite.includes(eventCode)){
        favorite = favorite.filter(i => i != eventCode)
        event.target.classList.remove('menu__language_available-favorite')
        renderFavorite()
    } else{
        favorite.unshift(eventCode)
        event.target.classList.add('menu__language_available-favorite')
        renderFavorite()
    }
    localStorage.favorite = JSON.stringify(favorite)
    renderLanguage()

}

function getCursorPos () {
    cursorPos = INPUT.selectionStart
}

function renderLanguage(){
    MENU_LANGUAGE_LIST.innerHTML = ''
    for (let lang in allLanguage) {
        MENU_LANGUAGE_LIST.innerHTML += `<div class="menu__language_available-lang" data-langCode="${lang}"> <span>${allLanguage[lang].name}</span> <i data-langCode="${lang}" class="menu__language_favorite_btn ${favorite.includes(lang) && 'menu__language_available-favorite'} fa-solid fa-star"></i></div>`
    } 
    
    MENU_LANGUAGE_FAVORITE_BTN = document.querySelectorAll('.menu__language_favorite_btn')
    MENU_LANGUAGE_FAVORITE_BTN.forEach(btn=>{
        btn.addEventListener('click',changeFavorite)
    })
    
    const MENU_LANGUAGE_LANG = document.querySelectorAll('.menu__language_available-lang')
    MENU_LANGUAGE_LANG.forEach(lang=>{
        lang.children[0].addEventListener('click',changeLanguage)
    })
}

INPUT.addEventListener('click',getCursorPos)

BODY.addEventListener('keyup',getCursorPos)

BODY.addEventListener('click',(event)=>{
    (!event.target.closest('.menu') && !event.target.closest('.menu__language') && !event.target.closest('.menu__language_favorite_btn'))  && MENU_LANGUAGE.classList.remove('active')

})

KEYBOARD_CONTAINER.addEventListener("mousedown", eventMousedown);
KEYBOARD_CONTAINER.addEventListener("mouseup", eventMouseup);
MENU_LANGUAGE_BTN.addEventListener('click',()=>{ MENU_LANGUAGE.classList.toggle('active')})

renderFavorite()
renderLanguage()
renderSymbol()
