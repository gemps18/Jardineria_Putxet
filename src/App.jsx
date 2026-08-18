import { useState, useEffect } from "react";
import { Phone, MapPin, Clock, Mail, Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";

/* ---------------------------------------------------------------
   Panot flower — Barcelona's iconic hydraulic sidewalk tile,
   redrawn as the site's recurring signature motif. Four rotated
   blades meeting at a shared centre, exactly like four tiles
   meeting at a Barcelona street corner.
--------------------------------------------------------------- */
function PanotBlade({ fill }) {
  return <path d="M40 40 C40 22 26 10 10 10 C10 27 23 40 40 40 Z" fill={fill} />;
}

function PanotFlower({ size = 80, className = "", petal = "#B8862E", bg = "transparent" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
      <rect width="80" height="80" fill={bg} />
      <g transform="translate(0,0)">
        <PanotBlade fill={petal} />
        <g transform="rotate(90 40 40)"><PanotBlade fill={petal} /></g>
        <g transform="rotate(180 40 40)"><PanotBlade fill={petal} /></g>
        <g transform="rotate(270 40 40)"><PanotBlade fill={petal} /></g>
      </g>
      <circle cx="40" cy="40" r="5" fill={bg} stroke={petal} strokeWidth="2" />
    </svg>
  );
}

function PanotPatternBackground({ opacity = 0.08, petal = "#EDE6D3" }) {
  const id = "panot-pattern";
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity }} preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="80" height="80" patternUnits="userSpaceOnUse">
          <PanotBlade fill={petal} />
          <g transform="rotate(90 40 40)"><PanotBlade fill={petal} /></g>
          <g transform="rotate(180 40 40)"><PanotBlade fill={petal} /></g>
          <g transform="rotate(270 40 40)"><PanotBlade fill={petal} /></g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* --- small bespoke line icons, kept in the same hand as the flower --- */
function ShearsIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="10" cy="12" r="4" /><circle cx="10" cy="36" r="4" />
      <path d="M13 15 L40 40" /><path d="M13 33 L40 8" strokeLinecap="round" />
    </svg>
  );
}
function LeafIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M10 38 C10 16 26 8 40 8 C40 24 30 38 10 38 Z" />
      <path d="M11 37 C20 26 28 18 39 9" />
    </svg>
  );
}
function TerraceIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M6 20 L24 8 L42 20" />
      <path d="M10 20 V40 H38 V20" />
      <path d="M18 40 V28 H30 V40" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   i18n — Catalan is the home language (the shop's own tongue),
   with Spanish and English as first-class alternates.
--------------------------------------------------------------- */
const LANGS = [
  { code: "ca", label: "CAT" },
  { code: "es", label: "ESP" },
  { code: "en", label: "ENG" },
];

const COPY = {
  ca: {
    nav: { serveis: "Serveis", centre: "El centre", galeria: "Galeria", contacte: "Contacte" },
    callBtn: "93 212 51 45",
    hero: {
      eyebrow: "Centre de jardineria — al Putxet des de 1983",
      title1: "Un petit oasi",
      title2: "a Barcelona",
      sub: "Des de la part alta de la ciutat, cuidem jardins, terrasses i piscines com si fossin propis. Plantes, consell i mans expertes des de fa més de quatre dècades.",
      ctaPrimary: "Vine a visitar-nos",
      ctaSecondary: "Veure serveis",
    },
    history: {
      eyebrow: "La nostra història",
      title: "D'una afició a una feina de vida",
      text: "La jardineria Putxet va néixer l'any 1983 de la idea del seu fundador: convertir la seva gran afició per les plantes en una manera de viure. Situats a la part alta de Barcelona, hem estat un referent del barri durant més de quatre dècades, aconsellant els nostres veïns sobre com tenir cura del seu jardí per gaudir-ne durant tot l'any.",
      stat1: "Any de fundació",
      stat2: "Anys d'experiència",
      stat3: "Sant Gervasi, Barcelona",
    },
    services: {
      eyebrow: "Serveis",
      title: "Tot el que el teu jardí necessita",
      items: [
        { title: "Manteniment de jardins i piscines", text: "Cura constant perquè el jardí estigui sempre a punt: gespa, reg, esporgada i neteja de piscina, durant tot l'any." },
        { title: "Esporgada i tractaments fitosanitaris", text: "Esporgades i tractaments per prevenir plagues i malalties, respectant el cicle i la forma natural de cada planta." },
        { title: "Disseny i creació de terrasses i jardins", text: "Transformem terrasses i patis des de zero. Ens expliques la idea i nosaltres li donem forma, pas a pas." },
      ],
    },
    shop: {
      eyebrow: "El centre de jardineria",
      title: "Vine i troba tot el que et fa falta",
      text: "Visita'ns i trobaràs tot allò que necessitis per al teu jardí o terrassa: plantes, substrats, jardineres i productes fitosanitaris, amb el consell de sempre.",
      tags: ["Plantes de temporada", "Arbres i arbustos", "Substrats i adobs", "Testos i jardineres", "Productes fitosanitaris", "Eines de jardineria"],
    },
    gallery: {
      eyebrow: "Galeria",
      title: "Espècies que cuidem cada dia",
      items: ["Suculentes", "Falgueres", "Oliveres", "Lavandes", "Palmeres", "Boix"],
    },
    contact: {
      eyebrow: "Contacte",
      title: "T'esperem al Putxet",
      address: "Ronda General Mitre, 219 (cantonada Ballester)",
      city: "08023 Barcelona",
      hoursTitle: "",
      hours: ["Dilluns a Divendres: 10–14 h i 17–20 h", "Dissabte: 10–14 h", "Diumenge: 11–14 h"],
      mapTitle: "Ubicació Jardineria Putxet",
    },
    footer: { tagline: "Ronda General Mitre, 219 · Barcelona · Des de 1983" },
  },
  es: {
    nav: { serveis: "Servicios", centre: "El centro", galeria: "Galería", contacte: "Contacto" },
    callBtn: "93 212 51 45",
    hero: {
      eyebrow: "Centro de jardinería — en el Putxet desde 1983",
      title1: "Un pequeño oasis",
      title2: "en Barcelona",
      sub: "Desde la parte alta de la ciudad, cuidamos jardines, terrazas y piscinas como si fueran propios. Plantas, consejo y manos expertas desde hace más de cuatro décadas.",
      ctaPrimary: "Ven a visitarnos",
      ctaSecondary: "Ver servicios",
    },
    history: {
      eyebrow: "Nuestra historia",
      title: "De una afición a un modo de vida",
      text: "La jardinería Putxet nació en 1983 de la idea de su fundador: convertir su gran afición por las plantas en una forma de vida. Situados en la parte alta de Barcelona, hemos sido un referente del barrio durante más de cuatro décadas, aconsejando a nuestros vecinos sobre cómo cuidar su jardín para disfrutarlo todo el año.",
      stat1: "Año de fundación",
      stat2: "Años de experiencia",
      stat3: "Sant Gervasi, Barcelona",
    },
    services: {
      eyebrow: "Servicios",
      title: "Todo lo que tu jardín necesita",
      items: [
        { title: "Mantenimiento de jardines y piscinas", text: "Cuidado constante para que el jardín esté siempre a punto: césped, riego, poda y limpieza de piscina, durante todo el año." },
        { title: "Poda y tratamientos fitosanitarios", text: "Podas y tratamientos para prevenir plagas y enfermedades, respetando el ciclo y la forma natural de cada planta." },
        { title: "Diseño y creación de terrazas y jardines", text: "Transformamos terrazas y patios desde cero. Nos cuentas la idea y nosotros le damos forma, paso a paso." },
      ],
    },
    shop: {
      eyebrow: "El centro de jardinería",
      title: "Ven y encuentra todo lo que necesitas",
      text: "Visítanos y encontrarás todo lo que necesites para tu jardín o terraza: plantas, sustratos, jardineras y productos fitosanitarios, con el consejo de siempre.",
      tags: ["Plantas de temporada", "Árboles y arbustos", "Sustratos y abonos", "Macetas y jardineras", "Productos fitosanitarios", "Herramientas de jardinería"],
    },
    gallery: {
      eyebrow: "Galería",
      title: "Especies que cuidamos cada día",
      items: ["Suculentas", "Helechos", "Olivos", "Lavandas", "Palmeras", "Boj"],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Te esperamos en el Putxet",
      address: "Ronda General Mitre, 219 (esquina Ballester)",
      city: "08023 Barcelona",
      hoursTitle: "",
      hours: ["Lunes a viernes: 10–14 h y 17–20 h", "Sábado: 10–14 h", "Domingo: 11–14 h"],
      mapTitle: "Ubicación Jardinería Putxet",
    },
    footer: { tagline: "Ronda General Mitre, 219 · Barcelona · Desde 1983" },
  },
  en: {
    nav: { serveis: "Services", centre: "The shop", galeria: "Gallery", contacte: "Contact" },
    callBtn: "+34 93 212 51 45",
    hero: {
      eyebrow: "Garden centre — in Putxet since 1983",
      title1: "A little oasis",
      title2: "in Barcelona",
      sub: "From the upper reaches of the city, we look after gardens, terraces and pools as if they were our own. Plants, advice and expert hands for more than four decades.",
      ctaPrimary: "Come and see us",
      ctaSecondary: "See services",
    },
    history: {
      eyebrow: "Our story",
      title: "From a hobby to a way of life",
      text: "Jardineria Putxet was born in 1983 from its founder's idea: turning a deep love of plants into a way of life. Set in the upper part of Barcelona, we've been a fixture of the neighbourhood for more than four decades, helping our neighbours care for their gardens so they can enjoy them all year round.",
      stat1: "Founded",
      stat2: "Years of experience",
      stat3: "Sant Gervasi, Barcelona",
    },
    services: {
      eyebrow: "Services",
      title: "Everything your garden needs",
      items: [
        { title: "Garden and pool maintenance", text: "Ongoing care to keep the garden in shape year-round: lawn, watering, pruning and pool cleaning." },
        { title: "Pruning and plant health treatments", text: "Pruning and treatments to prevent pests and disease, respecting each plant's natural cycle and shape." },
        { title: "Terrace and garden design", text: "We transform terraces and patios from scratch. You bring the idea, we shape it, step by step." },
      ],
    },
    shop: {
      eyebrow: "The garden centre",
      title: "Come and find everything you need",
      text: "Visit us and you'll find everything for your garden or terrace: plants, growing media, planters and plant health products, with the same advice as always.",
      tags: ["Seasonal plants", "Trees and shrubs", "Growing media & fertiliser", "Pots and planters", "Plant health products", "Garden tools"],
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Species we care for every day",
      items: ["Succulents", "Ferns", "Olive trees", "Lavender", "Palms", "Boxwood"],
    },
    contact: {
      eyebrow: "Contact",
      title: "We'll be waiting in Putxet",
      address: "Ronda General Mitre, 219 (corner of Ballester)",
      city: "08023 Barcelona",
      hoursTitle: "",
      hours: ["Monday to Friday: 10am–2pm and 5–8pm", "Saturday: 10am–2pm", "Sunday: 11am–2pm"],
      mapTitle: "Jardineria Putxet location",
    },
    footer: { tagline: "Ronda General Mitre, 219 · Barcelona · Since 1983" },
  },
};

const GALLERY_COLORS = ["#B8862E", "#35583F", "#9A4B32", "#6B5B8C", "#1F3A2E", "#7A8C3F"];
const SERVICE_ICONS = [LeafIcon, ShearsIcon, TerraceIcon];

function LanguageSwitcher({ lang, setLang, dark }) {
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.code === lang);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] px-3 py-1.5 rounded-full border transition-colors ${
          dark
            ? "border-[#23261F]/20 text-[#23261F] hover:bg-[#23261F]/5"
            : "border-[#FBF9F2]/40 text-[#FBF9F2] hover:bg-[#FBF9F2]/10"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Selecciona idioma / Select language"
      >
        {current.label} <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          className="absolute right-0 mt-2 py-1 bg-[#FBF9F2] border border-[#23261F]/10 rounded-xl shadow-lg overflow-hidden z-50 min-w-[88px]"
          role="listbox"
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full text-left font-mono text-[11px] tracking-[0.1em] px-4 py-2 hover:bg-[#EDE6D3] transition-colors ${
                l.code === lang ? "text-[#1F3A2E] font-medium" : "text-[#23261F]/60"
              }`}
              role="option"
              aria-selected={l.code === lang}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JardineriaPutxet() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("ca");
  const t = COPY[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV = [
    { id: "serveis", label: t.nav.serveis },
    { id: "centre", label: t.nav.centre },
    { id: "galeria", label: t.nav.galeria },
    { id: "contacte", label: t.nav.contacte },
  ];

  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif" }} className="bg-[#FBF9F2] text-[#23261F]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Work+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      {/* ---------------- HEADER ---------------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-[#FBF9F2]/95 backdrop-blur shadow-[0_1px_0_0_rgba(35,38,31,0.08)]" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
          <a href="#top" className="flex items-center gap-2.5">
            <PanotFlower size={30} petal={scrolled ? "#1F3A2E" : "#EDE6D3"} />
            <span className={`font-display text-lg tracking-tight ${scrolled ? "text-[#1F3A2E]" : "text-[#FBF9F2]"}`}>
              Putxet <span className="font-normal opacity-70">Jardineria</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`font-mono text-[11px] tracking-[0.14em] uppercase hover:opacity-60 transition-opacity ${
                  scrolled ? "text-[#23261F]" : "text-[#FBF9F2]"
                }`}
              >
                {n.label}
              </a>
            ))}
            <a
              href="tel:+34932125145"
              className={`flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] px-4 py-2 rounded-full border transition-colors ${
                scrolled
                  ? "border-[#1F3A2E] text-[#1F3A2E] hover:bg-[#1F3A2E] hover:text-[#FBF9F2]"
                  : "border-[#FBF9F2]/60 text-[#FBF9F2] hover:bg-[#FBF9F2] hover:text-[#1F3A2E]"
              }`}
            >
              <Phone size={12} /> {t.callBtn}
            </a>
            <LanguageSwitcher lang={lang} setLang={setLang} dark={scrolled} />
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher lang={lang} setLang={setLang} dark={scrolled} />
            <button
              className={scrolled ? "text-[#1F3A2E]" : "text-[#FBF9F2]"}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Obrir menú"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#FBF9F2] border-t border-[#23261F]/10 px-6 py-6 flex flex-col gap-5">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)} className="font-mono text-xs tracking-[0.14em] uppercase text-[#23261F]">
                {n.label}
              </a>
            ))}
            <a href="tel:+34932125145" className="font-mono text-xs tracking-[0.14em] text-[#1F3A2E] flex items-center gap-2">
              <Phone size={14} /> {t.callBtn}
            </a>
          </div>
        )}
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="top" className="relative min-h-screen flex items-end overflow-hidden bg-[#1F3A2E]">
        <PanotPatternBackground opacity={0.08} petal="#EDE6D3" />
        <div className="absolute -right-24 -top-24 opacity-[0.14]">
          <PanotFlower size={480} petal="#B8862E" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pb-24 pt-40 w-full">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8862E] mb-6">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-display text-[#FBF9F2] text-[13vw] leading-[0.92] md:text-[6.2vw] tracking-tight max-w-4xl">
            {t.hero.title1}<br />{t.hero.title2}
          </h1>
          <p className="mt-8 max-w-md text-[#FBF9F2]/75 text-[15px] leading-relaxed font-light">
            {t.hero.sub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#contacte" className="inline-flex items-center gap-2 bg-[#B8862E] text-[#1F3A2E] font-medium text-sm px-6 py-3.5 rounded-full hover:bg-[#FBF9F2] transition-colors">
              {t.hero.ctaPrimary} <ArrowUpRight size={16} />
            </a>
            <a href="#serveis" className="inline-flex items-center gap-2 text-[#FBF9F2] font-mono text-[11px] tracking-[0.12em] uppercase border-b border-[#FBF9F2]/40 pb-1 hover:border-[#FBF9F2] transition-colors">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- INTRO / HISTORY ---------------- */}
      <section className="max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9A4B32] mb-4">{t.history.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-[2.4rem] leading-tight text-[#1F3A2E]">
            {t.history.title}
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="text-[17px] leading-relaxed text-[#23261F]/80 font-light">
            {t.history.text}
          </p>
          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-[#23261F]/10 pt-8">
            <div>
              <p className="font-display text-4xl text-[#1F3A2E]">1983</p>
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#23261F]/50 mt-2">{t.history.stat1}</p>
            </div>
            <div>
              <p className="font-display text-4xl text-[#1F3A2E]">40+</p>
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#23261F]/50 mt-2">{t.history.stat2}</p>
            </div>
            <div>
              <p className="font-display text-4xl text-[#1F3A2E]">Putxet</p>
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#23261F]/50 mt-2">{t.history.stat3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section id="serveis" className="bg-[#EDE6D3]">
        <div className="max-w-6xl mx-auto px-6 py-28">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9A4B32] mb-4">{t.services.eyebrow}</p>
              <h2 className="font-display text-3xl md:text-[2.4rem] text-[#1F3A2E] max-w-lg leading-tight">
                {t.services.title}
              </h2>
            </div>
            <PanotFlower size={56} petal="#9A4B32" />
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[#23261F]/10">
            {t.services.items.map((s, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <div key={s.title} className="bg-[#FBF9F2] p-9 flex flex-col group hover:bg-[#1F3A2E] transition-colors duration-300">
                  <span className="font-mono text-[11px] text-[#9A4B32] group-hover:text-[#B8862E] mb-8">0{i + 1}</span>
                  <Icon className="w-9 h-9 text-[#1F3A2E] group-hover:text-[#B8862E] transition-colors mb-8" />
                  <h3 className="font-display text-xl text-[#1F3A2E] group-hover:text-[#FBF9F2] transition-colors mb-3 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-[14.5px] leading-relaxed text-[#23261F]/70 group-hover:text-[#FBF9F2]/70 transition-colors font-light">
                    {s.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- CENTRE / SHOP BAND ---------------- */}
      <section id="centre" className="relative bg-[#1F3A2E] overflow-hidden">
        <PanotPatternBackground opacity={0.06} petal="#EDE6D3" />
        <div className="relative max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8862E] mb-4">{t.shop.eyebrow}</p>
            <h2 className="font-display text-3xl md:text-[2.2rem] text-[#FBF9F2] leading-tight mb-6">
              {t.shop.title}
            </h2>
            <p className="text-[#FBF9F2]/70 text-[15px] leading-relaxed font-light">
              {t.shop.text}
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex flex-wrap content-start gap-3">
            {t.shop.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] tracking-[0.06em] uppercase text-[#EDE6D3] border border-[#FBF9F2]/25 rounded-full px-4 py-2.5 hover:border-[#B8862E] hover:text-[#B8862E] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY ---------------- */}
      <section id="galeria" className="max-w-6xl mx-auto px-6 py-28">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9A4B32] mb-4">{t.gallery.eyebrow}</p>
        <h2 className="font-display text-3xl md:text-[2.4rem] text-[#1F3A2E] leading-tight mb-14 max-w-lg">
          {t.gallery.title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#23261F]/10">
          {t.gallery.items.map((name, i) => (
            <div key={name} className="bg-[#FBF9F2] aspect-square flex flex-col items-center justify-center gap-5 group hover:bg-[#EDE6D3] transition-colors">
              <PanotFlower size={64} petal={GALLERY_COLORS[i]} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#23261F]/60">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section id="contacte" className="bg-[#EDE6D3]">
        <div className="max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-14">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9A4B32] mb-4">{t.contact.eyebrow}</p>
            <h2 className="font-display text-3xl md:text-[2.4rem] text-[#1F3A2E] leading-tight mb-10">
              {t.contact.title}
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <MapPin size={18} className="text-[#9A4B32] mt-0.5 shrink-0" />
                <p className="text-[15px] text-[#23261F]/80 leading-relaxed">
                  {t.contact.address}<br />{t.contact.city}
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <Phone size={18} className="text-[#9A4B32] mt-0.5 shrink-0" />
                <a href="tel:+34932125145" className="text-[15px] text-[#23261F]/80 hover:text-[#1F3A2E]">93 212 51 45</a>
              </div>
              <div className="flex gap-4 items-start">
                <Mail size={18} className="text-[#9A4B32] mt-0.5 shrink-0" />
                <a href="mailto:jardineriaputxet@hotmail.com" className="text-[15px] text-[#23261F]/80 hover:text-[#1F3A2E]">jardineriaputxet@hotmail.com</a>
              </div>
              <div className="flex gap-4 items-start">
                <Clock size={18} className="text-[#9A4B32] mt-0.5 shrink-0" />
                <div className="text-[15px] text-[#23261F]/80 leading-relaxed">
                  {t.contact.hours.map((h) => <p key={h}>{h}</p>)}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#23261F]/10 min-h-[340px]">
            <iframe
              title={t.contact.mapTitle}
              className="w-full h-full min-h-[340px]"
              style={{ border: 0, filter: "sepia(12%) saturate(85%)" }}
              loading="lazy"
              src="https://www.google.com/maps?q=Ronda+General+Mitre+219+Barcelona&output=embed"
            />
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="relative bg-[#1F3A2E] overflow-hidden">
        <PanotPatternBackground opacity={0.05} petal="#EDE6D3" />
        <div className="relative max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <PanotFlower size={22} petal="#B8862E" />
            <span className="font-display text-[#FBF9F2] text-base">Jardineria Putxet</span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#FBF9F2]/45 text-center">
            {t.footer.tagline}
          </p>
        </div>
      </footer>
    </div>
  );
}
