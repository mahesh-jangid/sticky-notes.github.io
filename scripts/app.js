const noteContainer = document.querySelector("#notes-container");
const addNotes = document.querySelector("#add-note");

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const myNotes = [];

  textAreaData.forEach((myNote) => {
    return myNotes.push(myNote.value);
  });
  ("");

  localStorage.setItem("notes", JSON.stringify(myNotes));
};

const addNewNotes = (text = "Mr. Mahesh Jangid") => {
  const note = document.createElement("div");
  note.classList.add("notes");

  const htmlData = `   <div class="button-container">
  <div class="btn edit-btn">
    <span class="ti-pencil-alt"></span>
  </div>
  <div class="btn delete-btn">
    <span class="ti-trash"></span>
  </div>
</div>
<div class="result ${text ? " " : "hidden"}"></div>
<textarea class="${text ? "hidden" : ""}"></textarea>`;

  note.insertAdjacentHTML("afterbegin", htmlData);

  noteContainer.appendChild(note);

  // delete note
  const editBtn = note.querySelector(".edit-btn");
  const deleteBtn = note.querySelector(".delete-btn");
  const resultContainer = note.querySelector(".result");
  const textArea = note.querySelector("textarea");
  deleteBtn.addEventListener("click", () => {
    note.remove();
  });

  textArea.value = text;
  resultContainer.innerHTML = text;
  console.log(resultContainer);

  // Edit Note

  editBtn.addEventListener("click", () => {
    resultContainer.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", (e) => {
    const textValue = e.target.value;

    resultContainer.innerHTML = textValue;

    updateLSData();
  });
};

// Getting data back from the local storage

const savedNotes = JSON.parse(localStorage.getItem("notes"));

if (savedNotes) {
  savedNotes.forEach((savedNote) => {
    return addNewNotes(savedNote);
  });
}
addNotes.addEventListener("click", () => {
  addNewNotes();
});
