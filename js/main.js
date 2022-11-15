/* Strict Mode */
"use strict";

//FIXME: on first ever page load, media items do not get populated until the page has been refreshed at least once

window.onload = initData();

function initData() {
  let data = [];
  const localStorageData = localStorage.getItem("media");

  if (!localStorageData) {
    // fetch media data from json
    const url = "./data/data.json";
    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        saveToLocalStorage(jsonData);
      });
    // save to local storage
    function saveToLocalStorage(jsonData) {
      localStorage.setItem("media", JSON.stringify(jsonData));
      saveToDataArray();
    }
    // save to data array
    function saveToDataArray() {
      data = localStorageData;
    }
  } else {
    try {
      data = JSON.parse(localStorageData);
    } catch (e) {
      console.log(e);
    }
  }

  outData(data);
}

function outData(val) {
  populateRecommendedItems(val);
  populateTrendingItems(val);
  bookmarkMedia(val, ".media-scroller");
  bookmarkMedia(val, ".recommended");
}

function populateRecommendedItems(val) {
  let output = "";
  const windowWidth = window.innerWidth;

  for (let item of val) {
    let imageSize;
    let categoryIcon;
    let bookmarkedRule;
    const movieIcon = "/assets/icon-category-movie.svg";
    const tvSeriesIcon = "/assets/icon-category-tv.svg";

    const bookmarked = "badge__bookmark-full";
    const notBookmarked = "badge__bookmark-empty";

    if (windowWidth >= 1024) {
      imageSize = item.thumbnail.regular.large;
    } else if (windowWidth >= 768) {
      imageSize = item.thumbnail.regular.medium;
    } else {
      imageSize = item.thumbnail.regular.small;
    }

    if (item.category === "Movie") categoryIcon = movieIcon;
    if (item.category === "TV Series") categoryIcon = tvSeriesIcon;

    if (item.isBookmarked) bookmarkedRule = bookmarked;
    if (!item.isBookmarked) bookmarkedRule = notBookmarked;

    output += `
      <div class="media-card-general">
      <div class="thumbnail">
        <img src="${imageSize}" alt="${item.title}" />
        <button class="badge icon-bookmark ${bookmarkedRule}"></button>
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
      let bookmarkedRule;
      const movieIcon = "/assets/icon-category-movie.svg";
      const tvSeriesIcon = "/assets/icon-category-tv.svg";

      const bookmarked = "badge__bookmark-full";
      const notBookmarked = "badge__bookmark-empty";

      if (windowWidth >= 1024) {
        imageSize = item.thumbnail.trending.large;
      } else {
        imageSize = item.thumbnail.trending.small;
      }

      if (item.category === "Movie") categoryIcon = movieIcon;
      if (item.category === "TV Series") categoryIcon = tvSeriesIcon;

      if (item.isBookmarked) bookmarkedRule = bookmarked;
      if (!item.isBookmarked) bookmarkedRule = notBookmarked;

      output += `
      <div class="box">
      <div class="media-card-trending box">
        <div class="thumbnail thumbnail--trending">
          <img src="${imageSize}" alt="${item.title}" />
          <button class="badge-trending icon-bookmark ${bookmarkedRule}"></button>
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

// Bookmark media items

function bookmarkMedia(val, className) {
  document.querySelector(className).addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest("button.icon-bookmark");
      if (!btn) return;

      // find which media item was clicked
      const mediaTitleParent = btn.parentNode.parentNode;
      const mediaTitle = mediaTitleParent.children[2].textContent;

      // change bookmarked status
      for (let item of val) {
        if (mediaTitle === item.title) {
          if (!item.isBookmarked) {
            btn.classList.remove("badge__bookmark-empty");
            btn.classList.add("badge__bookmark-full");
            item.isBookmarked = true;
            localStorage.setItem("media", JSON.stringify(val));
          } else if (item.isBookmarked) {
            btn.classList.remove("badge__bookmark-full");
            btn.classList.add("badge__bookmark-empty");
            item.isBookmarked = false;
            localStorage.setItem("media", JSON.stringify(val));
          }
        }
      }
    },
    { passive: true }
  );
}
