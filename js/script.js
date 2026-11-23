(() => {
	const $ = (sel, root = document) => root.querySelector(sel);
	const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

	const translations = {
		en: {
			"a11y.skip": "Skip to content",
			"nav.home": "Home", "nav.about": "About Me", "nav.projects": "My work",
			"nav.experience": "Experience", "nav.skills": "Skills", "nav.contact": "Contact", "nav.hire": "Hire Me",
			"hero.portfolio": "My Portfolio", "hero.hello": "Hello, I'm ", "hero.role": "Web Developer",
			"hero.lead": "I design and build conversion-focused interfaces that look polished, load fast, and feel effortless on every device.",
			"hero.projects": "View Projects", "hero.downloadCv": "Download CV",
			"hero.freelance": "Available for freelance", "hero.based": "Based in Cambodia", "hero.fast": "Fast delivery, clean code",
			"about.label": "About Me", "about.name": "Chhoeut Darwin",
			"about.traits.first": "Fast learner.", "about.traits.second": "Curious mind.", 
			"about.bio": "I'm an Information Technology graduate who combines thoughtful design with well-built code. I enjoy creating clear, useful digital experiences that look polished, work smoothly, and make sense from the first interaction.",
			"about.projects": "Projects Completed", "about.fields": "Design & Dev Fields", "about.years": "Years of Study",
			"about.downloadCv": "Download CV", "about.chips.ui": "UI / UX Design", "about.chips.web": "Web Development",
			"about.chips.poster": "Poster Design", "about.chips.responsive": "AI-Assisted Research", "about.chips.basicIt": "Basic IT Support",
			"projects.title": "Recently Worked", "projects.poster": "Poster Design", "projects.uxui": "UX/UI Design",
			"projects.website": "Web Development", "projects.football": "Football Player Poster",
			"projects.coffee": "Coffee Campaign", "projects.matcha": "Matcha Campaign", "projects.iceLatte": "Ice Latte Campaign",
			"projects.posterConcept": "Poster Design Concept", "projects.dashboard": "Dashboard UI",
			"projects.modalSportsTitle": "Sports Poster Design",
			"projects.modalSportsCaption": "Sports poster built on contrast and depth: layered cutout, soft shadows, bold type. Fan-made, non-commercial.",
			"projects.modalIceTitle": "Ice Latte Campaign",
			"projects.modalIceCaption": "Warm coffee gradients, Khmer display typography, soft glow, and clean price tags. Concept work.",
			"projects.shopping": "Shopping App", "projects.bakery": "Bakery App", "projects.urban": "Urban Trails",
			"projects.caseMeta": "UX/UI · Figma · Case study", "projects.websiteMeta": "UX/UI · Figma · Website design",
			"projects.dashboardSummary": "Dashboard concept for tracking activity and tasks at a glance.",
			"projects.shoppingSummary": "Mobile shopping flow from browsing to checkout.",
			"projects.bakerySummary": "Ordering app screens for a small bakery.",
			"projects.urbanSummary": "Travel website UI for discovering destinations and local experiences.",
			"projects.comingSoon": "Case study coming soon", "projects.viewPrototype": "View prototype",
			"projects.liveDemo": "Live demo", "projects.seeMore": "See more", "projects.showLess": "Show less",
			"experience.title": "Experience", "experience.role": "Ticket Seller — Virak Buntham Express",
			"experience.period": "Jan 2023 – Dec 2025 • Siem Reap, Cambodia",
			"experience.item1": "Assisted customers with ticket purchases, schedules and travel inquiries.",
			"experience.item2": "Handled daily cash transactions and maintained accurate payment records.",
			"experience.item3": "Provided excellent customer service and ensured a positive experience for all clients.",
			"experience.item4": "Issued tickets and receipts accurately.",
			"experience.item5": "Communicated professionally with customers and handled routine inquiries.",
			"experience.tag1": "Customer Service", "experience.tag2": "Cash Handling", "experience.tag3": "Travel Inquiries",
			"skills.title": "Technical Skills & Tools", "skills.frontend": "Frontend", "skills.styling": "Styling",
			"skills.interactive": "Interactive", "skills.database": "Database", "skills.versionControl": "Version Control",
			"skills.uiux": "UI/UX Design", "skills.graphics": "Graphics", "skills.quickAssets": "Quick Assets", "skills.ide": "IDE Editor",
			"contact.title": "Contact", "contact.build": "Let’s build something",
			"contact.open": "Open to internships, web development roles, and collaborations.",
			"contact.quick": "Quick message", "contact.name": "Name", "contact.email": "Email", "contact.message": "Message",
			"contact.namePlaceholder": "Your name", "contact.emailPlaceholder": "email@example.com",
			"contact.messagePlaceholder": "Hi! I saw your portfolio and…", "contact.send": "Send",
			"contact.inbox": "Messages are sent directly to my inbox", "footer.role": "Web Developer", "footer.backTop": "Back to top"
		},
		km: {
			"a11y.skip": "រំលងទៅខ្លឹមសារ",
			"nav.home": "ទំព័រដើម", "nav.about": "អំពីខ្ញុំ", "nav.projects": "ការងារ",
			"nav.experience": "បទពិសោធន៍", "nav.skills": "ជំនាញ", "nav.contact": "ទំនាក់ទំនង", "nav.hire": "ជួលខ្ញុំ",
			"hero.portfolio": "កម្រងស្នាដៃរបស់ខ្ញុំ", "hero.hello": "សួស្តី, ខ្ញុំគឺ ", "hero.role": "អ្នកអភិវឌ្ឍន៍គេហទំព័រ",
			"hero.lead": "ខ្ញុំរចនា និងបង្កើតចំណុចប្រទាក់ដែលស្អាត ឆាប់រហ័ស និងងាយស្រួលប្រើនៅលើគ្រប់ឧបករណ៍។",
			"hero.projects": "មើលគម្រោង", "hero.downloadCv": "ទាញយក CV",
			"hero.freelance": "ទទួលការងារឯករាជ្យ", "hero.based": "នៅកម្ពុជា", "hero.fast": "បញ្ចប់លឿន កូដស្អាត",
			"about.label": "អំពីខ្ញុំ", "about.name": "Chhoeut Darwin",
			"about.traits.first": "រៀនអ្វីថ្មីលឿន", "about.traits.second": "ចិត្តចង់ចេះដឹង", "about.traits.third": "សម្រេចកិច្ចការរហ័ស",
			"about.bio": "ខ្ញុំជានិស្សិតបញ្ចប់ការសិក្សាផ្នែកព័ត៌មានវិទ្យា ដែលផ្សំរចនាជាមួយការសរសេរកូដដែលមានគុណភាព។ ខ្ញុំចូលចិត្តបង្កើតបទពិសោធន៍ឌីជីថលដែលស្អាត និងងាយស្រួលប្រើ។",
			"about.projects": "គម្រោងដែលបានធ្វើ", "about.fields": "ផ្នែករចនា និងអភិវឌ្ឍន៍", "about.years": "ឆ្នាំសិក្សា",
			"about.downloadCv": "ទាញយក CV", "about.chips.ui": "រចនា UI / UX", "about.chips.web": "អភិវឌ្ឍន៍វែបសាយ",
			"about.chips.poster": "រចនាប៉ុស្ត័រ", "about.chips.responsive": "ការស្រាវជ្រាវជំនួយដោយ AI", "about.chips.basicIt": "ជំនួយបច្ចេកទេស IT មូលដ្ឋាន",
			"projects.title": "ការងារថ្មីៗ", "projects.poster": "រចនាប៉ុស្ត័រ", "projects.uxui": "រចនា UX/UI",
			"projects.website": "អភិវឌ្ឍន៍វែបសាយ", "projects.football": "Football Player Poster",
			"projects.coffee": "Coffee Campaign", "projects.matcha": "Matcha Campaign", "projects.iceLatte": "Ice Latte Campaign",
			"projects.posterConcept": "Poster Design Concept", "projects.dashboard": "ផ្ទាំងគ្រប់គ្រង",
			"projects.modalSportsTitle": " Poster កីឡា",
			"projects.modalSportsCaption": "Poster កីឡាដែលបង្កើតដោយការប្រៀបធៀប និងជម្រៅ៖ កាត់ស្រទាប់ ស្រមោលស្រាល និងអក្សរចម្បង។ ស្នាដៃគំនិតមិនមែនសម្រាប់ពាណិជ្ជកម្ម។",
			"projects.modalIceTitle": "Ice Latte Campaign",
			"projects.modalIceCaption": "ពណ៌កាហ្វេស្រទាក់ៗ អក្សរខ្មែរសំរាប់បង្ហាញ ពន្លឺស្រាល និងស្លាកតម្លៃស្អាត។ ស្នាដៃគំនិត។",
			"projects.shopping": "កម្មវិធីទិញទំនិញ", "projects.bakery": "កម្មវិធីហាងនំបុ័ង", "projects.urban": "Urban Trails",
			"projects.caseMeta": "UX/UI · Figma · ករណីសិក្សា", "projects.websiteMeta": "UX/UI · Figma · រចនាវែបសាយ",
			"projects.dashboardSummary": "គំនិតផ្ទាំងគ្រប់គ្រងសម្រាប់តាមដានសកម្មភាព និងភារកិច្ចបានយ៉ាងស្រួល។",
			"projects.shoppingSummary": "ដំណើរការទិញទំនិញតាមទូរសព្ទពីការរុករករហូតដល់ការទូទាត់។",
			"projects.bakerySummary": "អេក្រង់កម្មវិធីសម្រាប់ហាងនំបុ័ងតូចមួយ។",
			"projects.urbanSummary": "ចំណុចប្រទាក់វែបសាយធ្វើដំណើរសម្រាប់ស្វែងរកទិសដៅ និងបទពិសោធន៍ក្នុងតំបន់។",
			"projects.comingSoon": "ករណីសិក្សានឹងមកដល់ឆាប់ៗ", "projects.viewPrototype": "មើលគំរូ",
			"projects.liveDemo": "មើលគម្រោង", "projects.seeMore": "មើលបន្ថែម", "projects.showLess": "បង្ហាញតិច",
			"experience.title": "បទពិសោធន៍", "experience.role": "អ្នកលក់សំបុត្រ — Virak Buntham Express",
			"experience.period": "មករា 2023 – ខែធ្នូ 2025 • សៀមរាប កម្ពុជា",
			"experience.item1": "ជួយអតិថិជនក្នុងការទិញសំបុត្រ ពិនិត្យពេលវេលា និងព័ត៌មានធ្វើដំណើរ។",
			"experience.item2": "គ្រប់គ្រងប្រតិបត្តិការសាច់ប្រាក់ប្រចាំថ្ងៃ និងរក្សាទិនានុប្បវត្តិទូទាត់បានត្រឹមត្រូវ។",
			"experience.item3": "ផ្តល់សេវាអតិថិជនល្អ និងធានាបទពិសោធន៍វិជ្ជមានសម្រាប់អតិថិជនទាំងអស់។",
			"experience.item4": "ចេញសំបុត្រ និងបង្កាន់ដៃបានត្រឹមត្រូវ។",
			"experience.item5": "ទំនាក់ទំនងជាមួយអតិថិជនដោយវិជ្ជមាន និងចម្លើយសំណួរប្រចាំថ្ងៃ។",
			"experience.tag1": "សេវាអតិថិជន", "experience.tag2": "គ្រប់គ្រងសាច់ប្រាក់", "experience.tag3": "ព័ត៌មានធ្វើដំណើរ",
			"skills.title": "ជំនាញបច្ចេកទេស និងឧបករណ៍", "skills.frontend": "ផ្នែកមុខ", "skills.styling": "រចនាបែប",
			"skills.interactive": "អន្តរកម្ម", "skills.database": "មូលដ្ឋានទិន្នន័យ", "skills.versionControl": "គ្រប់គ្រងកំណែ",
			"skills.uiux": "រចនា UI/UX", "skills.graphics": "ក្រាហ្វិក", "skills.quickAssets": "សន្ដិសម្រស់រហ័ស", "skills.ide": "កម្មវិធីកែសម្រួល",
			"contact.title": "ទំនាក់ទំនង", "contact.build": "តោះបង្កើតអ្វីមួយ",
			"contact.open": "កំពុងស្វែងរកឱកាសកម្មសិក្សា ការងារអភិវឌ្ឍន៍វែបសាយ និងការសហការ។",
			"contact.quick": "ផ្ញើសាររហ័ស", "contact.name": "ឈ្មោះ", "contact.email": "អ៊ីមែល", "contact.message": "សារ",
			"contact.namePlaceholder": "ឈ្មោះរបស់អ្នក", "contact.emailPlaceholder": "email@example.com",
			"contact.messagePlaceholder": "សួស្តី! ខ្ញុំបានមើលផលប្រមុខជំនាញរបស់អ្នក…", "contact.send": "ផ្ញើ",
			"contact.inbox": "សារត្រូវបានផ្ញើដោយផ្ទាល់ទៅប្រអប់សំបុត្ររបស់ខ្ញុំ", "footer.role": "អ្នកអភិវឌ្ឍន៍វែបសាយ", "footer.backTop": "ត្រឡប់ទៅលើ"
		}
	};

	const navBtn = $("#navBtn");
	const menu = $("#menu");
	const toastEl = $("#toast");
	const contactForm = $("#contactForm");
	const yearEl = $("#year");
	const kineticReplay = $(".kinetic-replay");
	const projectGrid = $(".project-grid");
	const projectFilters = $$(".project-filter");
	const seeMoreProjects = $(".see-more-projects");
	const projectLightbox = $("#projectLightbox");
	const lightboxImage = $("#lightboxImage");
	const lightboxTitle = $("#lightboxTitle");
	const lightboxCaption = $("#lightboxCaption");
	const lightboxClose = $(".project-lightbox-close", projectLightbox);
	const themeToggle = $("#themeToggle");
	const languageOptions = $$(".language-option");

	const menuLinks = $$(".a");

	const getTranslation = (language, key) =>
		translations[language]?.[key] ?? translations.en[key] ?? key;

	const applyLanguage = (language) => {
		const selectedLanguage = language === "km" ? "km" : "en";
		document.documentElement.lang = selectedLanguage;
		document.documentElement.classList.toggle("lang-km", selectedLanguage === "km");
		localStorage.setItem("portfolio-language", selectedLanguage);

		$$("[data-i18n]").forEach((element) => {
			const key = element.dataset.i18n;
			const translated = getTranslation(selectedLanguage, key);
			if (translated) {
				element.textContent = translated;
				element.dataset.text = translated;
			}
		});

		$$("[data-i18n-placeholder]").forEach((element) => {
			element.placeholder = getTranslation(selectedLanguage, element.dataset.i18nPlaceholder);
		});

		$$("[data-i18n-aria]").forEach((element) => {
			element.setAttribute("aria-label", getTranslation(selectedLanguage, element.dataset.i18nAria));
		});

		languageOptions.forEach((option) => {
			const isActive = option.dataset.language === selectedLanguage;
			option.classList.toggle("is-active", isActive);
			option.setAttribute("aria-pressed", String(isActive));
		});
		document.dispatchEvent(new CustomEvent("languagechange", { detail: { language: selectedLanguage } }));

	};

	const applyTheme = (theme) => {
		const selectedTheme = theme === "light" ? "light" : "dark";
		document.documentElement.dataset.theme = selectedTheme;
		document.querySelector('meta[name="theme-color"]')?.setAttribute(
			"content",
			selectedTheme === "dark" ? "#012c4e" : "#faf9f6"
		);
		document.documentElement.style.colorScheme = selectedTheme;
		localStorage.setItem("portfolio-theme", selectedTheme);

		if (themeToggle) {
			const nextTheme = selectedTheme === "dark" ? "light" : "dark";
			themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
			themeToggle.title = `Switch to ${nextTheme} mode`;
		}
	};

	const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
	const savedLanguage = localStorage.getItem("portfolio-language") || "en";
	applyTheme(savedTheme);
	applyLanguage(savedLanguage);

	themeToggle?.addEventListener("click", () => {
		const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
		applyTheme(nextTheme);
	});

	languageOptions.forEach((option) => {
		option.addEventListener("click", () => applyLanguage(option.dataset.language));
	});

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
			const language = document.documentElement.lang === "km" ? "km" : "en";
			const label = getTranslation(language, expanded ? "projects.showLess" : "projects.seeMore");
			seeMoreProjects.innerHTML = `${label} <span aria-hidden="true">${expanded ? "↑" : "↓"}</span>`;
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
		document.addEventListener("languagechange", updateProjects);
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
			const language = document.documentElement.lang === "km" ? "km" : "en";
			const modalTitle = image.dataset.i18nTitle
				? getTranslation(language, image.dataset.i18nTitle)
				: (image.dataset.title || title.textContent.trim());
			const modalCaption = image.dataset.i18nCaption
				? getTranslation(language, image.dataset.i18nCaption)
				: (image.dataset.caption || "");
			lightboxTitle.textContent = modalTitle;
			if (lightboxCaption) {
				lightboxCaption.textContent = modalCaption;
				lightboxCaption.hidden = !modalCaption;
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

	const copyEmailButtons = $$(".copy-email-btn");
	copyEmailButtons.forEach((button) => {
		button.addEventListener("click", async () => {
			const email = button.dataset.email || "";
			try {
				await navigator.clipboard.writeText(email);
				button.classList.add("is-copied");
				button.setAttribute("aria-label", "Email address copied");
				showToast("Email address copied.");
				window.setTimeout(() => {
					button.classList.remove("is-copied");
					button.setAttribute("aria-label", "Copy email address");
				}, 1800);
			} catch {
				showToast(email);
			}
		});
	});

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

	// Reveal-on-scroll (subtle and staggered)
	const revealTargets = $$(".hero-left, .frame, .section .head, .section .project-filters, .section .card, .skills-grid > *, .hero-meta, .cta, .hero-social");
	revealTargets.forEach((el, index) => {
		el.classList.add("reveal");
		el.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
	});

	const revealEls = $$(".reveal");
	if (revealEls.length) {
		if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			revealEls.forEach((el) => el.classList.add("on"));
		} else {
			const io = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add("on");
							io.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
			);
			revealEls.forEach((el) => io.observe(el));
		}
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
		const text = (titleAccent.dataset.text || titleAccent.textContent).trim();
		window.clearTimeout(typewriterTimer);
		if (reduceMotion) {
			titleAccent.classList.remove("is-typing");
			titleAccent.textContent = text;
			return;
		}

		titleAccent.classList.add("is-typing");
		const segments = typeof Intl !== "undefined" && "Segmenter" in Intl
			? Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text), ({ segment }) => segment)
			: Array.from(text);

		titleAccent.innerHTML = `<span class="sr">${text}</span><span aria-hidden="true">${segments
			.map((character, index) => {
				const characterText = character === " " ? "&nbsp;" : character;
				return `<span class="kinetic-letter" style="--i:${index}">${characterText}</span>`;
			})
			.join("")}</span>`;

		const letters = $$(".title-accent .kinetic-letter");
		let visibleCount = 0;
		const showNextLetter = () => {
			if (visibleCount >= letters.length) {
				typewriterTimer = window.setTimeout(() => {
					letters.forEach((letter) => letter.classList.remove("is-visible"));
					visibleCount = 0;
					typewriterTimer = window.setTimeout(showNextLetter, 900);
				}, 1800);
				return;
			}

			letters[visibleCount].classList.add("is-visible");
			visibleCount += 1;
			typewriterTimer = window.setTimeout(showNextLetter, document.documentElement.lang === "km" ? 115 : 85);
		};

		showNextLetter();
	};

	animateName();
	animateTitle();
	kineticReplay?.addEventListener("click", () => {
		animateName();
		animateTitle();
	});
	document.addEventListener("languagechange", () => {
		animateName();
		animateTitle();
	});

	// Year
	if (yearEl) {
		yearEl.textContent = String(new Date().getFullYear());
	}
})();
