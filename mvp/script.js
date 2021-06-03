var focus_items = []; 
var itemsID = 0;
var editID = NaN;

focus_items[0] = [];

focus_items[0]["id"] = itemsID;
focus_items[0]["completed"] =1;
focus_items[0]["tag"] ="Work";
focus_items[0]["show"] = true;
focus_items[0]["name"] ="UI Design";
focus_items[0]["duration"] ="40";
focus_items[0]["start"] ="2021-05-12";
focus_items[0]["end"] ="2021-05-13";
itemsID++;


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
    for (i = 0 ;i < focus_items.length ;i ++) {
        if(focus_items[i]["completed"] == 1 && 
        focus_items[i]['show'] == true){
            count += 1;
        }
    }
    document.getElementById("focus_completed_number").innerHTML = count;
}

function display(){
    document.getElementById("focus_items_list").innerHTML = "";
    for (i = 0 ;i < focus_items.length ;i ++) {
        var item = focus_items[i];
        if(item['show']){
            var node = document.createElement("div");    
            node.id = item.id;      
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
            name.innerHTML = item.name;
            name.className = "focus_name";
            name.id = "name"+i;
            var tag =  document.createElement("div");
            tag.innerHTML = item.tag;
            tag.className = "focus_tag";

            details.appendChild(name);
            details.appendChild(tag);

            top_half.appendChild(img_div);  
            top_half.appendChild(details);  

            if(item.duration){
                var durationtext = document.createElement("span");
                durationtext.innerHTML = item.duration +" Minutes\n";
                duration.appendChild(durationtext); 
                var durationtext = document.createElement("br");
                duration.appendChild(durationtext); 
            }

            if(item.start){
                var durationtext = document.createElement("span");
                durationtext.innerHTML = item.start;
                duration.appendChild(durationtext); 
                var durationtext = document.createElement("br");
                duration.appendChild(durationtext); 
                var durationtext = document.createElement("span");
                durationtext.innerHTML = item.end;
                duration.appendChild(durationtext); 
            }


            top_half.appendChild(duration);  

            var done = document.createElement("img");
            done.id = "done"+item.id;
            if(item.completed){
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
            deleteIcon.id = "delete"+item.id;
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
    focus_items[id]['show'] = false;
    display();
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
    document.getElementById("startCalendar").value = focus_items[id]['start'];
    document.getElementById("endCalendar").value = focus_items[id]['end'];
}


function validateMyForm(){
  
    var inp1 = document.getElementById("inp1").value;
    var inp2 = document.getElementById("inp2").value;
    var inp3 = parseInt(document.getElementById("inp3").value);
    var inp4 = document.getElementById("startCalendar").value;
    var inp5 = document.getElementById("endCalendar").value;
    var ID= itemsID;

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
        focus_items[ID] = [];
        focus_items[ID]["id"] = itemsID;
        itemsID++;
    }
    
    focus_items[ID]["tag"] = inp2;
    focus_items[ID]["name"] = inp1;
    focus_items[ID]["duration"] = inp3;
    focus_items[ID]["start"] = inp4;
    focus_items[ID]["end"] = inp5;
    focus_items[ID]['show'] = true;

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
    new_card.appendChild(new_date);
    new_card.appendChild(new_text);
    let card_container = document.getElementById("cards_list");
    card_container.appendChild(new_card);
}
