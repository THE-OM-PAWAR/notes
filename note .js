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
let notePanels = document.getElementById("notePanel")
let notePanel2 = document.getElementById("notePanel2")


main2.hidden = true
main.hidden = true;

cancel.onclick = () => {
  main.hidden = true;
};
cancel2.onclick = () => {
  main2.hidden = true;
};

create.onclick = () => {
  
  let key = title.value;
  let realval =  value.value;
  if (title.value.length == 0) {
    // localStorage.setItem(key, realval);


    let alrets = document.createElement('p')
    alrets.id = "alerts"
    alrets.textContent = "please give a title"
    notePanels.style.transition = "all 2s"
    title.before(alrets)
    
      setTimeout(() => {
        alrets.remove()
  }, 2000);
    console.log("error")
  }else{
    let d = new Date().toDateString()
    let t = new Date().toTimeString()
    let time = d.slice(4,10) + " at " + t.slice(0,5)
    // console.log(time)
    let realval2 = time + realval

    localStorage.setItem(key, realval2);
    title.value = "";
    value.value = "";
    main.hidden = true;
  
    let note = document.createElement("div");
    note.className = "note";
    allNote.prepend(note);
    note.innerHTML = `<div class="title">
          <div class="retitle"><h3>${key}</h3></div>
          
          <div class="delete" onclick = "deletoo(this)" >
            <svg class = "svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>
          </div>
          
        </div>
        <div class="written" onclick = "notepan(this)"><p hidden ="true" >${time}</p><p>${realval}</p></div>
        
        `;

  }
};




function plus() {
  main.hidden = false;
}
add.addEventListener("click", plus);

// function deletooo(element) {
//   console.log(element.currentTarget);
// }

let notel = localStorage.length;
let txt = () => {
  let notel = localStorage.length;
  if (notel == 0) {
    let pss = document.createElement("p");
    pss.classList = "pss";
    pss.textContent = "Make Some Note";
    allNote.append(pss);
  }
};
console.log(notel);


for (let i = 0; i < notel; i++) {
  let titey = localStorage.key(i);
  let reaval = localStorage.getItem(titey);
  let reaval2 = reaval.slice(15)
  let reavaltime = reaval.slice(0,15)


  let note = document.createElement("div");
  note.className = "note";
  allNote.prepend(note);
  
  note.innerHTML = `<div class="title">
        <div class="retitle"><h3>${titey}</h3></div>
        
        <div class="delete" onclick = "deletoo(this)" id = "delet${i}">
          <svg class = "svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>
        </div>
        
      </div>
      <div class="written" onclick = "notepan(this)" ><p hidden ="true" >${reavaltime}</p><p>${reaval2}</p></div>
      `;
}
let notepan = (element)=>{
  // console.log("ompaswar")
  main2.hidden = false
  document.getElementById('times').textContent = element.children[0].textContent
  notePanel2.children[2].textContent = element.previousElementSibling.firstElementChild.firstElementChild.textContent
  // console.log(notePanel2.children[1].textContent)

  notePanel2.children[3].textContent = element.children[1].textContent

  console
  
  // localStorage.setItem(notePanel2.children[1].textContent , notePanel2.children[2].textContent )

}
create2.onclick  = ( )=>{
  localStorage.setItem(notePanel2.children[2].textContent , notePanel2.children[3].textContent )
  main2.hidden = true
}

let note = document.getElementsByClassName("note");
console.log(note);
let deletoo = (element) => {
  element.parentElement.parentElement.remove();
  let deletkey = element.previousElementSibling.firstElementChild.textContent;
  localStorage.removeItem(deletkey);

};

// let consol = (element){

// }

