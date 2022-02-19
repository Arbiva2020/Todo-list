function addItem(event) {
  event.preventDefault();
  let text = document.getElementById("todo-input");
  db.collection("todo-items").add({
    text: text.value,
    status: "active",
  });
  text.value = "";
}

function getItems() {
  db.collection("Todo-items").onSnapshot((snapshot) => {
    // console.log(snapshot);
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      })
    })
    generateItems(items);
  })
}

//when we are looping through items, we need to put them into our todo list
function generateItems(items) {
  //creating an HTML to put the document in:
  let itemsHTML = "";
  items.forEach((item) => {
    //concatenating our HTML:
    //and passing a uniqe id to every single check-mark (if we check
    //the HTML itself, we will notice that every check-mark got
    //a specific id from firebase, because of the ${item.id} we gave it)
    itemsHTML += `
    <div class="todo-item">
            <div class="check">
              <div data-id="${item.id}" class="check-mark ${item.status == "completed" ? "checked" : ""}">
                <img src="images/White_check.svg.png" />
              </div>
            </div>
            <div class="todo-text ${item.status == "completed" ? "checked" : ""}"> ${item.text}</div>
          </div>
    `
  })

  //go to parent - todo-items:
  //replacing the HTML in the div with the HTML that we created on the fly:
  document.querySelector(".todo-items").innerHTML = itemsHTML;
  createEventListeners();
}

//i need to make something happen when i check an item.
//for that thing to happe, i create a function and call it at will
// grabing an id is called:   .dataset
function createEventListeners() {
  let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
  todoCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener("click", function () {
      markCompleted(checkMark.dataset.id);
    });
  });
}

//to mark as completed (firestore update item):
function markCompleted(id) {
  //from the db
  let item = db.collection("Todo-items").doc(id);
  //grabbing the specific item:
  item.get().then(function (doc) {
    if (doc.exists) {
      //console.log("Here is the doc", doc.data());
      let status = doc.data().status;
      if (status == "active") {
        item.update({
          status: "completed",
        });
      } else if (status == "completed") {
        item.update({
          status: "active",
        });
      }
    }
  });
}
// function generateItems(items) {

//   let itemsHTML = "";
//   items.forEach((item) => {
//     itemsHTML += `
//   <div class="todo-item">
//   <div class="check">
//     <div data-id="${item.id}" class="check-mark">
//       <img src="images/White_check.svg.png" />
//     </div>
//   </div>
//   <div class="todo-text">
//   ${item.text}
//   </div>
// </div>
// </div>
// `
//   })
//   document.querySelector(".toto-items").innerHTML = itemsHTML;
//   createEventListeners();
// }

// function createEventListeners() {
//   let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
//   todoCheckMarks.forEach((checkMark) => {
//     checkMark.addEventListener("click", function(){
//       markCompleted(checkMark.dataset.id);
//     })
//   })
// }

// function markCompleted(id) {
//   console.log(id);
// }

getItems();
