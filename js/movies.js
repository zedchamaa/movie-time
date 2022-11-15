/* Strict Mode */
"use strict";

const data = JSON.parse(localStorage.getItem("media"));

outData(data);

function outData(val) {
  filterMovies(val);
  bookmarkMedia(val);
}

function filterMovies(val) {
  let output = "";
  const windowWidth = window.innerWidth;

  for (let item of val) {
    if (item.category === "Movie") {
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
  }
  document.querySelector(".movies").innerHTML = output;
}

function bookmarkMedia(val) {
  document.querySelector(".movies").addEventListener(
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
