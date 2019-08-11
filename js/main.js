const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes
const Check = "fa-check-circle";
const Uncheck = "fa-circle";
const Linethrough = "lineThrough";

//Adding items to our variable
let List, id;

//Get items from the local storage
let data = localStorage.getItem("toDo");
//Check data if not empty
if (data) {
  List = JSON.parse(data);
  //set id to the last one in the list
  id = List.length;
  //load list to the UI
  loadList(List);
} else {
  //if data is empty
  List = [];
  id = 0;
}
//load data to the UI
function loadList(array) {
  array.forEach(function(item) {
    addTask(item.name, item.id, item.done, item.trash);
  });
}

//show todays date
//today is an object with date fx
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//functions
function addTask(toDo, id, done, trash) {
  //if in the trash, prevent the code below from running
  if (trash) {
    return;
  }
  //if itemis completed
  const Done = done ? Check : Uncheck;
  const Line = done ? Linethrough : "";
  const item = `
  <li class="item">
    <i class="far ${Done} co" job="complete" id=${id}></i>
    <p class="text ${Line}">${toDo}</p>
    <i class="fa fa-trash de" job="delete" id=${id}></i>
  </li>
    `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

//Add item when user presses Enter key
document.addEventListener("keyup", function(e) {
  if (e.keyCode == 13) {
    //get value from input field
    const toDo = input.value;
    //if input isn't empty
    if (toDo) {
      //run addTask fx
      addTask(toDo, id, false, false);
      List.push({ name: toDo, id: id, done: false, trash: false });
      localStorage.setItem("toDo", JSON.stringify(List));
      id++;
    }
    input.value = "";
  }
});

//finish task
function finishTask(element) {
  element.classList.toggle(Check);
  element.classList.toggle(Uncheck);
  element.parentNode.querySelector(".text").classList.toggle(Linethrough);
  //update the List array
  List[element.id].done = List[element.id].done ? false : true;
}

//remove task
function removeTask(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  List[element.id].trash = true;
}

//Clear local storage
clear.addEventListener("click", function() {
  localStorage.clear();
  location.reload;
});

//Target the items created dynamically
list.addEventListener("click", function(e) {
  //return clicked element inside the list
  const element = e.target;
  //get job attribute of that element
  //returns complete or delete
  const elementJob = element.attributes.job.value;
  if (elementJob == "complete") {
    finishTask(element);
  } else if (elementJob == "delete") {
    removeTask(element);
  }
  localStorage.setItem("toDo", JSON.stringify(List));
});
