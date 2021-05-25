var focus_items = []; 
var itemsID = 0;
var editID = NaN;

focus_items[0] = [];

focus_items[0]["id"] = itemsID;
focus_items[0]["completed"] =1;
focus_items[0]["tag"] ="Work";
focus_items[0]["name"] ="UI Design";
focus_items[0]["duration"] ="40";
itemsID++;

display();

document.getElementById("focus_modal").style.display = "none";

function add_new_focus() {
    editID = NaN;
    document.getElementById("focus_modal").style.display = "block";

}

function close_modal(){
    document.getElementById("focus_modal").style.display = "none";
}

function calculate_completed(){
    var count = 0;
    for (i = 0 ;i < focus_items.length ;i ++) {
        if(focus_items[i]["completed"] == 1){
            count += 1;
        }
    }
    document.getElementById("focus_completed_number").innerHTML = count;
}

function display(){
    document.getElementById("focus_items_list").innerHTML = "";
    for (i = 0 ;i < focus_items.length ;i ++) {
        var item = focus_items[i];
        var node = document.createElement("div");    
        node.id = item.id;      
        node.className = "focus_single_item";    
        var top_half = document.createElement("div");   
        var bottom_half = document.createElement("div");  
        bottom_half.className = "bottom_half";  
        var img_div = document.createElement("div");    
        var details = document.createElement("div");    
        var duration = document.createElement("div");  
        //
        var startDate = document.createElement('div');
        startDate.innerHTML += document.getElementById('startCalendar').value;
        var endDate = document.createElement('div');
        endDate.innerHTML += document.getElementById('endCalendar').value;

        bottom_half.appendChild(startDate);
        bottom_half.appendChild(endDate);
        img_div.className = "grid-item-1";  
        details.className = "grid-item-2";  
        duration.className = "grid-item-3";
        var img = document.createElement("img");  
        img.setAttribute('src', 'images/goal.png');
        img.setAttribute('width', '50px');
        img_div.appendChild(img);
        top_half.className = "focus_single_item_inner";
        img_div.setAttribute("width", "10%");
        details.setAttribute("width", "60%");
        duration.setAttribute("width", "30%");

        var name =  document.createElement("div");
        name.innerHTML = item.name;
        var tag =  document.createElement("div");
        tag.innerHTML = item.tag;
        tag.className = "focus_tag";

        details.appendChild(name);
        details.appendChild(tag);

        top_half.appendChild(img_div);  
        top_half.appendChild(details);  

        if(item.duration){
            var durationtext = document.createElement("span");
            durationtext.innerHTML = item.duration +" Minutes";
            duration.appendChild(durationtext); 
        }

        top_half.appendChild(duration);  

        var done = document.createElement("img");
        done.className = "done_image";
        if(item.completed){
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
    focus_items[id]['completed'] = set;
    display();
}

function edit(id){
    editID = id;
    document.getElementById("focus_modal").style.display = "block";
    document.getElementById("inp1").value = focus_items[id]['name'];
    document.getElementById("inp2").value = focus_items[id]['tag'];
    document.getElementById("inp3").value = focus_items[id]['duration'];
}


function validateMyForm(){
  
    var inp1 = document.getElementById("inp1").value;
    var inp2 = document.getElementById("inp2").value;
    var inp3 = parseInt(document.getElementById("inp3").value);
    var ID= itemsID;
    if(isNaN(editID) == false){
        ID = editID;
        editID = NaN;
    }
    else{
        focus_items[ID] = [];
        focus_items[ID]["id"] = itemsID;
        itemsID++;
    }
    
    focus_items[ID]["tag"] = inp2;
    focus_items[ID]["name"] = inp1;
    focus_items[ID]["duration"] = inp3;

    close_modal();
    display();

    return false;

  
}

function add_card() {
    let new_card = document.createElement("textarea");
    new_card.innerHTML = "New Card";
    let card_container = document.getElementById("cards_list");
    card_container.appendChild(new_card);
}
