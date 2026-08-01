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

// ===== DETEKSI MODE =====
const isLocalFile = window.location.protocol === 'file:';
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const isDemoMode = isLocalFile || isLocalhost;

// ===== INIT FIREBASE =====
let db = null;
let firebaseReady = false;

try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        firebaseReady = true;
        console.log("Firebase initialized");
    } else {
        console.warn("Firebase SDK tidak ditemukan");
    }
} catch (e) {
    console.warn("Firebase init error:", e.message);
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

// ===== WAITLIST FORM =====
const form = document.getElementById('waitlistForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const successDiv = document.getElementById('waitlistSuccess');
const counterEl = document.getElementById('waitlistCount');

// Tampilkan banner demo jika mode lokal
if (isDemoMode) {
    console.log("Mode DEMO aktif");
    const demoBanner = document.createElement('div');
    demoBanner.innerHTML = `
        <div style="background: rgba(251,146,60,0.15); border: 1px solid rgba(251,146,60,0.3); 
                    border-radius: 10px; padding: 12px 16px; margin-bottom: 16px; text-align: center;">
            <div style="font-size: 13px; color: #fb923c; font-weight: 600;">📱 Mode Preview Lokal</div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">
                Data tersimpan di memory HP (tidak ke Firebase).<br>
                Deploy ke Vercel agar data tersimpan permanen.
            </div>
        </div>
    `;
    form.insertBefore(demoBanner, form.firstChild);
}

// ===== REAL-TIME COUNTER =====
function setupCounter() {
    if (!db) {
        counterEl.textContent = '0';
        return;
    }
    
    if (isDemoMode) {
        counterEl.textContent = '0';
        return;
    }
    
    try {
        db.collection('waitlist').onSnapshot((snapshot) => {
            const count = snapshot.size;
            counterEl.textContent = count;
            console.log('Waitlist count updated:', count);
        }, (error) => {
            console.error('Counter error:', error);
            counterEl.textContent = '0';
        });
    } catch (e) {
        console.error('Setup counter error:', e);
        counterEl.textContent = '0';
    }
}
setupCounter();

// ===== FORM SUBMIT =====
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('wlName').value.trim();
    const email = document.getElementById('wlEmail').value.trim();
    const phone = document.getElementById('wlPhone').value.trim();
    const businessType = document.getElementById('wlBusiness').value;
    const painPoint = document.getElementById('wlPain').value;
    
    if (!name || !email || !phone || !businessType || !painPoint) {
        alert('Mohon isi semua field');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        alert('Format email tidak valid');
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
        if (isDemoMode) {
            const existing = JSON.parse(localStorage.getItem('fk_waitlist_demo') || '[]');
            existing.push(formData);
            localStorage.setItem('fk_waitlist_demo', JSON.stringify(existing));
            console.log("DEMO: Data tersimpan di localStorage", formData);
            await new Promise(r => setTimeout(r, 800));
            counterEl.textContent = existing.length;
            
        } else if (db) {
            await db.collection('waitlist').add(formData);
            console.log("Data tersimpan ke Firestore");
        } else {
            throw new Error("Database tidak tersedia");
        }
        
        form.style.display = 'none';
        successDiv.style.display = 'block';
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan: ' + error.message + '\n\nCoba lagi atau hubungi kami.');
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
    if (navbar) {
        navbar.style.boxShadow = window.pageYOffset > 50 
            ? '0 4px 20px rgba(0,0,0,0.3)' 
            : 'none';
    }
});

// ===== DEMO BUTTON =====
const demoBtn = document.querySelector('.btn-secondary');
if (demoBtn) {
    demoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Demo interaktif akan tersedia saat MVP selesai. Gabung waitlist untuk akses pertama!');
    });
}

// ===== WHATSAPP SHARE =====
function setupWhatsAppShare() {
    const waBtn = document.querySelector('.btn-whatsapp');
    if (!waBtn) return;
    
    const shareText = encodeURIComponent(
        'Saya baru daftar waitlist FakturKita - aplikasi faktur & faktur pajak digital untuk UMKM. ' +
        'Dapat 3 bulan GRATIS saat launch! 🎉\n\n' +
        'Daftar di sini: ' + window.location.href
    );
    
    waBtn.href = 'https://wa.me/?text=' + shareText;
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
    
    waBtn.addEventListener('click', (e) => {
        const waAppUrl = 'whatsapp://send?text=' + shareText;
        window.location.href = waAppUrl;
        setTimeout(() => {
            window.open('https://wa.me/?text=' + shareText, '_blank');
        }, 500);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupWhatsAppShare);
} else {
    setupWhatsAppShare();
}

console.log('FakturKita loaded. Demo mode:', isDemoMode, '| Firebase ready:', firebaseReady);
