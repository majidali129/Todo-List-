let name = document.getElementById("name"),
    date = document.getElementById("date"),
    details = document.getElementById("details"),
    taskName = document.getElementById("task-name"),
    taskDate = document.getElementById("task-date"),
    taskDescription = document.getElementById("task-description");


// ############## prevent default behavior  ############
let form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
    validateForm()
    e.preventDefault();
});
// ############# validate fome ########### 
function validateForm() {
    if (name.value == "") {
        document.querySelector(".error-message").innerHTML = "Field can't be empty";
    } else {
        // acceptStoreData()
        clearFields()
        // console.log(data)
        document.querySelector(".error-message").innerHTML = "";


        // ### setting attribute to hide the form after adding the task 

        let addBtn = document.getElementById("add-btn");
        addBtn.setAttribute("data-bs-dismiss", "");
        addBtn.setAttribute("data-bs-dismiss", "modal");
        addBtn.click();
    }
}
// ####### Clear Fields ########## 
function clearFields() {
    acceptStoreData()
    name.value = "";
    date.value = "";
    details.value = "";
}
// ################## Accept and Store Data ################ 
// let data = {};
// function acceptStoreData() {
//     data["taskname"] = name.value;
//     data["taskdate"] = date.value;
//     data["taskdetails"] = details.value;
//     console.log(data)
//     add();
// }

let data = [];
function acceptStoreData() {
    // console.log(data)
    let name = document.getElementById("name"),
    date = document.getElementById("date"),
    details = document.getElementById("details");
    data.push({
        task: name.value,
        dueDate: date.value,
        taskDetails: details.value

    });
    add()

    localStorage.setItem("data",JSON.stringify(data));
}

// ############## add task to list ############ 
function add() {
    let finalOutput = document.querySelector(".final-task");
    // console.log(finalOutput)

    finalOutput.innerHTML = "";
    if(data.length>0){
        data.map((element,index)=>{
         let finalOutput = document.querySelector(".final-task");
          return finalOutput.innerHTML += `
         <div class="output mb-3" id=${index}>
     
          <label for="">Name :</label> 
         <div class="task-name" id="task-name">${element.task}</div> 
     <label for="">Date :</label> 
     <div class="task_date" id="task-date">${element.dueDate}</div> 
      <label for="">Description :</label>  
     <div class="task-description" id="task-description">${element.taskDetails} </div> 
     <br>
     <div class="buttons">
         <button class="edit-task" id="edit-btn"
         onclick="updateTask(this)" data-bs-target="#staticBackdrop" data-bs-toggle="modal" >Edit Task</button>
         <button class="remove-task" id="delete-btn"
          onclick="deleteTask(this)">Delete Task</button>
     </div>
     </div> `
     
        })
    }else{
        alert("Nothing to show")
    }
   console.log(data)

}

// ####### Edit/ Update Task ######### 
function updateTask(e) {
    document.getElementById("name").value = e.parentElement.parentElement.children[1].innerHTML
    document.getElementById("date").value = e.parentElement.parentElement.children[3].innerHTML;
    document.getElementById("details").value = e.parentElement.parentElement.children[5].innerHTML
    deleteTask(e);
}
// ######## Delete task ####### 
function deleteTask(e) {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.index,1);
    localStorage.setItem("data",JSON.stringify(data));
}

(
    (()=>{
        data = JSON.parse(localStorage.getItem("data"));
        add()
    })
)()