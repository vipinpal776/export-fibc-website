document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navPanel = document.querySelector(".nav-panel");

    if (navToggle && navPanel) {
        navToggle.addEventListener("click", () => {
            const isOpen = navPanel.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    const slides = Array.from(document.querySelectorAll(".slide"));
    const dotsWrap = document.querySelector(".slider-dots");
    let currentSlide = 0;
    let slideTimer;

    function showSlide(index) {
        if (!slides.length) return;
        currentSlide = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle("active", slideIndex === currentSlide);
        });
        document.querySelectorAll(".slider-dots button").forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === currentSlide);
        });
    }

    function startSlider() {
        if (slides.length < 2) return;
        slideTimer = window.setInterval(() => showSlide(currentSlide + 1), 4500);
    }

    if (slides.length && dotsWrap) {
        slides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.setAttribute("aria-label", `Show banner ${index + 1}`);
            dot.addEventListener("click", () => {
                window.clearInterval(slideTimer);
                showSlide(index);
                startSlider();
            });
            dotsWrap.appendChild(dot);
        });
        showSlide(0);
        startSlider();
    }

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14 });
        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("visible"));
    }

    const calculator = document.getElementById("bagWeightForm");
    if (calculator) {
        const result = document.getElementById("weightResult");
        const breakdown = document.getElementById("weightBreakdown");

        function calculateBagWeight() {
            const length = Number(document.getElementById("bagLength").value) / 100;
            const width = Number(document.getElementById("bagWidth").value) / 100;
            const height = Number(document.getElementById("bagHeight").value) / 100;
            const gsm = Number(document.getElementById("bagGsm").value);
            const coatingGsm = Number(document.getElementById("coatingGsm").value);
            const liner = Number(document.getElementById("linerWeight").value);
            const accessories = Number(document.getElementById("accessoryWeight").value);

            const surfaceArea = 2 * ((length * width) + (length * height) + (width * height));
            const fabricWeight = surfaceArea * gsm / 1000;
            const coatingWeight = surfaceArea * coatingGsm / 1000;
            const totalWeight = fabricWeight + coatingWeight + liner + accessories;

            result.textContent = `${totalWeight.toFixed(2)} kg`;
            breakdown.textContent = `Fabric: ${fabricWeight.toFixed(2)} kg | Coating: ${coatingWeight.toFixed(2)} kg | Liner: ${liner.toFixed(2)} kg | Accessories: ${accessories.toFixed(2)} kg`;
        }

        calculator.addEventListener("submit", (event) => {
            event.preventDefault();
            calculateBagWeight();
        });
        calculator.querySelectorAll("input").forEach((input) => {
            input.addEventListener("input", calculateBagWeight);
        });
        calculateBagWeight();
    }

    const quoteForm = document.getElementById("quoteForm");
    if (quoteForm) {
        quoteForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const status = document.getElementById("formStatus");
            status.textContent = "Thank you. Your requirement is ready to send. Please email the same details to vipinpaloffice@gmail.com for immediate coordination.";
            quoteForm.reset();
        });
    }
});
