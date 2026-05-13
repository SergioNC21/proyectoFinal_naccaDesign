// GET SLUG FROM URL

const params = new URLSearchParams(window.location.search);

const slug = params.get("slug");



// FETCH JSON

fetch("data/proyectos.json")

    .then(response => response.json())

    .then(data => {


        // FIND PROJECT

        let project;

        Object.values(data).forEach(category => {

            const found = category.find(
                item => item.slug === slug
            );

            if (found) {

                project = found;
            }
        });



        // IF PROJECT DOESN'T EXIST

        if (!project) {

            document.querySelector(".project-page")
                .innerHTML = "<h1>Project not found</h1>";

            return;
        }


        /* =========================
        OPTIONAL SECTIONS
        ========================= */

        function toggleSection(sectionId, navClass, condition) {

            const section = document.querySelector(sectionId);

            const nav = document.querySelector(navClass);

            if (!condition) {

                if (section) {
                    section.style.display = "none";
                }

                if (nav) {
                    nav.style.display = "none";
                }

                return false;
            }

            return true;
        }


        /* =========================
        PAGE TITLE
        ========================= */

        document.title =
            `${project.title} — Nacca Design`;



        /* =========================
        HERO
        ========================= */

        document.querySelector(".project-category")
            .textContent = project.category;

        document.querySelector(".project-subtitle")
            .textContent = project.subtitle;

        document.querySelector(".project-year")
            .textContent = project.year;

        document.querySelector(".project-description")
            .textContent = project.hero.description;



        // LOGO

        document.querySelector(".project-logo")
            .src = project.hero.logo;



        // HERO IMAGE

        document.querySelector(".project-hero-image")
            .src = project.hero.image;



        // SERVICES

        document.querySelector(".project-services")
            .textContent = project.hero.services.join(" · ");



        // AREA

        document.querySelector(".project-area")
            .textContent = project.hero.area.join(" · ");




        /* =========================
        CONTEXT
        ========================= */

        const hasContext = toggleSection(
            "#context",
            ".nav-context",
            project.context
        );

        if (hasContext) {

            document.querySelector(".context-title")
                .textContent = project.context.title;

            document.querySelector(".context-text")
                .textContent = project.context.text;

            const contextGrid =
                document.querySelector(".project-info-grid");

            project.context.cards.forEach(card => {

                const item = document.createElement("article");

                item.classList.add("project-info-card");

                item.innerHTML = `

                <h3>${card.title}</h3>

                <p>${card.text}</p>

                `;

                contextGrid.appendChild(item);

            });
        }




        /* =========================
        STRATEGY
        ========================= */

        const hasStrategy = toggleSection(
            "#strategy",
            ".nav-strategy",
            project.strategy
        );

        if (hasStrategy) {

            document.querySelector(".strategy-title")
                .textContent = project.strategy.title;

            document.querySelector(".strategy-intro")
                .textContent = project.strategy.text;

            document.querySelector(".strategy-image")
                .src = project.strategy.image;


            const strategyValues =
                document.querySelector(".strategy-values");


            /* CLEAR PREVIOUS CONTENT */

            strategyValues.innerHTML = "";


            /* VALUES */

            if (project.strategy.values) {

                project.strategy.values.forEach(value => {

                    const item = document.createElement("div");

                    item.classList.add("strategy-value");


                    item.innerHTML = `

                <div class="strategy-icon">

                    <i class="${value.icon}"></i>

                </div>

                <div class="strategy-content">

                    <h3 class="text--xl">${value.title}</h3>

                    <p>${value.text}</p>

                </div>

                `;

                    strategyValues.appendChild(item);

                });

            }

        }




        /* =========================
IDENTITY
========================= */

        const hasIdentity = toggleSection(
            "#identity",
            ".nav-identity",
            project.identity
        );

        if (hasIdentity) {

            document.querySelector(".identity-title")
                .textContent = project.identity.title;

            document.querySelector(".identity-text")
                .textContent = project.identity.text;


            /* LOGO */

            document.querySelector(".identity-logo")
                .src = project.identity.logo;


            /* PATTERN */

            document.querySelector(".identity-pattern")
                .src = project.identity.pattern;


            /* COLORS */

            const colorsContainer =
                document.querySelector(".identity-colors");


            /* CLEAR PREVIOUS CONTENT */

            colorsContainer.innerHTML = "";


            /* COLORS ARRAY */

            if (project.identity.colors) {

                project.identity.colors.forEach(color => {

                    const colorBlock =
                        document.createElement("div");

                    colorBlock.classList.add("identity-color");


                    /* BACKGROUND COLOR */

                    colorBlock.style.backgroundColor =
                        color.hex;


                    colorBlock.innerHTML = `

                <div class="identity-color__info">

                    <span>
                        PANTONE ${color.pantone}
                    </span>

                </div>

            `;

                    colorsContainer.appendChild(colorBlock);

                });

            }

        }




        /* =========================
        APPLICATIONS
        ========================= */

        const hasApplications = toggleSection(
            "#applications",
            ".nav-applications",
            project.applications
        );

        if (hasApplications) {

            document.querySelector(".applications-title")
                .textContent = project.applications.title;


            const applicationsGrid =
                document.querySelector(".applications-grid");


            /* CLEAR PREVIOUS CONTENT */

            applicationsGrid.innerHTML = "";


            /* IMAGES */

            if (project.applications.images) {

                project.applications.images.forEach(image => {

                    const img =
                        document.createElement("img");

                    img.src = image;

                    img.alt = project.title;


                    /* OPEN LIGHTBOX */

                    img.addEventListener("click", () => {

                        const lightbox =
                            document.querySelector(".lightbox");

                        const lightboxImage =
                            document.querySelector(".lightbox-image");

                        lightboxImage.src = image;

                        lightbox.classList.remove("hidden");

                    });


                    applicationsGrid.appendChild(img);

                });

            }

        }

        /* =========================
        VIDEO GRID
        ========================= */

        const hasVideoGrid = toggleSection(
            "#video-grid",
            ".nav-video-grid",
            project.videoGrid
        );

        if (hasVideoGrid) {

            document.querySelector(".video-grid-title")
                .textContent = project.videoGrid.title;

            document.querySelector(".video-grid-text")
                .textContent = project.videoGrid.text;


            const videoGrid =
                document.querySelector(".video-grid");


            /* CLEAR */

            videoGrid.innerHTML = "";


            /* VIDEOS */

            if (project.videoGrid.videos) {

                project.videoGrid.videos.forEach(video => {

                    const videoElement =
                        document.createElement("video");

                    videoElement.src = video;

                    videoElement.controls = true;

                    videoElement.autoplay = false;

                    videoElement.muted = false;

                    videoElement.playsInline = true;


                    videoGrid.appendChild(videoElement);

                });

            }

        }


        /* =========================
        DIGITAL
        ========================= */

        const hasDigital = toggleSection(
            "#digital",
            ".nav-digital",
            project.digital
        );

        if (hasDigital) {

            document.querySelector(".digital-title")
                .textContent = project.digital.title;

            document.querySelector(".digital-text")
                .textContent = project.digital.text;


            /* DESKTOP IMAGE */

            document.querySelector(".digital-desktop")
                .src = project.digital.desktop;

        }

        /* =========================
        COMMUNICATION
        ========================= */

        const hasCommunication = toggleSection(
            "#communication",
            ".nav-communication",
            project.communication
        );

        if (hasCommunication) {

            document.querySelector(".communication-title")
                .textContent = project.communication.title;

            document.querySelector(".communication-text")
                .textContent = project.communication.text;


            const communicationGrid =
                document.querySelector(".communication-grid");


            /* CLEAR */

            communicationGrid.innerHTML = "";


            /* ITEMS */

            if (project.communication.items) {

                project.communication.items.forEach(item => {

                    const extension =
                        item.split(".").pop().toLowerCase();


                    /* =========================
                    VIDEO
                    ========================= */

                    if (
                        extension === "mp4" ||
                        extension === "webm" ||
                        extension === "mov"
                    ) {

                        const wrapper =
                            document.createElement("div");

                        wrapper.classList.add("communication-item");


                        const video =
                            document.createElement("video");

                        video.src = item;

                        video.loop = false;

                        video.muted = false;

                        video.playsInline = true;

                        video.autoplay = false;

                        video.pause();

                        video.controls = false;


                        /* =========================
                        CONTROLS
                        ========================= */

                        const controls =
                            document.createElement("div");

                        controls.classList.add("communication-controls");


                        /* PLAY BUTTON */

                        const playBtn =
                            document.createElement("button");

                        playBtn.innerHTML =
                            '<i class="ri-play-line"></i>';


                        /* VOLUME BUTTON */

                        const volumeBtn =
                            document.createElement("button");

                        volumeBtn.innerHTML =
                            '<i class="ri-volume-up-line"></i>';


                        /* PLAY / PAUSE */

                        playBtn.addEventListener("click", () => {

                            if (video.paused) {

                                video.play();

                                playBtn.innerHTML =
                                    '<i class="ri-pause-line"></i>';

                            }

                            else {

                                video.pause();

                                playBtn.innerHTML =
                                    '<i class="ri-play-line"></i>';
                            }

                        });


                        /* MUTE / UNMUTE */

                        volumeBtn.addEventListener("click", () => {

                            video.muted = !video.muted;

                            volumeBtn.innerHTML = video.muted
                                ? '<i class="ri-volume-mute-line"></i>'
                                : '<i class="ri-volume-up-line"></i>';

                        });


                        /* APPEND */

                        controls.appendChild(playBtn);

                        controls.appendChild(volumeBtn);

                        wrapper.appendChild(video);

                        wrapper.appendChild(controls);

                        communicationGrid.appendChild(wrapper);

                    }


                    /* =========================
                    IMAGE
                    ========================= */

                    else {

                        const img =
                            document.createElement("img");

                        img.src = item;

                        img.alt = project.title;


                        /* LIGHTBOX */

                        img.addEventListener("click", () => {

                            const lightbox =
                                document.querySelector(".lightbox");

                            const lightboxImage =
                                document.querySelector(".lightbox-image");

                            lightboxImage.src = item;

                            lightbox.classList.remove("hidden");

                        });


                        communicationGrid.appendChild(img);

                    }

                });

            }

        }

        /* =========================
        DOWNLOADS
        ========================= */

        const hasDownloads = toggleSection(
            "#downloads",
            ".nav-downloads",
            project.downloads
        );

        if (hasDownloads) {

            document.querySelector(".downloads-title")
                .textContent = project.downloads.title;

            document.querySelector(".downloads-text")
                .textContent = project.downloads.text;


            const downloadsList =
                document.querySelector(".downloads-list");


            /* CLEAR PREVIOUS CONTENT */

            downloadsList.innerHTML = "";


            /* ITEMS */

            if (project.downloads.items) {

                project.downloads.items.forEach(item => {

                    const link =
                        document.createElement("a");

                    link.classList.add("download-item");

                    link.href = item.file;

                    link.setAttribute("download", "");


                    link.innerHTML = `

                <div>

                    <span class="download-type body">
                        ${item.type}
                    </span>

                    <h3>
                        ${item.title}
                    </h3>

                </div>

                <i class="ri-download-line"></i>

            `;

                    downloadsList.appendChild(link);

                });

            }

        }

        /* =========================
        BACK BUTTON
        ========================= */

        const backButton =
            document.querySelector(".project-back");

        if (backButton) {

            backButton.addEventListener("click", () => {

                history.back();

            });

        }

        /* =========================
        LIGHTBOX
        ========================= */

        const lightbox =
            document.querySelector(".lightbox");

        const lightboxClose =
            document.querySelector(".lightbox-close");


        /* CLOSE BUTTON */

        lightboxClose.addEventListener("click", () => {

            lightbox.classList.add("hidden");

        });


        /* CLOSE OUTSIDE IMAGE */

        lightbox.addEventListener("click", (e) => {

            if (e.target === lightbox) {

                lightbox.classList.add("hidden");
            }

        });

        /* =========================
        SCROLL TOP
        ========================= */

        const scrollTopBtn =
            document.querySelector(".scroll-top");


        window.addEventListener("scroll", () => {

            const isScrolled = window.scrollY > 200;


            /* SHOW / HIDE */

            scrollTopBtn.classList.toggle(
                "hidden",
                !isScrolled
            );


            /* STOP BEFORE FOOTER */

            const footer =
                document.querySelector("footer");

            const footerTop =
                footer.getBoundingClientRect().top;

            const windowHeight =
                window.innerHeight;


            if (footerTop < windowHeight) {

                scrollTopBtn.style.position = "absolute";

                scrollTopBtn.style.top =
                    `${window.scrollY + footerTop - 50}px`;

            } else {

                scrollTopBtn.style.position = "fixed";

                scrollTopBtn.style.bottom = "1.875rem";

                scrollTopBtn.style.top = "auto";
            }
        });


        /* CLICK */

        scrollTopBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"
            });
        });

        /* =========================
        DYNAMIC SECTION NUMBERS
        ========================= */

        const visibleSections = document.querySelectorAll(
            ".project-section:not([style*='display: none'])"
        );

        visibleSections.forEach((section, index) => {

            const number =
                String(index + 1).padStart(2, "0");


            /* SECTION NUMBER */

            const sectionNumber =
                section.querySelector(".project-section__number");

            if (sectionNumber) {

                sectionNumber.textContent = `/${number}`;
            }


            /* SIDEBAR NUMBER */

            const id = section.id;

            const nav =
                document.querySelector(`a[href="#${id}"]`);

            if (nav) {

                const navNumber =
                    nav.querySelector(".sidebar-number");

                if (navNumber) {

                    navNumber.textContent = number;
                }

            }

        });

    });