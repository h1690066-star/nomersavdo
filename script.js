/* ==========================================================================
   ARZON NOMER UZB — 3D WEBGL SCENE, DYNAMIC CMS LOADER & INTERACTIVE LOGIC
   ========================================================================== */

// Default Fallback Data (also loaded from data.json or localStorage override)
const DEFAULT_SITE_DATA = {
    general: {
        brandTitle: "ARZON NOMER",
        brandHighlight: "UZB",
        botUsername: "@arzonnomeruzbbot",
        botUrl: "https://t.me/arzonnomeruzbbot",
        onlineCount: 842,
        heroBadge: "👑 O'ZBEKISTONDAGI #1 AVTOMATLASHGAN RAQAMLAR BOTI",
        heroTitleLine1: "TELEGRAM VA BOSHQA TARMOQLAR UCHUN",
        heroTitleGlitch: "ENG ARZON RAQAMLAR",
        heroSubtitle: "Hech qanday SIM-kartasiz va pasportsiz! 120+ davlat virtual raqamlarini 5 soniya ichida oling. SMS kod kelmasa — pulingiz 100% avtomatik qaytadi!",
        heroCtaPrimary: "RAQAM OLISH (@arzonnomeruzbbot)",
        heroCtaSecondary: "Narxlarni ko'rish",
        holoStartPrice: "2,900 UZS",
        ctaTitle: "HOZIROQ BIRINCHI RAQAMINGIZNI OLING!",
        ctaDesc: "45,000+ foydalanuvchilar qatoriga qo'shiling. Eng arzon narxlar, 24/7 avtomatik bot va 100% kafolat sizni kutmoqda.",
        footerDesc: "O'zbekistondagi eng ishonchli va tezkor virtual raqamlar (SMS-aktivatsiya) platformasi. Barcha xizmatlar avtomatlashtirilgan.",
        copyright: "© 2026 Arzon Nomer Uzb (@arzonnomeruzbbot). Barcha huquqlar himoyalangan."
    },
    stats: [
        { value: "45,000+", label: "Faol mijozlar" },
        { value: "120+", label: "Davlatlar bazasi" },
        { value: "4.5 sek", label: "SMS kelish tezligi" }
    ],
    tickers: [
        "🟢 JONLI STATISTIKA: Bugun 1,420+ ta raqam sotildi",
        "⚡ TEZKOR KOD: SMS kodlar o'rtacha 4.2 soniyada kelmoqda",
        "🔥 AKSIYA: AQSh (+1) va Kanada (+1) Telegram raqamlari 35% chegirmada!",
        "🛡️ KAFOLAT: Kod kelmasa, pulingiz 100% avtomatik balansga qaytadi",
        "💎 BOT MANZILI: @arzonnomeruzbbot — 24/7 Avtomatik xizmat"
    ],
    countries: [
        {
            id: "id", name: "Indoneziya", code: "+62", flag: "🇮🇩", category: ["cheap", "cis"],
            badge: "ENG ARZON 🔥", stock: "4,820 ta bor", smsSpeed: "~4 sek",
            prices: { telegram: "2,900", whatsapp: "3,200", instagram: "1,900", google: "2,400", tiktok: "2,100" }
        },
        {
            id: "us", name: "AQSh (USA)", code: "+1", flag: "🇺🇸", category: ["cheap", "vip"],
            badge: "BESTSELLER ⭐", stock: "9,150 ta bor", smsSpeed: "~3 sek",
            prices: { telegram: "4,500", whatsapp: "5,200", instagram: "2,800", google: "3,900", tiktok: "3,200" }
        },
        {
            id: "uz", name: "O'zbekiston", code: "+998", flag: "🇺🇿", category: ["vip", "cis"],
            badge: "MILLIY VIP 👑", stock: "340 ta bor", smsSpeed: "~3 sek",
            prices: { telegram: "11,500", whatsapp: "12,000", instagram: "6,500", google: "7,900", tiktok: "6,000" }
        },
        {
            id: "kz", name: "Qozog'iston", code: "+7", flag: "🇰🇿", category: ["vip", "cis"],
            badge: "SPAMGA CHIDAMLI 🛡️", stock: "1,640 ta bor", smsSpeed: "~4 sek",
            prices: { telegram: "6,900", whatsapp: "7,500", instagram: "3,800", google: "4,900", tiktok: "4,200" }
        },
        {
            id: "vn", name: "Vetnam", code: "+84", flag: "🇻🇳", category: ["cheap"],
            badge: "TEZKOR SMS ⚡", stock: "3,290 ta bor", smsSpeed: "~4 sek",
            prices: { telegram: "3,400", whatsapp: "3,800", instagram: "2,200", google: "2,900", tiktok: "2,500" }
        },
        {
            id: "ru", name: "Rossiya", code: "+7", flag: "🇷🇺", category: ["cis", "vip"],
            badge: "TOP SIFAT 💎", stock: "2,910 ta bor", smsSpeed: "~4 sek",
            prices: { telegram: "7,800", whatsapp: "8,400", instagram: "4,100", google: "5,200", tiktok: "4,600" }
        },
        {
            id: "ca", name: "Kanada", code: "+1", flag: "🇨🇦", category: ["vip"],
            badge: "TOZA IP ❄️", stock: "2,100 ta bor", smsSpeed: "~4 sek",
            prices: { telegram: "5,200", whatsapp: "5,900", instagram: "3,100", google: "4,200", tiktok: "3,500" }
        },
        {
            id: "gb", name: "Angliya (UK)", code: "+44", flag: "🇬🇧", category: ["vip"],
            badge: "YEVROPA VIP 👑", stock: "1,480 ta bor", smsSpeed: "~5 sek",
            prices: { telegram: "6,400", whatsapp: "7,200", instagram: "3,900", google: "4,800", tiktok: "4,100" }
        },
        {
            id: "tr", name: "Turkiya", code: "+90", flag: "🇹🇷", category: ["cis"],
            badge: "MASHHUR 🔥", stock: "1,850 ta bor", smsSpeed: "~4 sek",
            prices: { telegram: "5,800", whatsapp: "6,400", instagram: "3,200", google: "4,100", tiktok: "3,600" }
        },
        {
            id: "kg", name: "Qirg'iziston", code: "+996", flag: "🇰🇬", category: ["cis"],
            badge: "MDH ISHONCHLI ✅", stock: "920 ta bor", smsSpeed: "~4 sek",
            prices: { telegram: "6,200", whatsapp: "6,800", instagram: "3,600", google: "4,400", tiktok: "3,900" }
        },
        {
            id: "ph", name: "Filippin", code: "+63", flag: "🇵🇭", category: ["cheap"],
            badge: "HAMYONBOP 💰", stock: "3,740 ta bor", smsSpeed: "~5 sek",
            prices: { telegram: "3,600", whatsapp: "4,000", instagram: "2,300", google: "2,800", tiktok: "2,400" }
        },
        {
            id: "de", name: "Germaniya", code: "+49", flag: "🇩🇪", category: ["vip"],
            badge: "PREMIUM SIFAT 🏆", stock: "890 ta bor", smsSpeed: "~4 sek",
            prices: { telegram: "8,900", whatsapp: "9,500", instagram: "5,100", google: "6,200", tiktok: "5,400" }
        }
    ],
    simulatorOptions: [
        { title: "🇺🇸 AQSh (+1)", phone: "+1 (415) 890-3421", price: "4,500 so'm" },
        { title: "🇮🇩 Indoneziya (+62)", phone: "+62 812-9940-1823", price: "2,900 so'm" },
        { title: "🇰🇿 Qozog'iston (+7)", phone: "+7 (707) 541-9920", price: "6,900 so'm" },
        { title: "🇺🇿 O'zbekiston (+998)", phone: "+998 (93) 581-40-22", price: "11,500 so'm" }
    ],
    features: [
        {
            icon: "zap", span2: true,
            title: "100% Avtomatlashtirilgan Tezkor Tizim",
            desc: "Adminga yozib kutib o'tirmaysiz! Kechasi soat 03:00 bo'ladimi yoki ertalabmi — botimiz 24/7 rejimida to'lovni avtomatik qabul qiladi va 3 soniya ichida raqam hamda SMS kodni beradi.",
            chips: ["⚡ 0 soniya kutish", "🤖 To'liq Avto-Bot", "🔥 API Integratsiya"]
        },
        {
            icon: "refresh-ccw", span2: false,
            title: "Kod kelmasa — Pul 100% Qaytadi",
            desc: "Agar tanlangan raqamga SMS kod kelmasa yoki raqamni bekor qilsangiz, mablag'ingiz bir tiyin ham ushlanmasdan darhol balansingizga qaytadi.",
            chips: []
        },
        {
            icon: "credit-card", span2: false,
            title: "Oson To'lov Tizimlari",
            desc: "Humo, Uzcard, Click, Payme, Uzum Bank va hatto Kripto / Rubl orqali ham hisobingizni sanoqli soniyalarda komissiyasiz to'ldirishingiz mumkin.",
            chips: []
        },
        {
            icon: "shield-alert", span2: true,
            title: "Spamdan Toza & Yuqori Sifatli Raqamlar",
            desc: "Bizning serverlarimiz to'g'ridan-to'g'ri xalqaro mobil operatorlar shlyuziga ulangan. Shu sababli olingan akkauntlar uzoq muddat ishlaydi va bloklanib ketmaydi.",
            chips: ["🛡️ Toza IP Shlyuz", "👑 VIP Operatorlar", "🔒 Maxfiylik 100%"]
        }
    ],
    steps: [
        {
            badge: "QADAM 01", icon: "send",
            title: "Botga start bosing",
            desc: "Telegram orqali @arzonnomeruzbbot manziliga kiring va Start tugmasini bosing."
        },
        {
            badge: "QADAM 02", icon: "wallet",
            title: "Hisobni to'ldiring va tanlang",
            desc: "Click/Payme/Karta orqali balansni to'ldiring va 120+ davlatdan o'zingizga ma'qulini tanlang."
        },
        {
            badge: "QADAM 03", icon: "check-circle-2",
            title: "Raqam va SMS kodni oling!",
            desc: "Berilgan raqamni Telegram/WhatsApp'ga kiriting va bot yuborgan SMS kod bilan akkauntni oching!"
        }
    ],
    faqs: [
        {
            question: "Raqamga SMS kod kelmasa pulim kuyadimi?",
            answer: "Aslo yo'q! Agar tanlagan raqamingizga SMS kod kelmasa va siz 'Bekor qilish' tugmasini bossangiz, pulingiz 100% o'sha zahoti botdagi balansingizga qaytadi. Siz faqat muvaffaqiyatli kelgan SMS kod uchungina to'laysiz."
        },
        {
            question: "Olingan raqamni boshqa odamga ham sotasizlarmi?",
            answer: "Yo'q! Har bir raqam tizim tomonidan faqat bir marta sotiladi va aktivatsiyadan so'ng bazadan butunlay o'chiriladi. Xavfsizlikni yanada oshirish uchun akkaunt ochgach, 'Ikki bosqichli tekshiruv' (2FA parol) o'rnatib olishni tavsiya qilamiz."
        },
        {
            question: "Qaysi davlat raqamlari Telegram uchun eng yaxshi va uzoq ishlaydi?",
            answer: "Eng arzon variant sifatida Indoneziya (+62), Vetnam (+84) va AQSh (+1) raqamlari juda mashhur. Agar spamga juda chidamli va uzoq yillar ishlaydigan VIP akkaunt kerak bo'lsa, O'zbekiston (+998), Qozog'iston (+7) yoki Yevropa davlatlarini tavsiya qilamiz."
        },
        {
            question: "Botda hisobni qanday to'ldirish mumkin va minimal summa qancha?",
            answer: "Bot ichida Humo, Uzcard, Click, Payme hamda Kripto orqali avtomatik to'ldirish mavjud. Minimal hisob to'ldirish summasi atigi 3,000 so'mni tashkil etadi — ya'ni bitta raqam olish uchun ham bemalol to'lov qila olasiz!"
        }
    ],
    toasts: [
        { user: "@shoxrux_dev xarid qildi", item: "🇺🇸 AQSh (+1) Telegram — 4,500 so'm" },
        { user: "@abror_uzb xarid qildi", item: "🇮🇩 Indoneziya (+62) Telegram — 2,900 so'm" },
        { user: "@sardor_vip xarid qildi", item: "🇺🇿 O'zbekiston (+998) WhatsApp — 12,000 so'm" },
        { user: "@bekzod_77 xarid qildi", item: "🇰🇿 Qozog'iston (+7) Telegram — 6,900 so'm" },
        { user: "@malika_smm xarid qildi", item: "🇬🇧 Angliya (+44) Instagram — 3,900 so'm" },
        { user: "@javohir_pro xarid qildi", item: "🇻🇳 Vetnam (+84) Telegram — 3,400 so'm" }
    ]
};

let SITE_DATA = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));

// Load site data from data.json or localStorage preview override
async function loadSiteData() {
    try {
        const res = await fetch('data.json?t=' + Date.now());
        if (res.ok) {
            const fetched = await res.json();
            SITE_DATA = Object.assign({}, DEFAULT_SITE_DATA, fetched);
        }
    } catch (e) {
        // Fallback if opened via file:// protocol
    }

    // Check if Admin Panel saved local draft changes
    const localDraft = localStorage.getItem('arzon_nomer_cms_data');
    if (localDraft) {
        try {
            const parsed = JSON.parse(localDraft);
            SITE_DATA = Object.assign({}, SITE_DATA, parsed);
        } catch (err) {
            console.error('Local CMS draft parse error:', err);
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadSiteData();
    renderAllDynamicContent();
    initThreeJSBackground();
    initCustomCursor();
    init3DTiltCards();
    initCatalog();
    initHeroLiveStream();
    initLivePurchaseToasts();
});

/* ==========================================================================
   RENDER ALL DYNAMIC CONTENT FROM SITE_DATA
   ========================================================================== */
function renderAllDynamicContent() {
    const g = SITE_DATA.general || DEFAULT_SITE_DATA.general;

    // Brand & Texts
    setText('nav-brand-title', g.brandTitle);
    setText('nav-brand-highlight', g.brandHighlight);
    setText('nav-bot-username', g.botUsername);
    setText('footer-brand-title', g.brandTitle);
    setText('footer-brand-highlight', g.brandHighlight);
    setText('online-count', g.onlineCount);

    setText('hero-badge', g.heroBadge);
    setText('hero-title-line1', g.heroTitleLine1);
    const glitchEl = document.getElementById('hero-title-glitch');
    if (glitchEl) {
        glitchEl.textContent = g.heroTitleGlitch;
        glitchEl.setAttribute('data-text', g.heroTitleGlitch);
    }
    setText('hero-subtitle', g.heroSubtitle);
    setText('hero-cta-primary', g.heroCtaPrimary);
    setText('hero-cta-secondary', g.heroCtaSecondary);
    setText('holo-start-price', g.holoStartPrice);
    setText('cta-title', g.ctaTitle);
    setText('cta-desc', g.ctaDesc);
    setText('footer-desc', g.footerDesc);
    setText('footer-copyright', g.copyright);
    setText('copy-btn-text', `${g.botUsername} nusxalash`);

    // Update all bot links and usernames
    document.querySelectorAll('.bot-link-el').forEach((el) => {
        el.href = g.botUrl;
    });
    document.querySelectorAll('.bot-username-el').forEach((el) => {
        el.textContent = g.botUsername;
    });

    // 1. Top Ticker Marquee
    const tickerTrack = document.getElementById('ticker-track');
    if (tickerTrack && Array.isArray(SITE_DATA.tickers)) {
        const itemsHtml = SITE_DATA.tickers.map((t) => `<div class="ticker-item">${t}</div>`).join('');
        tickerTrack.innerHTML = itemsHtml + itemsHtml;
    }

    // 2. Hero Stats
    const statsGrid = document.getElementById('hero-stats-grid');
    if (statsGrid && Array.isArray(SITE_DATA.stats)) {
        statsGrid.innerHTML = SITE_DATA.stats.map((s) => `
            <div class="stat-box tilt-card" data-tilt>
                <div class="stat-num">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>
        `).join('');
    }

    // 3. Simulator Options
    const tgKeyboard = document.getElementById('tg-keyboard');
    if (tgKeyboard && Array.isArray(SITE_DATA.simulatorOptions)) {
        tgKeyboard.innerHTML = SITE_DATA.simulatorOptions.map((opt) => {
            const safeTitle = opt.title.replace(/'/g, "\\'");
            const safePhone = opt.phone.replace(/'/g, "\\'");
            const safePrice = opt.price.replace(/'/g, "\\'");
            return `
                <button class="tg-inline-btn" onclick="simulateBuy('${safeTitle}', '${safePhone}', '${safePrice}')">
                    ${opt.title} — ${opt.price}
                </button>
            `;
        }).join('');
    }

    // 4. Bento Features
    const bentoGrid = document.getElementById('bento-grid');
    if (bentoGrid && Array.isArray(SITE_DATA.features)) {
        bentoGrid.innerHTML = SITE_DATA.features.map((f) => `
            <div class="bento-card ${f.span2 ? 'bento-span-2' : ''} tilt-card" data-tilt>
                <div class="bento-glow"></div>
                <div class="bento-icon-wrap">
                    <i data-lucide="${f.icon || 'zap'}"></i>
                </div>
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
                ${Array.isArray(f.chips) && f.chips.length > 0 ? `
                    <div class="bento-chips">
                        ${f.chips.map((c) => `<span>${c}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    // 5. How It Works Steps
    const stepsTimeline = document.getElementById('steps-timeline');
    if (stepsTimeline && Array.isArray(SITE_DATA.steps)) {
        stepsTimeline.innerHTML = SITE_DATA.steps.map((st, idx) => `
            <div class="step-card tilt-card" data-tilt>
                <div class="step-badge">${st.badge}</div>
                <div class="step-icon"><i data-lucide="${st.icon || 'check-circle-2'}"></i></div>
                <h3>${st.title}</h3>
                <p>${st.desc}</p>
            </div>
            ${idx < SITE_DATA.steps.length - 1 ? '<div class="step-connector"><i data-lucide="chevrons-right"></i></div>' : ''}
        `).join('');
    }

    // 6. FAQs
    const faqList = document.getElementById('faq-list');
    if (faqList && Array.isArray(SITE_DATA.faqs)) {
        faqList.innerHTML = SITE_DATA.faqs.map((f, idx) => `
            <div class="faq-item ${idx === 0 ? 'active' : ''}">
                <button class="faq-question">
                    <span>${f.question}</span>
                    <i data-lucide="chevron-down"></i>
                </button>
                <div class="faq-answer">
                    <p>${f.answer}</p>
                </div>
            </div>
        `).join('');
        initFAQ();
    }

    if (window.lucide) {
        lucide.createIcons();
    }
}

function setText(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined) {
        el.textContent = val;
    }
}

/* ==========================================================================
   1. THREE.JS REAL-TIME 3D CYBER GLOBE & PARTICLE MATRIX
   ========================================================================== */
function initThreeJSBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Cyber Wireframe Globe
    const globeGeo = new THREE.IcosahedronGeometry(11, 2);
    const globeMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.11
    });
    const cyberGlobe = new THREE.Mesh(globeGeo, globeMat);
    cyberGlobe.position.set(10, 1, -6);
    worldGroup.add(cyberGlobe);

    // 2. Outer Orbital Torus Rings
    const ringGeo1 = new THREE.TorusGeometry(14.5, 0.05, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0x0066ff,
        transparent: true,
        opacity: 0.35
    });
    const orbitalRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitalRing1.position.copy(cyberGlobe.position);
    orbitalRing1.rotation.x = Math.PI / 2.4;
    orbitalRing1.rotation.y = Math.PI / 6;
    worldGroup.add(orbitalRing1);

    const ringGeo2 = new THREE.TorusGeometry(17, 0.04, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.2
    });
    const orbitalRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitalRing2.position.copy(cyberGlobe.position);
    orbitalRing2.rotation.x = -Math.PI / 3;
    orbitalRing2.rotation.y = -Math.PI / 5;
    worldGroup.add(orbitalRing2);

    // 3. Floating 3D Cyber Nodes
    const nodesGroup = new THREE.Group();
    const nodeGeo = new THREE.OctahedronGeometry(0.45, 0);
    const nodeMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.55
    });

    for (let i = 0; i < 18; i++) {
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(
            (Math.random() - 0.5) * 55,
            (Math.random() - 0.5) * 35,
            (Math.random() - 0.5) * 20 - 5
        );
        node.userData = {
            rotSpeed: (Math.random() * 0.02) + 0.005,
            initialY: node.position.y,
            offset: Math.random() * Math.PI * 2
        };
        nodesGroup.add(node);
    }
    worldGroup.add(nodesGroup);

    // 4. Starfield / Data Particles
    const particlesCount = 650;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 75;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.11,
        color: 0x38b6ff,
        transparent: true,
        opacity: 0.65
    });
    const particleMesh = new THREE.Points(particlesGeo, particlesMat);
    worldGroup.add(particleMesh);

    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        const targetX = mouseX * 3.5;
        const targetY = -mouseY * 3.5;
        worldGroup.rotation.y += 0.03 * (targetX * 0.15 - worldGroup.rotation.y);
        worldGroup.rotation.x += 0.03 * (targetY * 0.15 - worldGroup.rotation.x);

        cyberGlobe.rotation.y = elapsedTime * 0.14;
        cyberGlobe.rotation.x = elapsedTime * 0.06;
        orbitalRing1.rotation.z = elapsedTime * 0.25;
        orbitalRing2.rotation.z = -elapsedTime * 0.18;

        particleMesh.rotation.y = -elapsedTime * 0.03 + (scrollY * 0.0002);

        nodesGroup.children.forEach((node) => {
            node.rotation.x += node.userData.rotSpeed;
            node.rotation.y += node.userData.rotSpeed;
            node.position.y = node.userData.initialY + Math.sin(elapsedTime * 1.5 + node.userData.offset) * 1.2;
        });

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ==========================================================================
   2. CUSTOM CYBER CURSOR
   ========================================================================== */
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const glow = document.getElementById('cursor-glow');
    if (!dot || !glow) return;

    window.addEventListener('mousemove', (e) => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        glow.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 220, fill: 'forwards' });
    });
}

/* ==========================================================================
   3. 3D PERSPECTIVE TILT EFFECT FOR CARDS
   ========================================================================== */
function init3DTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.45s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}

/* ==========================================================================
   4. INTERACTIVE COUNTRY & PLATFORM PRICE CATALOG
   ========================================================================== */
let currentService = 'telegram';
let currentRegion = 'all';
let searchQuery = '';

function initCatalog() {
    const grid = document.getElementById('catalog-grid');
    const platformTabs = document.querySelectorAll('.platform-tab');
    const regionPills = document.querySelectorAll('.region-pill');
    const searchInput = document.getElementById('country-search');

    if (!grid) return;

    function renderCards() {
        const list = SITE_DATA.countries || [];
        const botUrl = (SITE_DATA.general && SITE_DATA.general.botUrl) || 'https://t.me/arzonnomeruzbbot';

        const filtered = list.filter((item) => {
            const cats = Array.isArray(item.category) ? item.category : [];
            const matchesRegion = currentRegion === 'all' || cats.includes(currentRegion);
            const matchesSearch =
                (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.code || '').toLowerCase().includes(searchQuery.toLowerCase());
            return matchesRegion && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                    Qidiruv bo'yicha davlat topilmadi. <a href="${botUrl}" target="_blank" style="color: var(--cyan);">${SITE_DATA.general.botUsername}</a> ichida 120+ davlat mavjud!
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map((c) => {
            const pricesObj = c.prices || {};
            const price = pricesObj[currentService] || pricesObj.telegram || '3,000';
            return `
                <div class="country-card">
                    <div class="country-top">
                        <div class="country-flag-wrap">
                            <span class="country-flag">${c.flag || '🌐'}</span>
                            <div>
                                <div class="country-name">${c.name}</div>
                                <div class="country-code">Kod: ${c.code}</div>
                            </div>
                        </div>
                        <span class="country-badge">${c.badge || 'ACTIVE'}</span>
                    </div>
                    <div class="country-meta">
                        <span>Mavjud: <b class="stock-ok">${c.stock || 'Mavjud'}</b></span>
                        <span>SMS: <b>${c.smsSpeed || '~4 sek'}</b></span>
                    </div>
                    <div class="country-bottom">
                        <div class="country-price">
                            ${price} <small>so'm</small>
                        </div>
                        <a href="${botUrl}" target="_blank" rel="noopener noreferrer" class="btn-buy-country">
                            <span>Raqam olish</span>
                            <i data-lucide="arrow-up-right" style="width:15px;height:15px;"></i>
                        </a>
                    </div>
                </div>
            `;
        }).join('');

        if (window.lucide) {
            lucide.createIcons();
        }
    }

    platformTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            platformTabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');
            currentService = tab.getAttribute('data-service');
            renderCards();
        });
    });

    regionPills.forEach((pill) => {
        pill.addEventListener('click', () => {
            regionPills.forEach((p) => p.classList.remove('active'));
            pill.classList.add('active');
            currentRegion = pill.getAttribute('data-filter');
            renderCards();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderCards();
        });
    }

    renderCards();
}

/* ==========================================================================
   5. HERO 3D HOLOGRAM LIVE NUMBER STREAM
   ========================================================================== */
function initHeroLiveStream() {
    const numEl = document.getElementById('hero-live-number');
    const countryEl = document.getElementById('hero-live-country');
    const codeEl = document.getElementById('hero-live-code');
    if (!numEl || !countryEl || !codeEl) return;

    const samples = [
        { num: "+1 (312) 894-5201", country: "🇺🇸 AQSh • Telegram", code: "84920" },
        { num: "+62 813-4920-7712", country: "🇮🇩 Indoneziya • Telegram", code: "51904" },
        { num: "+998 (90) 341-88-19", country: "🇺🇿 O'zbekiston • WhatsApp", code: "73019" },
        { num: "+7 (707) 619-33-04", country: "🇰🇿 Qozog'iston • Telegram", code: "29481" },
        { num: "+44 7911 849201", country: "🇬🇧 Angliya • Instagram", code: "60412" }
    ];

    let idx = 0;
    setInterval(() => {
        idx = (idx + 1) % samples.length;
        const item = samples[idx];
        numEl.textContent = item.num;
        countryEl.textContent = item.country;
        codeEl.textContent = item.code;
    }, 3200);
}

/* ==========================================================================
   6. INTERACTIVE TELEGRAM BOT SIMULATOR
   ========================================================================== */
let simBusy = false;

window.simulateBuy = function(countryTitle, phoneNum, price) {
    if (simBusy) return;
    simBusy = true;

    const chatBody = document.getElementById('tg-chat-body');
    const step1 = document.getElementById('sim-ind-1');
    const step2 = document.getElementById('sim-ind-2');
    const step3 = document.getElementById('sim-ind-3');
    const botUsername = (SITE_DATA.general && SITE_DATA.general.botUsername) || '@arzonnomeruzbbot';

    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    const userMsg = document.createElement('div');
    userMsg.className = 'tg-msg user-msg';
    userMsg.innerHTML = `
        <div class="msg-text">${countryTitle} — ${price}</div>
        <span class="msg-time">${timeStr}</span>
    `;
    chatBody.appendChild(userMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    step1.classList.remove('active');
    step2.classList.add('active');
    step3.classList.remove('active');

    setTimeout(() => {
        const botNumMsg = document.createElement('div');
        botNumMsg.className = 'tg-msg bot-msg';
        botNumMsg.innerHTML = `
            <div class="msg-text">
                ✅ <b>Raqam tayyor!</b><br>
                📱 Raqam: <b style="color:#00f0ff">${phoneNum}</b><br>
                🌍 Davlat: ${countryTitle}<br><br>
                ⏳ <i>Ushbu raqamni Telegram'ga kiriting. SMS kod kelishini kutyapmiz...</i>
            </div>
            <span class="msg-time">${timeStr}</span>
        `;
        chatBody.appendChild(botNumMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 650);

    setTimeout(() => {
        step2.classList.remove('active');
        step3.classList.add('active');

        const randomCode = Math.floor(10000 + Math.random() * 90000);
        const botCodeMsg = document.createElement('div');
        botCodeMsg.className = 'tg-msg bot-msg';
        botCodeMsg.style.borderColor = '#00ff9d';
        botCodeMsg.innerHTML = `
            <div class="msg-text">
                🎉 <b>SMS KOD KELDI!</b><br>
                🔑 Tasdiqlash kodi: <b style="color:#00ff9d; font-size:1.05rem;">${randomCode}</b><br><br>
                🚀 Haqiqiy raqam olish uchun hoziroq <b>${botUsername}</b> ga kiring!
            </div>
            <span class="msg-time">${timeStr}</span>
        `;
        chatBody.appendChild(botCodeMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
        simBusy = false;
    }, 2300);
};

/* ==========================================================================
   7. LIVE PURCHASE NOTIFICATION TOASTS & ONLINE COUNTER
   ========================================================================== */
function initLivePurchaseToasts() {
    const toast = document.getElementById('live-toast');
    const toastUser = document.getElementById('toast-user');
    const toastItem = document.getElementById('toast-item');
    const onlineEl = document.getElementById('online-count');

    let i = 0;
    setInterval(() => {
        const events = SITE_DATA.toasts && SITE_DATA.toasts.length ? SITE_DATA.toasts : DEFAULT_SITE_DATA.toasts;
        if (!toast || !events.length) return;
        const ev = events[i % events.length];
        toastUser.textContent = ev.user;
        toastItem.textContent = ev.item;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4200);

        if (onlineEl) {
            const base = Number((SITE_DATA.general && SITE_DATA.general.onlineCount) || 840);
            const delta = Math.floor(Math.random() * 25) - 10;
            onlineEl.textContent = base + delta;
        }
        i++;
    }, 8500);
}

/* ==========================================================================
   8. FAQ ACCORDION & COPY BOT USERNAME
   ========================================================================== */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
        const btn = item.querySelector('.faq-question');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            faqItems.forEach((el) => el.classList.remove('active'));
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });
}

window.copyBotUsername = function() {
    const username = (SITE_DATA.general && SITE_DATA.general.botUsername) || '@arzonnomeruzbbot';
    navigator.clipboard.writeText(username);
    const txt = document.getElementById('copy-btn-text');
    if (txt) {
        txt.textContent = `✅ ${username} nusxalandi!`;
        setTimeout(() => {
            txt.textContent = `${username} nusxalash`;
        }, 2500);
    }
};
