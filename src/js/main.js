'use strict';

// Pendiente;
// Crear mensaje por si no encuentra la serie y pintarlo
// Añadir imagen a las búsquedas sin imagenes

const resultSeries = document.querySelector ('.js_resultSeries');
const searchInput = document.querySelector ('.js_searchInput');
const searchButton = document.querySelector ('.js_searchButton');
//const resetButton = document.querySelector ('.js_resetButton');

let allSeries = [];
//let favorites = [];


function getApiData (){
  let inputValue = searchInput.value;

  fetch(`https://api.jikan.moe/v3/search/anime?q=naruto${inputValue}`)
    .then (response => response.json())
    .then (data => {
      allSeries = data.results;
      getPrintAllSeries ();
    });
}

function printHtmlSeries (seriesArticle) {
  //console.log({seriesArticle});
  resultSeries.innerHTML += `
    <img src="${seriesArticle.image_url}" alt="Serie:${seriesArticle.title}"/>
    <p>${seriesArticle.title}</p>`;
}

function getPrintAllSeries (){
  resultSeries.innerHTML='';
  for (const eachSerieData of allSeries) {
    printHtmlSeries (eachSerieData);
  }
}


function handleClickSeries(event) {
  event.preventDefault();
  getApiData ();
}
searchButton.addEventListener('click', handleClickSeries);

