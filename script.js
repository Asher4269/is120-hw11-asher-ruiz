let body = document.querySelector("body");

let favorite_title = document.querySelector(".title");

let card1 = document.querySelector("#card-1");
let card2 = document.querySelector("#card-2");

let delete_favorites = document.querySelector(".favorite-delete");

let api_caller = document.querySelector(".api-call");

let play_button = document.querySelector(".play-again");

let favorites_div = document.querySelector(".favorites-div");

let memes_obj = {};

async function get() {
  let response = await fetch("https://api.imgflip.com/get_memes");
  let data = await response.json();

  localStorage.setItem("memes_array", JSON.stringify(data));

  api_caller.style.opacity = "0";
  api_caller.style.pointerEvents = "none";

  main();
}

async function main() {
  let data_stored = localStorage.getItem("memes_array");
  if (!data_stored) return;

  let data = JSON.parse(data_stored);
  let memes = data.data.memes;

  memes_obj = {};

  for (let i = 0; i < memes.length; i++) {
    memes_obj[i] = {
      url: memes[i].url,
      name: memes[i].name,
    };
  }

  play_bracket();
}

function play_bracket() {
  card1.innerHTML = "";
  card2.innerHTML = "";

  let keys = Object.keys(memes_obj);

  let index1 = Math.floor(Math.random() * keys.length);
  let index2 = Math.floor(Math.random() * keys.length);

  while (index2 === index1) {
    index2 = Math.floor(Math.random() * keys.length);
  }

  createCard(card1, memes_obj[index1]); // normal card
  createCard(card2, memes_obj[index2]); // normal card
}

function createCard(card, meme, isFavorite = false) {
  card.innerHTML = ""; // clear just in case

  let img = document.createElement("img");
  let title = document.createElement("h2");

  img.src = meme.url;
  img.alt = meme.name;

  title.textContent = meme.name;

  card.appendChild(title);
  card.appendChild(img);

  if (!isFavorite) {
    let favorite_add = document.createElement("button");

    favorite_add.textContent = "LIKE";
    favorite_add.classList.add("like");

    // Had to ask chat how to do this part, as I didn't know how to use arguments in an event listener such as "meme" here, would love to learn more about that
    favorite_add.onclick = () => {
      add_favorite(meme);
    };

    card.appendChild(favorite_add);
  }
}

function add_favorite(meme) {
  let existing = document.querySelectorAll(".favorites-div img");

  for (let img of existing) {
    if (img.src === meme.url) return;
  }

  let new_card = document.createElement("div");
  new_card.classList.add("card");

  createCard(new_card, meme, true);

  favorites_div.appendChild(new_card);
  check_favorites_div();
}

function clear_favorites() {
  favorites_div.innerHTML = "";
  check_favorites_div();
}

function check_favorites_div() {
  let favorites = document.querySelectorAll(".favorites-div .card");

  if (favorites.length === 0) {
    favorites_div.style.display = "none";
    favorite_title.style.display = "none";

    delete_favorites.style.opacity = "0";
    delete_favorites.style.pointerEvents = "none";
  } else {
    favorites_div.style.display = "flex";
    favorite_title.style.display = "block";
    favorite_title.textContent = "Favorites";

    delete_favorites.style.opacity = "1";
    delete_favorites.style.pointerEvents = "auto";
  }
}

check_favorites_div();

api_caller.addEventListener("click", get);
play_button.addEventListener("click", main);
delete_favorites.addEventListener("click", clear_favorites);
