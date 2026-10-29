
/* ========================================
   FASIHA NADEEM — PORTFOLIO JAVASCRIPT
   Forest Green Botanical Theme
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* 1. PAGE TRANSITIONS */

    const transition = document.querySelector(".page-transition");

    const pageLinks = document.querySelectorAll(
        'a[href$=".html"]:not([target="_blank"])'
    );

    pageLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const destination = link.getAttribute("href");

            if (
                !destination ||
                destination.startsWith("#") ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            if (transition) {
                event.preventDefault();

                transition.classList.add("is-active");

                setTimeout(function () {
                    window.location.href = destination;
                }, 450);
            }

        });

    });


    /* 2. REVEAL ELEMENTS WHEN THEY ENTER THE SCREEN */

    const revealElements = document.querySelectorAll(
        ".highlight-card, .intro-section, .closing-section"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {

            element.classList.add("reveal-element");

            observer.observe(element);

        });

    } else {

        /* Show content in older browsers */

        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });

    }


    /* 3. UPDATE FOOTER YEAR AUTOMATICALLY */

    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});

/* ========================================
   FASIHA NADEEM — PORTFOLIO SCRIPT
   Enchanted Botanical Elegance
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Automatically update footer year
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. Create floating butterflies
    const butterflyField = document.getElementById("butterfly-field");

    if (butterflyField && butterflyField.children.length === 0) {
        for (let i = 0; i < 7; i++) {
            const butterfly = document.createElement("span");

            butterfly.classList.add("butterfly");
            butterfly.setAttribute("aria-hidden", "true");

            butterflyField.appendChild(butterfly);
        }
    }

    // 3. Reveal sections when they enter the screen
    const revealElements = document.querySelectorAll(
        ".reveal-element"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });
    }

    // 4. Curtain transition between local HTML pages
    const transition = document.querySelector(".page-transition");

    if (transition) {
        const pageLinks = document.querySelectorAll(
            'a[href$=".html"]'
        );

        pageLinks.forEach(function (link) {
            link.addEventListener("click", function (event) {
                const destination = link.getAttribute("href");

                if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    event.altKey ||
                    link.target === "_blank"
                ) {
                    return;
                }

                if (
                    !destination ||
                    destination.startsWith("#") ||
                    destination === window.location.pathname.split("/").pop()
                ) {
                    return;
                }

                event.preventDefault();

                transition.classList.add("is-active");

                window.setTimeout(function () {
                    window.location.href = destination;
                }, 600);
            });
        });
    }

});

/* ==========================================
   PROJECTS PAGE — INTERACTIONS
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const projectsPage = document.querySelector(".projects-page");

    if (!projectsPage) return;

    // Automatically update the footer year
    const yearElement = projectsPage.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Project category filters
    const filterButtons = projectsPage.querySelectorAll(".project-filter");
    const projectCards = projectsPage.querySelectorAll(".project-card");
    const emptyMessage = projectsPage.querySelector(".projects-empty");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCategory = button.dataset.filter;
            let visibleCount = 0;

            filterButtons.forEach(function (item) {
                const isActive = item === button;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            projectCards.forEach(function (card) {
                const matchesCategory =
                    selectedCategory === "all" ||
                    card.dataset.category === selectedCategory;

                card.hidden = !matchesCategory;

                if (matchesCategory) {
                    visibleCount++;
                }
            });

            if (emptyMessage) {
                emptyMessage.hidden = visibleCount !== 0;
            }
        });
    });
});

/* ==========================================
   CONTACT PAGE — INTERACTIONS
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const contactPage = document.querySelector(".contact-page");

    if (!contactPage) return;

    // Update footer year
    const yearElement = contactPage.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Prepare an email from the contact form
    const contactForm = contactPage.querySelector("#portfolio-contact-form");
    const statusMessage = contactPage.querySelector("#contact-form-status");

    if (!contactForm || !statusMessage) return;

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        const formData = new FormData(contactForm);

        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const subject = String(formData.get("subject") || "").trim();
        const message = String(formData.get("message") || "").trim();

        // Replace this with your real email address
        const recipient = "YOUR_EMAIL@example.com";

        if (recipient === "YOUR_EMAIL@example.com") {
            statusMessage.textContent =
                "Please replace YOUR_EMAIL@example.com in the HTML and JavaScript with your real email address.";
            return;
        }

        const emailSubject = encodeURIComponent(
            subject + " — Message from " + name
        );

        const emailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\nTopic: " + subject +
            "\n\nMessage:\n" + message
        );

        statusMessage.textContent =
            "Opening your email application. Review the draft before sending.";

        window.location.href =
            "mailto:" + recipient +
            "?subject=" + emailSubject +
            "&body=" + emailBody;
    });
});
