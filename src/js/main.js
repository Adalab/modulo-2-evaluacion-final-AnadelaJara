'use strict';


const resultSeries = document.querySelector ('.js_resultSeries');
const favSeries = document.querySelector ('.js_favSeries');
const searchInput = document.querySelector ('.js_searchInput');
const searchButton = document.querySelector ('.js_searchButton');
//const resetButton = document.querySelector ('.js_resetButton');

let allSeries = [];
let favorites = [];


function getApiData (){
  let inputValue = searchInput.value;

  fetch(`https://api.jikan.moe/v3/search/anime?q=${inputValue}&limit=5`)
    .then (response => response.json())
    .then (data => {
      allSeries = data.results;
      getPrintAllSeries ();
    });
}

function printHtmlSeries (seriesArticle) {
  console.log({seriesArticle});
  resultSeries.innerHTML += `<li class="js_add_favorites" data-id="${seriesArticle.mal_id}">
    <img class="img" src="${seriesArticle.image_url}" alt="Serie:${seriesArticle.title}"/>
    <p>${seriesArticle.title}</p></li>`;
}

function getPrintAllSeries (){
  resultSeries.innerHTML='';
  for (const eachSerieData of allSeries) {
    printHtmlSeries (eachSerieData);
  }
  const allImg = document.querySelectorAll ('.js_add_favorites');
  for (const addToFavList of allImg) {
    addToFavList.addEventListener ('click', handleAddToFavList);
  }
}

function handleAddToFavList (event){
  const selectedSerieId = parseInt(event.currentTarget.dataset.id);
  console.log(selectedSerieId);

  console.log(`Añadiendo a la lista + "${selectedSerieId}"`);


  const selectedSerieData = allSeries.find(row => row.mal_id === selectedSerieId);
  console.log(selectedSerieData);

  favorites.push (selectedSerieData);

  renderFav ();
}

function renderFav (){
  favSeries.innerHTML = '';

  for (const eachFavItem of favorites) {
    renderFavItem (eachFavItem);
  }
}

function renderFavItem (eachFavItem) {
  favSeries.innerHTML += `<li>
  <img class="img" src="${eachFavItem.image_url}" alt="Serie:${eachFavItem.title}"/>
  <p>${eachFavItem.title}</p></li>`;
}

function handleClickSeries(event) {
  event.preventDefault();
  getApiData ();
}
searchButton.addEventListener('click', handleClickSeries);

