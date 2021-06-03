import { add_card } from script.js;

var db = window.localStorage;

function focusItemStorage() {
    //focusItems = document.getElementsByClassName("focus_single_item");
    let focusItemsArray = document.querySelectorAll("#focus_items_list > div");
    let numFocusItems = focusItemsArray.length;
    db.setItem("numFocus",numFocusItems);
    for (let i = 0; i < numFocusItems; i++) {
        var key = "focus" + i;
        storeFocusItem(focusItemsArray[i],key);
    }
}

function storeFocusItem(focusItem,key) {
    let wrapper = focusItem.childNodes[0];
    let gridItems = wrapper.childNodes;
    let checkImg = focusItem.childNodes[1].childNodes[0];
    db.setItem(key+"name",gridItems[1].childNodes[0].innerHTML);
    db.setITem(key+"tags", gridItems[1].childNodes[1].innerHTML);
    db.setItem(key+"duration", gridItems[2].childNodes[0].innerHTML);
    db.setItem(key+"start", gridItems[2].childNodes[1].innerHTML);
    db.setItem(key+"end", gridItems[2].childNodes[2].innerHTML);
    if(checkImg.src === "images/tick.png") {
        db.setItem(key+"completed","true");
    }
    else if (checkImg.src === "images/tick-blank.png") {
        db.setItem(key+"completed","false");
    }
    else {
        db.setItem(key+"completed","error");
    }
   
}

function cardStorage() {
    let cardsArray = document.querySelectorAll("#cards_list > div");
    let numCards = cardsArray.length;
    db.setItem("numCards",numCards);
    for (let i = 0; i < numCards; i++) {
        var key = "card" + i;
        storeCard(cardsArray[i],key);
    }
} 

function storeCard(card,key) {
    let cardItems = card.childNodes;
    db.setItem(key+"date",cardItems[0].innerHTML);
    db.setItem(key+"text",cardItems[1].innerHTML);
}

export function storeData() {
    focusItemStorage();
    cardStorage();
}

document.getElementById("cards_button").addEventListener("change",storeData);

function loadCard(card,key) {
    let cardItems = card.childNodes;
    cardItems[0].innerHTML = db.getItem(key+"date");
    cardItems[1].innerHTML = db.getItem(key+"text");
}

function loadData() {
    let numCards = db.getItem("numCards");
    let cardsArray = document.querySelectorAll("#cards_list > div");
    for (let i = cardsArray.length; i < numCards; i++) {
        add_card();
    }
    cardsArray = document.querySelectorAll("#cards_list > div");
    for (let i = 0; i < numCards; i++) {
        loadCard(cardsArray[i],"card" + i);
    }
}

document.addEventListener("DOMContentLoaded",loadData);