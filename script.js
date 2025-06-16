const CONFIG = {
  whatsappNumber: "554499380249",
  scrollOffset: 200,
  animationDuration: 300,
};

const AppState = {
  currentFilter: "all",
  isModalOpen: false,
  isMobileMenuOpen: false,
};

const bolosData = {
  bolo1: {
    title: "Elegância Clássica",
    image: "assets/images/WhatsApp Image 2025-05-20 at 19.49.53 (1).jpeg",
    description:
      "Um bolo cenográfico que representa a elegância atemporal. Perfeito para casamentos tradicionais, com detalhes florais delicados e acabamento impecável.",
    features: [
      "Design clássico",
      "Flores artesanais",
      "Acabamento premium",
      "Personalização disponível",
    ],
    category: "Casamento",
  },
  bolo2: {
    title: "Estilo Moderno",
    image: "assets/images/WhatsApp Image 2025-05-20 at 19.49.53 (2).jpeg",
    description:
      "Design contemporâneo e sofisticado para casais que buscam algo único e atual. Linhas limpas e elementos modernos.",
    features: [
      "Design contemporâneo",
      "Linhas minimalistas",
      "Cores neutras",
      "Estilo sofisticado",
    ],
    category: "Casamento",
  },
  bolo3: {
    title: "Festa dos Sonhos",
    image: "assets/images/WhatsApp Image 2025-05-20 at 19.49.53 (3).jpeg",
    description:
      "Especialmente criado para festas de 15 anos, este bolo cenográfico traz toda a magia e encanto que uma debutante merece.",
    features: [
      "Tema personalizado",
      "Cores vibrantes",
      "Detalhes únicos",
      "Estilo jovem",
    ],
    category: "15 Anos",
  },
  bolo4: {
    title: "Romance Floral",
    image: "assets/images/WhatsApp Image 2025-05-20 at 19.49.53 (4).jpeg",
    description:
      "Delicadeza em cada detalhe, com flores artesanais que trazem romantismo e sofisticação para o seu casamento.",
    features: [
      "Flores artesanais",
      "Design romântico",
      "Detalhes delicados",
      "Acabamento artístico",
    ],
    category: "Casamento",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  setupScrollEffects();
  setupFilterSystem();
  setupLazyLoading();
  setupAnimations();
}

function setupEventListeners() {
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", throttle(handleScroll, 100));
    scrollToTopBtn.addEventListener("click", scrollToTop);
  }

  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => filterBolos(e.target.dataset.filter));
  });

  window.addEventListener("click", (e) => {
    const modal = document.getElementById("bolo-modal");
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", handleKeyboardNavigation);

  window.addEventListener("scroll", throttle(updateHeaderOnScroll, 100));
}

function setupScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".bolo-card, .feature, .section-title"
  );
  animatedElements.forEach((el) => observer.observe(el));
}

function handleScroll() {
  const scrollToTopBtn = document.getElementById("scrollToTop");
  const scrollY = window.scrollY;

  if (scrollToTopBtn) {
    if (scrollY > CONFIG.scrollOffset) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  }
}

function updateHeaderOnScroll() {
  const header = document.getElementById("header");
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function setupFilterSystem() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const boloCards = document.querySelectorAll(".bolo-card");

  updateFilterButtons("all");
}

function filterBolos(filter) {
  AppState.currentFilter = filter;
  const boloCards = document.querySelectorAll(".bolo-card");

  boloCards.forEach((card) => {
    const category = card.dataset.category;
    const shouldShow = filter === "all" || category === filter;

    if (shouldShow) {
      card.style.display = "block";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50);
    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.display = "none";
      }, CONFIG.animationDuration);
    }
  });

  updateFilterButtons(filter);
}

function updateFilterButtons(activeFilter) {
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    if (btn.dataset.filter === activeFilter) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function openModal(boloId) {
  const modal = document.getElementById("bolo-modal");
  const modalBody = document.getElementById("modal-body");
  const boloData = bolosData[boloId];

  if (!boloData || !modal || !modalBody) return;

  const modalContent = `
        <div class="modal-header">
            <img src="${boloData.image}" alt="${
    boloData.title
  }" class="modal-image">
        </div>
        <div class="modal-info">
            <h2 class="modal-title">${boloData.title}</h2>
            <p class="modal-category">${boloData.category}</p>
            <p class="modal-description">${boloData.description}</p>
            <div class="modal-features">
                <h3>Características:</h3>
                <ul>
                    ${boloData.features
                      .map((feature) => `<li>${feature}</li>`)
                      .join("")}
                </ul>
            </div>
            <div class="modal-actions">
                <a href="https://wa.me/${
                  CONFIG.whatsappNumber
                }?text=Olá! Gostaria de saber mais sobre o bolo '${
    boloData.title
  }'" 
                   target="_blank" 
                   class="modal-whatsapp-btn"
                   onclick="confirmWhatsApp(event, 'modal', '${
                     boloData.title
                   }')">
                    Solicitar Orçamento
                </a>
            </div>
        </div>
    `;

  modalBody.innerHTML = modalContent;
  modal.style.display = "block";
  AppState.isModalOpen = true;
  document.body.style.overflow = "hidden";

  addModalStyles();
}

function closeModal() {
  const modal = document.getElementById("bolo-modal");
  if (modal) {
    modal.style.display = "none";
    AppState.isModalOpen = false;
    document.body.style.overflow = "auto";
  }
}

function addModalStyles() {
  if (document.getElementById("modal-dynamic-styles")) return;

  const styles = `
        <style id="modal-dynamic-styles">
            .modal-image {
                width: 100%;
                height: 300px;
                object-fit: cover;
                border-radius: 12px 12px 0 0;
            }
            .modal-info {
                padding: 30px;
            }
            .modal-title {
                font-family: 'Forum', serif;
                font-size: 2rem;
                margin-bottom: 10px;
                color: var(--text-dark);
            }
            .modal-category {
                color: var(--accent-color);
                font-weight: 600;
                margin-bottom: 20px;
                text-transform: uppercase;
                font-size: 0.9rem;
                letter-spacing: 1px;
            }
            .modal-description {
                color: var(--text-light);
                line-height: 1.6;
                margin-bottom: 25px;
                font-size: 1.1rem;
            }
            .modal-features h3 {
                color: var(--text-dark);
                margin-bottom: 15px;
                font-size: 1.2rem;
            }
            .modal-features ul {
                list-style: none;
                padding: 0;
            }
            .modal-features li {
                padding: 8px 0;
                border-bottom: 1px solid var(--light-gray);
                color: var(--text-light);
            }
            .modal-features li:before {
                content: '✓';
                color: var(--accent-color);
                font-weight: bold;
                margin-right: 10px;
            }
            .modal-actions {
                margin-top: 30px;
                text-align: center;
            }
            .modal-whatsapp-btn {
                display: inline-block;
                background: #25d366;
                color: white;
                padding: 15px 30px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 600;
                transition: var(--transition);
                box-shadow: var(--shadow);
            }
            .modal-whatsapp-btn:hover {
                background: #128c7e;
                transform: translateY(-2px);
                box-shadow: var(--shadow-hover);
            }
            @media (max-width: 768px) {
                .modal-image {
                    height: 200px;
                }
                .modal-info {
                    padding: 20px;
                }
                .modal-title {
                    font-size: 1.5rem;
                }
            }
        </style>
    `;
  document.head.insertAdjacentHTML("beforeend", styles);
}

function toggleMobileMenu() {
  AppState.isMobileMenuOpen = !AppState.isMobileMenuOpen;
  const navMenu = document.getElementById("nav-menu");
  const toggle = document.getElementById("mobile-menu-toggle");

  if (navMenu && toggle) {
    if (AppState.isMobileMenuOpen) {
      navMenu.classList.add("mobile-open");
      toggle.classList.add("active");
    } else {
      navMenu.classList.remove("mobile-open");
      toggle.classList.remove("active");
    }
  }
}

function setupLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

function setupAnimations() {
  const boloCards = document.querySelectorAll(".bolo-card");
  boloCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

function handleKeyboardNavigation(e) {
  if (e.key === "Escape" && AppState.isModalOpen) {
    closeModal();
  }

  if (e.key === "Escape" && AppState.isMobileMenuOpen) {
    toggleMobileMenu();
  }
}

function trackWhatsAppClick(source = "float", productName = "") {
  console.log(`WhatsApp clicked from: ${source}`, productName);
}

function confirmWhatsApp(event, source, productName) {
  const userConfirmed = confirm(
    "Você será redirecionado para o WhatsApp. Deseja continuar?"
  );
  if (!userConfirmed) {
    event.preventDefault();
    return false;
  }
  trackWhatsAppClick(source, productName);
  return true;
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;

    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}

function measurePerformance() {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(
        "Page Load Time:",
        perfData.loadEventEnd - perfData.loadEventStart,
        "ms"
      );
    });
  }
}

window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error);
});

measurePerformance();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered'))
    //     .catch(error => console.log('SW registration failed'));
  });
}

window.AngelBolos = {
  openModal,
  closeModal,
  filterBolos,
  trackWhatsAppClick,
  confirmWhatsApp,
  scrollToTop,
};

// Declare gtag variable
window.gtag =
  window.gtag ||
  (() => {
    (window.gtag.q = window.gtag.q || []).push(arguments);
  });

// Filtro de depoimentos
document.addEventListener("DOMContentLoaded", function () {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const depoimentoCards = document.querySelectorAll(".depoimento-card");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.dataset.filter;

      // Update active tab
      tabBtns.forEach((tab) => tab.classList.remove("active"));
      this.classList.add("active");

      // Filter testimonials
      depoimentoCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = filter === "all" || category === filter;

        if (shouldShow) {
          card.classList.remove("hidden");
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.classList.add("hidden");
          }, 300);
        }
      });
    });
  });
});

function loadMoreTestimonials() {
  // Simular carregamento de mais depoimentos
  const button = document.querySelector(".load-more-btn");
  button.textContent = "Carregando...";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = "Todos os depoimentos carregados";
    button.style.opacity = "0.6";
  }, 1500);
}

// Filtro de depoimentos
document.addEventListener("DOMContentLoaded", function () {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const depoimentoCards = document.querySelectorAll(".depoimento-card");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.dataset.filter;

      // Update active tab
      tabBtns.forEach((tab) => tab.classList.remove("active"));
      this.classList.add("active");

      // Filter testimonials
      depoimentoCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = filter === "all" || category === filter;

        if (shouldShow) {
          card.classList.remove("hidden");
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.classList.add("hidden");
          }, 300);
        }
      });
    });
  });
});

function loadMoreTestimonials() {
  // Simular carregamento de mais depoimentos
  const button = document.querySelector(".load-more-btn");
  button.textContent = "Carregando...";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = "Todos os depoimentos carregados";
    button.style.opacity = "0.6";
  }, 1500);
}

// Dados específicos para bolos de 15 anos
const quinzeAnosData = {
  quinze1: {
    title: "Princesa dos Sonhos",
    image: "assets/images/WhatsApp Image 2025-05-30 at 08.59.55.jpeg",
    description:
      "Um bolo cenográfico que realiza o sonho de toda debutante. Design elegante e romântico com detalhes que encantam e impressionam todos os convidados.",
    features: [
      "Design princesa",
      "Cores suaves e delicadas",
      "Detalhes em dourado",
      "Flores artesanais",
      "Perfeito para fotos",
    ],
    category: "15 Anos",
    style: "Romântico",
  },
  quinze2: {
    title: "Juventude Moderna",
    image: "assets/images/WhatsApp Image 2025-05-20 at 19.49.53 (8).jpeg",
    description:
      "Para debutantes que preferem um estilo mais contemporâneo e jovem. Design moderno que reflete a personalidade atual das jovens.",
    features: [
      "Design contemporâneo",
      "Cores vibrantes",
      "Estilo jovem",
      "Detalhes modernos",
      "Tendência atual",
    ],
    category: "15 Anos",
    style: "Moderno",
  },
  quinze3: {
    title: "Jardim Encantado",
    image: "assets/images/WhatsApp Image 2025-05-20 at 19.49.53 (3).jpeg",
    description:
      "Inspirado na natureza, este bolo traz a delicadeza das flores e a magia de um jardim secreto para a festa da debutante.",
    features: [
      "Tema floral",
      "Cores naturais",
      "Flores delicadas",
      "Estilo romântico",
      "Inspiração natural",
    ],
    category: "15 Anos",
    style: "Natural",
  },
  quinze4: {
    title: "Luxo Real",
    image: "assets/images/WhatsApp Image 2025-05-20 at 19.49.53 (7).jpeg",
    description:
      "Para debutantes que sonham com uma festa luxuosa e sofisticada. Um bolo que transmite elegância e requinte em cada detalhe.",
    features: [
      "Design luxuoso",
      "Acabamento premium",
      "Detalhes sofisticados",
      "Estilo real",
      "Máxima elegância",
    ],
    category: "15 Anos",
    style: "Luxo",
  },
};

// Sobrescrever função openModal para dados de 15 anos
function openModal(boloId) {
  const modal = document.getElementById("bolo-modal");
  const modalBody = document.getElementById("modal-body");
  const boloData = quinzeAnosData[boloId];

  if (!boloData || !modal || !modalBody) return;

  const modalContent = `
        <div class="modal-header">
            <img src="${boloData.image}" alt="${
    boloData.title
  }" class="modal-image">
        </div>
        <div class="modal-info">
            <h2 class="modal-title">${boloData.title}</h2>
            <p class="modal-category">${boloData.category} • ${
    boloData.style
  }</p>
            <p class="modal-description">${boloData.description}</p>
            <div class="modal-features">
                <h3>Características:</h3>
                <ul>
                    ${boloData.features
                      .map((feature) => `<li>${feature}</li>`)
                      .join("")}
                </ul>
            </div>
            <div class="modal-actions">
                <a href="https://wa.me/554499380249?text=Olá! Gostaria de saber mais sobre o bolo '${
                  boloData.title
                }' para festa de 15 anos" 
                   target="_blank" 
                   class="modal-whatsapp-btn"
                   onclick="confirmWhatsApp(event, 'modal', '${
                     boloData.title
                   }')">
                    Solicitar Orçamento
                </a>
            </div>
        </div>
    `;

  modalBody.innerHTML = modalContent;
  modal.style.display = "block";
  AppState.isModalOpen = true;
  document.body.style.overflow = "hidden";

  addModalStyles();
}

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      menu.classList.toggle('show-mobile');
    });
  }
});