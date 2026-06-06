// ==========================================
// INTERACTIVE GIFT PRESENTATION - APP LOGIC
// ==========================================

// Default Configuration values (Expanded to 15 slots)
const DEFAULTS = {
    partnerName: "My Sweetheart",
    senderName: "Your Partner",
    anniversaryDate: "2025-12-06T00:00:00",
    themePrimaryColor: "#fe2c55",
    themeAccentColor: "#a82245",
    themeGradient: "pink-blossom",
    letterText: "Dear Love,\n\nI can't believe how time flies. Every single moment spent with you is a cherishable memory. You bring so much light and joy into my world. Thank you for being my support, my laughter, and my favorite place to be.\n\nI will choose you over and over, without a doubt. Happy Monthsary! I love you to the moon and back.",
    storyText: "Dear Love,\n\nI can't believe how time flies. Every single moment spent with you is a cherishable memory. You bring so much light and joy into my world. Thank you for being my support, my laughter, and my favorite place to be.\n\nI will choose you over and over, without a doubt.",
    songTitle: "Earrings",
    songArtist: "Malcolm Todd",
    songUrl: "https://www.youtube.com/watch?v=iu70iC7yFts",
    lyrics: `[0] 🎵 Playing Malcolm Todd - Earrings... 🎵
[10] Her love is in your head
[14] You lost your earrings in her bed
[17] You couldn't tell her that you lost 'em
[21] 'Cause you're scared and you're not talking
[24] So you think of what to say
[28] Then save it for another day
[31] 'Cause you just never had the heart
[35] Now they just drift further apart
[39] From you, oh...
[46] From you, oh...
[53] Her love is in your head
[57] You lost your earrings in her bed
[60] You couldn't tell her that you lost 'em
[64] 'Cause you're scared and you're not talking
[67] So you think of what to say
[71] Then save it for another day
[74] 'Cause you just never had the heart
[78] Now they just drift further apart
[82] Extra, extra, read all about it
[86] Malcolm's in his feelings and he can't get out of it
[90] Extra, extra, read all about it
[94] Malcolm's in his feelings and he can't get out of it`,
    quizQuestion: "Do you love me?",
    scratchMessage: "I always love you.\nI always choose you.\nI will always care for you.",
    photos: [
        { url: "assets/romantic_bg.png", caption: "Slide 1: Title Screen Background" },
        { url: "assets/uploaded_70af1a28482c9473ecd80b20dfe07efa.jpg", caption: "Slide 2: Letter - Left Photo 💋" },
        { url: "assets/uploaded_8f5484fd1f3fe3b6d54ce784f3b4fbdc.jpg", caption: "Slide 2: Letter - Right Photo 💐" },
        { url: "assets/uploaded_fc1d39eacc4f034b104a1ade4145ed64.jpg", caption: "Night walk together 🌙" },
        { url: "assets/uploaded_70af1a28482c9473ecd80b20dfe07efa.jpg", caption: "Sweet kisses 💋" },
        { url: "assets/uploaded_9b896d2d1f3489bf91766e91ef0fcea5.jpg", caption: "Cozy moments 💕" },
        { url: "assets/uploaded_136f25fc6caa6c4f1bb96aa653e3b60b.jpg", caption: "Date vibes ✨" },
        { url: "assets/uploaded_4097552dca5411279fa6672c6f8b5674.jpg", caption: "Always smiling 😊" },
        { url: "assets/uploaded_8f5484fd1f3fe3b6d54ce784f3b4fbdc.jpg", caption: "Flowers for you 🌸" },
        { url: "assets/uploaded_fc1d39eacc4f034b104a1ade4145ed64.jpg", caption: "Us at night 🌃" },
        { url: "assets/uploaded_136f25fc6caa6c4f1bb96aa653e3b60b.jpg", caption: "Slide 4: Filmstrip - Photo 1" },
        { url: "assets/uploaded_4097552dca5411279fa6672c6f8b5674.jpg", caption: "Slide 4: Filmstrip - Photo 2" },
        { url: "assets/uploaded_9b896d2d1f3489bf91766e91ef0fcea5.jpg", caption: "Slide 5: Scrapbook Polaroid 💑" },
        { url: "assets/uploaded_70af1a28482c9473ecd80b20dfe07efa.jpg", caption: "Slide 6: Song Cover / Media Photo" },
        { url: "assets/uploaded_8f5484fd1f3fe3b6d54ce784f3b4fbdc.jpg", caption: "Slide 7: Bonus Memory 💖" }
    ],
    coupons: [
        { title: "FREE HUG COUPON", desc: "Good for one long warm hug whenever you need it." },
        { title: "COFFEE DATE COUPON", desc: "I buy you coffee and sweet treats at your favorite spot." },
        { title: "MOVIE NIGHT SELECTION", desc: "You pick the movie, I get the popcorn. No objections!" }
    ],
    slideBgs: ["", "", "", "", "", "", ""]
};

const DEFAULT_AUDIO_FALLBACK = "https://assets.codepen.io/4358584/Anitek_-_01_-_Kisses.mp3";

// Photo Labels mapping for readable customizer drawer inputs
const PHOTO_LABELS = [
    "Slide 1: Title Page Blurred Couple Background Photo",
    "Slide 2: Letter Page - Left Rounded Photo",
    "Slide 2: Letter Page - Right Rounded Photo",
    "Slide 3: Collage Polaroid #1",
    "Slide 3: Collage Polaroid #2",
    "Slide 3: Collage Polaroid #3",
    "Slide 3: Collage Polaroid #4",
    "Slide 3: Collage Polaroid #5",
    "Slide 3: Collage Polaroid #6",
    "Slide 3: Collage Polaroid #7",
    "Slide 4: Filmstrip Page - Left Reel Photo",
    "Slide 4: Filmstrip Page - Right Reel Photo",
    "Slide 5: Scrapbook Page - Left Taped Polaroid Photo",
    "Slide 6: Music Page - Right Video / Cover Art Photo",
    "Slide 7: Interactive Page - Countdown Widget Photo"
];

// Global configuration state
let config = {};
let parsedLyrics = [];
let isMusicSlideVisible = false;
let ytPlayer = null;
let ytInterval = null;

// Shortened keys maps to reduce Base64 URL length
const KEY_MAP = {
    partnerName: 'pn',
    senderName: 'sn',
    anniversaryDate: 'ad',
    themePrimaryColor: 'pc',
    themeAccentColor: 'ac',
    themeGradient: 'tg',
    letterText: 'lt',
    storyText: 'ot',
    songTitle: 'st',
    songArtist: 'sa',
    songUrl: 'su',
    lyrics: 'ly',
    quizQuestion: 'qq',
    scratchMessage: 'sm',
    photos: 'pt',
    coupons: 'cp',
    slideBgs: 'bg'
};

const PHOTO_MAP = { url: 'u', caption: 'c' };
const COUPON_MAP = { title: 't', desc: 'd' };

function compressConfig(rawConfig) {
    const compressed = {};
    for (let key in KEY_MAP) {
        const shortKey = KEY_MAP[key];
        if (rawConfig[key] !== undefined) {
            if (key === 'photos') {
                compressed[shortKey] = rawConfig.photos.map(p => ({
                    [PHOTO_MAP.url]: p.url,
                    [PHOTO_MAP.caption]: p.caption
                }));
            } else if (key === 'coupons') {
                compressed[shortKey] = rawConfig.coupons.map(c => ({
                    [COUPON_MAP.title]: c.title,
                    [COUPON_MAP.desc]: c.desc
                }));
            } else {
                compressed[shortKey] = rawConfig[key];
            }
        }
    }
    return compressed;
}

function decompressConfig(compressed) {
    const decompressed = {};
    const revKeyMap = Object.fromEntries(Object.entries(KEY_MAP).map(([k, v]) => [v, k]));
    
    for (let shortKey in compressed) {
        const key = revKeyMap[shortKey];
        if (key) {
            if (key === 'photos') {
                decompressed.photos = compressed[shortKey].map(p => ({
                    url: p[PHOTO_MAP.url] || '',
                    caption: p[PHOTO_MAP.caption] || ''
                }));
            } else if (key === 'coupons') {
                decompressed.coupons = compressed[shortKey].map(c => ({
                    title: c[COUPON_MAP.title] || '',
                    desc: c[COUPON_MAP.desc] || ''
                }));
            } else {
                decompressed[key] = compressed[shortKey];
            }
        }
    }
    return decompressed;
}

// ==========================================
// CONFIGURATION ENGINE (URL & STORAGE)
// ==========================================

// Migrate base64 data URLs to physical asset paths
function migrateBase64ToAssets() {
    if (config.photos) {
        for (let i = 0; i < config.photos.length; i++) {
            if (config.photos[i].url && config.photos[i].url.startsWith('data:image/')) {
                // Replace with the default photo for this slot
                config.photos[i].url = DEFAULTS.photos[i % DEFAULTS.photos.length].url;
            }
        }
    }
    if (config.slideBgs) {
        for (let i = 0; i < config.slideBgs.length; i++) {
            if (config.slideBgs[i] && config.slideBgs[i].startsWith('data:image/')) {
                config.slideBgs[i] = '';
            }
        }
    }
}

function initConfiguration() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedConfig = urlParams.get('c');

    if (encodedConfig) {
        try {
            const sanitized = encodedConfig.replace(/ /g, '+');
            const jsonString = decodeURIComponent(escape(atob(sanitized)));
            const parsed = JSON.parse(jsonString);
            
            if (parsed.pn || parsed.sn || parsed.lt) {
                config = decompressConfig(parsed);
            } else {
                config = parsed;
            }
            console.log("Loaded configuration from URL query:", config);
        } catch (e) {
            console.error("Failed to decode configuration from URL:", e);
            loadFromLocalStorage();
        }
    } else {
        loadFromLocalStorage();
    }

    // Fallback logic for old URL configurations without separate story text
    if (config.letterText && config.storyText === undefined) {
        config.storyText = config.letterText;
    }

    config = { ...DEFAULTS, ...config };

    // Keep browser-uploaded base64 images intact on reload
    // migrateBase64ToAssets();
    
    // Auto-migrate if the config contains old default song, restricted official song, or search page links
    if (config.songUrl.includes("dQw4w9WgXcQ") || 
        config.songUrl.includes("a4tdS3IB294") || 
        config.songUrl.includes("search_query") || 
        !config.songUrl) {
        config.songUrl = DEFAULTS.songUrl;
        config.songTitle = DEFAULTS.songTitle;
        config.songArtist = DEFAULTS.songArtist;
        config.lyrics = DEFAULTS.lyrics;
        localStorage.setItem('love_site_config', JSON.stringify(config));
        
        // Update URL query parameters in address bar if loaded from an old share link
        if (encodedConfig) {
            try {
                const compressed = compressConfig(config);
                const jsonStr = JSON.stringify(compressed);
                const base64Str = btoa(unescape(encodeURIComponent(jsonStr)));
                const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?c=${base64Str}`;
                window.history.replaceState({path: newUrl}, '', newUrl);
            } catch (e) {
                console.error("Failed to update URL after migration:", e);
        }
    }
    
    // Auto-migrate old scratch message to the new custom text
    if (config.scratchMessage === "You hold the key to my heart. Let's go on a special date this weekend!" || 
        config.scratchMessage === "It's never been a secret that I love you always, no matter what happens!") {
        config.scratchMessage = DEFAULTS.scratchMessage;
        localStorage.setItem('love_site_config', JSON.stringify(config));
    }
    
    // Pad photos to exactly 15 elements for template mapping
    if (!config.photos) config.photos = [];
    while (config.photos.length < 15) {
        const nextIdx = config.photos.length;
        config.photos.push({
            url: DEFAULTS.photos[nextIdx % DEFAULTS.photos.length].url,
            caption: DEFAULTS.photos[nextIdx % DEFAULTS.photos.length].caption
        });
    }

    // Pad slide backgrounds to 7 elements
    if (!config.slideBgs) config.slideBgs = ["", "", "", "", "", "", ""];
    while (config.slideBgs.length < 7) {
        config.slideBgs.push("");
    }
    
    if (!config.coupons) config.coupons = [...DEFAULTS.coupons];
    
    updateUIWithConfig();
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('love_site_config');
    if (saved) {
        try {
            config = JSON.parse(saved);
            console.log("Loaded configuration from localStorage:", config);
        } catch (e) {
            console.error("Failed to parse localStorage configuration:", e);
            config = {};
        }
    }
}

function applyThemeSettings(config) {
    const primaryColor = config.themePrimaryColor || '#fe2c55';
    const accentColor = config.themeAccentColor || '#a82245';
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--accent-color', accentColor);
    
    const hoverColor = adjustColorBrightness(primaryColor, -15);
    document.documentElement.style.setProperty('--primary-hover', hoverColor);
    
    let gradientValue = 'linear-gradient(135deg, #fff0f6 0%, #ffe3ec 50%, #f0f0ff 100%)';
    const theme = config.themeGradient || 'pink-blossom';
    
    if (theme === 'lofi-sunset') {
        gradientValue = 'linear-gradient(135deg, #ffd3b6 0%, #ffaaa5 50%, #dcedc1 100%)';
        applyLightStyles();
    } else if (theme === 'lavender-field') {
        gradientValue = 'linear-gradient(135deg, #e2d4f7 0%, #c4d9f9 50%, #d4f7e6 100%)';
        applyLightStyles();
    } else if (theme === 'cozy-night') {
        gradientValue = 'linear-gradient(135deg, #10061e 0%, #1e1335 50%, #0d283d 100%)';
        applyDarkStyles();
    } else {
        applyLightStyles();
    }
    
    document.documentElement.style.setProperty('--bg-gradient', gradientValue);
}

function applyLightStyles() {
    document.documentElement.style.setProperty('--text-main', '#3d1b24');
    document.documentElement.style.setProperty('--text-sub', '#7a5c65');
    document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.75)');
    document.documentElement.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.6)');
    document.documentElement.style.setProperty('--glass-shadow', '0 8px 32px 0 rgba(254, 44, 85, 0.08)');
}

function applyDarkStyles() {
    document.documentElement.style.setProperty('--text-main', '#fceef2');
    document.documentElement.style.setProperty('--text-sub', '#c9afb6');
    document.documentElement.style.setProperty('--card-bg', 'rgba(22, 13, 33, 0.8)');
    document.documentElement.style.setProperty('--card-border', 'rgba(254, 44, 85, 0.2)');
    document.documentElement.style.setProperty('--glass-shadow', '0 8px 32px 0 rgba(0, 0, 0, 0.4)');
}

function adjustColorBrightness(hex, percent) {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);
    
    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);
    
    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;
    
    R = (R > 0) ? R : 0;
    G = (G > 0) ? G : 0;
    B = (B > 0) ? B : 0;
    
    const rHex = R.toString(16).padStart(2, '0');
    const gHex = G.toString(16).padStart(2, '0');
    const bHex = B.toString(16).padStart(2, '0');
    
    return `#${rHex}${gHex}${bHex}`;
}

// Helper to extract YouTube video ID from URL
function getYouTubeId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Helpers for relationship duration calculations
function getMonthsTogether(startDateStr) {
    const target = new Date(startDateStr);
    const now = new Date();
    
    let diffMonths = (now.getFullYear() - target.getFullYear()) * 12 + (now.getMonth() - target.getMonth());
    
    if (now < target) return 0;
    
    if (now.getDate() < target.getDate()) {
        const lastDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const isLastDay = now.getDate() === lastDayOfCurrentMonth;
        
        if (!isLastDay) {
            const dayDiff = target.getDate() - now.getDate();
            if (dayDiff > 2) {
                diffMonths--;
            }
        }
    }
    return diffMonths;
}

function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Helper to apply dynamic slide backgrounds (Color, Gradient, or Image)
function applySlideBackground(elementId, bgValue) {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    el.style.background = '';
    el.style.backgroundSize = '';
    
    if (!bgValue) return;
    
    const val = bgValue.trim();
    if (val.startsWith('#') || val.startsWith('rgb') || val.startsWith('hsl') || val.includes('gradient')) {
        el.style.background = val;
    } else {
        // Fallback overlay to maintain text contrast
        el.style.background = `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('${val}') no-repeat center center`;
        el.style.backgroundSize = 'cover';
    }
}

function compressAndLoadImage(file, callback) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            const maxDim = 200;
            
            if (width > height) {
                if (width > maxDim) {
                    height = Math.round((height * maxDim) / width);
                    width = maxDim;
                }
            } else {
                if (height > maxDim) {
                    width = Math.round((width * maxDim) / height);
                    height = maxDim;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            const dataUrl = canvas.toDataURL('image/jpeg', 0.55);
            callback(dataUrl);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function updateUIWithConfig() {
    applyThemeSettings(config);

    document.title = `For ${config.partnerName} 💌`;

    // Dynamic relationship greets
    const monthsCount = getMonthsTogether(config.anniversaryDate);
    const dynamicGreeting = monthsCount > 0 ? `Happy ${getOrdinal(monthsCount)} Monthsary, My Love!` : "Happy Monthsary, My Love!";
    document.getElementById('slide-title-greeting').innerText = dynamicGreeting;

    const collageTitleStr = monthsCount > 0 ? `Our ${monthsCount} Months Together` : "Our Months Together";
    document.getElementById('collage-slide-title').innerText = collageTitleStr;

    // Apply slide custom backgrounds
    const bgBlurDiv = document.getElementById('title-bg-img');
    if (config.slideBgs[0]) {
        applySlideBackground('slide-pane-1', config.slideBgs[0]);
        if (bgBlurDiv) bgBlurDiv.style.display = 'none';
    } else {
        if (bgBlurDiv) {
            bgBlurDiv.style.display = 'block';
            if (config.photos[0] && config.photos[0].url) {
                bgBlurDiv.style.backgroundImage = `url('${config.photos[0].url}')`;
            }
        }
        applySlideBackground('slide-pane-1', '');
    }

    applySlideBackground('slide-pane-2', config.slideBgs[1]);
    applySlideBackground('slide-pane-3', config.slideBgs[2]);
    applySlideBackground('slide-pane-4', config.slideBgs[3]);
    applySlideBackground('slide-pane-5', config.slideBgs[4]);
    applySlideBackground('slide-pane-6', config.slideBgs[5]);
    applySlideBackground('slide-pane-7', config.slideBgs[6]);

    // Slide 2 Letter Card Flanking Photos
    const letterImgLeft = document.getElementById('letter-img-left');
    const letterImgRight = document.getElementById('letter-img-right');
    if (letterImgLeft) letterImgLeft.src = config.photos[1].url;
    if (letterImgRight) letterImgRight.src = config.photos[2].url;
    
    // Add lightbox events on letter photos
    letterImgLeft.onclick = () => openLightbox(config.photos[1].url, config.photos[1].caption);
    letterImgRight.onclick = () => openLightbox(config.photos[2].url, config.photos[2].caption);

    document.getElementById('letter-center-text').innerHTML = config.letterText.replace(/\n/g, '<br>');

    // Slide 3 Collage polaroids connected to the SVG path
    const collageContainer = document.getElementById('collage-polaroids-container');
    collageContainer.querySelectorAll('.collage-polaroid-absolute').forEach(el => el.remove());

    for (let i = 0; i < 7; i++) {
        const photo = config.photos[i + 3];
        if (!photo || !photo.url) continue;
        
        const polaroidDiv = document.createElement('div');
        polaroidDiv.className = `collage-polaroid-absolute cp-${i}`;
        polaroidDiv.innerHTML = `
            <div class="collage-img-wrapper">
                <img src="${photo.url}" alt="${photo.caption || 'Memory'}">
            </div>
            <div class="collage-caption">${photo.caption || 'Our Memory'}</div>
        `;
        
        polaroidDiv.addEventListener('click', () => openLightbox(photo.url, photo.caption));
        collageContainer.appendChild(polaroidDiv);
    }

    // Slide 4 Filmstrip photos
    const filmstripImg1 = document.getElementById('filmstrip-img-1');
    const filmstripImg2 = document.getElementById('filmstrip-img-2');
    if (filmstripImg1) filmstripImg1.src = config.photos[10].url;
    if (filmstripImg2) filmstripImg2.src = config.photos[11].url;
    
    document.getElementById('filmstrip-frame-1').onclick = () => openLightbox(config.photos[10].url, config.photos[10].caption);
    document.getElementById('filmstrip-frame-2').onclick = () => openLightbox(config.photos[11].url, config.photos[11].caption);

    // Slide 5 Scrapbook Polaroid & Letter
    const scrapbookImg = document.getElementById('scrapbook-polaroid-img');
    const scrapbookCap = document.getElementById('scrapbook-polaroid-caption');
    const scrapbookText = document.getElementById('scrapbook-letter-text');
    
    if (scrapbookImg) scrapbookImg.src = config.photos[12].url;
    if (scrapbookCap) scrapbookCap.innerText = config.photos[12].caption || "You and Me 💑";
    if (scrapbookText) scrapbookText.innerHTML = (config.storyText || config.letterText || '').replace(/\n/g, '<br>');

    scrapbookImg.onclick = () => openLightbox(config.photos[12].url, config.photos[12].caption);

    // Slide 6 Music Center Label & Video Container
    const slideVinylCenter = document.getElementById('slide-vinyl-center');
    if (slideVinylCenter) {
        slideVinylCenter.style.backgroundImage = `url('${config.photos[13].url || DEFAULTS.photos[13].url}')`;
    }

    const videoContainer = document.getElementById('video-card-container');
    videoContainer.innerHTML = '';
    
    const ytId = getYouTubeId(config.songUrl);
    if (ytId) {
        videoContainer.innerHTML = `
            <div id="yt-player-placeholder"></div>
        `;
        
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            
            window.onYouTubeIframeAPIReady = function() {
                initYTPlayer(ytId);
            };
        } else if (window.YT && window.YT.Player) {
            initYTPlayer(ytId);
        } else {
            const checkYT = setInterval(() => {
                if (window.YT && window.YT.Player) {
                    clearInterval(checkYT);
                    initYTPlayer(ytId);
                }
            }, 100);
        }
    } else {
        const coverUrl = config.photos[13].url || DEFAULTS.photos[13].url;
        videoContainer.innerHTML = `
            <div class="video-cover-card" style="background-image: url('${coverUrl}')">
                <div class="video-play-overlay">
                    <div class="video-play-btn-circle">
                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                </div>
            </div>
        `;
        videoContainer.querySelector('.video-cover-card').onclick = togglePlayPause;
    }

    // Load music player audio elements
    const audio = document.getElementById('bg-music');
    audio.src = ytId ? DEFAULT_AUDIO_FALLBACK : (config.songUrl || DEFAULT_AUDIO_FALLBACK);

    // Slide 7 Surprises
    document.getElementById('quiz-title').innerText = config.quizQuestion;
    document.getElementById('scratch-secret-text').innerText = config.scratchMessage;
    setupScratchCard();

    // Coupons Box
    const couponsList = document.getElementById('coupons-list');
    couponsList.innerHTML = '';
    config.coupons.forEach((coupon, idx) => {
        const item = document.createElement('div');
        item.className = 'coupon-item';
        item.innerHTML = `
            <div class="coupon-header">${coupon.title}</div>
            <div class="coupon-body">${coupon.desc}</div>
            <button class="btn-redeem" data-coupon="${idx}">Redeem Coupon</button>
        `;
        couponsList.appendChild(item);
    });

    // Populate Customizer fields
    document.getElementById('cfg-partner-name').value = config.partnerName;
    document.getElementById('cfg-sender-name').value = config.senderName;
    document.getElementById('cfg-anniversary-date').value = config.anniversaryDate;
    document.getElementById('cfg-primary-color').value = config.themePrimaryColor || DEFAULTS.themePrimaryColor;
    document.getElementById('cfg-accent-color').value = config.themeAccentColor || DEFAULTS.themeAccentColor;
    document.getElementById('cfg-bg-gradient').value = config.themeGradient || DEFAULTS.themeGradient;
    document.getElementById('cfg-letter-text').value = config.letterText;
    document.getElementById('cfg-story-text').value = config.storyText || '';
    document.getElementById('cfg-song-title').value = config.songTitle;
    document.getElementById('cfg-song-artist').value = config.songArtist;
    document.getElementById('cfg-song-url').value = config.songUrl;
    document.getElementById('cfg-lyrics-text').value = config.lyrics;
    document.getElementById('quiz-title').innerText = config.quizQuestion;
    document.getElementById('cfg-quiz-question').value = config.quizQuestion;
    document.getElementById('cfg-scratch-message').value = config.scratchMessage;

    // Pre-populate background fields
    document.getElementById('cfg-bg-slide1').value = config.slideBgs[0] || '';
    document.getElementById('cfg-bg-slide2').value = config.slideBgs[1] || '';
    document.getElementById('cfg-bg-slide3').value = config.slideBgs[2] || '';
    document.getElementById('cfg-bg-slide4').value = config.slideBgs[3] || '';
    document.getElementById('cfg-bg-slide5').value = config.slideBgs[4] || '';
    document.getElementById('cfg-bg-slide6').value = config.slideBgs[5] || '';
    document.getElementById('cfg-bg-slide7').value = config.slideBgs[6] || '';

    renderSettingsPhotosList();
    renderSettingsCouponsList();

    parsedLyrics = parseLyrics(config.lyrics);
    validateSongUrl();
}

// ==========================================
// RELATIONSHIP TIMER LOGIC
// ==========================================

let timerInterval;

function startAnniversaryTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    const targetDateStr = config.anniversaryDate;
    
    function updateTimer() {
        const now = new Date();
        const target = new Date(targetDateStr);
        
        let diffMs = now - target;
        
        if (diffMs < 0) {
            diffMs = Math.abs(diffMs);
            document.querySelector('.counter-label').innerText = "Countdown to our anniversary";
        } else {
            document.querySelector('.counter-label').innerText = "Days we've been together";
        }
        
        const seconds = Math.floor((diffMs / 1000) % 60);
        const minutes = Math.floor((diffMs / 1000 / 60) % 60);
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        document.getElementById('counter-days').innerText = String(days).padStart(2, '0');
        document.getElementById('counter-hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('counter-minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('counter-seconds').innerText = String(seconds).padStart(2, '0');
    }
    
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

// ==========================================
// ENVELOPE GATE MANAGEMENT
// ==========================================

function setupEnvelopeGate() {
    const gate = document.getElementById('envelope-gate');
    const envelope = document.querySelector('.envelope-wrapper');
    const audio = document.getElementById('bg-music');

    envelope.addEventListener('click', function(e) {
        if (envelope.classList.contains('open')) return;
        
        envelope.classList.add('open');
        
        audio.play().then(() => {
            setPlayState(true);
        }).catch(err => {
            console.warn("Autoplay blocked. Waiting for user interaction.", err);
        });

        triggerConfetti(window.innerWidth / 2, window.innerHeight / 2 + 100);

        setTimeout(() => {
            gate.classList.add('hidden');
            document.getElementById('main-content').style.display = 'block';
            setupMusicSlideVisibilityObserver(); 
        }, 1600);
    });
}

// ==========================================
// AUDIO PLAYBACK MANAGEMENT
// ==========================================

function initYTPlayer(ytId) {
    if (ytPlayer) {
        try {
            ytPlayer.destroy();
        } catch (e) {}
        ytPlayer = null;
    }
    
    // Set origin parameter dynamically to bypass file:// protocol block on YouTube embeds
    const originUrl = window.location.protocol === 'file:' ? 'https://www.youtube.com' : window.location.origin;
    
    ytPlayer = new YT.Player('yt-player-placeholder', {
        height: '100%',
        width: '100%',
        videoId: ytId,
        playerVars: {
            'playsinline': 1,
            'enablejsapi': 1,
            'autoplay': 0,
            'controls': 1,
            'origin': originUrl
        },
        events: {
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === window.YT.PlayerState.PLAYING) {
        setPlayState(true);
        const audio = document.getElementById('bg-music');
        audio.pause();
        
        if (ytInterval) clearInterval(ytInterval);
        ytInterval = setInterval(updateLyricsSyncYT, 250);
    } else {
        setPlayState(false);
        if (ytInterval) {
            clearInterval(ytInterval);
            ytInterval = null;
        }
    }
}

function onPlayerError(event) {
    console.warn("YouTube Player error occurred:", event.data);
    
    // Auto fallback to default background audio so it still plays
    const audio = document.getElementById('bg-music');
    if (audio.src !== DEFAULT_AUDIO_FALLBACK) {
        audio.src = DEFAULT_AUDIO_FALLBACK;
        audio.load();
        audio.play().then(() => {
            setPlayState(true);
        }).catch(err => console.log("Fallback play failed:", err));
    }
    
    // Show a cute overlay on top of the video container letting the user know
    const videoContainer = document.getElementById('video-card-container');
    const ytUrl = config.songUrl;
    
    const overlay = document.createElement('div');
    overlay.className = 'yt-error-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(20, 10, 15, 0.95)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.color = '#fff';
    overlay.style.padding = '20px';
    overlay.style.textAlign = 'center';
    overlay.style.zIndex = '10';
    overlay.style.borderRadius = '12px';
    
    let errorMsg = "This video cannot be played here.";
    if (event.data === 101 || event.data === 150) {
        errorMsg = "The owner of this video has disabled embedding on external websites.";
    } else if (event.data === 100) {
        errorMsg = "This YouTube video was not found or is set to private.";
    }
    
    overlay.innerHTML = `
        <span style="font-size: 2.2rem; margin-bottom: 12px;">⚠️</span>
        <h4 style="margin: 0 0 8px 0; font-family: var(--font-heading); color: var(--primary-color); font-size: 0.95rem; font-weight: 700;">Embedding Restricted</h4>
        <p style="margin: 0 0 15px 0; font-size: 0.78rem; line-height: 1.4; opacity: 0.95;">${errorMsg}</p>
        <a href="${ytUrl}" target="_blank" class="btn btn-export" style="margin: 0; padding: 6px 12px; font-size: 0.75rem; width: auto; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; border-radius: 6px;">📺 Watch on YouTube</a>
    `;
    
    videoContainer.appendChild(overlay);
}

function updateLyricsSyncYT() {
    if (!ytPlayer || typeof ytPlayer.getCurrentTime !== 'function') return;
    const currentTime = ytPlayer.getCurrentTime();
    
    let activeIndex = -1;
    for (let i = 0; i < parsedLyrics.length; i++) {
        if (currentTime >= parsedLyrics[i].time) {
            activeIndex = i;
        } else {
            break;
        }
    }
    
    const lyricsDisplay = document.getElementById('slide-lyrics-display');
    if (lyricsDisplay && activeIndex !== -1) {
        lyricsDisplay.innerText = parsedLyrics[activeIndex].text;
    }
}

function togglePlayPause() {
    const ytId = getYouTubeId(config.songUrl);
    if (ytId && ytPlayer && typeof ytPlayer.playVideo === 'function') {
        const state = ytPlayer.getPlayerState();
        if (state === window.YT.PlayerState.PLAYING) {
            ytPlayer.pauseVideo();
            setPlayState(false);
        } else {
            const audio = document.getElementById('bg-music');
            audio.pause();
            
            ytPlayer.playVideo();
            setPlayState(true);
        }
    } else {
        const audio = document.getElementById('bg-music');
        if (audio.paused) {
            audio.play().then(() => setPlayState(true)).catch(err => console.log("Play interrupted:", err));
        } else {
            audio.pause();
            setPlayState(false);
        }
    }
}

function setPlayState(isPlaying) {
    const record = document.getElementById('slide-vinyl-record');
    const needle = document.getElementById('slide-vinyl-needle');

    if (isPlaying) {
        if (record) record.classList.add('playing');
        if (needle) needle.classList.add('playing');
    } else {
        if (record) record.classList.remove('playing');
        if (needle) needle.classList.remove('playing');
    }
}

function setupMusicPlayer() {
    const audio = document.getElementById('bg-music');
    
    const slideVinyl = document.getElementById('slide-vinyl-record');
    if (slideVinyl) slideVinyl.onclick = togglePlayPause;

    audio.addEventListener('play', () => setPlayState(true));
    audio.addEventListener('pause', () => setPlayState(false));
    audio.addEventListener('timeupdate', updateLyricsSync);
    
    audio.addEventListener('error', function(e) {
        console.warn("Audio loading failed. Falling back to default audio.", e);
        if (audio.src !== DEFAULT_AUDIO_FALLBACK) {
            audio.src = DEFAULT_AUDIO_FALLBACK;
            audio.load();
            audio.play().then(() => {
                setPlayState(true);
            }).catch(err => console.log("Fallback play failed:", err));
        }
    });
}

function validateSongUrl() {
    const songUrlInput = document.getElementById('cfg-song-url');
    const songUrlWarning = document.getElementById('cfg-song-url-warning');
    if (!songUrlInput || !songUrlWarning) return;

    const url = songUrlInput.value.trim();
    if (!url) {
        songUrlWarning.style.display = 'none';
        return;
    }
    
    const isYt = url.includes('youtube.com') || url.includes('youtu.be');
    const isYtWatch = isYt && (url.includes('watch?v=') || url.includes('embed/') || url.includes('youtu.be/'));
    const isDirectAudio = url.match(/\.(mp3|wav|ogg|m4a|aac)(\?|$)/i);
    
    if (isYt && !isYtWatch) {
        songUrlWarning.innerText = "⚠️ Please use a YouTube Watch link (e.g. youtube.com/watch?v=...) rather than a search results link.";
        songUrlWarning.style.display = 'block';
    } else if (!isYt && !isDirectAudio && !url.startsWith('assets/')) {
        songUrlWarning.innerText = "⚠️ Ensure this link points directly to a music file (e.g. ending in .mp3) so it can play.";
        songUrlWarning.style.display = 'block';
    } else {
        songUrlWarning.style.display = 'none';
    }
}

function parseLyrics(lyricsText) {
    if (!lyricsText) return [];
    
    const lines = lyricsText.split('\n');
    const result = [];
    const timeReg = /\[(\d+):?(\d+)?\]/;
    
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        const match = timeReg.exec(line);
        if (match) {
            let seconds = 0;
            if (match[2] !== undefined) {
                seconds = parseInt(match[1]) * 60 + parseInt(match[2]);
            } else {
                seconds = parseInt(match[1]);
            }
            const text = line.replace(match[0], '').trim();
            result.push({ time: seconds, text });
        }
    }
    
    return result.sort((a, b) => a.time - b.time);
}

function updateLyricsSync() {
    const audio = document.getElementById('bg-music');
    const currentTime = audio.currentTime;
    
    let activeIndex = -1;
    for (let i = 0; i < parsedLyrics.length; i++) {
        if (currentTime >= parsedLyrics[i].time) {
            activeIndex = i;
        } else {
            break;
        }
    }
    
    const lyricsDisplay = document.getElementById('slide-lyrics-display');
    if (lyricsDisplay && activeIndex !== -1) {
        lyricsDisplay.innerText = parsedLyrics[activeIndex].text;
    }
}

// ==========================================
// VERTICAL SCROLL VIEWPORT OBSERVER
// ==========================================

function setupMusicSlideVisibilityObserver() {
    const target = document.getElementById('slide-pane-6');
    if (!target) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isMusicSlideVisible = entry.isIntersecting;
        });
    }, { threshold: 0.35 });
    
    observer.observe(target);
}

// ==========================================
// PORTABLE POLAROID LIGHTBOX MODAL
// ==========================================

function openLightbox(url, caption) {
    if (!url) return;
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 50);
    
    img.src = url;
    cap.innerText = caption || '';
}

function setupLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.querySelector('.lightbox-close');

    closeBtn.addEventListener('click', closeLightbox);
    modal.addEventListener('click', e => {
        if (e.target === modal) closeLightbox();
    });

    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
}

// ==========================================
// RUNAWAY BUTTON PHYSICS (QUIZ WIDGET)
// ==========================================

function setupRunawayButton() {
    const card = document.querySelector('.love-quiz-card');
    const container = document.getElementById('quiz-buttons-container');
    const noBtn = document.getElementById('quiz-no');
    const yesBtn = document.getElementById('quiz-yes');
    const successMsg = document.getElementById('quiz-success-msg');
    const quizTitle = document.getElementById('quiz-title');

    yesBtn.addEventListener('click', function() {
        container.classList.add('hidden');
        quizTitle.classList.add('hidden');
        successMsg.classList.remove('hidden');
        triggerConfetti(window.innerWidth / 2, window.innerHeight / 2);
    });

    noBtn.addEventListener('mouseover', runaway);
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        runaway();
    });

    function runaway() {
        const cardRect = card.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        noBtn.style.position = 'absolute';

        const maxX = cardRect.width - btnRect.width - 40;
        const maxY = cardRect.height - btnRect.height - 80;

        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(40, Math.floor(Math.random() * maxY));

        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    }
}

// ==========================================
// CANVAS SCRATCH CARD NOTES
// ==========================================

function setupScratchCard() {
    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    function resetScratch() {
        canvas.style.display = 'block';
        canvas.style.opacity = '1';
        
        ctx.globalCompositeOperation = 'source-over';
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#d6d6d6');
        gradient.addColorStop(0.5, '#eaeaea');
        gradient.addColorStop(1, '#c0c0c0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(254,44,85,0.4)';
        ctx.lineWidth = 4;
        ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
        
        ctx.fillStyle = '#6b4d57';
        ctx.font = 'bold 15px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Scratch with Love 💖', canvas.width / 2, canvas.height / 2 + 5);
    }

    if (canvas.getAttribute('data-initialized') === 'true') {
        resetScratch();
        return;
    }
    canvas.setAttribute('data-initialized', 'true');

    resetScratch();

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        scratch(e);
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        scratch(e);
    }

    function stopDrawing() {
        isDrawing = false;
        checkScratchPercentage();
    }

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        return {
            x: (clientX - rect.left) * (canvas.width / rect.width),
            y: (clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    function scratch(e) {
        const pos = getMousePos(e);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2);
        ctx.fill();
    }

    function checkScratchPercentage() {
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let transparent = 0;
        
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) {
                transparent++;
            }
        }
        
        const total = pixels.length / 4;
        const percent = (transparent / total) * 100;
        
        if (percent > 45) {
            canvas.style.transition = 'opacity 0.6s ease';
            canvas.style.opacity = '0';
            setTimeout(() => {
                canvas.style.display = 'none';
            }, 600);
        }
    }
}

// ==========================================
// LOVE COUPONS MANAGEMENT
// ==========================================

function setupCoupons() {
    const giftBox = document.getElementById('clickable-gift-box');
    const giftWrapper = document.getElementById('gift-box-wrapper');
    const couponsList = document.getElementById('coupons-list');
    
    giftBox.addEventListener('click', function() {
        giftWrapper.classList.add('open');
        couponsList.classList.remove('hidden');
        
        const boxPos = giftBox.getBoundingClientRect();
        triggerConfetti(boxPos.left + boxPos.width / 2, boxPos.top);
        
        setupCouponsRedeemListeners();
    });
}

function setupCouponsRedeemListeners() {
    const redeemButtons = document.querySelectorAll('.btn-redeem');
    redeemButtons.forEach(btn => {
        const idx = btn.getAttribute('data-coupon');
        const isRedeemed = localStorage.getItem(`love_coupon_redeemed_${idx}`) === 'true';
        
        if (isRedeemed) {
            btn.classList.add('redeemed');
            btn.innerText = "Redeemed! 💖";
            btn.disabled = true;
        }
        
        btn.onclick = function() {
            if (btn.classList.contains('redeemed')) return;
            
            localStorage.setItem(`love_coupon_redeemed_${idx}`, 'true');
            btn.classList.add('redeemed');
            btn.innerText = "Redeemed! 💖";
            btn.disabled = true;
            
            const btnPos = btn.getBoundingClientRect();
            triggerConfetti(btnPos.left + btnPos.width / 2, btnPos.top);
        };
    });
}

// ==========================================
// FLOATING HEARTS BACKGROUND PARTICLES
// ==========================================

function startHeartsBackground() {
    const canvas = document.getElementById('hearts-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class HeartParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 12 + 6;
            this.speedY = -(Math.random() * 1.3 + 0.4);
            this.speedX = Math.random() * 0.8 - 0.4;
            this.opacity = Math.random() * 0.45 + 0.25;
            const colors = ['#ffccd5', '#ffb3c1', '#ff8fa3', '#ff758f', '#e8c2ca'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            if (this.y < 200) {
                this.opacity -= 0.005;
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            
            const d = this.size;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + d / 4);
            ctx.quadraticCurveTo(this.x, this.y, this.x + d / 4, this.y);
            ctx.quadraticCurveTo(this.x + d / 2, this.y, this.x + d / 2, this.y + d / 4);
            ctx.quadraticCurveTo(this.x + d / 2, this.y, this.x + (d * 3) / 4, this.y);
            ctx.quadraticCurveTo(this.x + d, this.y, this.x + d, this.y + d / 4);
            ctx.quadraticCurveTo(this.x + d, this.y + d / 2, this.x + (d * 3) / 4, this.y + (d * 3) / 4);
            ctx.lineTo(this.x + d / 2, this.y + d);
            ctx.lineTo(this.x + d / 4, this.y + (d * 3) / 4);
            ctx.quadraticCurveTo(this.x, this.y + d / 2, this.x, this.y + d / 4);
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    for (let i = 0; i < 20; i++) {
        const p = new HeartParticle();
        p.y = Math.random() * canvas.height;
        particles.push(p);
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (particles.length < 35 && Math.random() < 0.02) {
            particles.push(new HeartParticle());
        }
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].y < -20 || particles[i].opacity <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function triggerConfetti(startX, startY) {
    const canvas = document.getElementById('hearts-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let confettiCount = 45;
    let confettiParticles = [];
    
    class Confetti {
        constructor() {
            this.x = startX;
            this.y = startY;
            this.size = Math.random() * 8 + 4;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 7 + 2.5;
            this.speedX = Math.cos(angle) * speed;
            this.speedY = Math.sin(angle) * speed - 1.5;
            this.gravity = 0.18;
            this.rotation = Math.random() * 360;
            this.rotSpeed = Math.random() * 6 - 3;
            const colors = ['#fe2c55', '#ffb3c1', '#ffd1df', '#ffea00', '#00f5d4', '#7b2cbf'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = 1;
        }
        update() {
            this.speedY += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotSpeed;
            this.opacity -= 0.015;
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < confettiCount; i++) {
        confettiParticles.push(new Confetti());
    }
    
    function drawConfettiFrame() {
        let active = false;
        for (let i = confettiParticles.length - 1; i >= 0; i--) {
            confettiParticles[i].update();
            confettiParticles[i].draw();
            if (confettiParticles[i].opacity > 0 && confettiParticles[i].y < canvas.height) {
                active = true;
            } else {
                confettiParticles.splice(i, 1);
            }
        }
        if (active) {
            requestAnimationFrame(drawConfettiFrame);
        }
    }
    
    drawConfettiFrame();
}

// ==========================================
// DYNAMIC EDITORS (PHOTOS & COUPONS LISTS)
// ==========================================

function renderSettingsPhotosList() {
    const container = document.getElementById('cfg-photos-container');
    container.innerHTML = '';
    
    PHOTO_LABELS.forEach((label, idx) => {
        const photo = config.photos[idx] || { url: '', caption: '' };
        const div = document.createElement('div');
        div.className = 'polaroid-form-group';
        div.setAttribute('data-photo-index', idx);
        
        const displayUrl = photo.url.startsWith('assets/') ? '' : photo.url;
        
        div.innerHTML = `
            <label style="margin-bottom:6px; display:block; font-weight:700; font-size:0.82rem;">${label}</label>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 10px;">
                <input type="text" class="cfg-photo-url-input" value="${displayUrl}" placeholder="Paste URL or upload file" style="flex: 1; margin: 0; padding: 8px 12px; font-size: 0.8rem; border-radius: 8px; border: 1px solid rgba(0,0,0,0.12);">
                <button type="button" class="btn btn-export upload-btn-trigger" style="margin: 0; padding: 8px 12px; font-size: 0.8rem; width: auto; white-space: nowrap; height: 36px; border-radius: 8px;">📁 Upload</button>
                <input type="file" class="cfg-photo-file-input" accept="image/*" style="display: none;">
            </div>
            <label style="font-size:0.75rem; color:var(--text-sub); margin-top:4px; margin-bottom:4px; display:block;">Caption text</label>
            <input type="text" class="cfg-photo-caption-input" value="${photo.caption || ''}" placeholder="E.g., Sweet memory ✨">
        `;
        
        const fileInput = div.querySelector('.cfg-photo-file-input');
        const uploadBtn = div.querySelector('.upload-btn-trigger');
        const urlInput = div.querySelector('.cfg-photo-url-input');
        
        uploadBtn.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            uploadBtn.innerText = '⏳ Loading...';
            uploadBtn.disabled = true;
            
            compressAndLoadImage(file, (dataUrl) => {
                urlInput.value = dataUrl;
                uploadBtn.innerText = '✅ Done';
                uploadBtn.disabled = false;
                setTimeout(() => {
                    uploadBtn.innerText = '📁 Upload';
                }, 2000);
            });
        });
        
        container.appendChild(div);
    });
}

function renderSettingsCouponsList() {
    const container = document.getElementById('cfg-coupons-container');
    container.innerHTML = '';
    
    config.coupons.forEach((coupon, idx) => {
        addCouponInputFields(container, idx, coupon.title, coupon.desc);
    });
}

function addCouponInputFields(container, index, title, desc) {
    const div = document.createElement('div');
    div.className = 'polaroid-form-group';
    div.setAttribute('data-coupon-index', index);
    
    div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
            <label style="margin:0; font-weight:700;">Coupon #${index + 1}</label>
            <button type="button" class="btn-delete-coupon" style="background:none; border:none; color:#fe2c55; cursor:pointer; font-size:0.75rem; font-weight:700;">Remove</button>
        </div>
        <label>Title</label>
        <input type="text" class="cfg-coupon-title-input" value="${title || ''}" placeholder="e.g., COFFEE DATE">
        <label>Description</label>
        <input type="text" class="cfg-coupon-desc-input" value="${desc || ''}" placeholder="e.g., Good for one coffee">
    `;
    
    div.querySelector('.btn-delete-coupon').addEventListener('click', () => {
        div.remove();
        updateCouponIndices();
    });
    
    container.appendChild(div);
}

function updateCouponIndices() {
    const groups = document.querySelectorAll('#cfg-coupons-container .polaroid-form-group');
    groups.forEach((group, idx) => {
        group.setAttribute('data-coupon-index', idx);
        group.querySelector('label').innerText = `Coupon #${idx + 1}`;
    });
}

// ==========================================
// HIDDEN TRIGGERS CUSTOMIZER DRAWER
// ==========================================

function setupHiddenDrawerTriggers() {
    const drawer = document.getElementById('settings-drawer');
    
    // Trigger 1: Keyboard Shortcut Ctrl + Shift + S
    window.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
            e.preventDefault();
            drawer.classList.toggle('open');
            console.log("Settings panel toggled via shortcut.");
        }
    });
    
    // Trigger 2: Double click the main title greeting
    const greeting = document.getElementById('slide-title-greeting');
    if (greeting) {
        greeting.addEventListener('dblclick', function() {
            drawer.classList.add('open');
            console.log("Settings panel opened via double-click on title greeting.");
        });
    }
    
    // Trigger 3: Secret multi-tap wax seal (on envelope gate landing)
    let sealClicks = 0;
    let clickTimer;
    const waxSeal = document.querySelector('.wax-seal');
    waxSeal.addEventListener('click', function(e) {
        sealClicks++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            sealClicks = 0;
        }, 1500);
        
        if (sealClicks >= 5) {
            e.stopPropagation();
            drawer.classList.add('open');
            console.log("Settings panel opened via secret wax seal clicks.");
            sealClicks = 0;
        }
    });
}

function setupInlineEditTriggers() {
    const letterTrigger = document.querySelector('.edit-letter-trigger');
    const storyTrigger = document.querySelector('.edit-story-trigger');
    const scratchTrigger = document.querySelector('.edit-scratch-trigger');
    const quizTrigger = document.querySelector('.edit-quiz-trigger');
    const drawer = document.getElementById('settings-drawer');
    
    if (letterTrigger) {
        letterTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            drawer.classList.add('open');
            const inputEl = document.getElementById('cfg-letter-text');
            if (inputEl) {
                setTimeout(() => {
                    inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => inputEl.focus(), 300);
                }, 300); // Wait for drawer open transition
            }
        });
    }
    
    if (storyTrigger) {
        storyTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            drawer.classList.add('open');
            const inputEl = document.getElementById('cfg-story-text');
            if (inputEl) {
                setTimeout(() => {
                    inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => inputEl.focus(), 300);
                }, 300); // Wait for drawer open transition
            }
        });
    }

    if (scratchTrigger) {
        scratchTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            drawer.classList.add('open');
            const inputEl = document.getElementById('cfg-scratch-message');
            if (inputEl) {
                setTimeout(() => {
                    inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => inputEl.focus(), 300);
                }, 300); // Wait for drawer open transition
            }
        });
    }

    if (quizTrigger) {
        quizTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            drawer.classList.add('open');
            const inputEl = document.getElementById('cfg-quiz-question');
            if (inputEl) {
                setTimeout(() => {
                    inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => inputEl.focus(), 300);
                }, 300); // Wait for drawer open transition
            }
        });
    }
}

// ==========================================================
// CUSTOMIZER DRAWER FORM STAGES
// ==========================================

function setupCustomizerDrawer() {
    const closeBtn = document.getElementById('close-drawer-btn');
    const drawer = document.getElementById('settings-drawer');
    const form = document.getElementById('settings-form');
    const resetBtn = document.getElementById('cfg-reset-btn');
    const exportBtn = document.getElementById('cfg-export-btn');
    const addCouponBtn = document.getElementById('cfg-add-coupon-btn');

    closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
    
    addCouponBtn.addEventListener('click', () => {
        const container = document.getElementById('cfg-coupons-container');
        const count = container.querySelectorAll('.polaroid-form-group').length;
        addCouponInputFields(container, count, '', '');
    });

    // Setup file selectors for backgrounds
    document.querySelectorAll('.upload-bg-btn').forEach(btn => {
        const targetId = btn.getAttribute('data-target');
        const fileTargetId = btn.getAttribute('data-file-target');
        
        const inputEl = document.getElementById(targetId);
        const fileEl = document.getElementById(fileTargetId);
        
        btn.addEventListener('click', () => fileEl.click());
        
        fileEl.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            btn.innerText = '⏳ Loading...';
            btn.disabled = true;
            
            compressAndLoadImage(file, (dataUrl) => {
                inputEl.value = dataUrl;
                btn.innerText = '✅ Done';
                btn.disabled = false;
                setTimeout(() => {
                    btn.innerText = '📁 Upload';
                }, 2000);
            });
        });
    });

    // Form Save
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newConfig = {
            partnerName: document.getElementById('cfg-partner-name').value,
            senderName: document.getElementById('cfg-sender-name').value,
            anniversaryDate: document.getElementById('cfg-anniversary-date').value,
            themePrimaryColor: document.getElementById('cfg-primary-color').value,
            themeAccentColor: document.getElementById('cfg-accent-color').value,
            themeGradient: document.getElementById('cfg-bg-gradient').value,
            letterText: document.getElementById('cfg-letter-text').value,
            storyText: document.getElementById('cfg-story-text').value,
            songTitle: document.getElementById('cfg-song-title').value,
            songArtist: document.getElementById('cfg-song-artist').value,
            songUrl: document.getElementById('cfg-song-url').value,
            lyrics: document.getElementById('cfg-lyrics-text').value,
            quizQuestion: document.getElementById('cfg-quiz-question').value,
            scratchMessage: document.getElementById('cfg-scratch-message').value,
            photos: [],
            coupons: [],
            slideBgs: [
                document.getElementById('cfg-bg-slide1').value,
                document.getElementById('cfg-bg-slide2').value,
                document.getElementById('cfg-bg-slide3').value,
                document.getElementById('cfg-bg-slide4').value,
                document.getElementById('cfg-bg-slide5').value,
                document.getElementById('cfg-bg-slide6').value,
                document.getElementById('cfg-bg-slide7').value
            ]
        };

        // Read 15 photos config
        const photoContainer = document.getElementById('cfg-photos-container');
        PHOTO_LABELS.forEach((label, idx) => {
            const group = photoContainer.querySelector(`.polaroid-form-group[data-photo-index="${idx}"]`);
            if (group) {
                const urlVal = group.querySelector('.cfg-photo-url-input').value;
                const captionVal = group.querySelector('.cfg-photo-caption-input').value;
                newConfig.photos.push({
                    url: urlVal || DEFAULTS.photos[idx % DEFAULTS.photos.length].url,
                    caption: captionVal || DEFAULTS.photos[idx % DEFAULTS.photos.length].caption
                });
            }
        });

        // Read Coupons
        const couponGroups = document.querySelectorAll('#cfg-coupons-container .polaroid-form-group');
        couponGroups.forEach(group => {
            const titleVal = group.querySelector('.cfg-coupon-title-input').value;
            const descVal = group.querySelector('.cfg-coupon-desc-input').value;
            newConfig.coupons.push({
                title: titleVal,
                desc: descVal
            });
        });

        localStorage.setItem('love_site_config', JSON.stringify(newConfig));
        alert("Changes saved successfully! 💾");
        
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({path: cleanUrl}, '', cleanUrl);
        
        config = newConfig;
        updateUIWithConfig();
        startAnniversaryTimer();
        drawer.classList.remove('open');
    });

    // Reset Defaults
    resetBtn.addEventListener('click', function() {
        if (confirm("Restore original defaults? All customized settings will be cleared.")) {
            localStorage.removeItem('love_site_config');
            for(let i=0; i<30; i++) {
                localStorage.removeItem(`love_coupon_redeemed_${i}`);
            }
            window.location.href = window.location.pathname;
        }
    });

    // Export Shareable Base64 Link
    exportBtn.addEventListener('click', function() {
        const currentData = {
            partnerName: document.getElementById('cfg-partner-name').value,
            senderName: document.getElementById('cfg-sender-name').value,
            anniversaryDate: document.getElementById('cfg-anniversary-date').value,
            themePrimaryColor: document.getElementById('cfg-primary-color').value,
            themeAccentColor: document.getElementById('cfg-accent-color').value,
            themeGradient: document.getElementById('cfg-bg-gradient').value,
            letterText: document.getElementById('cfg-letter-text').value,
            storyText: document.getElementById('cfg-story-text').value,
            songTitle: document.getElementById('cfg-song-title').value,
            songArtist: document.getElementById('cfg-song-artist').value,
            songUrl: document.getElementById('cfg-song-url').value,
            lyrics: document.getElementById('cfg-lyrics-text').value,
            quizQuestion: document.getElementById('cfg-quiz-question').value,
            scratchMessage: document.getElementById('cfg-scratch-message').value,
            photos: [],
            coupons: [],
            slideBgs: [
                document.getElementById('cfg-bg-slide1').value,
                document.getElementById('cfg-bg-slide2').value,
                document.getElementById('cfg-bg-slide3').value,
                document.getElementById('cfg-bg-slide4').value,
                document.getElementById('cfg-bg-slide5').value,
                document.getElementById('cfg-bg-slide6').value,
                document.getElementById('cfg-bg-slide7').value
            ]
        };

        const photoContainer = document.getElementById('cfg-photos-container');
        PHOTO_LABELS.forEach((label, idx) => {
            const group = photoContainer.querySelector(`.polaroid-form-group[data-photo-index="${idx}"]`);
            if (group) {
                const urlVal = group.querySelector('.cfg-photo-url-input').value;
                const captionVal = group.querySelector('.cfg-photo-caption-input').value;
                currentData.photos.push({
                    url: urlVal || DEFAULTS.photos[idx % DEFAULTS.photos.length].url,
                    caption: captionVal || DEFAULTS.photos[idx % DEFAULTS.photos.length].caption
                });
            }
        });

        const couponGroups = document.querySelectorAll('#cfg-coupons-container .polaroid-form-group');
        couponGroups.forEach(group => {
            const titleVal = group.querySelector('.cfg-coupon-title-input').value;
            const descVal = group.querySelector('.cfg-coupon-desc-input').value;
            currentData.coupons.push({
                title: titleVal,
                desc: descVal
            });
        });

        try {
            const compressed = compressConfig(currentData);
            const jsonStr = JSON.stringify(compressed);
            const base64Str = btoa(unescape(encodeURIComponent(jsonStr)));
            const shareUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?c=${base64Str}`;
            
            showShareModal(shareUrl);
            
        } catch (e) {
            console.error("Failed to generate share link:", e);
            alert("Oops! There was an error generating the share link.");
        }
    });

    const songUrlInput = document.getElementById('cfg-song-url');
    if (songUrlInput) {
        songUrlInput.addEventListener('input', validateSongUrl);
    }
}

// ==========================================
// CUTE AND ROMANTIC INTERACTIVES
// ==========================================

function setupHeartCursorTrail() {
    let lastTime = 0;
    
    document.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastTime < 95) return;
        lastTime = now;
        
        const heart = document.createElement('span');
        heart.className = 'cursor-heart';
        
        const icons = ['❤️', '💖', '💕', '🌸', '✨'];
        heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        
        const size = Math.random() * 10 + 10;
        heart.style.fontSize = `${size}px`;
        heart.style.left = `${e.clientX}px`;
        heart.style.top = `${e.clientY}px`;
        
        const xOffset = Math.random() * 60 - 30;
        const yOffset = Math.random() * 60 - 30;
        const rotation = Math.random() * 360;
        heart.style.setProperty('--x-offset', `${xOffset}px`);
        heart.style.setProperty('--y-offset', `${yOffset}px`);
        heart.style.setProperty('--rotation', `${rotation}deg`);
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 900);
    });
}

function setupFloatingMusicNotes() {
    const audio = document.getElementById('bg-music');
    const notesContainer = document.getElementById('music-slide-notes');
    let noteInterval;
    
    function startSpawning() {
        if (noteInterval) clearInterval(noteInterval);
        noteInterval = setInterval(() => {
            let isYtPlaying = false;
            if (ytPlayer && typeof ytPlayer.getPlayerState === 'function' && window.YT) {
                isYtPlaying = ytPlayer.getPlayerState() === window.YT.PlayerState.PLAYING;
            }
            const isAudioPlaying = !audio.paused;
            
            if ((!isAudioPlaying && !isYtPlaying) || !isMusicSlideVisible) return; 
            
            const note = document.createElement('span');
            note.className = 'vinyl-note';
            
            const notes = ['🎵', '🎶', '✨', '💖', '🌸'];
            note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
            
            const size = Math.random() * 12 + 10;
            note.style.fontSize = `${size}px`;
            note.style.color = '#fff';
            
            const leftOffset = Math.random() * 120 + 70;
            const topOffset = Math.random() * 80 + 80;
            note.style.left = `${leftOffset}px`;
            note.style.top = `${topOffset}px`;
            
            const xOffset = Math.random() * 100 - 50;
            const rotOffset = Math.random() * 60 - 30;
            note.style.setProperty('--x-offset', `${xOffset}px`);
            note.style.setProperty('--rot-offset', `${rotOffset}deg`);
            
            notesContainer.appendChild(note);
            
            setTimeout(() => {
                note.remove();
            }, 1600);
        }, 450);
    }
    
    startSpawning();
}

function setupKissWidget() {
    const btn = document.getElementById('send-kiss-btn');
    const label = document.getElementById('kiss-counter-label');
    
    let kissCount = parseInt(localStorage.getItem('love_kiss_count') || '0');
    label.innerText = `Kisses sent: ${kissCount}`;
    
    btn.addEventListener('click', function(e) {
        kissCount++;
        localStorage.setItem('love_kiss_count', kissCount);
        label.innerText = `Kisses sent: ${kissCount}`;
        spawnKissParticles(e.clientX, e.clientY);
    });
}

function spawnKissParticles(x, y) {
    const count = 5;
    for (let i = 0; i < count; i++) {
        const kiss = document.createElement('span');
        kiss.className = 'floating-kiss';
        kiss.innerHTML = '💋';
        
        const size = Math.random() * 12 + 18;
        kiss.style.fontSize = `${size}px`;
        kiss.style.left = `${x}px`;
        kiss.style.top = `${y}px`;
        
        const xOffset = Math.random() * 160 - 80;
        const rotation = Math.random() * 90 - 45;
        kiss.style.setProperty('--x-offset', `${xOffset}px`);
        kiss.style.setProperty('--rotation', `${rotation}deg`);
        
        document.body.appendChild(kiss);
        
        setTimeout(() => {
            kiss.remove();
        }, 1600);
    }
}

// ==========================================
// INITIALIZER
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'hidden';

    initConfiguration();
    startAnniversaryTimer();
    setupEnvelopeGate();
    setupMusicPlayer();
    setupLightbox();
    setupRunawayButton();
    setupScratchCard();
    setupCoupons();
    startHeartsBackground();
    setupCustomizerDrawer();
    setupHiddenDrawerTriggers();
    setupInlineEditTriggers();
    setupHeartCursorTrail();
    setupFloatingMusicNotes();
    setupKissWidget();
    setupShareModal();
    
    console.log("All systems initialized successfully!");
});

// ==========================================
// CUSTOM SHARE & QR CODE MODAL LOGIC
// ==========================================

let qrCodeInstance = null;

function showShareModal(shareUrl) {
    const modal = document.getElementById("share-modal");
    const linkInput = document.getElementById("share-link-text");
    const qrContainer = document.getElementById("qrcode");
    const copyBtn = document.getElementById("copy-share-link-btn");
    
    linkInput.value = shareUrl;
    copyBtn.innerText = "Copy";
    copyBtn.style.background = "";
    copyBtn.style.color = "";
    
    // Clear old QR code
    qrContainer.innerHTML = "";
    
    // Generate new QR code using CDN library
    try {
        qrCodeInstance = new QRCode(qrContainer, {
            text: shareUrl,
            width: 180,
            height: 180,
            colorDark: config.themePrimaryColor || "#fe2c55",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch (e) {
        console.error("Failed to generate QR code:", e);
        qrContainer.innerHTML = "<p style='color:red; font-size:0.8rem;'>QR Generation Failed</p>";
    }
    
    // Open modal
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 50);
    
    // Auto-copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
        copyBtn.innerText = "Copied! ✓";
        copyBtn.style.background = "#d4edda";
        copyBtn.style.color = "#155724";
        setTimeout(() => {
            copyBtn.innerText = "Copy";
            copyBtn.style.background = "";
            copyBtn.style.color = "";
        }, 3000);
    }).catch(err => {
        console.warn("Auto-copy blocked or failed:", err);
    });
}

function setupShareModal() {
    const modal = document.getElementById("share-modal");
    const closeBtn = document.getElementById("share-modal-close-btn");
    const copyBtn = document.getElementById("copy-share-link-btn");
    const linkInput = document.getElementById("share-link-text");
    const downloadBtn = document.getElementById("download-qr-btn");
    
    // Close modal triggers
    closeBtn.addEventListener("click", closeShareModal);
    modal.addEventListener("click", e => {
        if (e.target === modal) closeShareModal();
    });
    
    // Copy button
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(linkInput.value).then(() => {
            copyBtn.innerText = "Copied! ✓";
            copyBtn.style.background = "#d4edda";
            copyBtn.style.color = "#155724";
            setTimeout(() => {
                copyBtn.innerText = "Copy";
                copyBtn.style.background = "";
                copyBtn.style.color = "";
            }, 2000);
        });
    });
    
    // Download QR Code with overlay heart
    downloadBtn.addEventListener("click", () => {
        const originalCanvas = document.querySelector("#qrcode canvas");
        if (!originalCanvas) {
            alert("QR Code image is still loading or could not be generated.");
            return;
        }
        
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = originalCanvas.width;
        tempCanvas.height = originalCanvas.height;
        const ctx = tempCanvas.getContext("2d");
        
        // Draw main QR code
        ctx.drawImage(originalCanvas, 0, 0);
        
        // Define overlay size (approx 22% of canvas width)
        const size = tempCanvas.width * 0.22;
        const x = (tempCanvas.width - size) / 2;
        const y = (tempCanvas.height - size) / 2;
        
        // 1. Draw a white backing circle to mask QR blocks behind the heart
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(tempCanvas.width / 2, tempCanvas.height / 2, (size / 2) + 3, 0, Math.PI * 2);
        ctx.fill();
        
        // 2. Draw a beautiful red heart matching the SVG shape
        ctx.fillStyle = config.themePrimaryColor || "#fe2c55";
        
        const d = size;
        const hx = x;
        const hy = y;
        
        ctx.beginPath();
        ctx.moveTo(hx, hy + d / 4);
        ctx.quadraticCurveTo(hx, hy, hx + d / 4, hy);
        ctx.quadraticCurveTo(hx + d / 2, hy, hx + d / 2, hy + d / 4);
        ctx.quadraticCurveTo(hx + d / 2, hy, hx + (d * 3) / 4, hy);
        ctx.quadraticCurveTo(hx + d, hy, hx + d, hy + d / 4);
        ctx.quadraticCurveTo(hx + d, hy + d / 2, hx + (d * 3) / 4, hy + (d * 3) / 4);
        ctx.lineTo(hx + d / 2, hy + d);
        ctx.lineTo(hx + d / 4, hy + (d * 3) / 4);
        ctx.quadraticCurveTo(hx, hy + d / 2, hx, hy + d / 4);
        ctx.closePath();
        ctx.fill();
        
        // 3. Draw a clean white stroke contour around the heart
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = Math.max(2, tempCanvas.width * 0.015);
        ctx.stroke();
        
        // Trigger download
        const link = document.createElement("a");
        link.download = `love_qr_${(config.partnerName || 'gift').replace(/\s+/g, '_')}.png`;
        link.href = tempCanvas.toDataURL("image/png");
        link.click();
    });
}

function closeShareModal() {
    const modal = document.getElementById("share-modal");
    modal.classList.remove("active");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}
