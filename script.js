console.log("My note project");
showNotes();
// Function to check local storage
function checkLocalStorage() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
}

// If user add a note, add to a local storage
document.getElementById("addBtn").addEventListener("click", ()=> {
  let titleName = document.getElementById("titleName");
  let message = document.getElementById("message");
  checkLocalStorage();
  let myObj = {
    title: titleName.value,
    mes: message.value,
  };
  if (titleName.value.length && message.value.length >= 4) {
    notesObj.push(myObj);
    alert("Your note is successfull added");
  } else {
    alert("You must enter more than 2 charecter");
  }
  localStorage.setItem("notes", JSON.stringify(notesObj));
  titleName.value = "";
  message.value = "";
  showNotes();
});

// Function to show in your DOM
function showNotes() {
  checkLocalStorage();
  let html = "";
  notesObj.forEach((element, index) => {
    html += `
        <div class="card mx-2 my-2" style="width: 20rem;">
        <div class="card-body">
            <h5 class="card-title searchTitle">${index + 1} ${element.title}</h5>
            <p class="card-text">${element.mes}</p>
            <a id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</a>
        </div>
    </div>
        `;
    let notes = document.getElementById("notes");
    if (notesObj.length != 0) {
      notes.innerHTML = html;
    } else {
      notes.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
  });
}

// Function to delete a note
function deleteNote(index) {
  checkLocalStorage();
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Function to search note
document.getElementById("search").addEventListener("click", e => e.preventDefault());

document.getElementById("input").addEventListener("input", ()=>{
  let inputVal = input.value.toLowerCase();
  Array.from(document.getElementsByClassName("showContent")).forEach(element => {
    let text = element.getElementsByClassName("searchTitle")[0].innerText;
    if(text.includes(inputVal)){
      element.style.display = "block";
    }else{
      element.style.display = "none";
    }
  });
})
