// loader normal:
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  const content = document.querySelector(".content");

  loader.style.opacity = 0;
  setTimeout(() => {
    loader.style.display = "none";
    content.style.opacity = 1;
  }, 500); // Tiempo para la animación de opacidad
});

// //loader con localstore
// document.addEventListener("DOMContentLoaded", function () {
//   const loader = document.getElementById("loader");
//   const LOADER_MIN_TIME = 3000; // 3 segundos
//   const currentPage = window.location.pathname; // Obtiene la ruta actual de la página
//   const firstVisitKey = `firstVisit_${currentPage}`; // Llave única por página
//   const firstVisit = sessionStorage.getItem(firstVisitKey);

//   // Función para ocultar el loader
//   function hideLoader() {
//     loader.style.display = "none";
//   }

//   // Si es la primera vez que se visita la página
//   if (!firstVisit) {
//     sessionStorage.setItem(firstVisitKey, "true"); // Marca como que ya se ha visitado esta página
//     const startTime = Date.now();

//     // Espera a que todo el contenido de la página esté completamente cargado
//     window.addEventListener("load", function () {
//       const loadTime = Date.now() - startTime;
//       const remainingTime = LOADER_MIN_TIME - loadTime;

//       // Si el tiempo de carga es menor que 3 segundos, espera hasta cumplir los 3 segundos
//       if (remainingTime > 0) {
//         setTimeout(hideLoader, remainingTime);
//       } else {
//         hideLoader(); // Si ya ha pasado más de 3 segundos, oculta inmediatamente
//       }
//     });
//   } else {
//     // Si ya no es la primera visita a esta página, oculta el loader tan pronto como se cargue
//     window.addEventListener("load", hideLoader);
//   }
// });

if (typeof AOS !== "undefined") {
  AOS.init();
}

//navbar eyes
window.addEventListener("scroll", () => {
  const svgDiv = document.querySelector(".eye-contact");
  if (window.scrollY > 96) {
    svgDiv.classList.remove("hidden", "opacity-0", "-translate-y-10");
    svgDiv.classList.add("flex", "opacity-100", "translate-y-0");
  } else {
    svgDiv.classList.remove("flex", "opacity-100", "translate-y-0");
    svgDiv.classList.add("hidden", "opacity-0", "-translate-y-10");
  }
});

const menu = document.getElementById("menu");
const menuButton = document.getElementById("menuButton");
const closeMenuButton = document.getElementById("closeMenuButton");
const body = document.body;

// Función para abrir el menú
menuButton.addEventListener("click", function () {
  menu.classList.remove("translate-x-full");
  menu.classList.add("translate-x-0");
  body.classList.add("overflow-hidden"); // Desactivar el scroll de la página
});

// Función para cerrar el menú
closeMenuButton.addEventListener("click", function () {
  menu.classList.remove("translate-x-0");
  menu.classList.add("translate-x-full");
  body.classList.remove("overflow-hidden"); // Activar el scroll de nuevo
});

document.querySelectorAll(".toggle").forEach((div) => {
  div.addEventListener("click", function () {
    const isActive = this.classList.contains("active");

    document.querySelectorAll(".toggle").forEach((el) => {
      el.classList.remove("active", "bg-black");

      const content = el.querySelector(".content-p");
      content.classList.add("hidden");
      content.classList.remove("flex");

      const h4 = el.querySelector("h4");
      h4.classList.remove("font-semibold", "italic", "text-primaryWhite");

      const svg = el.querySelector("svg");
      svg.classList.remove("rotate-180");

      const path = el.querySelector("path");
      path.setAttribute("fill", "black");
    });

    if (!isActive) {
      this.classList.add("active", "bg-black");

      const h4 = this.querySelector("h4");
      h4.classList.add("font-semibold", "italic", "text-primaryWhite");

      const content = this.querySelector(".content-p");
      content.classList.remove("hidden");
      content.classList.add("flex", "opacity-100");

      const svg = this.querySelector("svg");
      svg.classList.add("rotate-180");

      const path = this.querySelector("path");
      path.setAttribute("fill", "#fffdf8");
    }
  });
});

//swiper
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".swiperPortafolio")) {
    var swiperPortafolio = new Swiper(".swiperPortafolio", {
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: ".swiper-Portafolio .swiper-button-next-portafolio",
        prevEl: ".swiper-Portafolio .swiper-button-prev-portafolio",
      },
      loop: true,
    });
  }
});

//vasos
document.addEventListener("DOMContentLoaded", function () {
  const vaso = document.getElementById("vaso");
  const explosionOverlay = document.getElementById("explosion-overlay");
  const explosionGif = document.getElementById("explosion-gif");
  const blockInteractions = document.getElementById("block-interactions");

  if (vaso) {
    let isClicked = false;
    let resetTimeout;

    // Función para resetear el vaso al estado inicial
    function resetVaso() {
      vaso.src = "https://nerd.pe/wp-content/themes/nerd/video/VASOS-1.webm";
      explosionOverlay.classList.add("hidden"); // Oculta la explosión
      blockInteractions.classList.add("hidden"); // Permite clics y scroll
      explosionGif.src = ""; // Detiene el GIF quitando el src
      isClicked = false;
    }

    // Evento hover para cambiar al GIF paso 1
    vaso.addEventListener("mouseenter", function () {
      if (!isClicked) {
        vaso.src = "https://nerd.pe/wp-content/themes/nerd/video/VASOS-2.webm";
      }
    });

    // Evento para restaurar la imagen original al salir del hover
    vaso.addEventListener("mouseleave", function () {
      if (!isClicked) {
        resetVaso();
      }
    });

    // Evento click para cambiar la imagen y mostrar la explosión
    vaso.addEventListener("click", function () {
      if (!isClicked) {
        isClicked = true;

        // Cambia al GIF de paso 2
        vaso.src = "https://nerd.pe/wp-content/themes/nerd/video/VASOS-3.webm";

        setTimeout(function () {
          explosionOverlay.classList.remove("hidden"); // Muestra la explosión
          blockInteractions.classList.remove("hidden"); // Bloquea clics y scroll
          explosionGif.src =
            "https://nerd.pe/wp-content/themes/nerd/video/EXPLOSION.webm"; // Reproduce el GIF

          // Oculta la explosión y desbloquea la página después de 3.3 segundos
          setTimeout(function () {
            resetVaso(); // Resetea el vaso y la explosión
          }, 3250);
        }, 0);
      }

      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(resetVaso, 10000); // Resetea después de 10 segundos si no ocurre ninguna acción
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    $(".marquee-hello").marquee({
      duration: 10000,
      gap: 0,
      delayBeforeStart: 0,
      direction: "left",
      duplicated: true,
      startVisible: true,
      pauseOnHover: true,
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    $(".marquee-invert").marquee({
      duration: 10000,
      gap: 0,
      delayBeforeStart: 0,
      direction: "right",
      duplicated: true,
      startVisible: true,
      pauseOnHover: true,
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    $(".marquee-slogan").marquee({
      duration: 10000,
      gap: 0,
      delayBeforeStart: 10,
      direction: "left",
      duplicated: true,
      startVisible: true,
      pauseOnHover: true,
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    $(".marquee-equipo").marquee({
      duration: 10000,
      gap: 0,
      delayBeforeStart: 0,
      direction: "left",
      duplicated: true,
      startVisible: true,
      pauseOnHover: true,
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll("#image-grid img"));
  const transitionDuration = 300;
  const interval = 3000;

  function shuffleSingleImage(img) {
    img.style.transition = `opacity ${transitionDuration / 1000}s ease-in-out`;
    img.style.opacity = 0;

    setTimeout(() => {
      const parent = img.parentElement;
      const siblings = Array.from(parent.children);
      const randomIndex = Math.floor(Math.random() * siblings.length);

      parent.insertBefore(img, siblings[randomIndex]);

      setTimeout(() => {
        img.style.opacity = 1;
      }, 100);
    }, transitionDuration);
  }

  function startShufflingImages() {
    images.forEach((img, index) => {
      setTimeout(function shuffle() {
        shuffleSingleImage(img);

        setTimeout(shuffle, interval);
      }, index * 500);
    });
  }

  startShufflingImages();
});

const images = [
  "https://nerd.pe/wp-content/themes/nerd/img/eyes1.svg",
  "https://nerd.pe/wp-content/themes/nerd/img/eyes2.svg",
  "https://nerd.pe/wp-content/themes/nerd/img/eyes4.svg",
  "https://nerd.pe/wp-content/themes/nerd/img/eyes6.svg",
  "https://nerd.pe/wp-content/themes/nerd/img/eyes8.svg",
];

function preloadImages(srcArray, callback) {
  let loadedImages = 0;
  const totalImages = srcArray.length;

  srcArray.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        callback();
      }
    };
  });
}

preloadImages(images, () => {
  document.addEventListener("mousemove", function (event) {
    const eyes = document.querySelectorAll(".eyes");

    eyes.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const imgX = rect.left + rect.width / 2;
      const imgY = rect.top + rect.height / 2;

      const x = event.clientX;
      const y = event.clientY;

      const dx = x - imgX;
      const dy = y - imgY;

      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        img.src = "https://nerd.pe/wp-content/themes/nerd/img/eyes1.svg";
      } else {
        if (dx > 0 && dy > 0) {
          img.src = "https://nerd.pe/wp-content/themes/nerd/img/eyes2.svg";
        } else if (dx > 0 && dy < 0) {
          img.src = "https://nerd.pe/wp-content/themes/nerd/img/eyes4.svg";
        } else if (dx < 0 && dy > 0) {
          img.src = "https://nerd.pe/wp-content/themes/nerd/img/eyes8.svg";
        } else if (dx < 0 && dy < 0) {
          img.src = "https://nerd.pe/wp-content/themes/nerd/img/eyes6.svg";
        }
      }
    });
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const section1 = document.getElementById("section1");
//   const section2 = document.getElementById("section2");
//   const section3 = document.getElementById("section3");

//   // Salir si alguna sección no existe
//   if (!section1 || !section2 || !section3) return;

//   let isTransitioning = false;

//   function scrollToSection(section) {
//     window.scrollTo({
//       top: section.offsetTop,
//       behavior: "smooth",
//     });
//   }

//   function handleScroll(event) {
//     if (isTransitioning) return;

//     const scrollPosition = window.scrollY;
//     const viewportHeight = window.innerHeight;
//     const section1Bottom = section1.offsetTop + section1.offsetHeight;
//     const section2Bottom = section2.offsetTop + section2.offsetHeight;
//     const section3Bottom = section3.offsetTop + section3.offsetHeight;

//     if (scrollPosition < section2.offsetTop) {
//       if (
//         event.deltaY > 0 &&
//         scrollPosition + viewportHeight >= section2.offsetTop
//       ) {
//         isTransitioning = true;
//         scrollToSection(section2);
//         setTimeout(() => (isTransitioning = false), 1000);
//       }
//     } else if (
//       scrollPosition >= section2.offsetTop &&
//       scrollPosition < section2Bottom
//     ) {
//       if (event.deltaY < 0 && scrollPosition <= section1Bottom) {
//         isTransitioning = true;
//         scrollToSection(section1);
//         setTimeout(() => (isTransitioning = false), 1000);
//       }
//       if (
//         event.deltaY > 0 &&
//         scrollPosition + viewportHeight >= section3.offsetTop
//       ) {
//         isTransitioning = true;
//         scrollToSection(section3);
//         setTimeout(() => (isTransitioning = false), 1000);
//       }
//     } else if (
//       scrollPosition >= section3.offsetTop &&
//       scrollPosition < section3Bottom
//     ) {
//       if (event.deltaY < 0 && scrollPosition <= section2Bottom) {
//         isTransitioning = true;
//         scrollToSection(section2);
//         setTimeout(() => (isTransitioning = false), 1000);
//       }
//     }
//   }

//   window.addEventListener("wheel", handleScroll, { passive: false });
// });

const imagesBrnds = [
  "https://nerd.pe/wp-content/themes/nerd/img/subway.svg",
  "https://nerd.pe/wp-content/themes/nerd/img/oxxo.svg",
  "https://nerd.pe/wp-content/themes/nerd/img/tinka.svg",
  "https://nerd.pe/wp-content/themes/nerd/img/plazavea.svg",
  "https://nerd.pe/wp-content/themes/nerd/img/rappi.svg",
];

const orders = [
  [0, 1, 2, 3, 4],
  [1, 2, 4, 0, 3],
  [4, 3, 0, 1, 2],
  [3, 4, 1, 2, 0],
  [2, 0, 3, 1, 4],
];

const currentIndices = [0, 0, 0, 0, 0];

function changeImage(imageIndex) {
  const brandImage = document.getElementById(`brand-image-${imageIndex + 1}`);

  if (!brandImage) return;

  brandImage.classList.remove("opacity-100");
  brandImage.classList.add("opacity-0");

  setTimeout(() => {
    currentIndices[imageIndex] =
      (currentIndices[imageIndex] + 1) % orders[imageIndex].length;
    brandImage.src =
      imagesBrnds[orders[imageIndex][currentIndices[imageIndex]]];
    brandImage.classList.remove("opacity-0");
    brandImage.classList.add("opacity-100");
  }, 500);
}

const imageChangeInterval = setInterval(() => {
  for (let i = 0; i < currentIndices.length; i++) {
    changeImage(i);
  }
}, 3000);

function updateAnimation() {
  const portfolioContainer = document.querySelector("#portfolio-container-2");

  if (!portfolioContainer) return;

  const images = portfolioContainer.querySelectorAll("img");
  const isMobile = window.innerWidth < 1024;

  images.forEach((img) => {
    if (isMobile) {
      img.setAttribute("data-aos", "fade-up-left"); // Animación para móviles
    } else {
      img.setAttribute("data-aos", "fade-up"); // Animación para laptops
    }
  });
}

updateAnimation();
window.addEventListener("resize", updateAnimation);

// Función para obtener todos los parámetros UTM de la URL
function getUTMParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};

  // Lista de parámetros UTM que queremos rastrear
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  utmKeys.forEach((key) => {
    const value = urlParams.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  return utmParams;
}

// Función para almacenar o actualizar los parámetros UTM en Local Storage
function storeUTMParameters(utmParams) {
  // Verificar si ya existen UTM en Local Storage
  let storedUTMs = localStorage.getItem("utm_parameters");

  if (storedUTMs) {
    // Parsear el JSON almacenado
    storedUTMs = JSON.parse(storedUTMs);
  } else {
    // Inicializar como objeto vacío si no existen
    storedUTMs = {};
  }

  // Actualizar con los nuevos parámetros UTM
  Object.keys(utmParams).forEach((key) => {
    storedUTMs[key] = utmParams[key];
  });

  // Almacenar nuevamente en Local Storage
  localStorage.setItem("utm_parameters", JSON.stringify(storedUTMs));
}

// Función para obtener los parámetros UTM almacenados en Local Storage
function getStoredUTMParameters() {
  const storedUTMs = localStorage.getItem("utm_parameters");
  if (storedUTMs) {
    try {
      return JSON.parse(storedUTMs);
    } catch (e) {
      console.error("Error al parsear los parámetros UTM almacenados:", e);
      return {};
    }
  }
  return {};
}

// Función para asignar valores de UTM a los inputs correspondientes
function populateUTMInputs() {
  const utmParams = getStoredUTMParameters();

  // Iterar sobre cada parámetro UTM almacenado
  for (const [key, value] of Object.entries(utmParams)) {
    // Buscar el input con el ID correspondiente al parámetro UTM
    const inputElement = document.getElementById(key);

    if (inputElement) {
      // Verificar que el elemento sea un input o textarea
      if (
        inputElement.tagName.toLowerCase() === "input" ||
        inputElement.tagName.toLowerCase() === "textarea"
      ) {
        // Asignar el valor al atributo 'value' del input
        inputElement.value = value;

        // Opcional: Añadir una clase para estilizar el input cuando está lleno
        inputElement.classList.add("utm-populated");

        console.log(`Input con ID "${key}" actualizado con valor "${value}".`);
      } else {
        console.warn(`El elemento con ID "${key}" no es un input o textarea.`);
      }
    } else {
      console.warn(`No se encontró ningún input con ID "${key}".`);
    }
  }
}

// Función principal para ejecutar las acciones
function handleUTMParameters() {
  const utmParams = getUTMParameters();
  if (Object.keys(utmParams).length > 0) {
    storeUTMParameters(utmParams);
    console.log(
      "Parámetros UTM almacenados/actualizados en Local Storage:",
      utmParams
    );
  } else {
    console.log("No se encontraron parámetros UTM en la URL.");
  }

  // Poblar los inputs con los parámetros UTM almacenados
  populateUTMInputs();
}

// Bomba animaciones
document.addEventListener("DOMContentLoaded", () => {
  const bomba = document.querySelector(".bomba-btn");
  const manchas = document.querySelectorAll(".manchas");
  const section2 = document.querySelector("#section2");
  const divs = document.querySelectorAll(
    ".div1, .div2, .div3, .div4, .div5, .div6"
  );
  let index = 0;
  let hoverTimer;

  if (!bomba || manchas.length === 0 || !section2) return;

  function rotateManchas() {
    manchas.forEach((mancha) => mancha.classList.add("hidden"));
    manchas[index].classList.remove("hidden");
    index = (index + 1) % manchas.length;
  }

  setInterval(rotateManchas, 100);

  bomba.addEventListener("mouseenter", () => {
    bomba.classList.add("shake-slow");
    manchas.forEach((mancha) => mancha.classList.add("shake-slow"));

    hoverTimer = setTimeout(() => {
      bomba.classList.remove("shake-slow");
      bomba.classList.add("shake-fast");

      manchas.forEach((mancha) => {
        mancha.classList.remove("shake-slow");
        mancha.classList.add("shake-fast", "change-color");
      });
    }, 1500);
  });

  bomba.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimer);
    bomba.classList.remove("shake-slow", "shake-fast");

    manchas.forEach((mancha) => {
      mancha.classList.remove("shake-slow", "shake-fast", "change-color");
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest(".bomba-btn")) {
      divs.forEach((div) => div.classList.remove("invisible"));
      section2.classList.add("nerds");

      setTimeout(() => {
        divs.forEach((div) => div.classList.add("invisible"));
        section2.classList.remove("nerds");

        setTimeout(() => {
          divs.forEach((div) => div.classList.remove("invisible"));
        }, 100);
      }, 6000);
    }
  });
});

//cel hover
document.addEventListener("DOMContentLoaded", () => {
  const telefono = document.querySelector(".hover-cel");

  if (!telefono) return;

  telefono.addEventListener("mouseenter", () => {
    telefono.classList.add("hover-shake");
  });

  telefono.addEventListener("mouseleave", () => {
    telefono.classList.remove("hover-shake");
  });
});

//modo oscuro
const btnDark = document.getElementById("toggleDarkMode");
if (btnDark) {
  btnDark.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

//sonido click en contacto
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".play-sound");

  if (buttons.length === 0) return;

  const sound = new Audio(
    "https://nerd.pe/wp-content/uploads/2025/audio/clickOne.mp3"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      sound.currentTime = 0;
      sound.play();
    });
  });
});
