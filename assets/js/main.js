/* =========================================================
   INFINITY WAY — interactions
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const WA = "962796068788";
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };

  /* ---------------------------------------------------------
     CONTENT (AR / EN)
  --------------------------------------------------------- */
  const ICONS = {
    logistics: '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 10h.01M15 10h.01M9 13h.01M15 13h.01"/></svg>',
    finance: '<svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-7"/><path d="M16 7h4v4"/></svg>',
    it: '<svg viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
    ads: '<svg viewBox="0 0 24 24"><path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 8.5a5 5 0 0 1 0 7M19 5.5a9 9 0 0 1 0 13"/></svg>',
  };

  const PILLARS = [
    {
      id: "logistics", color: "#ff2d75", en: "Logistics Services",
      ar: { t: "الخدمات اللوجستية", items: [
        "تأسيس الشركات والتعديلات القانونية وشطب الشركات وتصفيتها",
        "التراخيص لأول مرة والتجديد",
        "متابعة الدوائر الحكومية",
        "التأمين والمطالبات",
        "الاستشارات القانونية",
      ]},
      en_: { t: "Logistics Services", items: [
        "Company formation, legal amendments, deregistration & liquidation",
        "First-time licensing & renewals",
        "Follow-up with government departments",
        "Insurance & claims",
        "Legal consultations",
      ]},
    },
    {
      id: "finance", color: "#ffb800", en: "Financial & Tax Consulting",
      ar: { t: "الاستشارات المالية والضريبية", items: [
        "الاستشارات المحاسبية والمالية والإدارية ومسك الحسابات",
        "الاستشارات الضريبية ومتابعة ضريبة الدخل والمبيعات",
        "تقييم المخاطر ودراسة الجدوى",
        "التدقيق الداخلي",
      ]},
      en_: { t: "Financial & Tax Consulting", items: [
        "Accounting, financial & administrative consulting and bookkeeping",
        "Tax consulting and income & sales tax follow-up",
        "Risk assessment & feasibility studies",
        "Internal audit",
      ]},
    },
    {
      id: "it", color: "#00b8ff", en: "Information Technology", wide: true,
      ar: { t: "تكنولوجيا المعلومات", items: [
        "أنظمة تخطيط موارد المؤسسات (ERP): المحاسبة، المستودعات، شؤون الموظفين، نقاط البيع وغيرها لجميع القطاعات",
        "أجهزة كمبيوتر وجميع مستلزماتها",
        "سيرفرات ومستلزماتها، مع التركيب والصيانة وتمديد الشبكات",
        "طابعات وأحبار وجميع مستلزماتها",
        "آلات تصوير وجميع مستلزماتها",
        "كاميرات مراقبة وتركيبها",
        "أجهزة نقاط البيع وجميع مستلزماتها",
        "أجهزة UPS",
      ]},
      en_: { t: "Information Technology", items: [
        "ERP systems: accounting, warehouses, HR, point of sale and more — for every sector",
        "Computers & all accessories",
        "Servers & accessories, with installation, maintenance and network cabling",
        "Printers, ink & all supplies",
        "Photocopiers & all supplies",
        "Security cameras & installation",
        "POS devices & all supplies",
        "UPS devices",
      ]},
    },
    {
      id: "ads", color: "#9b4dff", en: "Print & Digital Advertising", wide: true,
      ar: { t: "الدعاية المطبوعة والرقمية", items: [
        "تصميم هوية الشركات",
        "تصميم وتنفيذ اللوحات الإعلانية والملصقات",
        "تصميم وتنفيذ جميع أنواع المطبوعات",
        "تصميم وبرمجة المواقع الإلكترونية واستضافتها مع الإيميلات والعناوين",
        "تحسين محركات البحث (SEO)",
        "التسويق الإلكتروني",
      ]},
      en_: { t: "Print & Digital Advertising", items: [
        "Corporate identity design",
        "Billboard & sticker design and production",
        "Design and printing of all print materials",
        "Website design, development & hosting with emails and domains",
        "Search engine optimization (SEO)",
        "Digital marketing",
      ]},
    },
  ];
  const TOTAL_SERVICES = PILLARS.reduce((n, p) => n + p.ar.items.length, 0);

  const STEPS = {
    ar: [
      ["نسمعك", "جلسة استشارية نفهم فيها عملك، أهدافك، والتحديات التي تواجهك."],
      ["نحلل ونخطط", "نضع خطة واضحة: ماذا تحتاج، متى، وبأي تكلفة — بلا مفاجآت."],
      ["ننفّذ", "فريقنا يتولى التنفيذ من الأوراق الرسمية إلى الأنظمة والتصاميم."],
      ["نتابع للنهاية", "متابعة مستمرة ودعم بعد التسليم، لأن طريقنا لا ينتهي."],
    ],
    en: [
      ["We listen", "A consultation to understand your business, goals and challenges."],
      ["We plan", "A clear plan: what you need, when, and at what cost — no surprises."],
      ["We deliver", "Our team executes — from official paperwork to systems and design."],
      ["We follow through", "Ongoing follow-up and support after delivery. Our way never ends."],
    ],
  };
  const STEP_COLORS = ["#ff2d75", "#ffb800", "#2bd96b", "#00b8ff"];

  const WHY = {
    ar: [
      ["◆", "كل شيء تحت سقف واحد", "من السجل التجاري إلى السيرفر إلى الإعلان — جهة واحدة تتابع كل شيء."],
      ["％", "تركيز ضريبي ومالي", "متابعة ضريبة الدخل والمبيعات ومسك الحسابات بدقة تحميك من المفاجآت."],
      ["⌘", "تقنية تشغّل عملك", "أنظمة ERP وأجهزة وشبكات تُركّب وتُصان لتعمل بلا توقف."],
      ["✦", "هوية تتكلم عنك", "تصميم، طباعة، مواقع وتسويق رقمي يجعل علامتك لا تُنسى."],
      ["⟳", "متابعة حتى النهاية", "لا نسلّم ونختفي. نتابع المعاملات والأنظمة حتى تكتمل."],
      ["⚡", "تواصل مباشر وسريع", "رسالة واتساب واحدة تكفي لتبدأ — بدون تعقيد."],
    ],
    en: [
      ["◆", "Everything under one roof", "From registration to servers to advertising — one team handles it all."],
      ["％", "Tax & finance focus", "Income & sales tax follow-up and precise bookkeeping that keep you safe."],
      ["⌘", "Tech that runs your business", "ERP, hardware and networks installed and maintained to run non-stop."],
      ["✦", "A brand that speaks", "Design, print, websites and digital marketing that make you unforgettable."],
      ["⟳", "Follow-through", "We don't deliver and disappear — we see every file and system to the end."],
      ["⚡", "Fast, direct contact", "One WhatsApp message is all it takes to get started."],
    ],
  };
  const WHY_COLORS = ["#ff2d75", "#ffb800", "#00b8ff", "#9b4dff", "#2bd96b", "#ff6a3d"];

  const MARQUEE = {
    ar: ["تأسيس الشركات", "ضريبة الدخل والمبيعات", "مسك الحسابات", "أنظمة ERP", "التدقيق الداخلي", "دراسات الجدوى", "الشبكات والسيرفرات", "هوية الشركات", "تصميم المواقع", "SEO", "التسويق الإلكتروني", "التراخيص"],
    en: ["Company Formation", "Income & Sales Tax", "Bookkeeping", "ERP Systems", "Internal Audit", "Feasibility Studies", "Networks & Servers", "Brand Identity", "Web Design", "SEO", "Digital Marketing", "Licensing"],
  };

  const I18N = {
    ar: {
      "nav.services": "خدماتنا", "nav.process": "كيف نعمل", "nav.why": "لماذا نحن", "nav.contact": "تواصل معنا", "nav.cta": "ابدأ الآن",
      "hero.eyebrow": "حلول أعمال متكاملة — الأردن", "hero.t1": "الطريق", "hero.t2": "اللامحدود",
      "hero.sub": "للخدمات الضريبية وحلول الأعمال — من تأسيس شركتك، إلى حساباتها وضرائبها، أنظمتها وتقنيتها، وحتى هويتها وتسويقها. كل ما تحتاجه، في طريق واحد لا ينتهي.",
      "hero.cta1": "استكشف خدماتنا", "hero.cta2": "واتساب مباشر", "hero.hint": "حرّك الماوس • اضغط لتفجير اللانهاية",
      "stats.s1": "أقسام متخصصة", "stats.s2": "خدمة تحت سقف واحد", "stats.s3": "شريك لكل احتياجاتك", "stats.s4": "إمكانيات بلا حدود",
      "services.kicker": "01 — خدماتنا", "services.title": "أربعة عوالم. <em>طريق واحد.</em>", "services.lead": "اختر العالم الذي تحتاجه، ودعنا نحمل الباقي عنك.",
      "process.kicker": "02 — كيف نعمل", "process.title": "من الفكرة إلى <em>التنفيذ</em>.",
      "why.kicker": "03 — لماذا Infinity Way", "why.title": "لأن عملك يستحق <em>شريكاً</em> لا مورّداً.",
      "cta.l1": "جاهز تبدأ", "cta.l2": "طريقك اللامحدود؟", "cta.btn": "لنتحدث الآن",
      "contact.kicker": "04 — تواصل معنا", "contact.title": "خطوتك الأولى <em>تبدأ هنا</em>.",
      "contact.phone": "اتصل بنا", "contact.wa": "واتساب", "contact.fb": "فيسبوك", "contact.web": "الموقع",
      "form.title": "أرسل طلبك عبر واتساب", "form.name": "الاسم الكامل", "form.phone": "رقم الهاتف", "form.service": "الخدمة المطلوبة",
      "form.msg": "تفاصيل إضافية", "form.send": "إرسال عبر واتساب", "form.pick": "— اختر الخدمة —", "form.other": "أخرى / استشارة عامة",
      "form.errName": "الرجاء كتابة اسمك.", "form.errService": "الرجاء اختيار الخدمة.",
      "form.hello": "مرحباً Infinity Way،", "form.lName": "الاسم", "form.lPhone": "الهاتف", "form.lService": "الخدمة", "form.lMsg": "التفاصيل",
      "footer.tag": "الطريق اللامحدود للخدمات الضريبية وحلول الأعمال",
    },
    en: {
      "nav.services": "Services", "nav.process": "Process", "nav.why": "Why us", "nav.contact": "Contact", "nav.cta": "Get started",
      "hero.eyebrow": "Integrated business solutions — Jordan", "hero.t1": "The Infinite", "hero.t2": "Way",
      "hero.sub": "For tax services and business solutions — from founding your company to its accounts and taxes, its systems and technology, all the way to its identity and marketing. Everything you need, on one endless road.",
      "hero.cta1": "Explore services", "hero.cta2": "WhatsApp us", "hero.hint": "Move your mouse • click to explode infinity",
      "stats.s1": "Specialized divisions", "stats.s2": "Services under one roof", "stats.s3": "Partner for all your needs", "stats.s4": "Limitless possibilities",
      "services.kicker": "01 — Services", "services.title": "Four worlds. <em>One way.</em>", "services.lead": "Pick the world you need — we'll carry the rest.",
      "process.kicker": "02 — Process", "process.title": "From idea to <em>execution</em>.",
      "why.kicker": "03 — Why Infinity Way", "why.title": "Your business deserves a <em>partner</em>, not a vendor.",
      "cta.l1": "Ready to start", "cta.l2": "your infinite way?", "cta.btn": "Let's talk",
      "contact.kicker": "04 — Contact", "contact.title": "Your first step <em>starts here</em>.",
      "contact.phone": "Call us", "contact.wa": "WhatsApp", "contact.fb": "Facebook", "contact.web": "Website",
      "form.title": "Send your request via WhatsApp", "form.name": "Full name", "form.phone": "Phone number", "form.service": "Service needed",
      "form.msg": "More details", "form.send": "Send via WhatsApp", "form.pick": "— Choose a service —", "form.other": "Other / general consultation",
      "form.errName": "Please enter your name.", "form.errService": "Please choose a service.",
      "form.hello": "Hello Infinity Way,", "form.lName": "Name", "form.lPhone": "Phone", "form.lService": "Service", "form.lMsg": "Details",
      "footer.tag": "The infinite way for tax services & business solutions",
    },
  };

  let lang = store.get("iw-lang") === "en" ? "en" : "ar";
  const t = (k) => I18N[lang][k] ?? k;
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function renderDynamic() {
    // Pillars
    $("#pillars").innerHTML = PILLARS.map((p, i) => {
      const c = lang === "ar" ? p.ar : p.en_;
      return `<article class="pillar tilt reveal${p.wide ? " pillar--wide" : ""}" style="--accent:${p.color};--d:${(i % 2) * 0.1}s">
        <div class="pillar__in">
          <span class="pillar__num">0${i + 1}</span>
          <div class="pillar__icon">${ICONS[p.id]}</div>
          <h3>${esc(c.t)}</h3>
          <div class="pillar__en">${lang === "ar" ? p.en : esc(p.ar.t)} · ${c.items.length}</div>
          <ul>${c.items.map((it) => `<li>${esc(it)}</li>`).join("")}</ul>
        </div></article>`;
    }).join("");

    // Steps
    $("#steps").innerHTML = STEPS[lang].map(([h, p], i) =>
      `<div class="step reveal" style="--accent:${STEP_COLORS[i]};--d:${i * 0.1}s">
        <span class="step__dot">0${i + 1}</span><h4>${h}</h4><p>${p}</p></div>`).join("");

    // Why
    $("#whyGrid").innerHTML = WHY[lang].map(([ic, h, p], i) =>
      `<div class="wcard tilt reveal" style="--accent:${WHY_COLORS[i]};--d:${(i % 3) * 0.08}s">
        <span class="wcard__ic" style="color:${WHY_COLORS[i]}">${ic}</span><h4>${h}</h4><p>${p}</p></div>`).join("");

    // Marquee (duplicated for seamless loop)
    const words = MARQUEE[lang].map((w) => `<span>${w}</span>`).join("");
    $("#marquee").innerHTML = words + words;

    // Select
    const sel = $("#fService");
    const prev = sel.selectedIndex;
    sel.innerHTML = `<option value="">${t("form.pick")}</option>` +
      PILLARS.map((p) => {
        const c = lang === "ar" ? p.ar : p.en_;
        return `<optgroup label="${esc(c.t)}">${c.items.map((it) => `<option>${esc(it)}</option>`).join("")}</optgroup>`;
      }).join("") + `<option>${t("form.other")}</option>`;
    if (prev > 0) sel.selectedIndex = prev;
  }

  function applyLang(next, first) {
    lang = next;
    store.set("iw-lang", lang);
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    $("#langBtn").textContent = lang === "ar" ? "EN" : "عربي";
    $$("[data-i18n]").forEach((el) => {
      const v = t(el.dataset.i18n);
      if (v.includes("<")) el.innerHTML = v; else el.textContent = v;
    });
    $$(".hero__cta .arr, .bigcta .arr, .form .arr").forEach((a) => (a.textContent = "←"));
    renderDynamic();
    bindDynamic();
    if (!first) $$(".reveal").forEach((el) => el.classList.add("in"));
    if (!first) dispatchEvent(new Event("resize")); // hero stage swaps sides with direction
  }

  /* ---------------------------------------------------------
     LOADER
  --------------------------------------------------------- */
  function runLoader(done) {
    const num = $("#loaderNum");
    const dur = reduced ? 200 : 1700;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      num.textContent = Math.round((1 - Math.pow(1 - p, 3)) * 100);
      if (p < 1) requestAnimationFrame(tick);
      else {
        $("#loader").classList.add("done");
        document.body.classList.remove("is-loading");
        setTimeout(() => { document.body.classList.add("ready"); done(); }, 250);
      }
    };
    requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------
     HERO — particle infinity
  --------------------------------------------------------- */
  function heroParticles() {
    const canvas = $("#heroCanvas");
    const ctx = canvas.getContext("2d");
    const PALETTE = ["#ff2d75", "#ffb800", "#2bd96b", "#00b8ff", "#9b4dff", "#ff2d75"];
    const SPRITES = 40;
    let W = 0, H = 0, DPR = 1, A = 0, cx = 0, cy = 0, parts = [], sprites = [];
    let running = true, pull = 0.004, explodeAt = null, time = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    function colorAt(f) {
      const seg = f * (PALETTE.length - 1);
      const i = Math.min(PALETTE.length - 2, Math.floor(seg));
      const k = seg - i;
      const a = hexToRgb(PALETTE[i]), b = hexToRgb(PALETTE[i + 1]);
      return a.map((v, j) => Math.round(v + (b[j] - v) * k));
    }
    function buildSprites() {
      sprites = [];
      for (let i = 0; i < SPRITES; i++) {
        const [r, g, b] = colorAt(i / (SPRITES - 1));
        const s = document.createElement("canvas");
        const R = 16;
        s.width = s.height = R * 2;
        const c = s.getContext("2d");
        const grd = c.createRadialGradient(R, R, 0, R, R, R);
        grd.addColorStop(0, `rgba(255,255,255,1)`);
        grd.addColorStop(0.18, `rgba(${r},${g},${b},1)`);
        grd.addColorStop(0.45, `rgba(${r},${g},${b},.35)`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        c.fillStyle = grd;
        c.fillRect(0, 0, R * 2, R * 2);
        sprites.push(s);
      }
    }
    // Lemniscate of Bernoulli
    const curve = (tt) => {
      const s = Math.sin(tt), c = Math.cos(tt), d = 1 + s * s;
      return [(A * c) / d, (A * s * c) / d];
    };
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

    function resize() {
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      // Keep the infinity inside its own stage so it never covers the headline
      const st = $("#heroStage").getBoundingClientRect(), cr = canvas.getBoundingClientRect();
      cx = st.left - cr.left + st.width / 2;
      cy = st.top - cr.top + st.height / 2;
      A = Math.min(st.width * 0.44, st.height * 1.15);
      const target = Math.round(Math.max(600, Math.min(2000, (W * H) / 800)));
      if (parts.length === 0) {
        for (let i = 0; i < target; i++) parts.push(make());
      } else if (parts.length < target) {
        while (parts.length < target) parts.push(make());
      } else parts.length = target;
    }
    function make() {
      const tt = Math.random() * Math.PI * 2;
      return {
        t: tt,
        spd: (0.0018 + Math.random() * 0.0035) * (Math.random() < 0.85 ? 1 : -1),
        off: gauss() * (0.04 + Math.random() * 0.045),
        ph: Math.random() * Math.PI * 2,
        sz: 1.5 + Math.random() * Math.random() * 6,
        x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0,
      };
    }

    let scrollF = 0;
    function frame() {
      if (!running) return;
      time += 0.016;
      pull += (0.055 - pull) * 0.012;

      // trails
      // fade to transparent (not to bg colour) so 8-bit rounding leaves no ghosts
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.24)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      const rot = Math.sin(time * 0.15) * 0.08 + scrollF * 0.6;
      const scl = 1 + scrollF * 0.3;
      const cr = Math.cos(rot), sr = Math.sin(rot);
      const breathe = 1 + Math.sin(time * 0.8) * 0.03;
      const mR = Math.min(W, H) * 0.16, mR2 = mR * mR;

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.t += p.spd;
        const [x0, y0] = curve(p.t);
        const [x1, y1] = curve(p.t + 0.01);
        let nx = -(y1 - y0), ny = x1 - x0;
        const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
        const wob = p.off * A * (1 + 0.35 * Math.sin(time * 1.6 + p.ph)) * breathe;
        let tx = (x0 + nx * wob) * scl, ty = (y0 + ny * wob) * scl;
        const rx = tx * cr - ty * sr, ry = tx * sr + ty * cr;
        tx = cx + rx; ty = cy + ry;

        p.vx += (tx - p.x) * pull;
        p.vy += (ty - p.y) * pull;

        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < mR2) {
            const d = Math.sqrt(d2) || 1, f = (1 - d / mR) * 6;
            p.vx += (dx / d) * f + (-dy / d) * f * 0.6;
            p.vy += (dy / d) * f + (dx / d) * f * 0.6;
          }
        }
        if (explodeAt) {
          const dx = p.x - explodeAt.x, dy = p.y - explodeAt.y;
          const d = Math.hypot(dx, dy) || 1, f = 2200 / (d + 60);
          p.vx += (dx / d) * f * (0.5 + Math.random());
          p.vy += (dy / d) * f * (0.5 + Math.random());
        }

        p.vx *= 0.86; p.vy *= 0.86;
        p.x += p.vx; p.y += p.vy;

        const ci = Math.floor(((p.t % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * (SPRITES - 1));
        const sp = Math.min(2.2, 1 + Math.hypot(p.vx, p.vy) * 0.05);
        const s = p.sz * sp;
        ctx.drawImage(sprites[ci], p.x - s, p.y - s, s * 2, s * 2);
      }
      explodeAt = null;
      requestAnimationFrame(frame);
    }

    buildSprites();
    resize();
    addEventListener("resize", resize);
    new ResizeObserver(resize).observe($("#heroStage"));

    const hero = $("#hero");
    hero.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
    });
    hero.addEventListener("pointerleave", () => { mouse.active = false; });
    hero.addEventListener("pointerdown", (e) => {
      if (e.target.closest("a,button")) return;
      const r = canvas.getBoundingClientRect();
      explodeAt = { x: e.clientX - r.left, y: e.clientY - r.top };
    });
    addEventListener("scroll", () => {
      scrollF = Math.min(1, scrollY / (H || 1));
    }, { passive: true });

    new IntersectionObserver(([en]) => {
      const was = running;
      running = en.isIntersecting;
      if (running && !was) requestAnimationFrame(frame);
    }).observe(hero);

    if (reduced) { pull = 0.06; }
    requestAnimationFrame(frame);
    return {
      burst() { explodeAt = { x: cx, y: cy }; },
    };
  }

  /* ---------------------------------------------------------
     CURSOR / MAGNETIC / TILT
  --------------------------------------------------------- */
  function cursor() {
    if (!finePointer) return;
    const c = $("#cursor"), d = $("#cursorDot");
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; d.style.transform = `translate(${x}px,${y}px)`; });
    (function loop() {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      c.style.transform = `translate(${cx}px,${cy}px)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("pointerover", (e) => {
      c.classList.toggle("hover", !!e.target.closest("a,button,select,.pillar li,.lang"));
    });
  }

  function magnetic() {
    if (!finePointer || reduced) return;
    $$(".magnetic").forEach((el) => {
      if (el.dataset.mag) return;
      el.dataset.mag = 1;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2, my = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${mx * 0.3}px,${my * 0.4}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  function tilt() {
    if (!finePointer || reduced) return;
    $$(".tilt").forEach((el) => {
      if (el.dataset.tilt) return;
      el.dataset.tilt = 1;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        const amt = el.classList.contains("pillar") ? 6 : 10;
        el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * amt}deg) rotateY(${(px - 0.5) * amt}deg)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------------------------------------------------------
     REVEAL / COUNTERS / SCROLL
  --------------------------------------------------------- */
  let revealIO;
  function reveal() {
    revealIO = revealIO || new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal:not(.in)").forEach((el) => revealIO.observe(el));
  }

  function counters() {
    $$(".count").forEach((el) => {
      if (el.hasAttribute("data-plus")) el.dataset.to = TOTAL_SERVICES;
    });
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const el = en.target, to = +el.dataset.to, start = performance.now(), dur = 1600;
        const step = (now) => {
          const p = Math.min(1, (now - start) / dur);
          el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4))) + (el.hasAttribute("data-plus") && p === 1 ? "+" : "");
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    $$(".count").forEach((el) => io.observe(el));
  }

  function scrollFx() {
    const bar = $("#progress"), nav = $("#nav");
    const path = $("#tlPath"), tl = $("#timeline");
    let last = scrollY, ticking = false;
    const update = () => {
      ticking = false;
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
      const dy = scrollY - last;
      if (Math.abs(dy) > 6) {
        nav.classList.toggle("hide", dy > 0 && scrollY > 300 && !nav.classList.contains("open"));
        last = scrollY;
      }
      // timeline draw
      const r = tl.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.3)));
      path.style.strokeDashoffset = 1 - p;
      $$(".step", tl).forEach((s, i, arr) => s.classList.toggle("on", p > (i + 0.3) / arr.length));
    };
    path.setAttribute("pathLength", "1");
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener("resize", update);
    update();
  }

  function navMenu() {
    const nav = $("#nav");
    $("#burger").addEventListener("click", () => nav.classList.toggle("open"));
    $$("#navLinks a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
    $("#langBtn").addEventListener("click", () => applyLang(lang === "ar" ? "en" : "ar"));
  }

  /* ---------------------------------------------------------
     FORM → WhatsApp
  --------------------------------------------------------- */
  function form() {
    const f = $("#form"), err = $("#formErr");
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      $$(".field", f).forEach((x) => x.classList.remove("err"));
      const name = $("#fName").value.trim(), phone = $("#fPhone").value.trim();
      const service = $("#fService").value, msg = $("#fMsg").value.trim();
      if (!name) { $("#fName").parentElement.classList.add("err"); err.textContent = t("form.errName"); $("#fName").focus(); return; }
      if (!service) { $("#fService").parentElement.classList.add("err"); err.textContent = t("form.errService"); $("#fService").focus(); return; }
      err.textContent = "";
      const lines = [
        t("form.hello"),
        `${t("form.lName")}: ${name}`,
        phone && `${t("form.lPhone")}: ${phone}`,
        `${t("form.lService")}: ${service}`,
        msg && `${t("form.lMsg")}: ${msg}`,
      ].filter(Boolean);
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    });
  }

  function bindDynamic() { reveal(); tilt(); magnetic(); }

  /* ---------------------------------------------------------
     BOOT
  --------------------------------------------------------- */
  $("#year").textContent = new Date().getFullYear();
  applyLang(lang, true);
  navMenu();
  cursor();
  form();
  counters();
  scrollFx();
  const hero = heroParticles();
  // Hold reveals until loader clears so the entrance is seen
  runLoader(() => {
    reveal();
    setTimeout(() => hero.burst(), 900);
  });
})();
