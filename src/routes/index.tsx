import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Search, Heart, ShoppingBag, Menu, X, Phone, MessageCircle, MapPin, ArrowUp,
  Gem, ShieldCheck, Sparkles, HandHeart, ArrowRight,
} from "lucide-react";
import hero from "@/assets/hero-mangalsutra.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ganesh Jewellers Rukadi — Gold, Diamond & Silver Jewellery" },
      { name: "description", content: "Beautifully crafted gold, diamond and silver jewellery at Ganesh Jewellers, Chhatrapati Shivaji Chowk, Rukadi." },
      { property: "og:title", content: "Ganesh Jewellers Rukadi" },
      { property: "og:description", content: "Jewellery that tells your story — gold, diamond and silver collections in Rukadi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PHONE = "9049436585";
const WA = "https://wa.me/919049436585";
const MAP = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Ganesh Jewellers, Yashwant Building, Chhatrapati Shivaji Chowk, Main Road, Rukadi");
const ADDRESS = "Yashwant Building, Shop No. 1, Chhatrapati Shivaji Chowk, Main Road, Rukadi";

const NAV = [
  ["Home", "home"], ["Collections", "collections"], ["Gold", "collections"], ["Diamond", "collections"],
  ["Silver", "collections"], ["About", "about"], ["Contact", "contact"],
] as const;

const COLLECTIONS = [
  { name: "Gold", file: "gold-jewellery.jpg", text: "Necklaces, bangles and heirloom pieces in lustrous gold." },
  { name: "Diamond", file: "diamond-jewellery.jpg", text: "Brilliant designs for moments that deserve to shine." },
  { name: "Silver", file: "silver-jewellery.jpg", text: "Graceful silver for daily wear and devotion." },
  { name: "Traditional", file: "traditional-jewellery.jpg", text: "Classic Maharashtrian designs, lovingly crafted." },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-gold font-serif text-xl italic text-gold">GJ</span>
      <span className="leading-tight">
        <span className={`block font-serif text-xl ${light ? "text-ivory" : "text-maroon"}`}>Ganesh Jewellers</span>
        <span className="block text-[0.6rem] uppercase tracking-[0.35em] text-gold">Rukadi</span>
      </span>
    </a>
  );
}

function Placeholder({ file, label, className = "" }: { file: string; label: string; className?: string }) {
  return (
    <div className={`placeholder-art relative flex items-center justify-center overflow-hidden ${className}`}>
      <div className="absolute inset-3 border border-gold/30" />
      <div className="text-center">
        <Gem className="mx-auto h-8 w-8 text-gold/70" strokeWidth={1} />
        <p className="mt-3 font-serif text-lg italic text-gold-soft">{label}</p>
        <p className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-gold/50">{file}</p>
      </div>
    </div>
  );
}

function Section({ id, eyebrow, title, children, className = "" }: { id?: string; eyebrow: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 px-5 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-4 text-4xl md:text-5xl">{title}</h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold" />
        </div>
        {children}
      </div>
    </section>
  );
}

function Index() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [wish, setWish] = useState<string[]>([]);
  const [bag, setBag] = useState(0);
  const [toast, setToast] = useState("");
  const [top, setTop] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    const onScroll = () => setTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const notify = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2200); };
  const toggleWish = (n: string) => {
    setWish((w) => (w.includes(n) ? w.filter((x) => x !== n) : [...w, n]));
    notify(wish.includes(n) ? `${n} removed from wishlist` : `${n} added to wishlist`);
  };

  return (
    <div className="min-h-screen">
      {/* Announcement */}
      <div className="bg-burgundy px-4 py-2 text-center text-[0.7rem] uppercase tracking-[0.25em] text-gold-soft">
        Visit us at Chhatrapati Shivaji Chowk, Rukadi · Call {PHONE}
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-gold/30 bg-ivory/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map(([l, id]) => (
              <a key={l} href={`#${id}`} className="text-sm uppercase tracking-[0.15em] text-ink/80 transition-colors hover:text-maroon">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-1 text-maroon">
            <button aria-label="Search" onClick={() => setSearch((s) => !s)} className="p-2 hover:text-gold"><Search className="h-5 w-5" strokeWidth={1.5} /></button>
            <button aria-label="Wishlist" onClick={() => notify(`${wish.length} item(s) in wishlist`)} className="relative p-2 hover:text-gold">
              <Heart className="h-5 w-5" strokeWidth={1.5} />
              {wish.length > 0 && <span className="absolute right-0 top-0 grid h-4 w-4 place-items-center rounded-full bg-gold text-[0.6rem] text-burgundy">{wish.length}</span>}
            </button>
            <button aria-label="Bag" onClick={() => notify(`${bag} item(s) in bag`)} className="relative p-2 hover:text-gold">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {bag > 0 && <span className="absolute right-0 top-0 grid h-4 w-4 place-items-center rounded-full bg-gold text-[0.6rem] text-burgundy">{bag}</span>}
            </button>
            <button aria-label="Menu" onClick={() => setMenu(true)} className="p-2 lg:hidden"><Menu className="h-6 w-6" strokeWidth={1.5} /></button>
          </div>
        </div>
        {search && (
          <div className="border-t border-gold/30 px-5 py-4">
            <form className="mx-auto flex max-w-2xl gap-3" onSubmit={(e) => { e.preventDefault(); notify("Please visit or call us to explore this design"); setSearch(false); }}>
              <input autoFocus placeholder="Search mangalsutra, bangles, rings…" className="flex-1 border-b border-gold bg-transparent py-2 font-serif text-lg outline-none placeholder:text-muted-foreground" />
              <button className="text-sm uppercase tracking-[0.2em] text-maroon">Search</button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {menu && (
        <div className="fixed inset-0 z-50 flex flex-col bg-burgundy px-6 py-6 lg:hidden">
          <div className="flex items-center justify-between"><Logo light /><button aria-label="Close" onClick={() => setMenu(false)} className="text-gold"><X className="h-7 w-7" /></button></div>
          <nav className="mt-12 flex flex-col gap-6">
            {NAV.map(([l, id]) => (
              <a key={l} href={`#${id}`} onClick={() => setMenu(false)} className="font-serif text-3xl text-ivory hover:text-gold">{l}</a>
            ))}
          </nav>
        </div>
      )}

      {/* Hero */}
      <section id="home" className="relative flex min-h-[88vh] items-center overflow-hidden bg-ink">
        <img src={hero} alt="Gold mangalsutra with circular pendant on a rain-kissed wooden surface" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-24">
          <div className="max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <p className="eyebrow">Timeless Craftsmanship</p>
            <h1 className="mt-6 text-5xl leading-[1.05] text-ivory md:text-7xl">Jewellery That Tells <em className="text-gold">Your Story.</em></h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/80">Discover beautifully crafted gold, diamond and silver jewellery that celebrates your traditions and special moments.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#collections" className="inline-flex items-center gap-2 bg-gold px-7 py-4 text-xs uppercase tracking-[0.25em] text-burgundy transition hover:bg-gold-soft">Explore Collections <ArrowRight className="h-4 w-4" /></a>
              <a href="#about" className="inline-flex items-center border border-gold/70 px-7 py-4 text-xs uppercase tracking-[0.25em] text-ivory transition hover:bg-gold/10">Discover Our Story</a>
            </div>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="border-b border-gold/30 px-5 py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 lg:grid-cols-4">
          {[[Sparkles, "Timeless Craftsmanship"], [ShieldCheck, "Quality You Can Trust"], [Gem, "Designs for Every Occasion"], [HandHeart, "Personalised Assistance"]].map(([I, t]) => {
            const Icon = I as typeof Gem;
            return (
              <div key={t as string} className="reveal text-center">
                <Icon className="mx-auto h-8 w-8 text-gold" strokeWidth={1} />
                <p className="mt-4 font-serif text-xl text-maroon">{t as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Collections */}
      <Section id="collections" eyebrow="Our Collections" title="Crafted for Every Celebration">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTIONS.map((c) => (
            <article key={c.name} className="reveal group">
              <div className="relative overflow-hidden">
                <Placeholder file={c.file} label={`${c.name} Jewellery`} className="aspect-[3/4] transition-transform duration-700 group-hover:scale-105" />
                <button aria-label={`Wishlist ${c.name}`} onClick={() => toggleWish(c.name)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ivory/90 text-maroon">
                  <Heart className={`h-4 w-4 ${wish.includes(c.name) ? "fill-maroon" : ""}`} />
                </button>
              </div>
              <h3 className="mt-5 text-2xl text-maroon">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              <button onClick={() => { setBag((b) => b + 1); notify(`${c.name} enquiry added to bag`); }} className="mt-4 border-b border-gold pb-1 text-xs uppercase tracking-[0.2em] text-maroon hover:text-gold">Enquire</button>
            </article>
          ))}
        </div>
      </Section>

      {/* Story */}
      <section id="about" className="scroll-mt-24 bg-maroon px-5 py-20 text-ivory md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <Placeholder file="brand-story.jpg" label="Our Story" className="reveal aspect-[4/5] border border-gold/40" />
          <div className="reveal">
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-4 text-4xl md:text-6xl">Tradition in <em className="text-gold">Every Detail.</em></h2>
            <div className="mt-6 h-px w-16 bg-gold" />
            <p className="mt-8 leading-relaxed text-ivory/80">At Ganesh Jewellers, every piece is chosen with care — honouring the traditions you hold dear while embracing designs for today. From a bride's first mangalsutra to a gift for a cherished moment, we help you find jewellery that becomes part of your family's story.</p>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {["Traditional Elegance", "Everyday Sophistication", "Special Occasion Jewellery"].map((h) => (
                <div key={h} className="border-t border-gold/40 pt-4"><p className="font-serif text-xl text-gold-soft">{h}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <Section eyebrow="Gallery" title="A Glimpse of Our Craft">
        <div className="grid auto-rows-[160px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4">
          {[
            "md:col-span-2 md:row-span-2", "", "row-span-2", "", "md:col-span-2", "",
          ].map((cls, i) => (
            <Placeholder key={i} file={`gallery-0${i + 1}.jpg`} label="Coming soon" className={`reveal h-full ${cls}`} />
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section eyebrow="The Experience" title="Personal Care, Every Visit" className="bg-secondary">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ["01", "Welcome", "Walk in and explore our collections in a warm, unhurried setting."],
            ["02", "Guidance", "We help you choose designs that suit your occasion, style and budget."],
            ["03", "Cherish", "Take home a piece crafted to be treasured for generations."],
          ].map(([n, t, d]) => (
            <div key={n} className="reveal border border-gold/40 bg-card p-10 text-center transition hover:shadow-gold">
              <p className="font-serif text-5xl italic text-gold">{n}</p>
              <h3 className="mt-4 text-2xl text-maroon">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow="Visit Us" title="We'd Love to See You">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="font-serif text-2xl text-maroon">Ganesh Jewellers Rukadi</p>
          <p className="mt-3 text-muted-foreground">{ADDRESS}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={`tel:+91${PHONE}`} className="inline-flex items-center gap-2 bg-maroon px-7 py-4 text-xs uppercase tracking-[0.2em] text-ivory hover:bg-burgundy"><Phone className="h-4 w-4" /> Call</a>
            <a href={WA} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-gold px-7 py-4 text-xs uppercase tracking-[0.2em] text-burgundy hover:bg-gold-soft"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            <a href={MAP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-maroon px-7 py-4 text-xs uppercase tracking-[0.2em] text-maroon hover:bg-maroon/5"><MapPin className="h-4 w-4" /> Directions</a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-burgundy px-5 pt-16 pb-8 text-ivory/80">
        <div className="mx-auto grid max-w-7xl gap-12 border-b border-gold/30 pb-12 md:grid-cols-4">
          <div><Logo light /><p className="mt-5 text-sm leading-relaxed">Jewellery that tells your story.</p></div>
          <div>
            <p className="eyebrow">Quick Links</p>
            <ul className="mt-5 space-y-2 text-sm">{[["Home", "home"], ["Collections", "collections"], ["About", "about"], ["Contact", "contact"]].map(([l, id]) => <li key={l}><a href={`#${id}`} className="hover:text-gold">{l}</a></li>)}</ul>
          </div>
          <div>
            <p className="eyebrow">Categories</p>
            <ul className="mt-5 space-y-2 text-sm">{COLLECTIONS.map((c) => <li key={c.name}><a href="#collections" className="hover:text-gold">{c.name} Jewellery</a></li>)}</ul>
          </div>
          <div>
            <p className="eyebrow">Contact</p>
            <p className="mt-5 text-sm leading-relaxed">{ADDRESS}</p>
            <a href={`tel:+91${PHONE}`} className="mt-3 block text-sm hover:text-gold">+91 {PHONE}</a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs tracking-[0.2em] text-ivory/50">© {new Date().getFullYear()} GANESH JEWELLERS RUKADI</p>
      </footer>

      {top && (
        <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-maroon text-gold shadow-gold">
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      {toast && <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 bg-ink px-6 py-3 text-sm text-gold-soft shadow-gold">{toast}</div>}
    </div>
  );
}
