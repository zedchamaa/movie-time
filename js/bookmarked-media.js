/* Strict Mode */
"use strict";

const data = JSON.parse(localStorage.getItem("media"));

filterData(data);

changeNavFillColor();

function outData(val) {
  bookmarkedMedia(val, "Movie", ".bookmarked-movies");
  bookmarkedMedia(val, "TV Series", ".bookmarked-tv-series");
  removeBookmarks(val, ".bookmarked-movies");
  removeBookmarks(val, ".bookmarked-tv-series");
}

function bookmarkedMedia(val, mediaType, className) {
  let output = "";
  const windowWidth = window.innerWidth;

  for (let item of val) {
    if (item.category === mediaType && item.isBookmarked) {
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
          <button class="play play-general">
          <img
            class="icon"
            src="/assets/icon-play.svg"
            alt="Play Media"
          />
          <h3>Play</h3>
        </button>
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
  document.querySelector(className).innerHTML = output;
}

// Change bookmark status of the clicked media item and remove it

function removeBookmarks(val, className) {
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
          if (item.isBookmarked) {
            btn.classList.remove("badge__bookmark-full");
            btn.classList.add("badge__bookmark-empty");
            item.isBookmarked = false;
            localStorage.setItem("media", JSON.stringify(val));
            mediaTitleParent.classList.add("hide");
          }
        }
      }
    },
    { passive: true }
  );
}

// Change nav icon fill color when relevant page is selected

function changeNavFillColor() {
  const activePage = window.location.pathname;
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    if (link.href.includes(`${activePage}`)) {
      link.firstChild.classList.add("menu-svg-active");
    }
  });
}

// Search for bookmarked shows

function filterData(data) {
  outData(data);

  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", (event) => {
    let inputValue = event.target.value;

    if (inputValue && inputValue.trim().length > 0) {
      inputValue = inputValue.trim().toLowerCase();

      const filteredData = data.filter((item) => {
        const itemTitle = item.title.toLowerCase();
        console.log(itemTitle);
        return itemTitle.includes(inputValue);
      });
      outData(filteredData);
    } else {
      outData(data);
    }
  });
}
