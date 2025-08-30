window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const ppOp = document.querySelector('.pp-op');
    const opContent = document.querySelector('.op-content');

    // Parallax Zoom
    if (ppOp) {
        ppOp.style.transform = `scale(${1 + scrollTop / 1000})`;
    }

    // Fade out teks & gambar saat scroll
    if (opContent) {
        const fadePoint = window.innerHeight / 2; // mulai fade saat setengah layar
        let opacity = 1 - scrollTop / fadePoint;
        if (opacity < 0) opacity = 0;
        opContent.style.opacity = opacity;
    }
});


// Observer untuk animasi masuk Section 2
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 }); // mulai animasi saat 20% elemen terlihat

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150; // jarak sebelum elemen muncul

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}


document.querySelectorAll('.polaroid').forEach(el => {
    observer.observe(el);
});


// Jalankan saat scroll dan saat pertama kali load
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Toggle untuk semua tombol "Baca Selengkapnya"
document.querySelectorAll('.toggleBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const text = btn.previousElementSibling; // ambil <p> sebelum tombol
        text.classList.toggle('expanded');

        if (text.classList.contains('expanded')) {
            btn.textContent = 'Tutup';
        } else {
            btn.textContent = 'Baca Selengkapnya';
        }
    });
});



const track = document.querySelector('.anime-track');
const slides = document.querySelectorAll('.anime-card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 1; // mulai dari slide pertama (setelah clone nanti)
let isTransitioning = false;

// Clone first & last slide
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

track.appendChild(firstClone);
track.insertBefore(lastClone, track.firstChild);

const slideCount = track.children.length;
track.style.transform = `translateX(-${index * 100}%)`;

function updateSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${index * 100}%)`;
}

track.addEventListener("transitionend", () => {
    if (track.children[index].id === "first-clone") {
        track.style.transition = "none";
        index = 1;
        track.style.transform = `translateX(-${index * 100}%)`;
    }
    if (track.children[index].id === "last-clone") {
        track.style.transition = "none";
        index = slideCount - 2;
        track.style.transform = `translateX(-${index * 100}%)`;
    }
    isTransitioning = false;
});

nextBtn.addEventListener("click", () => {
    if (index >= slideCount - 1) return;
    index++;
    updateSlide();
});

prevBtn.addEventListener("click", () => {
    if (index <= 0) return;
    index--;
    updateSlide();
});

let autoplayInterval; // deklarasi global biar bisa di-clear

// === AUTOPLAY ===
function startAutoplay() {
    clearInterval(autoplayInterval); // <--- tambahkan ini
    autoplayInterval = setInterval(() => {
        if (index >= slideCount - 1) return;
        index++;
        updateSlide();
    }, 4000); // 4 detik
}

function stopAutoplay() {
    clearInterval(autoplayInterval); // hentikan interval
}

startAutoplay(); // jalanin otomatis dari awal

const slidesContent = document.querySelectorAll(
    '.anime-card, .anime-text, .anime-image, .anime-image img, .anime-text p'
);

slidesContent.forEach(el => {
    el.addEventListener("mouseenter", stopAutoplay);   // PC hover
    el.addEventListener("mouseleave", startAutoplay);

    el.addEventListener("touchstart", stopAutoplay, { passive: true }); // Mobile sentuh
    el.addEventListener("touchend", startAutoplay);
});
