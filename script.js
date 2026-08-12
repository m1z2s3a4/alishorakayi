document.addEventListener("DOMContentLoaded", function () {

  const newsSection = document.querySelector("#news");

  if (!newsSection) return;

  const cards = newsSection.querySelectorAll(".card");

  // Search box
  const search = document.createElement("input");

  search.type = "search";
  search.placeholder = "جستجوی اخبار...";
  search.className = "news-search";

  const title = newsSection.querySelector("h2");

  if (title) {
    title.after(search);
  } else {
    newsSection.prepend(search);
  }


  // Filter buttons
  const filters = document.createElement("div");

  filters.className = "news-filters";

  filters.innerHTML = `
    <button class="news-filter active" data-filter="all">همه</button>
    <button class="news-filter" data-filter="gta">GTA</button>
    <button class="news-filter" data-filter="minecraft">Minecraft</button>
    <button class="news-filter" data-filter="call of duty">Call of Duty</button>
    <button class="news-filter" data-filter="battlefield">Battlefield</button>
    <button class="news-filter" data-filter="fortnite">Fortnite</button>
  `;

  search.after(filters);


  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک");
  }


  function updateNews() {

    const searchText = normalize(search.value);

    const active =
      filters.querySelector(".active");

    const category =
      active ? active.dataset.filter : "all";


    cards.forEach(function (card) {

      const text =
        normalize(card.textContent);

      const searchMatch =
        text.includes(searchText);

      const categoryMatch =
        category === "all" ||
        text.includes(normalize(category));


      if (searchMatch && categoryMatch) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }

    });

  }


  // Search
  search.addEventListener(
    "input",
    updateNews
  );


  // Filters
  filters
    .querySelectorAll(".news-filter")
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          filters
            .querySelectorAll(".news-filter")
            .forEach(function (btn) {
              btn.classList.remove("active");
            });

          button.classList.add("active");

          updateNews();

        }
      );

    });


});
