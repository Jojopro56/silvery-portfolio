/**
 * SILVERY MEDIA — PORTFOLIO CONFIGURATION
 * ----------------------------------------------------------------------
 */

/**
 * FEATURED HERO PROJECTS PICKER
 * Enter the 3 project IDs you want to loop in the Hero Showcase (in order).
 */
const FEATURED_PROJECT_IDS = ["04", "02", "03"];
const HERO_SLIDE_DURATION_MS = 7000; // 7 seconds per project

const SILVERY_PROJECTS = [
  {
    id: "01",
    slug: "bmw-m4-f82",
    title: "BMW M4 F82",
    category: "PRIVATE SHOOT",
    year: "2025",
    summary: "Architectural daylight framing emphasizing sculpted power-dome body lines, muscular rear quarter flares, and brushed silver concave wheel fitment against minimalist concrete structures. Premium photography for social media",
    folder: "assets/bmwM4",
    thumbnail: 1,
    impressionImage: 2
  },
  {
    id: "02",
    slug: "mustang-gt",
    title: "Mustang GT",
    category: "PRIVATE SHOOT",
    year: "2025",
    summary: "Symmetrical head-on portrait highlighting the iconic dual grille lighting signature and wide muscle-car stance against an expansive, muted landscape under soft diffuse skies. Premium photography for social media",
    folder: "assets/mustangAJ",
    thumbnail: 1,
    impressionImage: 9
  },
  {
    id: "03",
    slug: "abarth-punto",
    title: "Abarth Punto",
    category: "PRIVATE SHOOT",
    year: "2026",
    summary: "Low-angle perspective set across modern cable bridge architecture, using directional rim lighting and lens flare to accent wide wheel arches, dual exhaust exits, and track-ready styling. Premium photography for social media",
    folder: "assets/abarthPunto",
    thumbnail: 3,
    impressionImage: 1
  },
  {
    id: "04",
    slug: "porsche-gt3rs",
    title: "911 GT3 RS",
    category: "PRIVATE SHOOT",
    year: "2026",
    summary: "Golden hour aerodynamic study capturing aggressive swan-neck downforce geometry, exposed carbon vents, and wide track-focused contours framed against a vibrant twilight horizon. Premium photography for social media",
    folder: "assets/gt3rs",
    thumbnail: 11,
    impressionImage: 5
  },
  {
    id: "05",
    slug: "porsche-cup-benelux-zolder",
    title: "Porsche Cup Benelux",
    category: "MOTORSPORT",
    year: "2026",
    summary: "High-velocity trackside reportage at Circuit Zolder capturing the raw mechanical intensity of the 992 GT3 Cup grid—featuring glowing carbon-ceramic brake rotors under heavy braking, aggressive slow-shutter panning across red-and-white kerbs, and atmospheric pit-lane rollouts.",
    folder: "assets/porscheCupZolder", // Update to match your folder name
    thumbnail: 2,        // Frame 4: #55 Valvoline 992 GT3 Cup side-panning with glowing front brake disc
    impressionImage: 5   // Frame 5: #977 MDM rear three-quarter rollout with radial crowd motion blur
  },
  {
    id: "06",
    slug: "abarth-punto-loods",
    title: "Abarth Punto Evo Duo",
    category: "PRIVATE SHOOT",
    year: "2026",
    summary: "Industrial indoor warehouse session showcasing twin white Abarth Punto Evos under overhead fluorescent strip lighting—highlighting red scorpion heritage striping, multi-spoke Esseesse alloy wheels over red Brembo calipers, and polished dual exhaust tailpipes. Premium photography for social media",
    folder: "assets/abarthPuntoLoods", // Pas aan naar jouw gewenste mapnaam
    thumbnail: 2,        // Frame 1: Wide duo-shot van beide witte Abarth Punto Evo's in de loods
    impressionImage: 3   // Frame 3: Low-angle wiel-fitment van de zwarte en antraciete Esseesse velgen
  }
];

// Global State
let activeGalleryImages = [];
let currentLightboxIndex = 0;
let currentFilter = "ALL";

// Progressive Gallery Loader State
let currentGallerySession = 0;
let galleryLoadState = null;
let galleryScrollObserver = null;

// Mobile Center-Screen Color Observers
let windowColorObserver = null;
let galleryModalColorObserver = null;
let allProjectsModalColorObserver = null;

// --- INITIALIZE CONTROLLERS --- //
document.addEventListener("DOMContentLoaded", () => {
  initMobileColorObservers();
  setupHeroFeaturedStory();
  renderVisualImpressions();
  renderLatestWork();
  initAllProjectsView();
  initScrollObserver();
  initModalAndLightbox();
  initContactDrawer();
  initScrollToTopButtons();
  initRouting();
});

/**
 * 0. URL ROUTING & DEEP LINKS (e.g. https://silverymedia.nl/porsche-gt3rs)
 */
function getSlugFromLocation() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  if (path && path !== "index.html") {
    return path.toLowerCase();
  }
  const params = new URLSearchParams(window.location.search);
  if (params.get("project")) {
    return params.get("project").toLowerCase();
  }
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (hash) {
    return hash.toLowerCase();
  }
  return null;
}

function updateUrlForProject(project, replace = false) {
  if (window.location.protocol === "file:") {
    window.location.hash = project ? project.slug : "";
    return;
  }
  const targetUrl = project ? `/${project.slug}` : "/";
  if (window.location.pathname !== targetUrl) {
    try {
      if (replace) {
        window.history.replaceState({ projectSlug: project ? project.slug : null }, "", targetUrl);
      } else {
        window.history.pushState({ projectSlug: project ? project.slug : null }, "", targetUrl);
      }
    } catch (err) {
      window.location.hash = project ? project.slug : "";
    }
  }
}

function initRouting() {
  // Restore clean path if redirected from GitHub Pages 404.html
  const savedRedirect = sessionStorage.getItem("gh_redirect");
  if (savedRedirect) {
    sessionStorage.removeItem("gh_redirect");
    window.history.replaceState(null, "", savedRedirect);
  }
  const handleCurrentRoute = () => {
    const slug = getSlugFromLocation();
    if (slug) {
      const matchedProject = SILVERY_PROJECTS.find(
        (p) => p.slug.toLowerCase() === slug || p.id === slug
      );
      if (matchedProject) {
        openGallery(matchedProject, false);
        return;
      }
    }
    // Close gallery if navigated back to root "/"
    const modal = document.getElementById("galleryModal");
    if (modal && modal.classList.contains("active")) {
      closeGalleryModal(false);
    }
  };

  window.addEventListener("popstate", handleCurrentRoute);
  handleCurrentRoute();
}

/**
 * 0B. MOBILE VIEWPORT CENTER COLOR REVEAL
 * Transitions images from B&W to color when positioned in the middle 36% of the screen
 */
function initMobileColorObservers() {
  const observerConfig = {
    // Top and bottom -32% shrinks the trigger zone to the middle 36% of the viewport
    rootMargin: "-32% 0px -32% 0px",
    threshold: 0
  };

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-center-view");
      } else {
        entry.target.classList.remove("in-center-view");
      }
    });
  };

  windowColorObserver = new IntersectionObserver(handleIntersect, {
    ...observerConfig,
    root: null
  });

  const galleryModal = document.getElementById("galleryModal");
  if (galleryModal) {
    galleryModalColorObserver = new IntersectionObserver(handleIntersect, {
      ...observerConfig,
      root: galleryModal
    });
  }

  const allProjectsModal = document.getElementById("allProjectsModal");
  if (allProjectsModal) {
    allProjectsModalColorObserver = new IntersectionObserver(handleIntersect, {
      ...observerConfig,
      root: allProjectsModal
    });
  }

  // Observe static homepage frames
  const heroFrame = document.getElementById("heroFrame");
  const creatorFrame = document.querySelector(".creator-portrait-frame");
  if (heroFrame) windowColorObserver.observe(heroFrame);
  if (creatorFrame) windowColorObserver.observe(creatorFrame);
}

/**
 * 1. HERO FEATURED STORY
 */
/**
 * 1. HERO FEATURED STORY (3-PROJECT LOOP WITH 7S PROGRESS & WHITE FADE)
 */
let heroLoopTimeout = null;
let heroFadeTimeout = null;

function setupHeroFeaturedStory() {
  if (SILVERY_PROJECTS.length === 0) return;

  const heroImg = document.getElementById("heroImage");
  const heroTag = document.getElementById("heroStoryTag");
  const heroFrame = document.getElementById("heroFrame");
  const heroWhiteFade = document.getElementById("heroWhiteFade");
  const heroProgressBar = document.getElementById("heroProgressBar");
  const heroStripesContainer = document.getElementById("heroStripes");

  if (!heroImg || !heroTag || !heroFrame) return;

  // Resolve the 3 chosen projects by ID (falls back to latest 3 if an ID isn't found)
  let featuredProjects = FEATURED_PROJECT_IDS
    .map((id) => SILVERY_PROJECTS.find((p) => p.id === id))
    .filter(Boolean);

  if (featuredProjects.length === 0) {
    featuredProjects = [...SILVERY_PROJECTS].reverse().slice(0, 3);
  }

  // Preload the featured thumbnails so transitions from white are instant
  featuredProjects.forEach((proj) => {
    const preloadImg = new Image();
    preloadImg.src = `${proj.folder}/${proj.thumbnail || 1}.jpg`;
  });

  // Render the top-left stripes dynamically to match featuredProjects count
  if (heroStripesContainer) {
    heroStripesContainer.innerHTML = featuredProjects
      .map(
        (proj, i) => `
        <span 
          class="hero-stripe ${i === 0 ? "active" : ""}" 
          data-slide-index="${i}" 
          title="${proj.id} / ${proj.title}"
        ></span>`
      )
      .join("");
  }

  let currentHeroIndex = 0;
  let isTransitioning = false;

  const startProgressBar = () => {
    if (!heroProgressBar) return;
    heroProgressBar.style.transition = "none";
    heroProgressBar.style.width = "0%";
    // Force reflow so browser registers 0% before animating to 100%
    void heroProgressBar.offsetWidth;
    heroProgressBar.style.transition = `width ${HERO_SLIDE_DURATION_MS}ms linear`;
    heroProgressBar.style.width = "100%";
  };

  const updateStripeIndicators = (activeIdx) => {
    if (!heroStripesContainer) return;
    heroStripesContainer.querySelectorAll(".hero-stripe").forEach((stripe, idx) => {
      stripe.classList.toggle("active", idx === activeIdx);
    });
  };

  const applyProjectToHero = (project, index) => {
    const thumbNum = project.thumbnail || 1;
    heroImg.src = `${project.folder}/${thumbNum}.jpg`;
    heroImg.alt = project.title;
    heroTag.textContent = `FEATURED PROJECT (${project.id}) — ${project.title}`;

    heroImg.onerror = () => {
      heroImg.src = "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2400&q=85";
    };

    heroFrame.onclick = () => openGallery(project);
    updateStripeIndicators(index);
  };

  const scheduleNextSlide = () => {
    clearTimeout(heroLoopTimeout);
    startProgressBar();

    heroLoopTimeout = setTimeout(() => {
      const nextIndex = (currentHeroIndex + 1) % featuredProjects.length;
      transitionToSlide(nextIndex);
    }, HERO_SLIDE_DURATION_MS);
  };

  const transitionToSlide = (targetIndex) => {
    if (isTransitioning || featuredProjects.length <= 1) return;
    isTransitioning = true;
    clearTimeout(heroLoopTimeout);
    clearTimeout(heroFadeTimeout);

    // Step 1: Fade current thumbnail to pure white (450ms)
    if (heroWhiteFade) {
      heroWhiteFade.classList.add("fading-white");
    }

    heroFadeTimeout = setTimeout(() => {
      // Step 2: Swap project while frame is pure white
      currentHeroIndex = targetIndex;
      const nextProject = featuredProjects[currentHeroIndex];
      applyProjectToHero(nextProject, currentHeroIndex);

      // Ensure new image is ready before fading out from white
      const revealFromWhite = () => {
        if (heroWhiteFade) {
          heroWhiteFade.classList.remove("fading-white");
        }
        isTransitioning = false;
        scheduleNextSlide();
      };

      if (heroImg.complete) {
        revealFromWhite();
      } else {
        heroImg.onload = () => {
          heroImg.onload = null;
          revealFromWhite();
        };
      }
    }, 450);
  };

  // Allow clicking any of the top-left stripes to jump directly to that featured project
  if (heroStripesContainer) {
    heroStripesContainer.querySelectorAll(".hero-stripe").forEach((stripe) => {
      stripe.addEventListener("click", (e) => {
        e.stopPropagation(); // Don't trigger openGallery when clicking a stripe
        const targetIdx = parseInt(stripe.getAttribute("data-slide-index"), 10);
        if (!isNaN(targetIdx) && targetIdx !== currentHeroIndex) {
          transitionToSlide(targetIdx);
        }
      });
    });
  }

  // Initialize first featured project immediately and start the 7-second loop
  applyProjectToHero(featuredProjects[0], 0);
  scheduleNextSlide();
}

/**
 * 2. VISUAL IMPRESSIONS / MASONRY GRID
 */
function renderVisualImpressions() {
  const container = document.getElementById("impressionsContainer");
  if (!container) return;

  const shuffled = [...SILVERY_PROJECTS].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  container.innerHTML = selected.map((project) => {
    const thumbNum = project.thumbnail || 1;
    
    let imgNum = project.impressionImage;
    if (!imgNum || imgNum === thumbNum) {
      imgNum = thumbNum === 1 ? 2 : 1;
    }

    const imgSrc = `${project.folder}/${imgNum}.jpg`;

    return `
      <div class="impression-item" data-project-id="${project.id}">
        <img 
          src="${imgSrc}" 
          alt="${project.title}" 
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80'"
        />
        <div class="impression-tag">${project.id} / ${project.title} &rarr;</div>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".impression-item").forEach((item) => {
    if (windowColorObserver) windowColorObserver.observe(item);
    item.addEventListener("click", () => {
      const pId = item.getAttribute("data-project-id");
      const proj = SILVERY_PROJECTS.find(p => p.id === pId);
      if (proj) openGallery(proj);
    });
  });
}

/**
 * 3. LATEST WORK
 */
function renderLatestWork() {
  const container = document.getElementById("projectsContainer");
  if (!container) return;

  const latest5 = [...SILVERY_PROJECTS].reverse().slice(0, 5);

  container.innerHTML = latest5.map((project) => {
    const thumbNum = project.thumbnail || 1;
    const defaultCover = `${project.folder}/${thumbNum}.jpg`;

    return `
      <article class="project-card reveal-element" data-project-id="${project.id}">
        <div class="project-thumb">
          <img 
            src="${defaultCover}" 
            alt="${project.title}" 
            loading="lazy" 
            onerror="this.src='https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85'"
          />
        </div>
        <div class="project-info">
          <div>
            <div class="project-num">${project.id} / ${project.category} &mdash; ${project.year}</div>
            <h2 class="project-title">${project.title}</h2>
            <p class="project-summary">${project.summary}</p>
          </div>
          <a href="/${project.slug}" class="project-explore-btn" onclick="event.preventDefault();">OPEN SHOOT ARCHIVE &rarr;</a>
        </div>
      </article>
    `;
  }).join("");

  container.querySelectorAll(".project-card").forEach((card) => {
    if (windowColorObserver) windowColorObserver.observe(card);
    card.addEventListener("click", () => {
      const pId = card.getAttribute("data-project-id");
      const proj = SILVERY_PROJECTS.find(p => p.id === pId);
      if (proj) openGallery(proj);
    });
  });
}

/**
 * 4. ALL PROJECTS ARCHIVE & CATEGORY FILTERING
 */
function initAllProjectsView() {
  const modal = document.getElementById("allProjectsModal");
  const openBtn = document.getElementById("openAllProjectsBtn");
  const closeBtn = document.getElementById("allProjectsClose");
  const filterContainer = document.getElementById("categoryFilters");
  const projectsContainer = document.getElementById("allProjectsContainer");

  const categories = ["ALL", ...new Set(SILVERY_PROJECTS.map(p => p.category.toUpperCase()))];

  filterContainer.innerHTML = categories.map(cat => `
    <button type="button" class="filter-btn ${cat === 'ALL' ? 'active' : ''}" data-category="${cat}">
      ${cat}
    </button>
  `).join("");

  const renderFilteredProjects = (cat) => {
    const filtered = cat === "ALL" 
      ? [...SILVERY_PROJECTS].reverse()
      : [...SILVERY_PROJECTS].filter(p => p.category.toUpperCase() === cat).reverse();

    projectsContainer.innerHTML = filtered.map(project => {
      const thumbNum = project.thumbnail || 1;
      const defaultCover = `${project.folder}/${thumbNum}.jpg`;

      return `
        <article class="project-card" data-project-id="${project.id}">
          <div class="project-thumb">
            <img 
              src="${defaultCover}" 
              alt="${project.title}" 
              loading="lazy" 
              onerror="this.src='https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85'"
            />
          </div>
          <div class="project-info">
            <div>
              <div class="project-num">${project.id} / ${project.category} &mdash; ${project.year}</div>
              <h2 class="project-title">${project.title}</h2>
              <p class="project-summary">${project.summary}</p>
            </div>
            <a href="/${project.slug}" class="project-explore-btn" onclick="event.preventDefault();">OPEN SHOOT ARCHIVE &rarr;</a>
          </div>
        </article>
      `;
    }).join("");

    projectsContainer.querySelectorAll(".project-card").forEach((card) => {
      if (allProjectsModalColorObserver) allProjectsModalColorObserver.observe(card);
      card.addEventListener("click", () => {
        const pId = card.getAttribute("data-project-id");
        const proj = SILVERY_PROJECTS.find(p => p.id === pId);
        if (proj) openGallery(proj);
      });
    });
  };

  filterContainer.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      filterContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-category");
      renderFilteredProjects(currentFilter);
    });
  });

  openBtn.addEventListener("click", () => {
    renderFilteredProjects(currentFilter);
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

/**
 * 5. PROGRESSIVE GALLERY LOADER & SINGLE GALLERY MODAL
 * Loads the first 3 images immediately, then pre-loads the next 2-3 as the user scrolls.
 */
function probeImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function probeSingleFrameIndex(folderPath, index) {
  const extensions = ["jpg", "jpeg", "png", "webp"];
  const padded = String(index).padStart(2, "0");

  for (const ext of extensions) {
    const candidates = [
      `${folderPath}/${index}.${ext}`,
      `${folderPath}/${padded}.${ext}`
    ];
    for (const url of candidates) {
      const exists = await probeImage(url);
      if (exists) return url;
    }
  }
  return null;
}

function appendGalleryImageToDOM(src, imgIdx, projectTitle, gridEl) {
  const img = document.createElement("img");
  img.src = src;
  img.setAttribute("data-img-index", imgIdx);
  img.alt = `${projectTitle} frame ${imgIdx + 1}`;
  img.className = "progressive-gallery-img";
  img.decoding = "async";

  img.addEventListener("click", () => {
    openLightbox(imgIdx);
  });

  gridEl.appendChild(img);

  // Trigger mobile center-screen B&W-to-color transition
  if (galleryModalColorObserver) {
    galleryModalColorObserver.observe(img);
  }

  // Trigger progressive look-ahead loading of next 3 images
  if (galleryScrollObserver) {
    galleryScrollObserver.observe(img);
  }
}

async function ensureLoadedUpTo(targetCount) {
  const state = galleryLoadState;
  if (!state || state.isFetching || state.finished) return;

  state.targetCount = Math.max(state.targetCount, targetCount);
  state.isFetching = true;

  const gridEl = document.getElementById("modalGalleryGrid");

  while (
    state.session === currentGallerySession &&
    !state.finished &&
    activeGalleryImages.length < state.targetCount &&
    state.nextProbeIndex <= 50
  ) {
    const foundUrl = await probeSingleFrameIndex(state.project.folder, state.nextProbeIndex);

    // Abort if user switched or closed gallery mid-fetch
    if (state.session !== currentGallerySession) return;

    state.nextProbeIndex++;

    if (foundUrl && !activeGalleryImages.includes(foundUrl)) {
      state.consecutiveMisses = 0;

      // Clear initial loading message on first discovered image
      if (activeGalleryImages.length === 0) {
        gridEl.innerHTML = "";
      }

      const imgIdx = activeGalleryImages.length;
      activeGalleryImages.push(foundUrl);
      appendGalleryImageToDOM(foundUrl, imgIdx, state.project.title, gridEl);

      // Update lightbox counter dynamically if open
      const lightbox = document.getElementById("lightboxModal");
      if (lightbox && lightbox.classList.contains("active")) {
        updateLightboxCounterOnly();
      }
    } else {
      state.consecutiveMisses++;
      if (state.consecutiveMisses >= 2) {
        state.finished = true;
      }
    }
  }

  if (state.session === currentGallerySession) {
    state.isFetching = false;

    if (state.finished && activeGalleryImages.length === 0) {
      gridEl.innerHTML = `<p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">NO IMAGES FOUND IN ${state.project.folder}</p>`;
    } else if (!state.finished && activeGalleryImages.length < state.targetCount) {
      // If a new scroll event raised targetCount while we were fetching, continue
      ensureLoadedUpTo(state.targetCount);
    }
  }
}

async function openGallery(project, pushHistory = true) {
  const modal = document.getElementById("galleryModal");
  const catEl = document.getElementById("modalProjectCategory");
  const titleEl = document.getElementById("modalProjectTitle");
  const descEl = document.getElementById("modalProjectDesc");
  const gridEl = document.getElementById("modalGalleryGrid");

  if (pushHistory) {
    updateUrlForProject(project);
  }
  document.title = `${project.title} — SILVERY MEDIA`;

  catEl.textContent = `${project.id} / ${project.category} — ${project.year}`;
  titleEl.textContent = project.title;
  descEl.textContent = project.summary;

  gridEl.innerHTML = `<p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">LOADING ARCHIVE...</p>`;
  modal.classList.add("active");
  modal.scrollTop = 0;
  document.body.style.overflow = "hidden";

  // Reset Progressive Loader Session
  currentGallerySession++;
  activeGalleryImages = [];

  if (galleryScrollObserver) {
    galleryScrollObserver.disconnect();
  }

  // Look-ahead observer: when an image approaches the viewport, preload the next 3 images
  galleryScrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute("data-img-index"), 10);
          if (!isNaN(idx)) {
            ensureLoadedUpTo(idx + 1 + 3);
          }
        }
      });
    },
    {
      root: modal,
      rootMargin: "0px 0px 650px 0px",
      threshold: 0.01
    }
  );

  galleryLoadState = {
    session: currentGallerySession,
    project: project,
    nextProbeIndex: 1,
    consecutiveMisses: 0,
    isFetching: false,
    finished: false,
    targetCount: 0
  };

  // Immediately load the first 3 images so the top of the gallery renders right away
  await ensureLoadedUpTo(3);
}

function closeGalleryModal(pushHistory = true) {
  const modal = document.getElementById("galleryModal");
  modal.classList.remove("active");
  currentGallerySession++; // Cancel any pending background image probes

  if (galleryScrollObserver) {
    galleryScrollObserver.disconnect();
  }

  document.title = "SILVERY MEDIA";

  if (pushHistory) {
    updateUrlForProject(null);
  }

  if (!document.getElementById("allProjectsModal").classList.contains("active")) {
    document.body.style.overflow = "auto";
  }
}

/**
 * 6. LIGHTBOX CAROUSEL & GESTURES
 */
function openLightbox(index) {
  if (!activeGalleryImages || activeGalleryImages.length === 0) return;
  currentLightboxIndex = index;
  updateLightboxView();
  const lightbox = document.getElementById("lightboxModal");
  lightbox.classList.add("active");

  // Preload 3 images ahead when browsing in lightbox
  ensureLoadedUpTo(index + 1 + 3);
}

function updateLightboxCounterOnly() {
  const counter = document.getElementById("lightboxCounter");
  if (!counter) return;
  const currentNum = String(currentLightboxIndex + 1).padStart(2, "0");
  const suffix = galleryLoadState && !galleryLoadState.finished ? "+" : "";
  const totalNum = String(activeGalleryImages.length).padStart(2, "0") + suffix;
  counter.textContent = `${currentNum} / ${totalNum}`;
}

function updateLightboxView() {
  const lightboxImg = document.getElementById("lightboxImage");
  lightboxImg.src = activeGalleryImages[currentLightboxIndex];
  updateLightboxCounterOnly();
}

async function nextLightboxImage() {
  if (!activeGalleryImages.length) return;

  // If at the end of loaded images and archive isn't finished scanning, fetch next batch
  if (
    currentLightboxIndex + 1 >= activeGalleryImages.length &&
    galleryLoadState &&
    !galleryLoadState.finished
  ) {
    await ensureLoadedUpTo(activeGalleryImages.length + 2);
  }

  currentLightboxIndex = (currentLightboxIndex + 1) % activeGalleryImages.length;
  updateLightboxView();

  // Keep 3 images preloaded ahead of lightbox position
  ensureLoadedUpTo(currentLightboxIndex + 1 + 3);
}

function prevLightboxImage() {
  if (!activeGalleryImages.length) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + activeGalleryImages.length) % activeGalleryImages.length;
  updateLightboxView();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightboxModal");
  lightbox.classList.remove("active");
}

function initModalAndLightbox() {
  const modal = document.getElementById("galleryModal");
  const modalClose = document.getElementById("modalClose");
  const lightbox = document.getElementById("lightboxModal");

  modalClose.addEventListener("click", () => {
    closeGalleryModal(true);
  });

  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxNext").addEventListener("click", (e) => {
    e.stopPropagation();
    nextLightboxImage();
  });
  document.getElementById("lightboxPrev").addEventListener("click", (e) => {
    e.stopPropagation();
    prevLightboxImage();
  });

  // Mobile Touch Swipe
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 40) nextLightboxImage();
    if (touchEndX > touchStartX + 40) prevLightboxImage();
  }, { passive: true });

  window.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("active")) {
      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
      if (e.key === "Escape") closeLightbox();
    } else if (modal.classList.contains("active")) {
      if (e.key === "Escape") {
        closeGalleryModal(true);
      }
    } else if (document.getElementById("allProjectsModal").classList.contains("active")) {
      if (e.key === "Escape") {
        document.getElementById("allProjectsModal").classList.remove("active");
        document.body.style.overflow = "auto";
      }
    }
  });
}

/**
 * 7. CONTACT DRAWER
 */
function initContactDrawer() {
  const openBtn = document.getElementById("openInquireBtn");
  const drawer = document.getElementById("contactDrawer");
  const backdrop = document.getElementById("contactBackdrop");
  const closeBtn = document.getElementById("drawerClose");

  const openDrawer = () => {
    drawer.classList.add("active");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.classList.remove("active");
    backdrop.classList.remove("active");
    if (!document.getElementById("galleryModal").classList.contains("active") &&
      !document.getElementById("allProjectsModal").classList.contains("active")) {
      document.body.style.overflow = "auto";
    }
  };

  if (openBtn) openBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
}

/**
 * 8. SCROLL TO TOP FLOATING BUTTONS (HOMEPAGE, GALLERY & ALL PROJECTS)
 */
function initScrollToTopButtons() {
  const mainTopBtn = document.getElementById("scrollTopBtn");
  const galleryModal = document.getElementById("galleryModal");
  const galleryTopBtn = document.getElementById("modalScrollTopBtn");
  const allProjectsModal = document.getElementById("allProjectsModal");
  const allProjectsTopBtn = document.getElementById("allProjectsScrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      mainTopBtn.classList.add("visible");
    } else {
      mainTopBtn.classList.remove("visible");
    }
  });

  mainTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if (galleryModal && galleryTopBtn) {
    galleryModal.addEventListener("scroll", () => {
      if (galleryModal.scrollTop > 350) {
        galleryTopBtn.classList.add("visible");
      } else {
        galleryTopBtn.classList.remove("visible");
      }
    });

    galleryTopBtn.addEventListener("click", () => {
      galleryModal.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (allProjectsModal && allProjectsTopBtn) {
    allProjectsModal.addEventListener("scroll", () => {
      if (allProjectsModal.scrollTop > 350) {
        allProjectsTopBtn.classList.add("visible");
      } else {
        allProjectsTopBtn.classList.remove("visible");
      }
    });

    allProjectsTopBtn.addEventListener("click", () => {
      allProjectsModal.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/**
 * 9. SCROLL REVEAL OBSERVER
 */
function initScrollObserver() {
  const elements = document.querySelectorAll(".reveal-element");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.05 }
  );

  elements.forEach((el) => {
    observer.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add("is-visible");
    }
  });
}