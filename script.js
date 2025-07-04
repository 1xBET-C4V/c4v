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
    const contactLinks = document.getElementById("contact-links");

    const contactData = [
        { href: "https://t.me/moderator1x", text: "managerContact" },
        { href: "https://t.me/moder1xsupport", text: "supportContact" }
    ];

    const newsData = [
        { title: "newOffer", content: "promocodeOffer" }
    ];

    const translations = {
        ar: {
            home: "الرئيسية",
            contactUs: "راسلنا",
            promocode: "البروموكود",
            copyBtn: "نسخ الكود",
            copied: "تم النسخ!",
            copyPromocodeAria: "نسخ بروموكود REELGOLD50X",
            profileTitle: "مسابقة Cash 4 Views",
            profileDesc: "آخر الأخبار والإعلانات",
            contactHeader: "تواصلوا معنا عبر تلغرام",
            footer: "Powered by <span>1xBET بالعربي</span>",
            loading: "جاري التحميل...",
            promocodeText: "استخدم الكود <strong>REELGOLD50X</strong> للحصول على مكافآت حصرية!",
            managerContact: "حساب المدير الخاص بالمسابقة",
            supportContact: "حساب الدعم الخاص بالمسابقة"
        },
        en: {
            home: "Home",
            contactUs: "Contact Us",
            promocode: "Promo Code",
            copyBtn: "Copy Code",
            copied: "Copied!",
            copyPromocodeAria: "Copy promo code REELGOLD50X",
            profileTitle: "Cash 4 Views Competition",
            profileDesc: "Latest News and Announcements",
            contactHeader: "Contact us via Telegram",
            footer: "Powered by <span>1xBET بالعربي</span>",
            loading: "Loading...",
            promocodeText: "Use the code <strong>REELGOLD50X</strong> to get exclusive bonuses!",
            managerContact: "Contest Manager Account",
            supportContact: "Contest Support Account"
        }
    };

    function updateLinks(container, data, options = {}) {
        container.innerHTML = "";
        const { headerText = "" } = options;
        const lang = document.documentElement.getAttribute("lang") || "ar";
        if (headerText) {
            const header = document.createElement("p");
            header.textContent = translations[lang][headerText];
            header.className = "contact-header";
            container.appendChild(header);
        }
        data.forEach(item => {
            const link = document.createElement("a");
            link.href = item.href;
            link.className = "contact-link";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = translations[lang][item.text];
            container.appendChild(link);
        });
    }
function updateNews() {
    const lang = document.documentElement.getAttribute("lang") || "ar";
    newsContent.innerHTML = `<div class='spinner'><i class='fas fa-spinner'></i><span class='loading-text' data-loading-text></span></div>`;
    const loadingInterval = updateLoadingText();
    setTimeout(() => {
        clearInterval(loadingInterval);
        newsContent.innerHTML = "";
        newsData.forEach(item => {
            const newsItem = document.createElement("div");
            newsItem.className = "news-item";
            newsItem.innerHTML = `<h4>${translations[lang][item.title]}</h4><p>${translations[lang][item.content]}</p>`;
            newsContent.appendChild(newsItem);
        });
    }, 500);
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

                updateLinks(contactLinks, contactData, { headerText: "contactHeader" });
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

    updateLinks(contactLinks, contactData, { headerText: "contactHeader" });
    updateNews();

    ["img/main.jpg", "img/logo.png", "img/favicon.ico", "img/default.jpg"].forEach(url => {
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
