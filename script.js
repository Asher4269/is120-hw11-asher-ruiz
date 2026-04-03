let body = document.querySelector("body");

let card1 = document.querySelector("#card-1");
let card2 = document.querySelector("#card-2");

let api_caller = document.querySelector(".api-call");

let play_button = document.querySelector(".play-again");

let memes_obj = {};

async function get() {
  let response = await fetch("https://api.imgflip.com/get_memes");
  let data = await response.json();

  localStorage.setItem("memes_array", JSON.stringify(data));

  main();
}

async function main() {
  let data_stored = localStorage.getItem("memes_array");
  if (!data_stored) return;

  let data = JSON.parse(data_stored);
  let memes = data.data.memes;

  memes_obj = {};

  let possible_meme_lst = Array.from({ length: memes.length }, (_, i) => i);

  for (let i = 0; i < 16; i++) {
    let random_int =
      possible_meme_lst[Math.floor(Math.random() * possible_meme_lst.length)];

    memes_obj[i] = {
      url: memes[random_int].url,
      name: memes[random_int].name,
    };
    possible_meme_lst.splice(possible_meme_lst.indexOf(random_int), 1);
  }

  play_bracket();
}

function play_bracket() {
  card1.innerHTML = "";
  card2.innerHTML = "";

  let index1 = Math.floor(Math.random() * 16);
  let index2 = Math.floor(Math.random() * 16);

  while (index2 === index1) {
    index2 = Math.floor(Math.random() * 16);
  }

  createCard(card1, memes_obj[index1]);
  createCard(card2, memes_obj[index2]);
}

function createCard(card, meme) {
  let img = document.createElement("img");
  let title = document.createElement("h2");

  img.src = meme.url;
  img.alt = meme.name;

  title.textContent = meme.name;

  card.appendChild(title);
  card.appendChild(img);
}

function addFavorite() {}

api_caller.addEventListener("click", get);

play_button.addEventListener("click", main);
