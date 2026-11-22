(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = { get: k => { try { return localStorage.getItem(k) } catch { return null } }, set: (k, v) => { try { localStorage.setItem(k, v) } catch {} } };

/* ---------- Translations ---------- */
const T = {
en: {skip:"Skip to content","nav.home":"Home","nav.about":"About","nav.projects":"My work","nav.contact":"Contact","nav.hire":"Hire Me",
"hero.hello":"Hello, I’m","hero.role":"Web Developer","hero.lead":"I design and build conversion-focused interfaces that look polished, load fast, and feel effortless on every device.","hero.projects":"View Projects","hero.cv":"Download CV","hero.freelance":"Available for freelance","hero.based":"Based in Cambodia","hero.fast":"Fast delivery, clean code",
"about.t1":"Fast learner.","about.t2":"Curious mind.","about.bio":"I’m an Information Technology graduate who combines thoughtful design with well-built code. I enjoy creating clear, useful digital experiences that look polished, work smoothly, and make sense from the first interaction.","about.projects":"Projects Completed","about.fields":"Design & Dev Fields","about.years":"Years of Study",
"edu.title":"Education","edu.d1":"Bachelor of Science in Information Technology","edu.n1":"Graduated with recognizing academic excellence. GPA: 3.32/4.00","edu.d2":"High School Diploma","edu.n2":"Finished Grade 12","cert.title":"Certifications",
"projects.title":"Recently Worked","projects.poster":"Poster Design","projects.uxui":"UX/UI Design","projects.website":"Web Development","projects.football":"Football Player Poster","projects.coffee":"Coffee Campaign","projects.matcha":"Matcha Campaign","projects.iceLatte":"Ice Latte Campaign","projects.urban":"Urban Trails","projects.meta":"UX/UI · Figma · Website design","projects.urbanSummary":"Travel website UI for discovering destinations and local experiences.","projects.proto":"View prototype","projects.demo":"Live demo",
"contact.build":"Let’s build something","contact.open":"Open to web development roles, freelance projects, and collaborations.","contact.copy":"Copy phone number","contact.quick":"Quick message","contact.name":"Name","contact.email":"Email","contact.message":"Message","contact.namePh":"Your name","contact.msgPh":"Hi! I saw your portfolio and…","contact.send":"Send","contact.inbox":"Messages are sent directly to my inbox","footer.role":"Web Developer","footer.top":"Back to top",
fill:"Please fill out all fields.",sent:"Thanks! Your message has been sent.",copied:"Phone number copied"},
km: {skip:"រំលងទៅខ្លឹមសារ","nav.home":"ទំព័រដើម","nav.about":"អំពីខ្ញុំ","nav.projects":"ការងារ","nav.contact":"ទំនាក់ទំនង","nav.hire":"ជួលខ្ញុំ",
"hero.hello":"សួស្តី, ខ្ញុំគឺ","hero.role":"អ្នកអភិវឌ្ឍន៍គេហទំព័រ","hero.lead":"ខ្ញុំរចនា និងបង្កើតចំណុចប្រទាក់ដែលស្អាត ឆាប់រហ័ស និងងាយស្រួលប្រើនៅលើគ្រប់ឧបករណ៍។","hero.projects":"មើលគម្រោង","hero.cv":"ទាញយក CV","hero.freelance":"ទទួលការងារឯករាជ្យ","hero.based":"នៅកម្ពុជា","hero.fast":"បញ្ចប់លឿន កូដស្អាត",
"about.t1":"រៀនអ្វីថ្មីលឿន","about.t2":"ចិត្តចង់ចេះដឹង","about.bio":"ខ្ញុំជានិស្សិតបញ្ចប់ការសិក្សាផ្នែកព័ត៌មានវិទ្យា ដែលផ្សំរចនាជាមួយការសរសេរកូដដែលមានគុណភាព។ ខ្ញុំចូលចិត្តបង្កើតបទពិសោធន៍ឌីជីថលដែលស្អាត និងងាយស្រួលប្រើ។","about.projects":"គម្រោងដែលបានធ្វើ","about.fields":"ផ្នែករចនា និងអភិវឌ្ឍន៍","about.years":"ឆ្នាំសិក្សា",
"edu.title":"ការសិក្សា","edu.d1":"បរិញ្ញាបត្រវិទ្យាសាស្ត្រ ផ្នែកព័ត៌មានវិទ្យា","edu.n1":"បញ្ចប់ដោយទទួលស្គាល់ភាពឆ្នើមផ្នែកសិក្សា។ GPA: 3.32/4.00","edu.d2":"សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ","edu.n2":"បញ្ចប់ថ្នាក់ទី ១២","cert.title":"វិញ្ញាបនបត្រ",
"projects.title":"ការងារថ្មីៗ","projects.poster":"រចនាប៉ុស្ត័រ","projects.uxui":"រចនា UX/UI","projects.website":"អភិវឌ្ឍន៍វែបសាយ","projects.football":"ប៉ុស្ត័រអត្តពលិកបាល់ទាត់","projects.coffee":"យុទ្ធនាការកាហ្វេ","projects.matcha":"យុទ្ធនាការម៉ាចា","projects.iceLatte":"យុទ្ធនាការកូឡាតេទឹកកក","projects.urban":"Urban Trails","projects.meta":"UX/UI · Figma · រចនាវែបសាយ","projects.urbanSummary":"ចំណុចប្រទាក់វែបសាយធ្វើដំណើរសម្រាប់ស្វែងរកទិសដៅ និងបទពិសោធន៍ក្នុងតំបន់។","projects.proto":"មើលគំរូ","projects.demo":"មើលគម្រោង",
"contact.build":"តោះបង្កើតអ្វីមួយ","contact.open":"ទទួលការងារអភិវឌ្ឍន៍វែបសាយ គម្រោងឯករាជ្យ និងការសហការបាន។","contact.copy":"ចម្លងលេខទូរសព្ទ","contact.quick":"ផ្ញើសាររហ័ស","contact.name":"ឈ្មោះ","contact.email":"អ៊ីមែល","contact.message":"សារ","contact.namePh":"ឈ្មោះរបស់អ្នក","contact.msgPh":"សួស្តី! ខ្ញុំបានមើលផលប្រមុខជំនាញរបស់អ្នក…","contact.send":"ផ្ញើ","contact.inbox":"សារត្រូវបានផ្ញើដោយផ្ទាល់ទៅប្រអប់សំបុត្ររបស់ខ្ញុំ","footer.role":"អ្នកអភិវឌ្ឍន៍វែបសាយ","footer.top":"ត្រឡប់ទៅលើ",
fill:"សូមបំពេញព័ត៌មានទាំងអស់។",sent:"អរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើ។",copied:"បានចម្លងលេខទូរសព្ទ"}
};
let lang = "en";
const tr = k => T[lang][k] ?? T.en[k] ?? k;
const toast = (m) => { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2200) };

const applyLang = (l) => {
  lang = l === "km" ? "km" : "en"; document.documentElement.lang = lang; store.set("pf-lang", lang);
  $$("[data-i18n]").forEach(e => { e.textContent = tr(e.dataset.i18n) });
  $$("[data-i18n-placeholder]").forEach(e => { e.placeholder = tr(e.dataset.i18nPlaceholder) });
  $$(".lang button").forEach(b => { const on = b.dataset.language === lang; b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on) });
  typeRole(); animateName();
};
const applyTheme = (t) => {
  t = t === "light" ? "light" : "dark"; document.documentElement.dataset.theme = t; store.set("pf-theme", t);
  $('meta[name="theme-color"]').content = t === "dark" ? "#012c4e" : "#faf9f6";
};
$("#themeToggle").onclick = () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
$$(".lang button").forEach(b => b.onclick = () => applyLang(b.dataset.language));

/* ---------- Hero: kinetic name + typewriter role ---------- */
const nameEl = $("#name");
function animateName() {
  const txt = "Chhoeut Darwin"; let i = 0;
  nameEl.setAttribute("aria-label", txt);
  nameEl.innerHTML = txt.split(" ").map(w => `<span class="w" aria-hidden="true">${[...w].map(c => `<span class="ch" style="--i:${i++}">${c}</span>`).join("")}</span>`).join(" ");
}
let typeTimer;
function typeRole() {
  const el = $("#role"), full = tr("hero.role");
  clearTimeout(typeTimer);
  if (reduce) { el.textContent = full; return }
  const seg = [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(full)].map(s => s.segment);
  let n = 0, del = false;
  const step = () => {
    el.textContent = seg.slice(0, n).join("");
    if (!del && n === seg.length) { del = true; typeTimer = setTimeout(step, 2200); return }
    if (del && n === 0) { del = false; typeTimer = setTimeout(step, 500); return }
    n += del ? -1 : 1; typeTimer = setTimeout(step, del ? 40 : 90);
  };
  step();
}

/* ---------- Nav: hide on scroll down, progress, active link ---------- */
const nav = $("#nav"), prog = $("#progress"); let lastY = 0;
const links = $$("#menu a"), secs = $$("main section[id]");
addEventListener("scroll", () => {
  const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  prog.style.width = (h > 0 ? y / h * 100 : 0) + "%";
  nav.classList.toggle("hide", y > lastY && y > 160 && !$("#menu").classList.contains("open"));
  lastY = y;
  let cur = secs[0].id; secs.forEach(s => { if (s.offsetTop - 140 <= y) cur = s.id });
  links.forEach(a => a.toggleAttribute("aria-current", a.hash === "#" + cur));
}, { passive: true });
const menu = $("#menu"), burger = $("#navBtn");
burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o) };
links.forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false) }));

/* ---------- Cursor glow, photo parallax, project tilt ---------- */
const glow = $("#glow"), photo = $("#photo");
if (!reduce && matchMedia("(pointer:fine)").matches) {
  addEventListener("pointermove", e => { glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)` });
  $(".hero").addEventListener("pointermove", e => {
    const x = (e.clientX / innerWidth - .5) * 2, y = (e.clientY / innerHeight - .5) * 2;
    photo.style.transform = `translate(${x * 10}px,${y * 10}px)`;
  });
  $("#pgrid").addEventListener("pointermove", e => {
    const c = e.target.closest(".pcard"); if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--rx", ((e.clientX - r.left) / r.width - .5) * 8 + "deg");
    c.style.setProperty("--ry", -((e.clientY - r.top) / r.height - .5) * 8 + "deg");
  });
  $("#pgrid").addEventListener("pointerout", e => { const c = e.target.closest(".pcard"); if (c) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg") } });
}

/* ---------- Reveal + count-up ---------- */
$$(".tile, .h2, .filters, .pcard, .foot").forEach((e, i) => { e.classList.add("rv"); e.style.transitionDelay = (i % 4) * 70 + "ms" });
const io = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return; en.target.classList.add("on"); io.unobserve(en.target);
  const b = $("[data-count]", en.target) || (en.target.dataset.count ? en.target : null);
  if (b && !reduce) { const to = +b.dataset.count; let n = 0; const id = setInterval(() => { n++; b.textContent = n; if (n >= to) clearInterval(id) }, 90) }
}), { threshold: .15 });
$$(".rv").forEach(e => io.observe(e));

/* ---------- Project filter + lightbox ---------- */
const cards = $$(".pcard"), fbtn = $$(".filters button");
const show = f => { cards.forEach((c, i) => { const on = c.dataset.category === f; c.hidden = !on; if (on) { c.style.animation = "none"; c.offsetHeight; c.style.animation = `pop .5s ${i % 4 * 60}ms both`; c.classList.add("on") } }) };
fbtn.forEach(b => b.onclick = () => { fbtn.forEach(x => { x.classList.toggle("is-active", x === b); x.setAttribute("aria-pressed", x === b) }); show(b.dataset.filter) });
show("poster");
const lb = $("#lb");
const closeLb = () => { lb.classList.remove("open"); setTimeout(() => { lb.hidden = true }, 200) };
cards.forEach(c => { if ($(".plinks a", c)) return; c.dataset.zoom = 1; c.tabIndex = 0; c.setAttribute("role", "button");
  const open = () => { const im = $("img", c); $("#lbImg").src = im.src; $("#lbImg").alt = im.alt; $("#lbTitle").textContent = im.dataset.title || $("h3", c).textContent; const cap = $("#lbCap"); cap.textContent = im.dataset.caption || ""; cap.hidden = !im.dataset.caption; lb.hidden = false; requestAnimationFrame(() => lb.classList.add("open")) };
  c.onclick = open; c.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open() } } });
$$("[data-close]", lb).forEach(e => e.onclick = closeLb);
addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) closeLb() });

/* ---------- Contact ---------- */
$("#copyPhone").onclick = async () => { try { await navigator.clipboard.writeText("096 6356 765"); toast(tr("copied")) } catch { toast("096 6356 765") } };
$("#contactForm").addEventListener("submit", async e => {
  e.preventDefault(); const f = e.target, btn = $("button[type=submit]", f);
  if (![...f.querySelectorAll("[required]")].every(i => i.value.trim())) return toast(tr("fill"));
  btn.disabled = true;
  try { const r = await fetch(f.action, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(f) }); if (!r.ok) throw 0; f.reset(); toast(tr("sent")) }
  catch { toast("Something went wrong. Please try again.") } finally { btn.disabled = false }
});
$("#year").textContent = new Date().getFullYear();

/* ---------- Pets: dog chases cat along the bottom; butterfly in hero ---------- */
const mk = (cls, emoji, sounds) => { const p = document.createElement("div"); p.className = "pet " + cls; p.innerHTML = `<i></i><span aria-hidden="true">${emoji}</span>`;
  p.firstElementChild.nextElementSibling.onclick = () => { $("i", p).textContent = sounds[Math.random() * sounds.length | 0]; p.classList.add("talk"); setTimeout(() => p.classList.remove("talk"), 1200) };
  document.body.appendChild(p); return p };
const cat = mk("cat", "🐈", ["Meow!", "Nya~", "Hire Darwin 😼"]);
const dog = mk("dog", "🐕", ["Woof!", "Come back!", "I’ll catch you!"]);
let dir = 1, cx = -80, wait = 0, last = performance.now(), cy = 0;
const catSpan = cat.lastElementChild, dogSpan = dog.lastElementChild;
const loop = now => {
  const dt = Math.min(now - last, 50) / 16.7; last = now;
  if (!document.body.classList.contains("pets-off")) {
    if (wait > 0) { wait -= dt; cat.style.visibility = dog.style.visibility = "hidden" }
    else {
      cat.style.visibility = dog.style.visibility = "visible";
      cx += dir * 2.6 * dt;
      const dx = dir * -78;
      cat.style.transform = `translateX(${cx}px)`; dog.style.transform = `translateX(${cx + dx}px)`;
      catSpan.style.transform = dogSpan.style.transform = "";
      cat.firstElementChild.nextElementSibling.style.scale = dir > 0 ? "-1 1" : "1 1";
      dog.firstElementChild.nextElementSibling.style.scale = dir > 0 ? "-1 1" : "1 1";
      if ((dir > 0 && cx > innerWidth + 170) || (dir < 0 && cx < -170)) { dir *= -1; wait = 480 }
    }
  }
  requestAnimationFrame(loop);
};
if (!reduce) { cx = -80; requestAnimationFrame(loop) }
const bf = $("#butterfly"); let bt = 0;
const fly = () => { bt += .012; const r = photo.getBoundingClientRect(); const w = r.width, h = r.height;
  bf.style.transform = `translate(${w / 2 + Math.cos(bt * 1.3) * w * .55}px,${h / 2 + Math.sin(bt * 2.1) * h * .45}px) rotate(${Math.sin(bt * 4) * 14}deg)`; requestAnimationFrame(fly) };
if (!reduce) fly();
const pt = $("#petToggle");
const setPets = on => { document.body.classList.toggle("pets-off", !on); pt.setAttribute("aria-pressed", on); store.set("pf-pets", on ? "1" : "0") };
pt.onclick = () => setPets(pt.getAttribute("aria-pressed") !== "true");
setPets(store.get("pf-pets") !== "0");

applyTheme(store.get("pf-theme") || "dark");
applyLang(store.get("pf-lang") || "en");
})();