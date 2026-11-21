///========Destinaation Checkbox============
// ==============================
// DESTINATION SELECTION + NEXT SECTION
// ==============================

const destinationCards = document.querySelectorAll(".destination-card");

destinationCards.forEach(card => {

    card.addEventListener("click", function () {

        this.classList.toggle("selected");

        // // Open / scroll to next section
        // const nextSection = document.querySelector(".safari-options-container");

        // if (nextSection) {
        //     nextSection.scrollIntoView({
        //         behavior: "smooth",
        //         block: "start"
        //     });
        // }

    });

});

// Single Selection + Deselect on Second Click + Move to Next Section

document.querySelectorAll(".safari-options-section").forEach(mainSection => {

    const sections = mainSection.querySelectorAll(".safari-options-container");

    sections.forEach(section => {

        const cards = section.querySelectorAll(".option-card");

        cards.forEach(card => {

            card.addEventListener("click", function () {

                // Deselect if already selected
                if (this.classList.contains("selected")) {
                    this.classList.remove("selected");
                    return;
                }

                // Remove selection from other cards
                cards.forEach(item => {
                    item.classList.remove("selected");
                });

                // Select clicked card
                this.classList.add("selected");

                // Move to the next section
                // Move to the next section
                let nextSection = section.nextElementSibling;

                // If this is the last inner section, find the next main section
                if (!nextSection) {
                    nextSection = mainSection.nextElementSibling;
                }

                if (nextSection) {
                    nextSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            });

        });

    });

});
// HELP ME PLAN Button - Move to Next Section

document.querySelector(".help-btn").addEventListener("click", function () {

    const heroSection = document.querySelector(".hero-section");

    const nextSection = heroSection.nextElementSibling;

    if (nextSection) {
        nextSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

});



// ==============================
// TRAVEL CALENDAR
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    const months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentYear = today.getFullYear();
    let selectedYear = today.getFullYear();
    let selectedMonth = today.getMonth();
    let selectedDay = null;

    // HTML Elements
    const yearElement = document.getElementById("year");
    const monthGrid = document.getElementById("monthGrid");

    const monthView = document.getElementById("monthView");
    const dateView = document.getElementById("dateView");

    const monthYear = document.getElementById("monthYear");
    const dateGrid = document.getElementById("dateGrid");

    const prevYearBtn = document.getElementById("prevYear");
    const nextYearBtn = document.getElementById("nextYear");

    const backToMonths = document.getElementById("backToMonths");
    const nextMonthBtn = document.getElementById("nextMonth");


    // ==============================
    // DISPLAY MONTHS
    // ==============================

    function renderCalendar() {

        yearElement.textContent = currentYear;
        monthGrid.innerHTML = "";

        months.forEach((month, index) => {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "month";
            button.textContent = month;

            // Disable previous months
            const isPast =
                currentYear < today.getFullYear() ||
                (currentYear === today.getFullYear() &&
                    index < today.getMonth());

            button.disabled = isPast;

            // Highlight selected month
            if (
                selectedYear === currentYear &&
                selectedMonth === index
            ) {
                button.classList.add("active");
            }

            // Month click
            button.addEventListener("click", function () {

                selectedMonth = index;
                selectedYear = currentYear;
                selectedDay = null;

                monthView.style.display = "none";
                dateView.style.display = "block";

                renderDates();

            });

            monthGrid.appendChild(button);

        });

        // Disable previous year navigation
        prevYearBtn.disabled = currentYear <= today.getFullYear();

    }


    // ==============================
    // DISPLAY DATES
    // ==============================

    function renderDates() {

        dateGrid.innerHTML = "";

        monthYear.textContent =
            months[selectedMonth] + " " + selectedYear;

        // First weekday of month
        const firstDay = new Date(
            selectedYear,
            selectedMonth,
            1
        ).getDay();

        // Total days in month
        const totalDays = new Date(
            selectedYear,
            selectedMonth + 1,
            0
        ).getDate();


        // Empty spaces before first date
        for (let i = 0; i < firstDay; i++) {

            const empty = document.createElement("span");

            dateGrid.appendChild(empty);

        }


        // Generate calendar dates
        for (let day = 1; day <= totalDays; day++) {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "date";
            button.textContent = day;

            const currentDate = new Date(
                selectedYear,
                selectedMonth,
                day
            );

            currentDate.setHours(0, 0, 0, 0);


            // Disable previous dates
            if (currentDate < today) {

                button.disabled = true;
                button.classList.add("disabled");

            }


            // Highlight selected date
            if (selectedDay === day) {
                button.classList.add("active");
            }


            // Select date
            button.addEventListener("click", function () {

                selectedDay = day;

                document.querySelectorAll("#dateGrid .date").forEach(btn => {
                    btn.classList.remove("active");
                });

                button.classList.add("active");

                console.log("Selected Travel Date:", currentDate);

            });

            dateGrid.appendChild(button);

        }

    }


    // ==============================
    // PREVIOUS YEAR
    // ==============================

    prevYearBtn.addEventListener("click", function () {

        if (currentYear > today.getFullYear()) {

            currentYear--;

            renderCalendar();

        }

    });


    // ==============================
    // NEXT YEAR
    // ==============================

    nextYearBtn.addEventListener("click", function () {

        currentYear++;

        renderCalendar();

    });


    // ==============================
    // BACK TO MONTHS
    // ==============================

    backToMonths.addEventListener("click", function () {

        currentYear = selectedYear;

        monthView.style.display = "block";
        dateView.style.display = "none";

        renderCalendar();

    });


    // ==============================
    // NEXT MONTH
    // ==============================

    nextMonthBtn.addEventListener("click", function () {

        if (selectedMonth === 11) {

            selectedMonth = 0;
            selectedYear++;

        } else {

            selectedMonth++;

        }

        selectedDay = null;

        renderDates();

    });


    // INITIAL CALENDAR
    renderCalendar();

});

// =======================FOrm validation============

const quoteForm = document.getElementById("quoteForm");

quoteForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const countryCode = document.getElementById("countryCode").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    console.log({
        fullName,
        email,
        countryCode,
        phone,
        message
    });

    document.getElementById("formMessage").textContent =
        "Thank you! Your details have been submitted.";

    quoteForm.reset();

});


//=========================== Review Section=========================


const reviewsTrack = document.getElementById("reviewsTrack");

const prevReview = document.getElementById("prevReview");

const nextReview = document.getElementById("nextReview");

const reviewPages = document.querySelectorAll(".review-page");

let currentReviewPage = 0;

const totalReviewPages = reviewPages.length;

function updateReviews() {

    reviewsTrack.style.transform =
        `translateX(-${currentReviewPage * 100}%)`;

    // Previous button
    prevReview.disabled = currentReviewPage === 0;

    // Next button
    nextReview.disabled =
        currentReviewPage === totalReviewPages - 1;

}

// Next Reviews
nextReview.addEventListener("click", function () {

    if (currentReviewPage < totalReviewPages - 1) {

        currentReviewPage++;

        updateReviews();

    }

});

// Previous Reviews
prevReview.addEventListener("click", function () {

    if (currentReviewPage > 0) {

        currentReviewPage--;

        updateReviews();

    }

});

// Initial Setup
updateReviews();




// ===============Wildlife Gallery Lightbox============


// =============== Wildlife Gallery Lightbox ===============

const galleryImages = document.querySelectorAll(
    ".wildlife-gallery .gallery-item img"
);

let currentImageIndex = 0;

// Create Lightbox
const lightbox = document.createElement("div");
lightbox.classList.add("gallery-lightbox");

lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>

    <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>

    <img src="" alt="Wildlife Image">

    <button class="lightbox-next" aria-label="Next image">&#10095;</button>

    <div class="lightbox-counter"></div>
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const closeButton = lightbox.querySelector(".lightbox-close");
const prevButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");
const imageCounter = lightbox.querySelector(".lightbox-counter");

// Update Image
function showImage(index) {

    currentImageIndex = (index + galleryImages.length) % galleryImages.length;

    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightboxImage.alt = galleryImages[currentImageIndex].alt;

    imageCounter.textContent =
        `${currentImageIndex + 1} of ${galleryImages.length}`;
}

// Open Image
galleryImages.forEach((image, index) => {

    image.addEventListener("click", function () {

        showImage(index);
        lightbox.classList.add("active");

    });

});

// Previous Button
prevButton.addEventListener("click", function (event) {

    event.stopPropagation();
    showImage(currentImageIndex - 1);

});

// Next Button
nextButton.addEventListener("click", function (event) {

    event.stopPropagation();
    showImage(currentImageIndex + 1);

});

// Click Image to Show Next Image
lightboxImage.addEventListener("click", function (event) {

    event.stopPropagation();
    showImage(currentImageIndex + 1);

});

// Close Lightbox
closeButton.addEventListener("click", function () {

    lightbox.classList.remove("active");

});

// Close Outside Image
lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }

});

// Keyboard Navigation
document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "ArrowRight") {
        showImage(currentImageIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showImage(currentImageIndex - 1);
    }

    if (event.key === "Escape") {
        lightbox.classList.remove("active");
    }

});


/////////////////Responsive/////////////////////////////////

//////////////////Quto section sliding//////////////


document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(".safari-benefits");
    const grid = section?.querySelector(".benefits-grid");

    if (!grid) return;

    const cards = grid.querySelectorAll(".benefit-card");

    let currentIndex = 0;
    let sliderInterval;

    function updateSlider() {

        clearInterval(sliderInterval);

        if (window.innerWidth <= 768) {

            currentIndex = 0;

            grid.style.transform = "translateX(0)";

            sliderInterval = setInterval(() => {

                currentIndex++;

                if (currentIndex >= cards.length) {
                    currentIndex = 0;
                }

                const slidePosition =
                    (currentIndex * 100) / cards.length;

                grid.style.transform =
                    `translateX(-${slidePosition}%)`;

            }, 3000);

        } else {

            grid.style.transform = "none";

        }
    }

    updateSlider();

    window.addEventListener("resize", updateSlider);

});
