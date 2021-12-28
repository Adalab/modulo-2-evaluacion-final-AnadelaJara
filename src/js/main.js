'use strict';

fetch('https://api.jikan.moe/v3/search/anime?q=naruto')
.then (response => response.json())
.then (data => {
  console.log(data);
});



//const searchInput = document.querySelector ('.js_searchInput');
