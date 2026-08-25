/**
 * SILVERY MEDIA — PORTFOLIO CONFIGURATION
 * ----------------------------------------------------------------------
 */

const SILVERY_PROJECTS = [
  {
    id: "01",
    title: "BMW M4 F82",
    category: "PHOTOGRAPHY",
    year: "2025",
    summary: "Architectural daylight framing emphasizing sculpted power-dome body lines, muscular rear quarter flares, and brushed silver concave wheel fitment against minimalist concrete structures. Premium photography for social media",
    folder: "assets/bmwM4",
    thumbnail: 1,
    impressionImage: 2
  },
  {
    id: "02",
    title: "Mustang GT",
    category: "PHOTOGRAPHY",
    year: "2025",
    summary: "Symmetrical head-on portrait highlighting the iconic dual grille lighting signature and wide muscle-car stance against an expansive, muted landscape under soft diffuse skies. Premium photography for social media",
    folder: "assets/mustangAJ",
    thumbnail: 1,
    impressionImage: 9
  },
  {
    id: "03",
    title: "Abarth Punto",
    category: "PHOTOGRAPHY",
    year: "2026",
    summary: "Low-angle perspective set across modern cable bridge architecture, using directional rim lighting and lens flare to accent wide wheel arches, dual exhaust exits, and track-ready styling. Premium photography for social media",
    folder: "assets/abarthPunto",
    thumbnail: 3,
    impressionImage: 1
  },
  {
    id: "04",
    title: "911 GT3 RS",
    category: "PHOTOGRAPHY",
    year: "2026",
    summary: "Golden hour aerodynamic study capturing aggressive swan-neck downforce geometry, exposed carbon vents, and wide track-focused contours framed against a vibrant twilight horizon. Premium photography for social media",
    folder: "assets/gt3rs",
    thumbnail: 11,
    impressionImage: 5
  }
];

// Global State
let activeGalleryImages = [];
let currentLightboxIndex = 0;
let currentFilter = "ALL";

// --- INITIALIZE CONTROLLERS --- //
document.addEventListener("DOMContentLoaded", () => {
  setupHeroFeaturedStory();
  renderVisualImpressions();
  renderLatestWork();
  initAllProjectsView();
  initScrollObserver();
  initModalAndLightbox();
  initContactDrawer();
  initScrollToTopButtons();
});

/**
 * 1. HERO FEATURED STORY
 */
function setupHeroFeaturedStory() {
  if (SILVERY_PROJECTS.length === 0) return;

  const latestProject = SILVERY_PROJECTS[SILVERY_PROJECTS.length - 1];
  const heroImg = document.getElementById("heroImage");
  const heroTag = document.getElementById("heroStoryTag");
  const heroFrame = document.getElementById("heroFrame");
  const thumbNum = latestProject.thumbnail || 1;

  if (heroImg && heroTag) {
    heroImg.src = `${latestProject.folder}/${thumbNum}.jpg`;
    heroTag.textContent = `FEATURED PROJECT — ${latestProject.title}`;

    heroImg.onerror = () => {
      heroImg.src = "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2400&q=85";
    };

    heroFrame.onclick = () => openGallery(latestProject);
  }
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
    
    // Ensure impression photo is distinct from thumbnail
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
          <span class="project-explore-btn">OPEN SHOOT ARCHIVE &rarr;</span>
        </div>
      </article>
    `;
  }).join("");

  container.querySelectorAll(".project-card").forEach((card) => {
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
            <span class="project-explore-btn">OPEN SHOOT ARCHIVE &rarr;</span>
          </div>
        </article>
      `;
    }).join("");

    projectsContainer.querySelectorAll(".project-card").forEach((card) => {
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
 * 5. AUTO-SCAN & SINGLE GALLERY MODAL
 */
function probeImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function autoScanFolder(folderPath) {
  const extensions = ["jpg", "jpeg", "png", "webp"];
  const discovered = [];
  let index = 1;
  let consecutiveMisses = 0;

  while (consecutiveMisses < 2 && index <= 50) {
    const padded = String(index).padStart(2, "0");
    let found = false;

    for (const ext of extensions) {
      const candidates = [
        `${folderPath}/${index}.${ext}`,
        `${folderPath}/${padded}.${ext}`
      ];

      for (const url of candidates) {
        if (!discovered.includes(url)) {
          const exists = await probeImage(url);
          if (exists) {
            discovered.push(url);
            found = true;
            break;
          }
        }
      }
      if (found) break;
    }

    if (found) {
      consecutiveMisses = 0;
    } else {
      consecutiveMisses++;
    }
    index++;
  }

  return discovered;
}

async function openGallery(project) {
  const modal = document.getElementById("galleryModal");
  const catEl = document.getElementById("modalProjectCategory");
  const titleEl = document.getElementById("modalProjectTitle");
  const descEl = document.getElementById("modalProjectDesc");
  const gridEl = document.getElementById("modalGalleryGrid");

  catEl.textContent = `${project.id} / ${project.category} — ${project.year}`;
  titleEl.textContent = project.title;
  descEl.textContent = project.summary;

  gridEl.innerHTML = `<p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">LOADING ARCHIVE...</p>`;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  const images = await autoScanFolder(project.folder);
  activeGalleryImages = images;

  if (images.length === 0) {
    gridEl.innerHTML = `<p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">NO IMAGES FOUND IN ${project.folder}</p>`;
    return;
  }

  gridEl.innerHTML = images
    .map((src, i) => `<img src="${src}" data-img-index="${i}" alt="${project.title} frame ${i + 1}" loading="lazy" />`)
    .join("");

  gridEl.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => {
      const imgIdx = parseInt(img.getAttribute("data-img-index"), 10);
      openLightbox(imgIdx);
    });
  });
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
}

function updateLightboxView() {
  const lightboxImg = document.getElementById("lightboxImage");
  const counter = document.getElementById("lightboxCounter");

  lightboxImg.src = activeGalleryImages[currentLightboxIndex];

  const currentNum = String(currentLightboxIndex + 1).padStart(2, "0");
  const totalNum = String(activeGalleryImages.length).padStart(2, "0");
  counter.textContent = `${currentNum} / ${totalNum}`;
}

function nextLightboxImage() {
  if (!activeGalleryImages.length) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % activeGalleryImages.length;
  updateLightboxView();
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
    modal.classList.remove("active");
    if (!document.getElementById("allProjectsModal").classList.contains("active")) {
      document.body.style.overflow = "auto";
    }
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
        modal.classList.remove("active");
        if (!document.getElementById("allProjectsModal").classList.contains("active")) {
          document.body.style.overflow = "auto";
        }
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

  // Main Page Scroll Listener
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

  // Single Project Gallery Modal Scroll Listener
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

  // All Projects Archive Modal Scroll Listener
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