console.log("HELLO WORLD");

//Getting all required elements
let inputBox = document.querySelector(".inputField input");
let addBtn = document.querySelector(".inputField button");
let todoList = document.querySelector(".todoList");
let deleteBtnAll  = document.querySelector(".footer button");
inputBox.onkeyup = () => {
    let userData = inputBox.value; //getting user entered value
    if (userData.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}
showTasks();
// if user click on the add button Text will be added to the local storage.
addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks(); //calling showtasks function
}
// Function to add task list inside ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage); //convert json string into a js object
    }
    let pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //passing the length value in pending Number
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += ` <li> ${element} <span onclick = "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;//adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}

//delete task
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    // after remove the li again update the localStorage
    listArr.splice(index, 1); //delete or remove the particular indexed li
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

// delete all task function 
deleteBtnAll.onclick = ()=> {
    listArr = []; //empty the array
    // after remove all task again update the localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}