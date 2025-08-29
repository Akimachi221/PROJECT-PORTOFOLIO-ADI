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



