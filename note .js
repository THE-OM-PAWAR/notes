//  here getting all elements

let container = document.getElementById("container");
let add = document.getElementById("add");
let cancel = document.getElementById("cnlBtn");
let cancel2 = document.getElementById("cnlBtn2");
let create = document.getElementById("createbtn");
let create2 = document.getElementById("createbtn2");
let title = document.getElementById("Nname");
let value = document.getElementById("value");
let allNote = document.getElementById("allNote");
let notePanels = document.getElementById("notePanel");
let notePanel2 = document.getElementById("notePanel2");

main2.hidden = true;
main.hidden = true;

modal(
  "type1",
  "About this application",
  "this is a note taking application fully responsive and easy UI.  <br>It is progressive web application thus it can be download and can be run offline, it is created in pure HTML CSS and javascript and any other third party plugin and modules are not taken in use. <br>Developed in 2022",
  "Check-Out"
);

document.getElementById("main__").style.display = "none";

cancel.onclick = () => {
  main.hidden = true;
};
cancel2.onclick = () => {
  main2.hidden = true;
};

// let check = ()=>{
//   console.log(document.getElementsByClassName("main"))
// }
// if (condition) {

// }

let notel;
let txt = () => {
  notel = localStorage.length;
};
txt();

let confirm_;
for (let i = 0; i < notel; i++) {
  let titey = localStorage.key(i);
  if (titey == "isOpened") {
    confirm_ = true;
  }
}

if (confirm_ != true) {
  localStorage.setItem("isOpened", true);
  localStorage.setItem(
    "Some notes like this",
    `I like to write ALL OF THE TASKS on my to-do list and use the check mark to note when I've finished a task. I don't just keep today's tasks on the list though. I keep a long list of all of the things I want to do. I have found that getting all of those little tasks out of my head and onto paper frees up brain space.
`
  );
  localStorage.setItem(
    "what some thing you can Note",
    `something that happened that day, a dream you had, future plans, an event, an idea, or strong emotion or mood you're feeling. Once you start writing, you're free to veer off into any subject you like! But having something in mind when you start the entry can help kickstart the writing process.
`
  );
  localStorage.setItem(
    "What do people write in their Notes app?",
    `The Notes app is where thoughts become ideas, ideas become Tweets, and Tweets get workshopped. It's also where apologies are drafted (especially if you're a celebrity), breakup anti-ghost texts are constructed, and passwords are hidden for safekeeping.
`
  );

  document.getElementById("main__").style.display = "flex";
}

txt();
console.log(localStorage);
create.onclick = () => {
  if (document.getElementById("main__")) {
    document.getElementById("main__").remove();
  }

  let key = title.value;
  let realval = value.value;
  if (title.value.length == 0) {
    // localStorage.setItem(key, realval);

    let alrets = document.createElement("p");
    alrets.id = "alerts";
    alrets.textContent = "please give a title";
    notePanels.style.transition = "all 2s";
    title.before(alrets);

    setTimeout(() => {
      alrets.remove();
    }, 2000);
    console.log("error");
  } else {
    let d = new Date().toDateString();
    let t = new Date().toTimeString();
    let time = d.slice(4, 10) + " at " + t.slice(0, 5);
    // console.log(time)
    let realval2 = time + realval;

    localStorage.setItem(key, realval2);
    title.value = "";
    value.value = "";
    main.hidden = true;

    let note = document.createElement("div");
    note.className = "note";
    allNote.prepend(note);
    note.innerHTML = `<div class="title">
          <h2>${key}</h2>
          
          <div class="delete" onclick = "deletoo(this)" >
            <svg class = "svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>
          </div>
          
        </div>
        <div class="written" onclick = "notepan(this)"><p hidden ="true" >${time}</p><p>${realval}</p></div>
        
        `;
  }
};

function plus() {
  if (document.getElementById("main__")) {
    document.getElementById("main__").remove();
  }
  main.hidden = false;
}
add.addEventListener("click", plus);

// function deletooo(element) {
//   console.log(element.currentTarget);
// }

for (let i = 0; i < notel; i++) {
  let titey = localStorage.key(i);
  let reaval = localStorage.getItem(titey);
  let reaval2 = reaval.slice(15);
  let reavaltime = reaval.slice(0, 15);

  let note = document.createElement("div");
  note.className = "note";
  allNote.prepend(note);

  note.innerHTML = `<div class="title">
  <h2>${titey}</h2>
  
  <div class="delete" onclick = "deletoo(this)" id = "delet${i}">
  <svg class = "svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>
  </div>
  
  </div>
  <div class="written" onclick = "notepan(this)" ><p hidden ="true" >${reavaltime}</p><p>${reaval2}</p></div>
  `;
  if (titey == "isOpened") {
    note.remove();
  }
}

let notepan = (element) => {
  console.log("ompaswar");
  console.log(element.previousElementSibling.firstElementChild.textContent);
  main2.hidden = false;
  document.getElementById("times").textContent =
    element.children[0].textContent;
  notePanel2.children[2].innerHTML =
    element.previousElementSibling.firstElementChild.textContent;

  notePanel2.children[3].textContent = element.children[1].textContent;

  // console

  // localStorage.setItem(notePanel2.children[1].textContent , notePanel2.children[2].textContent )
};

create2.onclick = () => {
  if (document.getElementById("main__")) {
    document.getElementById("main__").remove();
  }
  let d = new Date().toDateString();
  let t = new Date().toTimeString();
  let time = d.slice(4, 10) + " at " + t.slice(0, 5);
  // console.log(time)

  console.log(notePanel2.children[2].textContent);
  console.log(notePanel2.children[3].innerHTML);
  localStorage.setItem(
    notePanel2.children[2].textContent,
    time + notePanel2.children[3].innerHTML
  );
  main2.hidden = true;
  window.location.reload();
};

let note = document.getElementsByClassName("note");
console.log(note);

let permission = true;
let delete_count = 0

let deletoo = (element) => {

  if (document.getElementById("main__")) {
    document.getElementById("main__").remove();
  }
  delete_count++

  element.parentElement.parentElement.className =  `note dlt${delete_count}`
  console.log( delete_count ,element.parentElement.parentElement.className )
  console.log(element.previousElementSibling.innerHTML);
  let deletkey = element.previousElementSibling.innerHTML;
  element.parentElement.parentElement.style.scale = "0";
  setTimeout(() => {
    element.parentElement.parentElement.style.display = "none";
  }, 400);

  setTimeout(() => {
    if (permission == true) {
      element.parentElement.parentElement.remove();
      localStorage.removeItem(deletkey);
    }
  }, 6100);
  modal(
    "type2",
    "Deleted Successfully",
    "file is deleted to recover click on 'undo'",
    "Undo",
    6000,
    "prventdelete",
    `'dlt${delete_count.toString()}'`
  );
};
// let consol = (element){
  function prventdelete(className) {
    permission =false
    document.getElementsByClassName(className)[0].style.display = "flex"
    document.getElementsByClassName(className)[0].style.scale = 1
    document.getElementsByClassName(className).className = "note"
  }

