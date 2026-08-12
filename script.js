document.addEventListener("DOMContentLoaded", function () {

    const newsSection = document.querySelector("#news");

    if (!newsSection) return;

    const cards = Array.from(
        newsSection.querySelectorAll(".card")
    );

const newsPages = {
    gta: "news-gta6.html",
    minecraft: "news-minecraft.html",
    "call of duty": "news-cod.html",
    battlefield: "news-battlefield.html"
};

const newsData = [
        {
            category: "gta",
            title: "GTA VI",
            badge: "جدید",
            date: "۱۷ مرداد ۱۴۰۵",
            source: "Rockstar Games",
            text:
                "راک‌استار اعلام کرده یک Extended Look از GTA VI در ۲۷ اوت ۲۰۲۶ منتشر خواهد شد. تاریخ فعلی عرضه بازی ۱۹ نوامبر ۲۰۲۶ است."
        },

        {
            category: "minecraft",
            title: "Minecraft",
            badge: "جدید",
            date: "۲۰ مرداد ۱۴۰۵",
            source: "Minecraft",
            text:
                "نسخه آزمایشی جدید Minecraft Beta & Preview 26.50.25 منتشر شده و تغییرات و بهبودهای جدیدی را برای بازیکنان به همراه دارد."
        },

        {
            category: "call of duty",
            title: "Call of Duty",
            badge: "خبر",
            date: "۲۹ تیر ۱۴۰۵",
            source: "Call of Duty",
            text:
                "اطلاعات رسمی جدیدی درباره Modern Warfare 4 منتشر شده است. این بازی برای ۲۳ اکتبر ۲۰۲۶ برنامه‌ریزی شده است."
        },

        {
            category: "battlefield",
            title: "Battlefield 6",
            badge: "آپدیت",
            date: "مرداد ۱۴۰۵",
            source: "Electronic Arts",
            text:
                "آپدیت جدید Battlefield 6 روی بهبود پایداری، نمایش و تجربه لحظه‌به‌لحظه بازی تمرکز دارد."
        },

        {
            category: "minecraft",
            title: "Minecraft 26.3",
            badge: "آپدیت",
            date: "مرداد ۱۴۰۵",
            source: "Minecraft",
            text:
                "Snapshot جدید Minecraft 26.3 تغییرات تازه‌ای برای Abandoned Camp، رابط World Options و نحوه نمایش زمین اضافه کرده است."
        },

        {
            category: "call of duty",
            title: "Call of Duty Season 05",
            badge: "آپدیت",
            date: "مرداد ۱۴۰۵",
            source: "Call of Duty",
            text:
                "محتوای جدید Season 05 برای Black Ops 7 و Warzone شامل Battle Pass، آیتم‌های جدید و محتوای تازه منتشر شده است."
        }

    ];


    /* ==========================
       NEWS SEARCH
    ========================== */

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


    /* ==========================
       FILTERS
    ========================== */

    const filters = document.createElement("div");

    filters.className = "news-filters";

    filters.innerHTML = `
        <button class="news-filter active" data-filter="all">
            همه
        </button>

        <button class="news-filter" data-filter="gta">
            GTA
        </button>

        <button class="news-filter" data-filter="minecraft">
            Minecraft
        </button>

        <button class="news-filter" data-filter="call of duty">
            Call of Duty
        </button>

        <button class="news-filter" data-filter="battlefield">
            Battlefield
        </button>
    `;

    search.after(filters);


    /* ==========================
       NORMALIZE
    ========================== */

    function normalize(text) {

        return text
            .toLowerCase()
            .replace(/ي/g, "ی")
            .replace(/ك/g, "ک")
            .trim();

    }


    /* ==========================
       CREATE REAL NEWS CARDS
    ========================== */

    cards.forEach(function (card, index) {

        if (!newsData[index]) return;

        const news = newsData[index];

        card.innerHTML = `

            <div class="news-badge">
                ${news.badge}
            </div>

            <div class="news-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <h3>
                ${news.title}
            </h3>

            <p>
                ${news.text}
            </p>

            <div class="news-meta">
                📅 ${news.date}
                <br>
                منبع: ${news.source}
            </div>

            <div class="news-source">
                خبر رسمی و بررسی‌شده
            </div>

        `;

        card.dataset.category = news.category;

    });


    /* ==========================
       FILTER FUNCTION
    ========================== */

    function updateNews() {

        const searchText =
            normalize(search.value);

        const active =
            filters.querySelector(".active");

        const selectedCategory =
            active
                ? active.dataset.filter
                : "all";


        cards.forEach(function (card, index) {

            const news = newsData[index];

            if (!news) return;

            const completeText =
                normalize(
                    news.title +
                    " " +
                    news.text +
                    " " +
                    news.source
                );


            const searchMatch =
                searchText === "" ||
                completeText.includes(searchText);


            const categoryMatch =
                selectedCategory === "all" ||
                news.category === selectedCategory;


            if (
                searchMatch &&
                categoryMatch
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }


    /* ==========================
       SEARCH
    ========================== */

    search.addEventListener(
        "input",
        updateNews
    );


    /* ==========================
       FILTER BUTTONS
    ========================== */

    filters
        .querySelectorAll(".news-filter")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    filters
                        .querySelectorAll(".news-filter")
                        .forEach(function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );


                    updateNews();

                }
            );

        });


    /* ==========================
       INITIAL
       ========================== */

    updateNews();

});
