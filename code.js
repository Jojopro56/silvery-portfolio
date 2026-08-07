/* ==========================================================================
   SILVERY MEDIA - Real Content, 3s Boot Sequence & Live Static Cards
   ========================================================================== */

function getOptimizedImageUrl(rawUrl, targetWidth = 1400, quality = 80) {
  if (!rawUrl) return '';
  if (rawUrl.includes('images.unsplash.com')) {
    const cleanUrl = rawUrl.split('?')[0];
    return `${cleanUrl}?auto=format&fit=crop&w=${targetWidth}&q=${quality}&fm=webp`;
  }
  const encodedUrl = encodeURIComponent(rawUrl);
  return `https://images.weserv.nl/?url=${encodedUrl}&w=${targetWidth}&q=${quality}&output=webp`;
}

const SHOOTS_DATABASE = [
  {
    id: "CAM_01",
    title: "PORSCHE 992 GT3RS",
    type: "PHOTOSHOOT",
    client: "SILVERY MEDIA / TRACKDAY",
    date: "OCTOBER 2025",
    location: "NÜRBURGRING NORDSCHLEIFE, GERMANY",
    description: "Telemetry trackday documentation focusing on active DRS aerodynamics, carbon fiber wing architecture, and high-G cornering dynamics.",
    coverImage: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e",
    gallery: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738"
    ]
  },
  {
    id: "CAM_02",
    title: "ABARTH GRANDE PUNTO",
    type: "PHOTOSHOOT",
    client: "PRIVATE FEATURE",
    date: "2025",
    location: "NETHERLANDS",
    description: "Italian hot hatch feature editorial capturing compact performance styling, custom wheels, and dynamic road presence.",
    coverImage: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd",
    gallery: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888"
    ]
  },
  {
    id: "CAM_03",
    title: "VIVA ITALIA 2025",
    type: "EVENT",
    client: "VIVA ITALIA",
    date: "MAY 2025",
    location: "CIRCUIT ZANDVOORT",
    description: "Live event coverage celebrating Italian automotive heritage, supercar paddocks, track parades, and exotic car culture.",
    coverImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
    gallery: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738"
    ]
  },
  {
    id: "CAM_04",
    title: "FORD MUSTANG GT",
    type: "PHOTOSHOOT",
    client: "SILVERY MEDIA SHOWCASE",
    date: "JANUARY 2026",
    location: "MOZINGO LAKE & MARYVILLE, MO",
    description: "Personal automotive showcase capturing the 2000 Ford Mustang GT Convertible across scenic Missouri lake runs and ambient twilight drives.",
    coverImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
    gallery: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e"
    ]
  },
  {
    id: "CAM_05",
    title: "PORSCHE 911 CARRERA",
    type: "PHOTOSHOOT",
    client: "PRIVATE COLLECTION",
    date: "2025",
    location: "ECHT / MAASTRICHT",
    description: "Classic rear-engine sports car editorial highlighting timeless silhouette contours and metallic paint depth.",
    coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e"
    ]
  },
  {
    id: "CAM_06",
    title: "BMW M4",
    type: "PHOTOSHOOT",
    client: "EDITORIAL FEATURE",
    date: "2025",
    location: "URBAN PASSAGES",
    description: "Aggressive M-power coupe feature exploring muscular carbon architecture under atmospheric artificial street lighting.",
    coverImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd"
    ]
  },
  {
    id: "CAM_07",
    title: "VIVA ITALIA 2024",
    type: "EVENT",
    client: "VIVA ITALIA",
    date: "MAY 2024",
    location: "CIRCUIT ASSEN",
    description: "Full event documentation capturing vintage Alfa Romeos, classic Ferraris, and roaring V12 track sessions.",
    coverImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738",
    gallery: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888"
    ]
  },
  {
    id: "CAM_08",
    title: "H.O.F THE LOODS",
    type: "PHOTOSHOOT",
    client: "CREATIVE LOCATION FEATURE",
    date: "2025",
    location: "THE LOODS, NETHERLANDS",
    description: "Industrial warehouse location photoshoot contrasting raw brick textures with sharp automotive lines.",
    coverImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
    gallery: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
    ]
  },
  {
    id: "CAM_09",
    title: "STRIJP-S",
    type: "PHOTOSHOOT",
    client: "URBAN ARCHITECTURE FEATURE",
    date: "OCTOBER 2025",
    location: "EINDHOVEN, NETHERLANDS",
    description: "Industrial heritage and modern creative district photography capturing geometric concrete contrast and ambient shadows.",
    coverImage: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd",
    gallery: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888"
    ]
  },
  {
    id: "CAM_10",
    title: "CLASSIC PARK",
    type: "PHOTOSHOOT",
    client: "CLASSIC PARK BOXTEL",
    date: "2025",
    location: "BOXTEL, NETHERLANDS",
    description: "Museum quality vintage automobile feature showcasing historic craftsmanship, chrome detailing, and rare classics.",
    coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537"
    ]
  },
  {
    id: "CAM_11",
    title: "VINTAGE CHROOM 2023",
    type: "EVENT",
    client: "VINTAGE CHROOM MEET",
    date: "2023",
    location: "LIMBURG, NETHERLANDS",
    description: "Classic American muscle and European vintage car meet event coverage highlighting authentic automotive passion.",
    coverImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
    gallery: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e"
    ]
  },
  {
    id: "CAM_12",
    title: "VIVA ITALIA 2023",
    type: "EVENT",
    client: "VIVA ITALIA",
    date: "MAY 2023",
    location: "CIRCUIT ZANDVOORT",
    description: "Atmospheric trackside photography documenting Italian passion, high-rpm sound, and exotic car rallies.",
    coverImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
    gallery: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738"
    ]
  }
];

// EPIC 3-SECOND BOOT SEQUENCE CONTROLLER WITH SKIP LOADING FEATURE
function initBootSequence() {
  const bootLoader = document.getElementById('bootLoader');
  const bootPercent = document.getElementById('bootPercent');
  const bootProgressFill = document.getElementById('bootProgressFill');
  const bootLogLine1 = document.getElementById('bootLogLine1');
  const bootLogLine2 = document.getElementById('bootLogLine2');
  const bootCanvas = document.getElementById('bootStaticCanvas');
  const bootSkipBtn = document.getElementById('bootSkipBtn');
  const bCtx = bootCanvas.getContext('2d');

  let progress = 0;
  let isSkipped = false;
  const totalTime = 3000;
  const intervalTime = 30;
  const increment = 100 / (totalTime / intervalTime);

  function finishBoot() {
    if (isSkipped) return;
    isSkipped = true;
    clearInterval(bootInterval);
    triggerStaticSwitch(() => {
      bootLoader.classList.remove('active');
    });
  }

  if (bootSkipBtn) {
    bootSkipBtn.addEventListener('click', finishBoot);
  }

  function drawBootStatic() {
    if (!bootLoader.classList.contains('active')) return;
    const w = bootCanvas.width = bootCanvas.offsetWidth || window.innerWidth;
    const h = bootCanvas.height = bootCanvas.offsetHeight || window.innerHeight;
    const imgData = bCtx.createImageData(w, h);
    const buffer = new Uint32Array(imgData.data.buffer);

    for (let i = 0; i < buffer.length; i++) {
      const mono = Math.random() < 0.2 ? 255 : Math.floor(Math.random() * 100);
      buffer[i] = (255 << 24) | (mono << 16) | (mono << 8) | mono;
    }
    bCtx.putImageData(imgData, 0, 0);
    requestAnimationFrame(drawBootStatic);
  }
  drawBootStatic();

  const bootInterval = setInterval(() => {
    progress += increment;
    if (progress >= 100) progress = 100;

    bootPercent.textContent = `${String(Math.floor(progress)).padStart(2, '0')}%`;
    bootProgressFill.style.width = `${progress}%`;

    if (progress > 25 && progress < 50) {
      bootLogLine1.textContent = '> OPTICAL SENSORS LOCKED // 4K RAW';
      bootLogLine2.textContent = '> APERTURE CALIBRATION: ACTIVE';
    } else if (progress >= 50 && progress < 75) {
      bootLogLine1.textContent = '> CANBUS TELEMETRY SYNCED';
      bootLogLine2.textContent = '> FREQUENCY MATCH: 24.8 GHZ';
    } else if (progress >= 75) {
      bootLogLine1.textContent = '> SIGNAL DECRYPTION COMPLETE';
      bootLogLine2.textContent = '> SILVERY MEDIA SHOWCASE ONLINE';
    }

    if (progress >= 100) {
      finishBoot();
    }
  }, intervalTime);
}

// Cursor Engine
const telCursor = document.getElementById('telCursor');
const curTag = document.getElementById('curTag');

document.addEventListener('mousemove', (e) => {
  telCursor.style.left = `${e.clientX}px`;
  telCursor.style.top = `${e.clientY}px`;
});

function attachHoverListeners() {
  document.querySelectorAll('.hover-trigger').forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-active');
      const tag = el.getAttribute('data-tag');
      if (tag) curTag.textContent = tag;
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-active');
      curTag.textContent = `FEED: ${SHOOTS_DATABASE[currentIdx].id}`;
    });
  });
}

// Camera Static Canvas Engine
const staticCanvas = document.getElementById('staticCanvas');
const sCtx = staticCanvas.getContext('2d');
let isStaticActive = false;

function resizeStaticCanvas() {
  staticCanvas.width = window.innerWidth;
  staticCanvas.height = window.innerHeight;
}
resizeStaticCanvas();
window.addEventListener('resize', () => resizeStaticCanvas());

function generateCameraStatic() {
  if (!isStaticActive) return;
  const w = staticCanvas.width;
  const h = staticCanvas.height;
  const imgData = sCtx.createImageData(w, h);
  const buffer = new Uint32Array(imgData.data.buffer);

  for (let i = 0; i < buffer.length; i++) {
    const mono = Math.random() < 0.15 ? 255 : Math.floor(Math.random() * 180);
    const glitch = Math.random() < 0.05 ? 0xff0000ff : 0x00000000;
    buffer[i] = (255 << 24) | (mono << 16) | (mono << 8) | mono | glitch;
  }

  sCtx.putImageData(imgData, 0, 0);
  requestAnimationFrame(generateCameraStatic);
}

function triggerStaticSwitch(callback) {
  isStaticActive = true;
  staticCanvas.classList.add('active');
  generateCameraStatic();

  setTimeout(() => { callback(); }, 120);
  setTimeout(() => {
    staticCanvas.classList.remove('active');
    isStaticActive = false;
  }, 240);
}

// RELATED CARDS LIVE STATIC LOOP
let cardStaticInterval = null;

function renderCardStatic(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth || 300;
  const h = canvas.height = canvas.offsetHeight || 200;
  const imgData = ctx.createImageData(w, h);
  const buffer = new Uint32Array(imgData.data.buffer);

  for (let i = 0; i < buffer.length; i++) {
    const mono = Math.random() < 0.2 ? 255 : Math.floor(Math.random() * 120);
    buffer[i] = (255 << 24) | (mono << 16) | (mono << 8) | mono;
  }
  ctx.putImageData(imgData, 0, 0);
}

function startCardStaticLoop() {
  if (cardStaticInterval) clearInterval(cardStaticInterval);
  cardStaticInterval = setInterval(() => {
    const cardCanvases = document.querySelectorAll('.related-static-canvas');
    cardCanvases.forEach(c => renderCardStatic(c));
  }, 90);
}

function stopCardStaticLoop() {
  if (cardStaticInterval) {
    clearInterval(cardStaticInterval);
    cardStaticInterval = null;
  }
}

// Viewport Feed Engine
const feedStack = document.getElementById('feedStack');
const heroClient = document.getElementById('heroClient');
const heroCategory = document.getElementById('heroCategory');
const heroTitle = document.getElementById('heroTitle');
const feedIdReadout = document.getElementById('feedIdReadout');
const dockCurrent = document.getElementById('dockCurrent');
const dockTotal = document.getElementById('dockTotal');
const dockTrackFill = document.getElementById('dockTrackFill');
const dockTrack = document.getElementById('dockTrack');
const dockScrubberWrapper = document.getElementById('dockScrubberWrapper');
const scrubberTooltip = document.getElementById('scrubberTooltip');

let currentIdx = 0;

function buildFeeds() {
  feedStack.innerHTML = '';

  SHOOTS_DATABASE.forEach((shoot, index) => {
    const img = document.createElement('img');
    img.src = getOptimizedImageUrl(shoot.coverImage, 1600, 80);
    img.className = `feed-layer ${index === 0 ? 'active' : ''}`;
    feedStack.appendChild(img);
  });

  dockTotal.textContent = String(SHOOTS_DATABASE.length).padStart(2, '0');

  buildIndexDrawer();
  updateHUD(0);
}

function switchFeed(index) {
  if (index < 0 || index >= SHOOTS_DATABASE.length) return;
  triggerStaticSwitch(() => updateHUD(index));
}

function updateHUD(index) {
  currentIdx = index;
  const shoot = SHOOTS_DATABASE[index];

  // Update background layers
  const layers = document.querySelectorAll('.feed-layer');
  layers.forEach((layer, i) => layer.classList.toggle('active', i === index));

  // Update Title, Category & Telemetry Header
  heroClient.textContent = shoot.client;
  heroCategory.textContent = shoot.type;
  heroTitle.textContent = shoot.title;
  feedIdReadout.textContent = shoot.id;
  curTag.textContent = `FEED: ${shoot.id}`;

  // Update Bottom Dock Counter & Progress Scrubber
  const formattedCurr = String(index + 1).padStart(2, '0');
  dockCurrent.textContent = formattedCurr;
  
  const pct = ((index + 1) / SHOOTS_DATABASE.length) * 100;
  dockTrackFill.style.width = `${pct}%`;
}

// Bottom Dock Buttons
document.getElementById('dockPrevBtn').addEventListener('click', () => {
  switchFeed((currentIdx - 1 + SHOOTS_DATABASE.length) % SHOOTS_DATABASE.length);
});

document.getElementById('dockNextBtn').addEventListener('click', () => {
  switchFeed((currentIdx + 1) % SHOOTS_DATABASE.length);
});

/* ==========================================================================
   SCRUBBER ENGINE
   ========================================================================== */
let isScrubbing = false;
let pendingScrubIndex = 0;

function updateScrubPreview(e) {
  const rect = dockTrack.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clickX = clientX - rect.left;
  const percentage = Math.max(0, Math.min(1, clickX / rect.width));
  
  pendingScrubIndex = Math.min(
    SHOOTS_DATABASE.length - 1,
    Math.floor(percentage * SHOOTS_DATABASE.length)
  );

  const fillPct = ((pendingScrubIndex + 1) / SHOOTS_DATABASE.length) * 100;
  dockTrackFill.style.width = `${fillPct}%`;

  const targetShoot = SHOOTS_DATABASE[pendingScrubIndex];
  const carShortName = targetShoot.title.split('//')[0].trim();
  scrubberTooltip.textContent = `${targetShoot.id} // [${targetShoot.type}] ${carShortName}`;

  const wrapperRect = dockScrubberWrapper.getBoundingClientRect();
  const tooltipX = Math.max(0, Math.min(rect.width, clickX)) + (rect.left - wrapperRect.left);
  scrubberTooltip.style.left = `${tooltipX}px`;
  scrubberTooltip.classList.add('active');

  dockCurrent.textContent = String(pendingScrubIndex + 1).padStart(2, '0');
}

function startScrub(e) {
  isScrubbing = true;
  updateScrubPreview(e);
}

function handleScrubMove(e) {
  if (isScrubbing) {
    updateScrubPreview(e);
  }
}

function endScrub() {
  if (isScrubbing) {
    isScrubbing = false;
    scrubberTooltip.classList.remove('active');
    switchFeed(pendingScrubIndex);
  }
}

dockTrack.addEventListener('mousedown', startScrub);
window.addEventListener('mousemove', handleScrubMove);
window.addEventListener('mouseup', endScrub);

dockTrack.addEventListener('touchstart', startScrub, { passive: true });
window.addEventListener('touchmove', handleScrubMove, { passive: true });
window.addEventListener('touchend', endScrub);

// Global Wheel Scrolling
let isScrolling = false;
window.addEventListener('wheel', (e) => {
  if (document.getElementById('projectModal').classList.contains('active')) return;
  if (document.getElementById('lightboxModal').classList.contains('active')) return;
  if (document.getElementById('indexDrawer').classList.contains('active')) return;
  if (document.getElementById('satUplinkModal').classList.contains('active')) return;
  if (document.getElementById('dispatchDrawer').classList.contains('active')) return;

  if (isScrolling) return;
  
  if (Math.abs(e.deltaY) > 20) {
    isScrolling = true;
    if (e.deltaY > 0) {
      switchFeed((currentIdx + 1) % SHOOTS_DATABASE.length);
    } else {
      switchFeed((currentIdx - 1 + SHOOTS_DATABASE.length) % SHOOTS_DATABASE.length);
    }
    setTimeout(() => { isScrolling = false; }, 320);
  }
});

// Keyboard Navigation
window.addEventListener('keydown', (e) => {
  if (document.getElementById('projectModal').classList.contains('active')) return;
  if (document.getElementById('lightboxModal').classList.contains('active')) return;
  if (document.getElementById('indexDrawer').classList.contains('active')) return;

  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    switchFeed((currentIdx + 1) % SHOOTS_DATABASE.length);
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    switchFeed((currentIdx - 1 + SHOOTS_DATABASE.length) % SHOOTS_DATABASE.length);
  }
});

// Touch Navigation
let touchStartY = 0;
window.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
window.addEventListener('touchend', (e) => {
  if (document.getElementById('projectModal').classList.contains('active')) return;
  if (document.getElementById('indexDrawer').classList.contains('active')) return;
  if (isScrubbing) return;
  
  const diff = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(diff) > 40) {
    if (diff > 0) switchFeed((currentIdx + 1) % SHOOTS_DATABASE.length);
    else switchFeed((currentIdx - 1 + SHOOTS_DATABASE.length) % SHOOTS_DATABASE.length);
  }
});

// Viewfinder Timestamp
const timestampTag = document.getElementById('timestampTag');
function updateTimestamp() {
  const now = new Date();
  const hrs = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const secs = String(now.getSeconds()).padStart(2, '0');
  const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
  timestampTag.textContent = `${hrs}:${mins}:${secs}:${ms}`;
  requestAnimationFrame(updateTimestamp);
}
updateTimestamp();

// Project Directory Drawer
const indexDrawer = document.getElementById('indexDrawer');
const openIndexBtn = document.getElementById('openIndexBtn');
const closeIndexBtn = document.getElementById('closeIndexBtn');
const indexGrid = document.getElementById('indexGrid');

function buildIndexDrawer() {
  document.getElementById('totalProjectsBadge').textContent = `${SHOOTS_DATABASE.length} PROJECTS LOADED`;
  indexGrid.innerHTML = '';

  SHOOTS_DATABASE.forEach((shoot, idx) => {
    const card = document.createElement('div');
    card.className = `index-card hover-trigger ${idx === currentIdx ? 'active' : ''}`;
    card.setAttribute('data-tag', `SELECT ${shoot.id}`);
    
    card.innerHTML = `
      <img src="${getOptimizedImageUrl(shoot.coverImage, 600, 75)}" alt="${shoot.title}" class="index-card-img" loading="lazy">
      <div class="index-card-body">
        <span class="index-card-id">${shoot.id} // [${shoot.type}] ${shoot.client}</span>
        <h3 class="index-card-title">${shoot.title}</h3>
      </div>
    `;

    card.addEventListener('click', () => {
      switchFeed(idx);
      indexDrawer.classList.remove('active');
    });

    indexGrid.appendChild(card);
  });
}

openIndexBtn.addEventListener('click', () => {
  buildIndexDrawer();
  indexDrawer.classList.add('active');
  indexDrawer.setAttribute('aria-hidden', 'false');
});

closeIndexBtn.addEventListener('click', () => {
  indexDrawer.classList.remove('active');
  indexDrawer.setAttribute('aria-hidden', 'true');
});

// Conventional Project View & Lightbox Engine
const projectModal = document.getElementById('projectModal');
const projectPhotoGrid = document.getElementById('projectPhotoGrid');
const inspectBtn = document.getElementById('inspectBtn');
const closeProjectBtn = document.getElementById('closeProjectBtn');
const scrollTopBtn = document.getElementById('scrollTopBtn');

const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCounter = document.getElementById('lightboxCounter');
const closeLightboxBtn = document.getElementById('closeLightboxBtn');
const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
const lightboxNextBtn = document.getElementById('lightboxNextBtn');

let activeGallery = [];
let lightboxIdx = 0;

projectModal.addEventListener('scroll', () => {
  if (projectModal.scrollTop > 350) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  projectModal.scrollTo({ top: 0, behavior: 'smooth' });
});

function openProjectModal(index) {
  currentIdx = index;
  const shoot = SHOOTS_DATABASE[index];
  document.getElementById('modalClient').textContent = shoot.client;
  document.getElementById('modalDate').textContent = shoot.date;
  document.getElementById('modalLocation').textContent = shoot.location;
  document.getElementById('modalCategory').textContent = shoot.type;
  document.getElementById('modalTitle').textContent = shoot.title;
  document.getElementById('modalDesc').textContent = shoot.description;

  activeGallery = shoot.gallery;
  projectPhotoGrid.innerHTML = '';

  shoot.gallery.forEach((url, idx) => {
    const card = document.createElement('div');
    card.className = `grid-photo-card hover-trigger ${idx % 3 === 0 ? 'full-width' : ''}`;
    card.setAttribute('data-tag', `FULLSCREEN [${idx + 1}]`);
    
    const proxiedUrl = getOptimizedImageUrl(url, 900, 75);

    card.innerHTML = `
      <img src="${proxiedUrl}" alt="${shoot.title} photo ${idx + 1}" loading="lazy">
      <span class="photo-expand-badge">VIEW FULLSCREEN</span>
    `;

    card.addEventListener('click', () => openLightbox(idx));
    projectPhotoGrid.appendChild(card);
  });

  renderRelatedProjects(index);

  projectModal.scrollTop = 0;
  projectModal.classList.add('active');
  projectModal.setAttribute('aria-hidden', 'false');
  attachHoverListeners();
}

function renderRelatedProjects(currentIndex) {
  const relatedContainer = document.getElementById('relatedProjectsGrid');
  relatedContainer.innerHTML = '';

  const pool = SHOOTS_DATABASE.filter((_, idx) => idx !== currentIndex);
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  selected.forEach(shoot => {
    const originalIndex = SHOOTS_DATABASE.findIndex(s => s.id === shoot.id);
    const card = document.createElement('div');
    card.className = 'related-card hover-trigger';
    card.setAttribute('data-tag', `VIEW ${shoot.id}`);

    const proxiedCover = getOptimizedImageUrl(shoot.coverImage, 600, 75);

    card.innerHTML = `
      <div class="related-card-img-box">
        <img src="${proxiedCover}" alt="${shoot.title}" class="related-card-img" loading="lazy">
        <canvas class="related-static-canvas"></canvas>
        <div class="related-card-scanlines"></div>
        <div class="related-card-overlay">
          <span class="related-feed-id">${shoot.id}</span>
          <span class="category-badge">${shoot.type}</span>
        </div>
      </div>
      <div class="related-card-body">
        <span class="related-card-client">${shoot.client}</span>
        <h4 class="related-card-title">${shoot.title}</h4>
      </div>
    `;

    card.addEventListener('click', () => {
      switchFeed(originalIndex);
      openProjectModal(originalIndex);
    });

    relatedContainer.appendChild(card);
  });

  startCardStaticLoop();
}

inspectBtn.addEventListener('click', () => {
  openProjectModal(currentIdx);
});

closeProjectBtn.addEventListener('click', () => {
  projectModal.classList.remove('active');
  projectModal.setAttribute('aria-hidden', 'true');
  stopCardStaticLoop();
  renderRelatedProjects(currentIdx);
});

function openLightbox(idx) {
  lightboxIdx = idx;
  updateLightboxImage();
  lightboxModal.classList.add('active');
  lightboxModal.setAttribute('aria-hidden', 'false');
}

function updateLightboxImage() {
  lightboxImage.src = getOptimizedImageUrl(activeGallery[lightboxIdx], 1800, 85);
  lightboxCounter.textContent = `${lightboxIdx + 1} / ${activeGallery.length}`;
}

lightboxPrevBtn.addEventListener('click', () => {
  lightboxIdx = (lightboxIdx - 1 + activeGallery.length) % activeGallery.length;
  updateLightboxImage();
});

lightboxNextBtn.addEventListener('click', () => {
  lightboxIdx = (lightboxIdx + 1) % activeGallery.length;
  updateLightboxImage();
});

closeLightboxBtn.addEventListener('click', () => {
  lightboxModal.classList.remove('active');
  lightboxModal.setAttribute('aria-hidden', 'true');
});

// Satellite Uplink Contact Pre-loader Sequence
const satUplinkModal = document.getElementById('satUplinkModal');
const satProgressFill = document.getElementById('satProgressFill');
const satStatusLine1 = document.getElementById('satStatusLine1');
const satStatusLine2 = document.getElementById('satStatusLine2');

const dispatchDrawer = document.getElementById('dispatchDrawer');
const openDispatchBtn = document.getElementById('openDispatchBtn');
const closeDispatchBtn = document.getElementById('closeDispatchBtn');
const localClock = document.getElementById('localClock');
const dispatchForm = document.getElementById('dispatchForm');

openDispatchBtn.addEventListener('click', () => {
  satUplinkModal.classList.add('active');
  satUplinkModal.setAttribute('aria-hidden', 'false');
  satProgressFill.style.width = '0%';
  satStatusLine1.textContent = '> ACQUIRING ORBITAL SATELLITE...';
  satStatusLine2.textContent = '> INITIALIZING FREQUENCY MATCH';

  setTimeout(() => {
    satProgressFill.style.width = '50%';
    satStatusLine1.textContent = '> SATELLITE LOCK CONFIRMED [NORAD_SAT_89]';
    satStatusLine2.textContent = '> ESTABLISHING ENCRYPTED CANBUS LINK...';
  }, 600);

  setTimeout(() => {
    satProgressFill.style.width = '100%';
    satStatusLine1.textContent = '> UPLINK ONLINE // 24.8 GHZ';
    satStatusLine2.textContent = '> CONNECTED TO DISPATCH TERMINAL';
  }, 1200);

  setTimeout(() => {
    satUplinkModal.classList.remove('active');
    satUplinkModal.setAttribute('aria-hidden', 'true');
    dispatchDrawer.classList.add('active');
  }, 1600);
});

closeDispatchBtn.addEventListener('click', () => dispatchDrawer.classList.remove('active'));

function updateClock() {
  const options = { timeZone: 'Europe/Amsterdam', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  localClock.textContent = new Intl.DateTimeFormat([], options).format(new Date()) + ' CEST';
}
setInterval(updateClock, 1000);
updateClock();

dispatchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('senderName').value;
  const line1 = document.getElementById('termLine1');
  const line2 = document.getElementById('termLine2');

  line1.textContent = `> Encrypting transmission for ${name}...`;
  setTimeout(() => {
    line2.textContent = `> SUCCESS: Direct push alert delivered via satellite. SLA response <24h active.`;
    dispatchForm.reset();
  }, 1200);
});

// Initialize Engine & Boot Loader
document.addEventListener('DOMContentLoaded', () => {
  initBootSequence();
  buildFeeds();
  attachHoverListeners();
});