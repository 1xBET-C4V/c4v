const loadingTexts = {
    ar: ["جاري التحميل...", "لحظات فقط...", "يتم الآن التحميل..."],
    en: ["Loading...", "Just a moment...", "Fetching now..."]
};

function updateLoadingText() {
    const lang = document.documentElement.getAttribute("lang") || "ar";
    const loadingTextElement = document.querySelector(".loading-text");
    if (loadingTextElement) {
        let index = 0;
        const updateText = () => {
            loadingTextElement.textContent = loadingTexts[lang][index];
            index = (index + 1) % loadingTexts[lang].length;
        };
        updateText();
        return setInterval(updateText, 2000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const newsContent = document.getElementById("news-content");
    const copyBtn = document.getElementById("copy-promocode-btn");
    const scrollTopBtn = document.querySelector(".scroll-top-btn");
    const langDropdown = document.querySelector(".lang-dropdown");
    const langOptions = document.querySelectorAll(".lang-option");
    const telegramLinks = document.getElementById("telegram-links");

    const telegramData = [
        { href: "https://tpv.sr/uhJPfo/", text: "1xBET Egypt - بالعربي", flag: "img/egy.png" },
        { href: "https://tpv.sr/uhJPfv/", text: "1xBET Morocco - بالعربي", flag: "img/mar.png" },
        { href: "https://tpv.sr/uhJPfx/", text: "1xBET Mauritania - بالعربي", flag: "img/mrt.png" },
        { href: "https://tpv.sr/uhJPg7/", text: "1xBET Iraq - بالعربي", flag: "img/irq.png" },
        { href: "https://tpv.sr/uhJPgA/", text: "1xBET Jordan - بالعربي", flag: "img/jor.png" },
        { href: "https://tpv.sr/uhJPgE/", text: "1xBET Algeria - بالعربي", flag: "img/dza.png" }
    ];

    const newsData = [
        { title: "newOffer", content: "promocodeOffer" }
    ];

    const translations = {
        ar: {
            home: "الرئيسية",
            channels: "تلغرام",
            promocode: "البروموكود",
            copyBtn: "نسخ الكود",
            copied: "تم النسخ!",
            copyPromocodeAria: "نسخ بروموكود REELGOLD50X",
            profileDesc: "آخر الأخبار والإعلانات",
            channelsHeader: "قنوات تلغرام الرسمية",
            footer: "Powered by <span>1xBET بالعربي</span>",
            loading: "جاري التحميل...",
            promocodeText: "استخدم الكود <strong>REELGOLD50X</strong> للحصول على مكافآت حصرية!",
            newOffer: "عرض جديد!",
            promocodeOffer: "استخدم كود REELGOLD50X للحصول على مكافأة 200% على اشتراكك الأول!"
        },
        en: {
            home: "Home",
            channels: "Telegram",
            promocode: "Promo Code",
            copyBtn: "Copy Code",
            copied: "Copied!",
            copyPromocodeAria: "Copy promo code REELGOLD50X",
            profileDesc: "Latest News and Announcements",
            channelsHeader: "Official Telegram Channels",
            footer: "Powered by <span>1xBET بالعربي</span>",
            loading: "Loading...",
            promocodeText: "Use the code <strong>REELGOLD50X</strong> to get exclusive bonuses!",
            newOffer: "New Offer!",
            promocodeOffer: "Use code REELGOLD50X to get a 200% bonus on your first subscription!"
        }
    };

    function updateLinks(container, data) {
        if (!container) {
            console.error("Element for links not found in the DOM");
            return;
        }
        container.innerHTML = "";
        const lang = document.documentElement.getAttribute("lang") || "ar";
        data.forEach(item => {
            const link = document.createElement("a");
            link.href = item.href;
            link.className = "tg-link";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            const flagImg = document.createElement("img");
            flagImg.src = item.flag;
            flagImg.alt = `${item.text} flag`;
            flagImg.className = "flag-icon";
            link.appendChild(flagImg);
            link.appendChild(document.createTextNode(translations[lang][item.text] || item.text));
            container.appendChild(link);
        });
    }

    function updateNews() {
        if (!newsContent) {
            console.error("Element with ID 'news-content' not found in the DOM");
            return;
        }
        const lang = document.documentElement.getAttribute("lang") || "ar";
        newsContent.innerHTML = `<div class='spinner'><i class='fas fa-spinner'></i><span class='loading-text' data-loading-text></span></div>`;
        const loadingInterval = updateLoadingText();
        setTimeout(() => {
            clearInterval(loadingInterval);
            newsContent.innerHTML = "";
            if (!translations[lang]["newOffer"] || !translations[lang]["promocodeOffer"]) {
                console.error(`Error: Translation keys 'newOffer' or 'promocodeOffer' missing for language '${lang}'`);
                newsContent.innerHTML = `<div class="news-item"><h4>خطأ</h4><p>تعذر تحميل الخبر</p></div>`;
                return;
            }
            const newsItem = document.createElement("div");
            newsItem.className = "news-item";
            newsItem.innerHTML = `<h4>${translations[lang]["newOffer"]}</h4><p>${translations[lang]["promocodeOffer"]}</p>`;
            newsContent.appendChild(newsItem);
        }, 100);
    }

    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            copyPromocode();
        });
    }

    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add("active");
            } else {
                scrollTopBtn.classList.remove("active");
            }
        });
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    if (langDropdown) {
        langOptions.forEach(option => {
            option.addEventListener("click", () => {
                const lang = option.getAttribute("data-lang");
                document.documentElement.setAttribute("lang", lang);
                document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
                document.body.setAttribute("lang", lang);

                document.querySelectorAll("[data-translate]").forEach(element => {
                    const key = element.getAttribute("data-translate");
                    if (key === "footer" || key === "promocodeText") {
                        element.innerHTML = translations[lang][key];
                    } else {
                        element.textContent = translations[lang][key];
                    }
                });

                document.querySelectorAll("[data-aria-label]").forEach(element => {
                    const key = element.getAttribute("data-aria-label");
                    element.setAttribute("aria-label", translations[lang][key]);
                });

                updateLinks(telegramLinks, telegramData);
                updateNews();

                localStorage.setItem("lang", lang);
            });
        });

        const savedLang = localStorage.getItem("lang") || "ar";
        document.documentElement.setAttribute("lang", savedLang);
        document.documentElement.setAttribute("dir", savedLang === "ar" ? "rtl" : "ltr");
        document.body.setAttribute("lang", savedLang);
        document.querySelectorAll("[data-translate]").forEach(element => {
            const key = element.getAttribute("data-translate");
            if (key === "footer" || key === "promocodeText") {
                element.innerHTML = translations[savedLang][key];
            } else {
                element.textContent = translations[savedLang][key];
            }
        });
        document.querySelectorAll("[data-aria-label]").forEach(element => {
            const key = element.getAttribute("data-aria-label");
            element.setAttribute("aria-label", translations[savedLang][key]);
        });
    }

    updateLinks(telegramLinks, telegramData);
    updateNews();

    ["img/main.jpg", "img/logo.png", "img/favicon.ico", "img/default.jpg", "img/egy.png", "img/mar.png", "img/mrt.png", "img/irq.png", "img/jor.png", "img/dza.png"].forEach(url => {
        const img = new Image();
        img.src = url;
        img.onerror = () => console.error(`فشل تحميل الصورة: ${url}`);
    });
});

function copyPromocode() {
    const promocode = "REELGOLD50X";
    const statusElement = document.getElementById("copy-status");
    const inputElement = document.querySelector(".promocode-input");
    const copyBtn = document.getElementById("copy-promocode-btn");
    const lang = document.documentElement.getAttribute("lang") || "ar";
    statusElement.textContent = "";
    if (!window.location.protocol.includes("https") && !window.location.hostname.includes("localhost")) {
        statusElement.textContent = translations[lang].copied;
        inputElement.style.display = "block";
        showToast(translations[lang].copied || "فشل النسخ، انسخ يدويًا: REELGOLD50X");
        return;
    }
    navigator.clipboard.writeText(promocode).then(() => {
        statusElement.textContent = translations[lang].copied;
        copyBtn.textContent = translations[lang].copied;
        showToast(translations[lang].copied);
        setTimeout(() => {
            copyBtn.textContent = translations[lang].copyBtn;
            statusElement.textContent = "";
        }, 2000);
    }).catch(() => {
        statusElement.textContent = translations[lang].copied ? "فشل النسخ، انسخ يدويًا:" : "Failed to copy, please copy manually: ";
        inputElement.style.display = "block";
        showToast(translations[lang].copied || "فشل النسخ، انسخ يدويًا: REELGOLD50X");
    });
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 2000);
}

function fallbackCopy(text) {
    const statusElement = document.getElementById("copy-status");
    const tempInput = document.createElement("textarea");
    tempInput.style.position = "absolute";
    tempInput.style.left = "-9999px";
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    try {
        const successful = document.execCommand("copy");
        statusElement.textContent = successful ? translations[document.documentElement.getAttribute("lang") || "ar"].copied : "فشل النسخ، يرجى نسخه يدويًا: " + text;
    } catch (err) {
        statusElement.textContent = "فشل النسخ: " + err.message + "، يرجى نسخه يدويًا: " + text;
    } finally {
        document.body.removeChild(tempInput);
    }
}
