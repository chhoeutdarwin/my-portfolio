(() => {
	const $ = (sel, root = document) => root.querySelector(sel);
	const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

	const navBtn = $("#navBtn");
	const menu = $("#menu");
	const toastEl = $("#toast");
	const contactForm = $("#contactForm");
	const yearEl = $("#year");

	const menuLinks = $$(".a");

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

	// Year
	if (yearEl) {
		yearEl.textContent = String(new Date().getFullYear());
	}
})();
