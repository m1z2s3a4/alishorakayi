document.addEventListener("DOMContentLoaded", () => {

  const newsSection = document.querySelector("#news");

  if (!newsSection) return;

  const cards = Array.from(
    newsSection.querySelectorAll(".card")
  );

  /* -----------------------------
     SEARCH BOX
  ----------------------------- */

  const searchBox = document.createElement("input");

  searchBox.type = "search";
  searchBox.placeholder = "جستجوی اخبار...";
  searchBox.className = "news-search";

  const title = newsSection.querySelector("h2");

  if (title) {
    title.insertAdjacentElement("afterend", searchBox);
  } else {
    newsSection.prepend(searchBox);
  }


  /* -----------------------------
     FILTER BUTTONS
  ----------------------------- */

  const filterContainer = document.createElement("div");

  filterContainer.className = "news-filters";

  const filters = [
    {
      name: "همه",
      value: "all"
    },
    {
      name: "GTA",
      value: "gta"
    },
    {
      name: "Minecraft",
      value: "minecraft"
    },
    {
      name: "Call of Duty",
      value: "call of duty"
    },
    {
      name: "Battlefield",
      value: "battlefield"
    },
    {
      name: "Fortnite",
      value: "fortnite"
    }
  ];


  filters.forEach(filter => {

    const button = document.createElement("button");

    button.type = "button";
    button.textContent = filter.name;
    button.dataset.filter = filter.value;

    button.className = "news-filter";

    if (filter.value === "all") {
      button.classList.add("active");
    }

    filterContainer.appendChild(button);

  });


  searchBox.insertAdjacentElement(
    "afterend",
    filterContainer
  );


  /* -----------------------------
     NORMALIZE TEXT
  ----------------------------- */

  function normalize(text) {

    return text
      .toLowerCase()
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .trim();

  }


  /* -----------------------------
     FILTER FUNCTION
  ----------------------------- */

  function filterNews() {

    const searchText =
      normalize(searchBox.value);

    const activeButton =
      filterContainer.querySelector(
        ".news-filter.active"
      );

    const selectedFilter =
      activeButton
        ? activeButton.dataset.filter
        : "all";


    cards.forEach(card => {

      const text =
        normalize(card.textContent);

      const matchesSearch =
        searchText === "" ||
        text.includes(searchText);

      const matchesCategory =
        selectedFilter === "all" ||
        text.includes(
          normalize(selectedFilter)
        );


      if (
        matchesSearch &&
        matchesCategory
      ) {

        card.style.display = "";

        requestAnimationFrame(() => {
          card.classList.add("news-visible");
        });

      } else {

        card.classList.remove("news-visible");

        card.style.display = "none";

      }

    });


    showNoResults();

  }


  /* -----------------------------
     NO RESULTS
  ----------------------------- */

  function showNoResults() {

    let message =
      newsSection.querySelector(
        ".no-news-results"
      );


    const visibleCards =
      cards.filter(card =>
        card.style.display !== "none"
      );


    if (
      visibleCards.length === 0
    ) {

      if (!message) {

        message =
          document.createElement("div");

        message.className =
          "no-news-results";

        message.textContent =
          "خبری با این مشخصات پیدا نشد.";

        filterContainer.insertAdjacentElement(
          "afterend",
          message
        );

      }

    } else {

      if (message) {
        message.remove();
      }

    }

  }


  /* -----------------------------
     SEARCH EVENT
  ----------------------------- */

  searchBox.addEventListener(
    "input",
    filterNews
  );


  /* -----------------------------
     FILTER EVENTS
  ----------------------------- */

  filterContainer
    .querySelectorAll(".news-filter")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          filterContainer
            .querySelectorAll(
              ".news-filter"
            )
            .forEach(btn =>
              btn.classList.remove("active")
            );


          button.classList.add("active");

          filterNews();

        }
      );

    });


  /* -----------------------------
     KEYBOARD SHORTCUT
  ----------------------------- */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "/" &&
        document.activeElement !== searchBox
      ) {

        event.preventDefault();

        searchBox.focus();

      }

      if (
        event.key === "Escape" &&
        document.activeElement === searchBox
      ) {

        searchBox.value = "";

        filterNews();

        searchBox.blur();

      }

    }
  );


  /* -----------------------------
     INITIAL STATE
  ----------------------------- */

  cards.forEach(card => {
    card.classList.add("news-visible");
  });


  filterNews();

});
