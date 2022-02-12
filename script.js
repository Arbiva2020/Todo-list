function addItem(event) {
  event.preventDefault();
  let text = document.getElementById("todo-input");
  db.collection("Todo-items").add({
    text: text.value,
    status: "active",
  })
}
