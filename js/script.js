(() => {
	const $ = (sel, root = document) => root.querySelector(sel);
	const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

	const navBtn = $("#navBtn");
	const menu = $("#menu");
	const toastEl = $("#toast");
	const contactForm = $("#contactForm");
	const yearEl = $("#year");
	const themeToggle = $("#themeToggle");
	const kineticReplay = $(".kinetic-replay");
	const projectGrid = $(".project-grid");
	const projectFilters = $$(".project-filter");
	const seeMoreProjects = $(".see-more-projects");
	const projectLightbox = $("#projectLightbox");
	const lightboxImage = $("#lightboxImage");
	const lightboxTitle = $("#lightboxTitle");
	const lightboxCaption = $("#lightboxCaption");
	const lightboxClose = $(".project-lightbox-close", projectLightbox);

	const menuLinks = $$(".a");

	// Project categories
	if (projectGrid && projectFilters.length && seeMoreProjects) {
		const projectCards = $$(".p", projectGrid);
		let activeTab = $(".project-filter.is-active")?.dataset.filter || "poster";
		let expanded = false;

		const updateProjects = () => {
			const matchingCards = projectCards.filter((card) => card.dataset.category === activeTab);
			matchingCards.forEach((card) => {
				card.hidden = card.classList.contains("project-extra") && !expanded;
			});
			projectCards
				.filter((card) => !matchingCards.includes(card))
				.forEach((card) => {
					card.hidden = true;
				});
			seeMoreProjects.hidden = !matchingCards.some((card) => card.classList.contains("project-extra"));
			seeMoreProjects.setAttribute("aria-expanded", String(expanded));
			seeMoreProjects.innerHTML = expanded
				? 'Show less <span aria-hidden="true">↑</span>'
				: 'See More  <span aria-hidden="true">↓</span>';
		};

		projectFilters.forEach((filterButton) => {
			filterButton.addEventListener("click", () => {
				activeTab = filterButton.dataset.filter || "";
				expanded = false;
				projectFilters.forEach((button) => {
					const isActive = button === filterButton;
					button.classList.toggle("is-active", isActive);
					button.setAttribute("aria-pressed", String(isActive));
				});
				updateProjects();
			});
		});

		seeMoreProjects.addEventListener("click", () => {
			expanded = !expanded;
			updateProjects();
		});

		updateProjects();
	}

	if (projectGrid && projectLightbox && lightboxImage && lightboxTitle) {
		const projectCards = $$(".p", projectGrid);
		let lastFocusedCard = null;

		const closeLightbox = () => {
			projectLightbox.classList.remove("is-open");
			window.setTimeout(() => {
				if (!projectLightbox.classList.contains("is-open")) {
					projectLightbox.hidden = true;
				}
			}, 180);
			document.body.classList.remove("lightbox-open");
			lastFocusedCard?.focus();
		};

		const openLightbox = (card) => {
			const image = $("img", card);
			const title = $(".h3", card);
			if (!image || !title) return;

			lastFocusedCard = card;
			lightboxImage.src = image.currentSrc || image.src;
			lightboxImage.alt = image.alt;
			lightboxTitle.textContent = image.dataset.title || title.textContent.trim();
			if (lightboxCaption) {
				lightboxCaption.textContent = image.dataset.caption || "";
				lightboxCaption.hidden = !image.dataset.caption;
			}
			projectLightbox.hidden = false;
			document.body.classList.add("lightbox-open");
			window.requestAnimationFrame(() => projectLightbox.classList.add("is-open"));
			lightboxClose?.focus();
		};

		projectCards.forEach((card) => {
			if ($(".project-links a", card)) return;
			card.setAttribute("tabindex", "0");
			card.setAttribute("role", "button");
			card.setAttribute("aria-label", `Open ${$(".h3", card)?.textContent.trim() || "project"} preview`);
			card.addEventListener("click", (event) => {
				if (event.target.closest("a")) return;
				openLightbox(card);
			});
			card.addEventListener("keydown", (event) => {
				if (event.target.closest("a")) return;
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					openLightbox(card);
				}
			});
		});

		projectLightbox.querySelectorAll("[data-lightbox-close]").forEach((element) => {
			element.addEventListener("click", closeLightbox);
		});
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && !projectLightbox.hidden) closeLightbox();
		});
	}

	const setTheme = (theme) => {
		const isDark = theme === "dark";
		document.documentElement.dataset.theme = isDark ? "dark" : "light";
		themeToggle?.setAttribute("aria-pressed", String(isDark));
		themeToggle?.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
		document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#0e1625" : "#D6D9DD");
	};

	let storedTheme = null;
	try {
		storedTheme = window.localStorage.getItem("theme");
	} catch {}
	setTheme(storedTheme || "dark");

	themeToggle?.addEventListener("click", () => {
		const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
		setTheme(nextTheme);
		try {
			window.localStorage.setItem("theme", nextTheme);
		} catch {}
	});

	const setMenuOpen = (open) => {
		if (!navBtn || !menu) return;
		navBtn.setAttribute("aria-expanded", String(open));
		menu.classList.toggle("open", open);
	};

	const isMenuOpen = () => navBtn?.getAttribute("aria-expanded") === "true";

	const showToast = (message) => {
		if (!toastEl) return;
		toastEl.textContent = message;
		toastEl.classList.add("show");
		window.clearTimeout(showToast._t);
		showToast._t = window.setTimeout(() => toastEl.classList.remove("show"), 2200);
	};

	// Mobile menu
	if (navBtn && menu) {
		navBtn.addEventListener("click", () => setMenuOpen(!isMenuOpen()));
		menuLinks.forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));

		document.addEventListener("click", (e) => {
			if (!isMenuOpen()) return;
			const target = e.target;
			if (!(target instanceof Element)) return;
			if (menu.contains(target) || navBtn.contains(target)) return;
			setMenuOpen(false);
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") setMenuOpen(false);
		});
	}

	// Reveal-on-scroll (subtle)
	const revealTargets = $$(".hero-left, .frame, .card");
	revealTargets.forEach((el) => el.classList.add("reveal"));

	const revealEls = $$(".reveal");
	if (revealEls.length) {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("on");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.14 }
		);
		revealEls.forEach((el) => io.observe(el));
	}

	// Active section highlighting
	const sections = $$("section[id]");
	if (sections.length && menuLinks.length) {
		const byId = new Map(
			menuLinks
				.map((l) => {
					const href = l.getAttribute("href") || "";
					if (!href.startsWith("#")) return null;
					return [href.slice(1), l];
				})
				.filter(Boolean)
		);

		const setActive = (id) => {
			menuLinks.forEach((l) => l.removeAttribute("aria-current"));
			const link = byId.get(id);
			if (link) link.setAttribute("aria-current", "true");
		};

		const initial = window.location.hash?.startsWith("#") ? window.location.hash.slice(1) : "home";
		if (byId.has(initial)) setActive(initial);

		const getTopOffset = () => {
			const topbar = document.querySelector(".topbar");
			return (topbar?.offsetHeight || 0) + 18;
		};

		const updateActiveByScroll = () => {
			const scrollPos = window.scrollY + getTopOffset() + 2;
			let current = sections[0]?.id;

			for (const section of sections) {
				if (section.offsetTop <= scrollPos) {
					current = section.id;
				} else {
					break;
				}
			}

			if (current) setActive(current);
		};

		menuLinks.forEach((link) => {
			link.addEventListener("click", () => {
				const href = link.getAttribute("href") || "";
				if (href.startsWith("#")) setActive(href.slice(1));
			});
		});

		window.addEventListener("scroll", updateActiveByScroll, { passive: true });
		window.addEventListener("resize", updateActiveByScroll);
		window.addEventListener("hashchange", updateActiveByScroll);
		updateActiveByScroll();
	}

	// Contact form
	if (contactForm) {
		contactForm.addEventListener("submit", async (e) => {
			e.preventDefault();

			const name = $("input[name=\"name\"]", contactForm)?.value?.trim() || "";
			const email = $("input[name=\"email\"]", contactForm)?.value?.trim() || "";
			const message = $("textarea[name=\"message\"]", contactForm)?.value?.trim() || "";
			const endpoint = contactForm.getAttribute("action") || "";

			if (!name || !email || !message) {
				showToast("Please fill out all fields.");
				return;
			}

			if (!endpoint || endpoint.includes("REPLACE_WITH_YOUR_FORM_ID")) {
				showToast("Please configure the Formspree form ID first.");
				return;
			}

			const submitBtn = contactForm.querySelector("button[type=\"submit\"]");
			if (submitBtn) submitBtn.disabled = true;

			try {
				const response = await fetch(endpoint, {
					method: "POST",
					headers: { Accept: "application/json" },
					body: new FormData(contactForm),
				});

				if (!response.ok) {
					const data = await response.json().catch(() => null);
					throw new Error(data?.errors?.[0]?.message || data?.error || "Failed to send message.");
				}

				contactForm.reset();
				showToast("Thanks! Your message has been sent.");
			} catch (error) {
				showToast(error?.message || "Something went wrong. Please try again.");
			} finally {
				if (submitBtn) submitBtn.disabled = false;
			}
		});
	}

	// Kinetic type: split the name into letters
	const nameEl = $(".hero .name");
	const titleAccent = $(".hero .title-accent");
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	let typewriterTimer;
	const animateName = () => {
		if (!nameEl) return;
		const text = nameEl.dataset.text || nameEl.textContent.trim();
		nameEl.dataset.text = text;
		if (reduceMotion) {
			nameEl.textContent = text;
			return;
		}

		let i = 0;
		const words = text
			.split(" ")
			.map(
				(word) =>
					`<span class="word">${[...word].map((character) => `<span class="ch" style="--i:${i++}">${character}</span>`).join("")}</span>`
			)
			.join(" ");
		nameEl.innerHTML = `<span class="sr">${text}</span><span aria-hidden="true">${words}</span>`;
	};

	const animateTitle = () => {
		if (!titleAccent) return;
		const text = titleAccent.dataset.text || titleAccent.textContent.trim();
		titleAccent.dataset.text = text;
		window.clearTimeout(typewriterTimer);
		if (reduceMotion) {
			titleAccent.textContent = text;
			return;
		}

		titleAccent.classList.add("is-typing");
		titleAccent.innerHTML = `<span class="sr">${text}</span><span aria-hidden="true">${[...text]
			.map((character, index) => `<span class="kinetic-letter" style="--i:${index}">${character === " " ? "&nbsp;" : character}</span>`)
			.join("")}</span>`;

		const letters = $$(".title-accent .kinetic-letter");
		let visibleCount = 0;
		const typeNextLetter = () => {
			if (visibleCount >= letters.length) {
				typewriterTimer = window.setTimeout(() => {
					letters.forEach((letter) => letter.classList.remove("is-visible"));
					visibleCount = 0;
					typewriterTimer = window.setTimeout(typeNextLetter, 180);
				}, 1400);
				return;
			}

			letters[visibleCount].classList.add("is-visible");
			visibleCount += 1;
			typewriterTimer = window.setTimeout(typeNextLetter, 85);
		};

		typeNextLetter();
	};

	animateName();
	animateTitle();
	kineticReplay?.addEventListener("click", () => {
		animateName();
		animateTitle();
	});

	// Year
	if (yearEl) {
		yearEl.textContent = String(new Date().getFullYear());
	}
})();
