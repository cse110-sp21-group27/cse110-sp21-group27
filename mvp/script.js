

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
    document.getElementById("warning").innerHTML = "";
}


function calculate_completed(){
    var count = 0;
    let numFocusItems = db.getItem('numFocus');
    for (i = 0 ;i < numFocusItems ;i ++) {
        let phrase = "focus" + i +"completed";
        let staus = "focus" + i +"completed";
        if(db.getItem(phrase) === "true" && db.getItem(staus) === "true"){
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
        let phrase = "focus" + i;
        if(db.getItem(phrase+"show") === "true"){
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
            //img.setAttribute('src', 'images/goal.png');
            img.setAttribute('width', '50px');
            img_div.appendChild(img);
            top_half.className = "focus_single_item_inner";
            img_div.setAttribute("width", "10%");
            details.setAttribute("width", "50%");
            duration.setAttribute("width", "40%");

            var name =  document.createElement("div");
            name.innerHTML = db.getItem(phrase+"name");
            name.className = "focus_name";
            name.id = "name"+i;
            var tag =  document.createElement("div");
            tag.innerHTML = db.getItem(phrase+"tags");
            tag.className = "focus_tag";
            
            //Emoji system
            //console.log(tag.innerHTML); //prints the tag name
            var tag_emoji = {
                "Health" : 'images/medical.png',
                "Academics" : 'images/academics.png',
                "Personal" : 'images/personal-New.png',
                "Urgent" : 'images/urgent.png',
                "Financials" : 'images/finance.png',
                "Work" : 'images/work.png',
                "Family" : 'images/family.png',
                "Cleaning" : 'images/clean.png'
            }
            img.setAttribute('src', tag_emoji[tag.innerHTML]);
            
            details.appendChild(name);
            details.appendChild(tag);

            top_half.appendChild(img_div);  
            top_half.appendChild(details);  

            if(db.getItem(phrase+"duration")){
                var durationtext = document.createElement("span");
                durationtext.innerHTML = db.getItem(phrase+"duration");
                durationtext.innerHTML += " Minute";
                if(db.getItem(phrase+"duration") > 1){
                    durationtext.innerHTML += "s";
                }
                duration.appendChild(durationtext); 
                durationtext.id = "minutes"+i
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
            done.id = "done"+i;
            done.className = "done_image";
            if(db.getItem(phrase+"completed") === "true"){
                done.className = "done_image";
                done.setAttribute('src', 'images/tick.png');
                done.setAttribute("onclick", "check("+i+",0)");
            }
            else{
                done.className = "notdone_image";
                done.setAttribute('src', 'images/tick-blank.png');
                done.setAttribute("onclick", "check("+i+",1)");
            }

            var deleteIcon = document.createElement("img");
            deleteIcon.className = "delete_image";
            deleteIcon.id = "delete"+i;
            deleteIcon.setAttribute('src', 'images/trash.png');
            deleteIcon.setAttribute("onclick", "deleteData("+i+",1)");

            var edit = document.createElement("div");
            edit.className = "edit_focus";
            edit.innerHTML =  "&#x270E; Edit"
            edit.setAttribute("onclick", "edit("+i+")");
            edit.id = "edit"+i;

            var check = document.createElement("div");
            
            check.className = "clear";
            bottom_half.appendChild(deleteIcon);
            bottom_half.appendChild(done);
            bottom_half.appendChild(edit);
            bottom_half.appendChild(check);
            
            node.appendChild(top_half);  
            node.appendChild(bottom_half);  
            document.getElementById("focus_items_list").appendChild(node);     // Append <li> to <ul> with id="myList"
        }

    }
    calculate_completed();
}

function deleteData(id){

    let numFocusItems = parseInt(db.getItem("numFocus"));

    for (i = id ;i < numFocusItems - 1;i ++) {
        var phrase = "focus" + id;
        var phrase2 = "focus" + (id+1);
        db.setItem(phrase+ 'name', db.getItem(phrase2+"name"));   
        db.setItem(phrase+'tags',  db.getItem(phrase2+"tags"));   
        db.setItem(phrase+'duration',  db.getItem(phrase2+"duration"));   
        db.setItem(phrase+'start',  db.getItem(phrase2+"start"));   
        db.setItem(phrase+'end',  db.getItem(phrase2+"end"));   
        db.setItem(phrase+"completed",  db.getItem(phrase2+"completed"));   
        db.setItem(phrase+"show",  db.getItem(phrase2+"show"));   
    }

    var all = document.getElementsByClassName("stage-saturn");
    var phrase = "focus" + (numFocusItems-1);

    for (var i=all.length -1; i > -1; i--) {
        if(all[i].innerHTML == db.getItem(phrase+"name")){
            all[i].parentNode.removeChild(all[i]);
        }
    }
    
    db.removeItem(phrase+ 'name');   
    db.removeItem(phrase+'tags');
    db.removeItem(phrase+'duration');
    db.removeItem(phrase+'start');
    db.removeItem(phrase+'end');
    db.removeItem(phrase+"completed");
    db.removeItem(phrase+"show");


    db.setItem("numFocus", String(numFocusItems - 1));
    display();
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
        document.getElementById("warning").innerHTML = "Start date cannot be greater than end date.";
        return false;
    }
    document.getElementById("warning").innerHTML = "";
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
        console.log("VALIDATE " + numFocusItems );
        console.log("MLAO " + (numFocusItems +1));
        db.setItem("numFocus", String(numFocusItems + 1));
        let phrase = "focus" + ID;
        db.setItem(phrase+ 'name', inp1);   
        db.setItem(phrase+'tags', inp2); 
        db.setItem(phrase+'duration', inp3);
        db.setItem(phrase+'start', inp4);
        db.setItem(phrase+'end', inp5);
        db.setItem(phrase+"completed", "false");
        db.setItem(phrase+"show", "true");
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

function remove_card(card,date,text,image) {
    text.remove();
    date.remove();
    image.remove();
    card.remove();
    storeData();
}

/*function makeDetails() {
    this.value = "Enter Text";
    this.ctrl = false;
}

var details = new makeDetails();*/

function handleKeyDown(event,text,details) {
    details["value"] = text.value;
    if (event.key == "Control") {
        details["ctrl"] = true;
    }
}

function handleKeyUp(event,text,details) {
    if (event.key == "Control") {
        details["ctrl"] = false;
    }
    if (details["ctrl"]) {
        if (event.key == ";") {
            details["value"] += "• ";
            text.value = details["value"];
        }
        if (event.key == "'") {
            details["value"] += "⁃ ";
            text.value = details["value"];
        }
        if (event.key == "/") {
            details["value"] += "‣ ";
            text.value = details["value"];
        }
    }
}

/* 

// Function to change webpage background color
function changeBodyBg(color){
    document.querySelector("textarea").style.background = color;
    var elem = document.getElementById("cards_list").childNodes[1];
    elem.style.background = color;
}

*/

/*
 //yellow color button
    let yellow_button = document.createElement("button");
    yellow_button.innerHTML = "Yellow";
    new_card.append(yellow_button);
    yellow_button.addEventListener('click', () => {
        changeBodyBg("yellow");

    });

    //green color button
    let green_button = document.createElement("button");
    green_button.innerHTML = "Green";
    new_card.append(green_button);
    green_button.addEventListener('click', () => {
        changeBodyBg("green");
    });
    //blue color button
    let blue_button = document.createElement("button");
    blue_button.innerHTML = "Blue";
    new_card.append(blue_button);
    blue_button.addEventListener('click', () => {
        changeBodyBg("blue");
    });
    //white color button
    let white_button = document.createElement("button");
    white_button.innerHTML = "White";
    new_card.append(white_button);
    white_button.addEventListener('click', () => {
        changeBodyBg("white");
    });

    */



function changeCardColor(node,color){
    // document.querySelector("textarea").style.background = color;
    // var elem = document.getElementById("cards_list").childNodes[1];
    // elem.style.background = color;
    node.style.background = color;
    node.childNodes[1].style.background = color;
}

function add_card(toStore=true) {
    let new_card = document.createElement("div");
    new_card.className = "card_item"
    let new_date = document.createElement("p");
    let new_text = document.createElement("textarea");
    let cross_img = document.createElement("img");
    //color stuff
    let color = document.createElement("select");
    let d = new Date();
    var details = { value: "Enter Text", ctrl: false };
    new_date.innerHTML = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
    new_text.value = "Enter Text";
    cross_img.src = "./images/cross-icon.png";
    cross_img.alt = "X";
    cross_img.addEventListener("click",() => { remove_card(new_card,new_date,new_text,cross_img); });
    new_card.appendChild(new_date);
    //color stuff
    let prompt = document.createElement("option");
    prompt.id = "option-0";
    prompt.textContent = "Select a Color";
    color.appendChild(prompt);

    let white = document.createElement("option");
    white.id = "option-1";
    white.textContent = "white";
    color.appendChild(white);

    let LightCoral = document.createElement("option");
    LightCoral.id = "option-2";
    LightCoral.textContent = "LightCoral";
    color.appendChild(LightCoral);

    let LightSkyBlue = document.createElement("option");
    LightSkyBlue.id = "option-3";
    LightSkyBlue.textContent = "LightSkyBlue";
    color.appendChild(LightSkyBlue);


    let Gold = document.createElement("option");
    Gold.id = "option-4";
    Gold.textContent = "Gold";
    Gold.value = "Gold";
    color.appendChild(Gold);

    let BlueViolet = document.createElement("option");
    BlueViolet.id = "option-5";
    BlueViolet.textContent = "BlueViolet";
    color.appendChild(BlueViolet);
    new_card.appendChild(color);
    //color stuff
    new_card.appendChild(cross_img);
    new_card.appendChild(new_text);
    new_card.addEventListener("change",storeData);
    new_date.addEventListener("change",storeData);
    new_text.addEventListener("change",storeData);
    let card_container = document.getElementById("cards_list");
    card_container.appendChild(new_card);
    new_text.addEventListener("keydown",(event) => { handleKeyDown(event,new_text,details); });
    new_text.addEventListener("keyup",(event) => { handleKeyUp(event,new_text,details); });
    if (toStore) {
        storeData();
    }
    //help change color of cards
    color.addEventListener('change', (event) => {
        //console.log(event.target.parentNode);
        changeCardColor(event.target.parentNode, event.target.value);
    });
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
    db.setItem(key+"duration", gridItems[2].childNodes[0].innerHTML.split(" ")[0]);
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
    db.setItem(key+"nodecolor",card.style.background);
    db.setItem(key+"childcolor",cardItems[1].style.background);
    db.setItem(key+"text",cardItems[3].value);
}

function storeData() {
    focusItemStorage();
    cardStorage();
}

document.getElementById("cards_button").addEventListener("change",storeData);

function loadCard(card,key) {
    let cardItems = card.childNodes;
    cardItems[0].innerHTML = db.getItem(key+"date");
    card.style.background = db.getItem(key+"nodecolor");
    cardItems[1].style.background = db.getItem(key+"childcolor");
    cardItems[3].value = db.getItem(key+"text");
}

function loadData() {
    let numCards = db.getItem("numCards");
    let cardsArray = document.querySelectorAll("#cards_list > div");
    for (let i = cardsArray.length; i < numCards; i++) {
        add_card(false);
    }
    cardsArray = document.querySelectorAll("#cards_list > div");
    for (let i = 0; i < numCards; i++) {
        loadCard(cardsArray[i],"card" + i);
    }
}

document.addEventListener("DOMContentLoaded",loadData);

function addDateZeroes(datePrint) {
    if (datePrint.indexOf("/") == 1) {
        datePrint = "0" + datePrint;
    }
    let dateStart = datePrint.substring(0,3);
    let dateEnd = datePrint.substring(3);
    if (dateEnd.indexOf("/") == 1) {
        dateEnd = "0" + dateEnd;
    }
    return dateStart + dateEnd;
}

//Calendar Start
//Automatically gets current Date. Change date with select Date
//Changes?? remove 0 from single digit days and months
var dt = new Date();
document.getElementById("datetime").innerHTML = addDateZeroes(dt.toLocaleDateString());
//6/9/2021 what we get
//06/09/2021 what we want
function handler(e){
    console.log(e.target.value);
    document.getElementById("datetime").textContent = e.target.value.substring(5,7) + "/" + e.target.value.substring(8) + "/" + e.target.value.substring(0,4);
    let numFocusItems = db.getItem("numFocus");
    let wrapper = document.querySelector(".dailyFocus");

    let allTimes = document.querySelectorAll("#box");
    for(let i=0; i<allTimes.length; i++) {
        
        let items = allTimes[i].childNodes;
        console.log(items)
        for(let j=0; j<items.length; j++) {
            
            console.log(items[j]);
            allTimes[i].removeChild(items[j]);
            // document.querySelectorAll("#box")[1].removeChild(document.querySelectorAll("#box")[1].firstChild)
        }
    }

    
    wrapper.innerHTML = "<td colspan='4' rowspan='1' <div style ='width: 80%;'id='box' class='start' ondrop='drop(event)' ondragover='allowDrop(event)'></div></td>";
    for(let i = 0; i < numFocusItems; i++ ) {
        let drag = document.createElement("td");
        drag.id = "drag"+i;
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

    populateDailyView();
  }
//Calendar End





function populateDailyView() {
    
    let currDate = document.getElementById("datetime").innerHTML;
    console.log(currDate);
    for(i = 0; i < db.getItem("numFocus"); i++) {
        let ID = "drag"+i;
        let phrase = currDate + ID;
        console.log(phrase);
        if(db.getItem(phrase) === null) { continue;}
        else{
           
            let box = db.getItem(phrase);
            console.log(box);
            let focusItem = document.getElementById(ID);
            //.class = "9:00am" <- Example of format
            document.getElementsByClassName(box)[0].appendChild(focusItem);
        }
    }
}








document.getElementById('daily_button').addEventListener('click', () => {
    console.log("clicked");
    document.body.classList.add('settings');
    var head = document.getElementById("return");
    document.querySelector("h1").style = "display: block;"


    

    let numFocusItems = db.getItem("numFocus");
    let wrapper = document.querySelector(".dailyFocus");

    
    wrapper.innerHTML = "<td colspan='4' rowspan='1' <div style ='width: 80%;'id='box' class='start' ondrop='drop(event)' ondragover='allowDrop(event)'></div></td>";
    for(let i = 0; i < numFocusItems; i++ ) {
        let drag = document.createElement("td");
        drag.id = "drag"+i;
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

    populateDailyView();

    
    

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
        document.querySelector("h1").style = "display: none;"

        let allTimes = document.querySelectorAll("#box");
    for(let i=0; i<allTimes.length; i++) {
        
        let items = allTimes[i].childNodes;
        console.log(items)
        for(let j=0; j<items.length; j++) {
            
            console.log(items[j]);
            allTimes[i].removeChild(items[j]);
            // document.querySelectorAll("#box")[1].removeChild(document.querySelectorAll("#box")[1].firstChild)
        }
    }
        //head.remove();
        //x.remove();
        //y.remove();
    });
});