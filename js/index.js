'use strict'

const nav = document.querySelector('.header__nav');
const logoBadge = document.querySelector('.header__logo');
const navAlt = document.querySelector('.header__nav-alternative');
const logoBadgeAlt = document.querySelector('.header__logo-alternative');

const scrollTopBtn = document.querySelector('.scroll-top');

const scrollThreshold = 200;

const li = document.querySelectorAll('.li');
const bloque = document.querySelectorAll('.block');



// SCROLL LISTENERS
// COMPORTAMIENTO DEL NAV A LA HORA DE HACER SCROLL

window.addEventListener('scroll', () => {
    const isDesktop = window.innerWidth > 768;
    const isScrolled = window.scrollY > scrollThreshold;

    if (isDesktop) {
        nav.classList.toggle('hidden', isScrolled);
        navAlt.classList.toggle('hidden', !isScrolled);
        nav.classList.add('activo', isScrolled);
        navAlt.classList.add('activo', !isScrolled);
    } else {
        nav.classList.remove('hidden');
        navAlt.classList.add('hidden');
    }

    nav.classList.toggle('translucid', isScrolled);

    scrollTopBtn.classList.toggle('hidden', !isScrolled);

    // STOP BEFORE FOOTER

    const footer = document.querySelector('footer');

    const footerTop = footer.getBoundingClientRect().top;

    const windowHeight = window.innerHeight;

    if (footerTop < windowHeight) {

        scrollTopBtn.style.position = 'absolute';

        scrollTopBtn.style.top =
            `${window.scrollY + footerTop - 50}px`;

    } else {

        scrollTopBtn.style.position = 'fixed';

        scrollTopBtn.style.bottom = '1.875rem';

        scrollTopBtn.style.top = 'auto';
    }
})

// CLICK LISTENERS

logoBadge.addEventListener('click',()=>{
    nav.classList.toggle('activo')

    if (window.scrollY > scrollThreshold) {
        nav.classList.toggle('translucid')
    }
})

logoBadgeAlt.addEventListener('click',()=>{
    navAlt.classList.toggle('activo')
})

// BOTÓN VOLVER ARRIBA DE LA PÁGINA

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// MOUSEOVER LISTENERS
// CARRUSEL WEB SECCIÓN "WORKS"

const liHandler = (i)=>{

        li.forEach((cadaLi,i)=>{
            li[i].classList.remove('activo');
            bloque[i].classList.remove('activo');
        });

        li[i].classList.add('activo');
        bloque[i].classList.add('activo');
    } 

li.forEach((cadaLi,i)=>{
    li[i].addEventListener('mouseover', ()=>{
        liHandler(i);
    });
});

// JSON FETCH

fetch("data/proyectos.json")
    .then(response => response.json())
    .then(data => {
        const contenedor = document.querySelector('.grid-proyectos');

        if (contenedor) {
            const categoria = contenedor.dataset.categoria;

            // GRID GENERATOR
            // EMPLEADO EN LAS GALERIAS DE PROYECTOS

            // JSON PERSONALIZABLE EN CARPETA DATA
            data[categoria].forEach(proyecto => {
                const item = document.createElement('article');
                item.classList.add('proyecto');

                item.innerHTML = `
                    <a href="project.html?slug=${proyecto.slug}">
                    <picture class="img">
                        <!-- Desktop -->
                        <source
                            srcset="${proyecto.thumbnail}-desktop.webp"
                            type="image/webp"
                            media="(min-width: 1024px)">
                        <source
                            srcset="${proyecto.thumbnail}-desktop.jpg"
                            media="(min-width: 1024px)">

                        <!-- Tablet -->
                        <source
                            srcset="${proyecto.thumbnail}-tablet.webp"
                            type="image/webp"
                            media="(min-width: 768px)">
                        <source
                            srcset="${proyecto.thumbnail}-tablet.jpg"
                            media="(min-width: 768px)">
                       
                        <!-- Mobile -->
                        <img
                            src="${proyecto.thumbnail}-mobile.jpg"
                            alt="${proyecto.title}">
                    </picture>
                    <h3 class="text--md"><b>${proyecto.title}</b></h3>
                    </a>
                `;

                contenedor.appendChild(item);
            });
        }
    })

    // CATCH ERROR

    .catch(error => console.error("Error cargando proyectos:", error));
