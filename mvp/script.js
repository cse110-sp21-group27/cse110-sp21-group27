

var db = window.localStorage;

var focus_items = []; 
var itemsID = 0;
var editID = NaN;
var cardsId = 0;
/*
db.getItem('numFocus')  returns total number of focus items stored
db.getItem('focus0name');   everything else is a string
db.getItem('focus0tags');
db.getItem('focus0duration');
db.getItem('focus0start');
db.getItem('focus0end');
db.getItem('focus0completed'); returns true or false



*/
focus_items[0] = [];
// Default Display
/*focus_items[0]["id"] = itemsID;
focus_items[0]["completed"] =1;
focus_items[0]["tag"] ="Work";
focus_items[0]["name"] ="UI Design";
focus_items[0]["duration"] ="40";
focus_items[0]["start"] ="2021-05-12";
focus_items[0]["end"] ="2021-05-13";
itemsID++;*/


function add_new_focus() {
    editID = NaN;
    document.getElementById("focus_modal").style.display = "block";

}

function close_modal(){
    editID = NaN;
    document.getElementById("focus_form").reset();
    document.getElementById("focus_modal").style.display = "none";
}

function calculate_completed(){
    var count = 0;
    let numFocusItems = db.getItem('numFocus');
    for (i = 0 ;i < numFocusItems ;i ++) {
        let phrase = "focus" + i +"completed";
        if(db.getItem(phrase) === "true"){
            count += 1;
        }
    }
    document.getElementById("focus_completed_number").innerHTML = count;
}

function display(){
    document.getElementById("focus_items_list").innerHTML = "";
    let numFocusItems = db.getItem('numFocus');
    //console.log(db.getItem('numFocus'));
    console.log("Display focus Items:"+numFocusItems);
    for (i = 0 ;i < numFocusItems ;i ++) {
        var node = document.createElement("div");    
        node.id = i;      
        node.className = "focus_single_item";    
        var top_half = document.createElement("div");   
        var bottom_half = document.createElement("div");  
        bottom_half.className = "bottom_half";  
        var img_div = document.createElement("div");    
        var details = document.createElement("div");    
        var duration = document.createElement("div");  

        img_div.className = "grid-item-1";  
        details.className = "grid-item-2";  
        duration.className = "grid-item-3";
        var img = document.createElement("img");  
        img.setAttribute('src', 'images/goal.png');
        img.setAttribute('width', '50px');
        img_div.appendChild(img);
        top_half.className = "focus_single_item_inner";
        img_div.setAttribute("width", "10%");
        details.setAttribute("width", "50%");
        duration.setAttribute("width", "40%");

        var name =  document.createElement("div");
        let phrase = "focus" + i;
        name.innerHTML = db.getItem(phrase+"name");
        name.className = "focus_name";
        var tag =  document.createElement("div");
        tag.innerHTML = db.getItem(phrase+"tags");
        tag.className = "focus_tag";

        details.appendChild(name);
        details.appendChild(tag);

        top_half.appendChild(img_div);  
        top_half.appendChild(details);  

        if(db.getItem(phrase+"duration")){
            var durationtext = document.createElement("span");
            durationtext.innerHTML = db.getItem(phrase+"duration");
            duration.appendChild(durationtext); 
            var durationtext = document.createElement("br");
            duration.appendChild(durationtext); 
        }

        
            var durationtext = document.createElement("span");
            durationtext.innerHTML = db.getItem(phrase+"start");
            duration.appendChild(durationtext); 
            var durationtext = document.createElement("br");
            duration.appendChild(durationtext); 
            var durationtext = document.createElement("span");
            durationtext.innerHTML = db.getItem(phrase+"end");
            duration.appendChild(durationtext); 
        


        top_half.appendChild(duration);  

        var done = document.createElement("img");
        done.className = "done_image";
        if(db.getItem(phrase+"completed") === "true"){
            done.setAttribute('src', 'images/tick.png');
            done.setAttribute("onclick", "check("+i+",0)");
        }
        else{
            done.setAttribute('src', 'images/tick-blank.png');
            done.setAttribute("onclick", "check("+i+",1)");
        }

        var edit = document.createElement("div");
        edit.className = "edit_focus";
        edit.innerHTML =  "&#x270E; Edit"
        edit.setAttribute("onclick", "edit("+i+")");

        var check = document.createElement("div");
        
        check.className = "clear";
        bottom_half.appendChild(done);
        bottom_half.appendChild(edit);
        bottom_half.appendChild(check);
        
        node.appendChild(top_half);  
        node.appendChild(bottom_half);  
        document.getElementById("focus_items_list").appendChild(node);     // Append <li> to <ul> with id="myList"


    }
    calculate_completed();
}

function check(id,set){
    let isChecked;
    if(set === 1) {
        isChecked = "true";
    }
    else {
        isChecked = "false";
    }
    db.setItem("focus"+ id + "completed", isChecked);
    display();
}

function edit(id){
    editID = id;
    let phrase = "focus" + id;
    document.getElementById("focus_modal").style.display = "block";
    document.getElementById("inp1").value = db.getItem(phrase + "name");
    document.getElementById("inp2").value = db.getItem(phrase + "tags");
    document.getElementById("inp3").value = db.getItem(phrase + "duration");
    document.getElementById("startCalendar").value = db.getItem(phrase + "start");
    document.getElementById("endCalendar").value = db.getItem(phrase + "end");
}


function validateMyForm(){
  
    var inp1 = document.getElementById("inp1").value;
    var inp2 = document.getElementById("inp2").value;
    var inp3 = parseInt(document.getElementById("inp3").value);
    var inp4 = document.getElementById("startCalendar").value;
    var inp5 = document.getElementById("endCalendar").value;
    var ID= parseInt(db.getItem('numFocus'));
    console.log("Valid Form:" + ID);

    if(inp4 > inp5){
        alert("Start date cannot be greater than end date.");
        return false;
    }
    if(isNaN(editID) == false){
        ID = editID;
        editID = NaN;
    }
    else{
        /*focus_items[ID] = [];
        focus_items[ID]["id"] = itemsID;*/
        itemsID++;
    }

    let numFocusItems = parseInt(db.getItem("numFocus"));

    if(parseInt(ID) < numFocusItems) {
        let phrase = "focus" + ID;
        db.setItem(phrase+ 'name', inp1);   
        db.setItem(phrase+'tags', inp2);
        db.setItem(phrase+'duration', inp3);
        db.setItem(phrase+'start', inp4);
        db.setItem(phrase+'end', inp5); 

    }
    else {
        db.setItem("numFocus", String(numFocusItems + 1));
        let phrase = "focus" + ID;
        db.setItem(phrase+ 'name', inp1);   
        db.setItem(phrase+'tags', inp2);
        db.setItem(phrase+'duration', inp3);
        db.setItem(phrase+'start', inp4);
        db.setItem(phrase+'end', inp5);
        db.setItem(phrase+"completed", "false");
    }
    
    /*focus_items[ID]["tag"] = inp2;
    focus_items[ID]["name"] = inp1;
    focus_items[ID]["duration"] = inp3;
    focus_items[ID]["start"] = inp4;
    focus_items[ID]["end"] = inp5;*/

    close_modal();
    display();

    return false;

  
}

function add_card() {
    let new_card = document.createElement("div");
    let new_date = document.createElement("p");
    let new_text = document.createElement("textarea");
    let d = new Date();
    new_date.innerHTML = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
    new_text.innerHTML = "Enter Text";
    new_card.classList.add("card"+cardsId);
    cardsId++;
    new_card.appendChild(new_date);
    new_card.appendChild(new_text);
    new_card.addEventListener("change",storeData);
    new_date.addEventListener("change",storeData);
    new_text.addEventListener("change",storeData);
    let card_container = document.getElementById("cards_list");
    card_container.appendChild(new_card);
}


function add(a, b) {
    return a + b;
}
  
















































function focusItemStorage() {
    //focusItems = document.getElementsByClassName("focus_single_item");
    let numFocusItems;
    
    if(db.getItem('numFocus') === null) {
        db.setItem("numFocus","0");
        display();   
    } 
    else {
        display();
    }

    numFocusItems = db.getItem('numFocus');
    let focusItemsArray = document.getElementsByClassName("focus_single_item");
    
   
    console.log("db storage:" + db.getItem('numFocus'));
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
    db.setItem(key+"tags", gridItems[1].childNodes[1].innerHTML);
    db.setItem(key+"duration", gridItems[2].childNodes[0].innerHTML);
    db.setItem(key+"start", gridItems[2].childNodes[2].innerHTML);
    db.setItem(key+"end", gridItems[2].childNodes[4].innerHTML);
    if(checkImg.src === "http://127.0.0.1:5502/mvp/images/tick.png") {
        db.setItem(key+"completed","true");
    }
    else if (checkImg.src === "http://127.0.0.1:5502/mvp/images/tick-blank.png") {
        db.setItem(key+"completed","false");
    }
    else {
        console.log(checkImg.src);
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

function storeData() {
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

document.getElementById('daily_button').addEventListener('click', () => {
    console.log("clicked");
    document.body.classList.add('settings');
    var head = document.getElementById("return");

    

    let numFocusItems = db.getItem("numFocus");
    let wrapper = document.querySelector(".dailyFocus");

    
    wrapper.innerHTML = "";
    for(let i = 0; i < numFocusItems; i++ ) {
        let drag = document.createElement("td");
        drag.id = "drag";
        drag.draggable = "true";
        drag.addEventListener("dragstart", function(event){
            event.dataTransfer.setData("text", event.target.id);
        }, false);
        drag.colSpan = "4";
        drag.rowSpan = "1";
        drag.classList.add("stage-saturn");
        drag.classList.add("element");
        let phrase = "focus" + i + "name";
        drag.innerHTML = db.getItem(phrase);
        wrapper.appendChild(drag);

    }
    

    //head.innerHTML = "May 23, 2021 ;-;";
    //document.body.appendChild(head);
    //var x = document.createElement("INPUT");
    //x.setAttribute("type", "date");
    //var y = document.createElement("INPUT");
    //y.setAttribute("type", "text");
    //document.body.appendChild(x);
    //document.body.appendChild(y);
    head.addEventListener("click", () => {
        document.body.classList.remove('settings');
        //head.remove();
        //x.remove();
        //y.remove();
    });
});
