/* Strict Mode */
"use strict";

const url = "./data/data.json";

function getData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      outData(data);
    });
}

getData();

function outData(val) {
  populateRecommendedItems(val);
  populateTrendingItems(val);
  bookmarkTrendingMedia(val);
}

function populateRecommendedItems(val) {
  let output = "";
  const windowWidth = window.innerWidth;

  for (let item of val) {
    let imageSize;
    let categoryIcon;
    const movieIcon = "/assets/icon-category-movie.svg";
    const tvSeriesIcon = "/assets/icon-category-tv.svg";

    if (windowWidth >= 1024) {
      imageSize = item.thumbnail.regular.large;
    } else if (windowWidth >= 768) {
      imageSize = item.thumbnail.regular.medium;
    } else {
      imageSize = item.thumbnail.regular.small;
    }

    if (item.category === "Movie") categoryIcon = movieIcon;
    if (item.category === "TV Series") categoryIcon = tvSeriesIcon;

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
  document.querySelector(".recommended").innerHTML = output;
}

function populateTrendingItems(val) {
  let output = "";
  const windowWidth = window.innerWidth;

  for (let item of val) {
    if (item.isTrending) {
      let imageSize;
      let categoryIcon;
      const movieIcon = "/assets/icon-category-movie.svg";
      const tvSeriesIcon = "/assets/icon-category-tv.svg";

      if (windowWidth >= 1024) {
        imageSize = item.thumbnail.trending.large;
      } else {
        imageSize = item.thumbnail.trending.small;
      }

      if (item.category === "Movie") categoryIcon = movieIcon;
      if (item.category === "TV Series") categoryIcon = tvSeriesIcon;

      output += `
      <div class="box">
      <div class="media-card-trending box">
        <div class="thumbnail thumbnail--trending">
          <img src="${imageSize}" alt="${item.title}" />
          <button class="badge-trending icon-bookmark badge__bookmark-empty"></button>
        </div>
        <ul class="list list--inner-trending">
          <li>${item.year}</li>
          <li>&bull;</li>
          <li>
            <img class="icon--small" src="${categoryIcon}" alt="${item.category}" />
            ${item.category}
          </li>
          <li>&bull;</li>
          <li>${item.rating}</li>
        </ul>
        <h3 class="trending-media-title">${item.title}</h3>
      </div>
    </div>
      `;
    }
  }
  document.querySelector(".media-scroller").innerHTML = output;
}

// Create a function to bookmark the trending media

function bookmarkTrendingMedia(val) {
  document.querySelector(".media-scroller").addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest("button.icon-bookmark");
      if (!btn) return;
      // toggle bookmark badge icon
      btn.classList.toggle("badge__bookmark-full");

      // find which media item was clicked
      const mediaTitleParent = btn.parentNode.parentNode;
      const mediaTitle = mediaTitleParent.children[2].textContent;

      // change bookmarked status
      for (let item of val) {
        // TODO: continue from here, still unable to modify the json file properties

        if (mediaTitle === item.title) {
          if (item.isBookmarked) {
            item.isBookmarked = false;
            console.log(val); // TODO: delete
          } else {
            item.isBookmarked = true;
            console.log(val); // TODO: delete
          }
        }
      }
    },
    { passive: true }
  );
}
