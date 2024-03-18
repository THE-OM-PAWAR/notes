let count_modal = 0;

function modal(
  type,
  head,
  discription,
  BTN_name,
  deley,
  func,
  param1,
  param2,
  param3
) {
  count_modal++;
  if (count_modal > 3) {
    count_modal--;
    document.getElementById("modal_box").firstElementChild.style =
      "transform: translateY(60rem); opacity: 0;";
    setTimeout(() => {
      document.getElementById("modal_box").firstElementChild.remove();
    }, 100);
  }
  let modal_box;
  if (document.getElementById("modal_box")) {
  } else {
    let modal_box = document.createElement("div");
    modal_box.id = "modal_box";
    document.body.appendChild(modal_box);
  }
  modal_box = document.getElementById("modal_box");

  if (func == undefined) {
    func = "emptyy";
  }
  if (type == "type1") {
    if (BTN_name == undefined || BTN_name == "") {
      BTN_name = "Close";
    }
    let modal_type1 = document.createElement("div");
    modal_type1.id = "modal_type1";
    modal_type1.classList.add("Modal");

    modal_type1.innerHTML = `     
    <h3>${head}</h3>
    <p>${discription}</p>
    <button  onclick="closes2(this , ${func}(${
      param1 + "," + param2 + ", " + param3
    }))" >${BTN_name}</button>
    `;

    setTimeout(() => {
      modal_box.appendChild(modal_type1);
    }, 100);
    setTimeout(() => {
      modal_type1.style = "transform: translateY(0rem); opacity: 1;";
    }, 200);
  }

  if (type == "type2") {
    if (BTN_name == undefined || BTN_name == "") {
      BTN_name = "Undo";
    }
    let modal_type2 = document.createElement("div");
    modal_type2.id = "modal_type2";
    modal_type2.classList.add("Modal");

    modal_type2.innerHTML = `<p>${discription}</p><button onclick="closes2(this , ${func}(${
      param1 + "," + param2 + ", " + param3
    }))" >${BTN_name}</button>`;
    setTimeout(() => {
      modal_box.appendChild(modal_type2);
    }, 100);
    setTimeout(() => {
      modal_type2.style = "transform: translateY(0rem); opacity: 1;";
    }, 200);

    if (deley == undefined) {
      deley = 5000;
    }
    setTimeout(() => {
      modal_type2.style = "transform: translateY(60rem); opacity: 0;";
      count_modal--;
    }, deley);
    setTimeout(() => {
      modal_type2.remove();
    }, deley + 300);
  }
}

function closes(element) {
  element.parentElement.style = "transform: translateY(60rem); opacity: 0;";
  setTimeout(() => {
    element.parentElement.remove();
  }, 500);
}
function emptyy() {}
function closes2(element) {
  closes(element);
  count_modal--;
}
function emptyy2(count) {
  for (let i = 0; i < count; i++) {
    console.log("hello");
  }
}
