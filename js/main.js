/* Strict Mode */
"use strict";

let http = new XMLHttpRequest();

http.open('get', 'data/data.json', true);

http.send();

http.onload = function() {
  if (this.readyState == 4 && this.status == 200) {
    let media = JSON.parse(this.responseText);
    let output = "";

    const windowWidth = window.innerWidth;

    for (let item of media) {
      let imageSize;

      if (windowWidth >= 1024) {
        imageSize = item.thumbnail.regular.large;
      } 
      else if (windowWidth >= 768) {
        imageSize = item.thumbnail.regular.medium;
      }
      else {
        imageSize = item.thumbnail.regular.small;
      }

      output += `
        <div class="media-card-general">
        <div class="thumbnail">
          <img src="${imageSize}" alt="${item.title}" />
          <div class="badge icon-bookmark badge__bookmark-empty"></div>
        </div>
        <ul class="list list--inner">
          <li>${item.year}</li>
          <li>&middot;</li>
          <li>
            <img class="icon--small" src="/assets/icon-category-movie.svg" alt="${item.category}" />
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
    document.querySelector('.grid').innerHTML = output;
  }
}