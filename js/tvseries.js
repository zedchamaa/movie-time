/* Strict Mode */
"use strict";

const url = './data/data.json';

function getData() {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    outData(data);
  })
}

getData();

function outData(val) {
  filterTvSeries(val);
}

function filterTvSeries(val) {
  let output = "";
  const windowWidth = window.innerWidth;

  for (let item of val) {

    if (item.category === 'TV Series') {
      let imageSize;
      let categoryIcon;
      const movieIcon = '/assets/icon-category-movie.svg';
      const tvSeriesIcon = '/assets/icon-category-tv.svg';
  
      if (windowWidth >= 1024) {
        imageSize = item.thumbnail.regular.large;
      } 
      else if (windowWidth >= 768) {
        imageSize = item.thumbnail.regular.medium;
      }
      else {
        imageSize = item.thumbnail.regular.small;
      }
  
      if (item.category === 'Movie') categoryIcon = movieIcon; 
      if (item.category === 'TV Series') categoryIcon = tvSeriesIcon; 
  
      output += `
        <div class="media-card-general">
        <div class="thumbnail">
          <img src="${imageSize}" alt="${item.title}" />
          <button class="badge icon-bookmark badge__bookmark-empty"></button>
        </div>
        <ul class="list list--inner">
          <li>${item.year}</li>
          <li>&middot;</li>
          <li>
            <img class="icon--small" src="${categoryIcon}" alt="${item.category}" />
            ${item.category}
          </li>
          <li>&middot;</li>
          <li>${item.rating}</li>
        </ul>
        <h3>${item.title}</h3>
        </div>
      </div>
      `;
    }
  }
  document.querySelector('.tv-series').innerHTML = output;
}