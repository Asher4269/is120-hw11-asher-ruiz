let body = document.querySelector("body");

let favorite_title = document.querySelector(".title");

let card1 = document.querySelector("#card-1");
let card2 = document.querySelector("#card-2");

let delete_favorites = document.querySelector(".favorite-delete");

let api_caller = document.querySelector(".api-call");

let play_button = document.querySelector(".play-again");

let favorites_div = document.querySelector(".favorites-div");

let memes_obj = {};

let favorite_memes = JSON.parse(localStorage.getItem("favorite_memes")) || []; // AI helped me figure out that I can just parse this at the beginning instead of in the function itself, || or helps catch errors

async function get() {
  let response = await fetch("https://api.imgflip.com/get_memes");
  let data = await response.json();

  localStorage.setItem("memes_array", JSON.stringify(data));

  // Here im getting rid of the CALL API button to not let the user call it too much. Will probably need to figure out how to make it permanently disappear based on user's local storage?
  api_caller.style.opacity = "0";
  api_caller.style.pointerEvents = "none";

  // helps automatically start meme display process
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

  // Was not sure if I needed to do this, but this helped the page run a little smoother
  play_bracket();
  render_favorites();
}

function play_bracket() {
  card1.innerHTML = "";
  card2.innerHTML = "";

  let meme_keys = Object.keys(memes_obj);

  let index1 = Math.floor(Math.random() * meme_keys.length);
  let index2 = Math.floor(Math.random() * meme_keys.length);

  while (index2 === index1) {
    index2 = Math.floor(Math.random() * meme_keys.length);
  }

  create_card(card1, memes_obj[index1]);
  create_card(card2, memes_obj[index2]);
}

function create_card(card, meme, isFavorite = false) {
  card.innerHTML = "";

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

    // Could not figure out for the life of me how to do this with an event listener
    favorite_add.onclick = () => {
      add_favorite(meme);
    };

    card.appendChild(favorite_add);
  }
}

function add_favorite(meme) {
  favorite_memes.push(meme);
  localStorage.setItem("favorite_memes", JSON.stringify(favorite_memes));

  render_favorites();
}

function render_favorites() {
  favorites_div.innerHTML = "";

  // Chat taught me .forEach and has made looping over an array a lot more simple
  favorite_memes.forEach((meme) => {
    let new_card = document.createElement("div");
    new_card.classList.add("card");

    create_card(new_card, meme, true);
    favorites_div.appendChild(new_card);
  });

  check_favorites_div();
}

function clear_favorites() {
  favorite_memes = [];
  localStorage.removeItem("favorite_memes"); // Ai taught me .removeItem, although I think we mentioned this in class too
  render_favorites();
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
    delete_favorites.style.opacity = "1";
    delete_favorites.style.pointerEvents = "auto";
  }
}

render_favorites();
check_favorites_div();

api_caller.addEventListener("click", get);
play_button.addEventListener("click", main);
delete_favorites.addEventListener("click", clear_favorites);
