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

		const io = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
				if (visible.length) setActive(visible[0].target.id);
			},
			{
				rootMargin: "-40% 0px -55% 0px",
				threshold: [0.1, 0.2, 0.35, 0.5, 0.65],
			}
		);
		sections.forEach((s) => io.observe(s));
	}

	// Contact form
	if (contactForm) {
		contactForm.addEventListener("submit", async (e) => {
			e.preventDefault();

			const name = $("input[name=\"name\"]", contactForm)?.value?.trim() || "";
			const email = $("input[name=\"email\"]", contactForm)?.value?.trim() || "";
			const message = $("textarea[name=\"message\"]", contactForm)?.value?.trim() || "";

			if (!name || !email || !message) {
				showToast("Please fill out all fields.");
				return;
			}

			const submitBtn = contactForm.querySelector("button[type=\"submit\"]");
			if (submitBtn) submitBtn.disabled = true;

			try {
				const response = await fetch("/api/contact", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ name, email, message }),
				});

				if (!response.ok) {
					const data = await response.json().catch(() => null);
					const base = data?.error || "Failed to send message.";
					const detail = data?.details ? ` (${data.details})` : "";
					throw new Error(`${base}${detail}`);
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
