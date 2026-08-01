// ===== FIREBASE CONFIG =====
const firebaseConfig = {
    apiKey: "AIzaSyAucfeBrKw-IsuLjsHofv0zfAtxChOisMc",
    authDomain: "fakturkita.firebaseapp.com",
    projectId: "fakturkita",
    storageBucket: "fakturkita.firebasestorage.app",
    messagingSenderId: "509914931800",
    appId: "1:509914931800:web:158ba65d9610c7e379202d",
    measurementId: "G-EF681LJK1B"
};

// Initialize Firebase
let db;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log("Firebase initialized successfully");
} catch (e) {
    console.log("Firebase init error:", e);
}

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// ===== WAITLIST FORM & COUNTER LOGIC =====
const form = document.getElementById('waitlistForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const successDiv = document.getElementById('waitlistSuccess');
const counterEl = document.getElementById('waitlistCount');

// Atur maksimal slot di sini (Sesuai HTML Anda: 50 Slot)
const MAX_SLOTS = 50; 
let currentCount = 0;

// FUNGSI 1: Ambil data Real-time agar count tidak 0 saat refresh
function setupWaitlistCount() {
    if (!db) { 
        counterEl.textContent = '0'; 
        return; 
    }
    
    // onSnapshot akan membaca jumlah data langsung dari Firebase secara live
    db.collection('waitlist').onSnapshot((snapshot) => {
        currentCount = snapshot.size;
        counterEl.textContent = currentCount;

        // FUNGSI 2: Logika memblokir form jika slot sudah habis
        if (currentCount >= MAX_SLOTS) {
            submitBtn.disabled = true;
            btnText.textContent = "Slot Sudah Penuh";
            submitBtn.style.backgroundColor = "#94a3b8"; // Ubah tombol jadi abu-abu
            submitBtn.style.cursor = "not-allowed";
        }
    }, (error) => {
        console.error("Gagal mengambil jumlah waitlist dari Firebase:", error);
    });
}

// Jalankan counter saat halaman dimuat
setupWaitlistCount();

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validasi ekstra sebelum submit ke database
    if (currentCount >= MAX_SLOTS) {
        alert('Mohon maaf, kuota 50 slot early bird sudah terisi penuh!');
        return;
    }

    const name = document.getElementById('wlName').value.trim();
    const email = document.getElementById('wlEmail').value.trim();
    const phone = document.getElementById('wlPhone').value.trim();
    const businessType = document.getElementById('wlBusiness').value;
    const painPoint = document.getElementById('wlPain').value;

    if (!name || !email || !phone || !businessType || !painPoint) {
        alert('Mohon isi semua field');
        return;
    }

    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    const formData = {
        name, email, phone, businessType, painPoint,
        source: window.location.href,
        userAgent: navigator.userAgent,
        createdAt: new Date().toISOString(),
        status: 'waitlist'
    };

    try {
        if (db) {
            await db.collection('waitlist').add(formData);
            console.log("Data berhasil masuk ke Firestore");
        }

        form.style.display = 'none';
        successDiv.style.display = 'block';

    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan. Coba lagi atau hubungi kami.');
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.boxShadow = window.pageYOffset > 50 
        ? '0 4px 20px rgba(0,0,0,0.3)' 
        : 'none';
});

// ===== DEMO BUTTON =====
document.querySelector('.btn-secondary').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Demo interaktif akan tersedia saat MVP selesai. Gabung waitlist untuk akses pertama!');
});

console.log('FakturKita Landing Page loaded - Realtime Counter Active');
