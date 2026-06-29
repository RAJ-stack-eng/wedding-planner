emailjs.init("KAQAf15nbKfXaL_yJ");

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.sendForm(
            "service_exlm95b",
            "template_imp4krp",
            this
        )
        .then(() => {

            const formContainer = contactForm.parentElement;

            formContainer.innerHTML = `
                <div class="form-success-card">
                    <i class="fas fa-check-circle success-icon"></i>
                    <h3>Inquiry Received!</h3>
                    <p>Thank you for reaching out to Forever Moments. Our planners will contact you soon.</p>
                </div>
            `;

        })
        .catch((error) => {

            console.log(error);
            alert("Email failed to send");

        });

    });

}

// Booking Form Submission in Modal

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const modalContent = bookingForm.parentElement;
        modalContent.innerHTML = `
            <span class="modal-close" id="successModalClose">&times;</span>
            <div class="form-success-card">
                <i class="fas fa-check-circle success-icon"></i>
                <h3>Consultation Request Sent!</h3>
                <p>Thank you for booking with Forever Moments. An expert planner will contact you shortly to confirm details.</p>
                <button id="successModalBtn" class="modal-submit-btn" style="margin-top: 25px; max-width: 200px; margin-left: auto; margin-right: auto; display: block;">Close Window</button>
            </div>
        `;

        // Wire up the new close triggers
        const closeBtn = document.getElementById("successModalClose");
        const actionBtn = document.getElementById("successModalBtn");
        
        if (closeBtn) closeBtn.addEventListener("click", closeBookingModal);
        if (actionBtn) actionBtn.addEventListener("click", closeBookingModal);
    });
}

// Navbar Scroll Effect

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.style.padding = "15px 8%";
        navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
    } else {
        navbar.style.padding = "20px 8%";
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    }
});

// Fade-In Animation

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    {
        threshold: 0.1,
    }
);

const animatedElements = document.querySelectorAll(
    ".card, .package, .testimonial, .gallery-container img"
);

animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.8s ease";

    observer.observe(el);
});

// Booking Modal Controls

const bookingModal = document.getElementById("bookingModal");
const heroBtn = document.getElementById("heroConsultationBtn");
const modalClose = document.querySelector(".modal-close");
const bookingPackageSelect = document.getElementById("bookingPackage");

const openBookingModal = (selectedPackage = "") => {
    if (bookingModal && bookingPackageSelect) {
        if (selectedPackage) {
            bookingPackageSelect.value = selectedPackage.toLowerCase();
        } else {
            bookingPackageSelect.selectedIndex = 0;
        }
        bookingModal.style.display = "flex";
        setTimeout(() => {
            bookingModal.classList.add("show");
        }, 10);
    }
};

const closeBookingModal = () => {
    if (bookingModal) {
        bookingModal.classList.remove("show");
        setTimeout(() => {
            bookingModal.style.display = "none";
        }, 300);
    }
};

if (heroBtn) {
    heroBtn.addEventListener("click", () => openBookingModal("custom"));
}

if (modalClose) {
    modalClose.addEventListener("click", closeBookingModal);
}

// Close on clicking outside the modal content
window.addEventListener("click", (e) => {
    if (e.target === bookingModal) {
        closeBookingModal();
    }
});

// Package Buttons - Open modal with package pre-selected
const packageButtons = document.querySelectorAll(".package button");

packageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const packageName = button.parentElement.querySelector("h3").innerText;
        openBookingModal(packageName);
    });
});

// Gallery Lightbox Controls

const galleryImages = Array.from(document.querySelectorAll(".gallery-container img"));
const lightboxModal = document.getElementById("lightboxModal");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrevBtn = document.querySelector(".lightbox-prev");
const lightboxNextBtn = document.querySelector(".lightbox-next");

let currentImgIndex = 0;

const showLightbox = (index) => {
    if (lightboxModal && lightboxImg && lightboxCaption) {
        currentImgIndex = index;
        const activeImg = galleryImages[currentImgIndex];
        
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = activeImg.src;
            // Elegant placeholder captions
            const titles = [
                "Elegance in the Details",
                "Pure Joy & Celebrations",
                "A Walk to Remember",
                "Moments Captured Forever",
                "Exchange of Hearts",
                "Beginning of Togetherness"
            ];
            lightboxCaption.innerText = titles[currentImgIndex] || "Wedding Celebration";
            lightboxImg.style.opacity = 1;
        }, 150);

        lightboxModal.style.display = "flex";
        setTimeout(() => {
            lightboxModal.classList.add("show");
        }, 10);
    }
};

const closeLightbox = () => {
    if (lightboxModal) {
        lightboxModal.classList.remove("show");
        setTimeout(() => {
            lightboxModal.style.display = "none";
        }, 300);
    }
};

const showNextImage = () => {
    const nextIndex = (currentImgIndex + 1) % galleryImages.length;
    showLightbox(nextIndex);
};

const showPrevImage = () => {
    const prevIndex = (currentImgIndex - 1 + galleryImages.length) % galleryImages.length;
    showLightbox(prevIndex);
};

// Add click listeners to gallery images
galleryImages.forEach((img, index) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
        showLightbox(index);
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showPrevImage();
    });
}

if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showNextImage();
    });
}

// Close lightbox on clicking backdrop
if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
}

// Add Keyboard Support (Left/Right Arrows and Escape)
window.addEventListener("keydown", (e) => {
    if (lightboxModal && lightboxModal.classList.contains("show")) {
        if (e.key === "ArrowRight") {
            showNextImage();
        } else if (e.key === "ArrowLeft") {
            showPrevImage();
        } else if (e.key === "Escape") {
            closeLightbox();
        }
    }
});

// Smooth Scroll for Navigation Links

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
            });
        }
    });
});

// FAQ Accordion

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((btn) => {
    btn.addEventListener("click", () => {
        const item = btn.parentElement;
        
        // Close other FAQ items
        document.querySelectorAll(".faq-item").forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }
        });

        item.classList.toggle("active");
    });
});