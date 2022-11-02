/* Strict Mode */
"use strict";

let http = new XMLHttpRequest();

http.open('get', 'data/data.json', true);

http.send();

http.onload = function() {
  if (this.readyState == 4 && this.status == 200) {
    let media = JSON.parse(this.responseText);
    let output = "";

    for (let item of media) {
      output += `
      <div class="media-card-general">
      <div class="thumbnail">
        <img src="${item.thumbnail.regular.small}" alt="${item.title}" />
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