import { useState, useMemo, useEffect, useRef } from "react";
import Home from './Home';
import Cart from './cart';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {


    id: 1,
    name: "Kundan Meenakari Jhumka",
    subtitle: "Hand-crafted 22kt Gold Plated with Enamel Work",
    category: "Gold Plated",
    price: 1299,
    mrp: 2499,
    rating: 4.8,
    reviews: 2341,
    bestseller: true,
    inStock: true,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    ],
    badge: "Bestseller",
    badgeColor: "#c8860a",
    description: "A masterpiece of traditional Rajasthani artistry. These Kundan Meenakari jhumkas feature intricate hand-painted enamel work in vivid peacock hues, set in 22kt gold-plated brass with a hand-polished finish. Each pair is handcrafted by master artisans from Jaipur.",
    highlights: ["22kt Gold Plated", "Nickel-Free", "Hypoallergenic", "Traditional Rajasthani Craft"],
    deliveryDate: "Sunday, 6 July",
  },
  {
    id: 2,
    name: "Oxidised Silver Tribal Jhumka",
    subtitle: "Handcrafted Sterling Silver with Mirror Work",
    category: "Silver Oxidized",
    price: 899,
    mrp: 1799,
    rating: 4.6,
    reviews: 1876,
    bestseller: true,
    inStock: true,
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    ],
    badge: "Bestseller",
    badgeColor: "#c8860a",
    description: "Inspired by the tribal jewellery of Rajasthan, these oxidised silver jhumkas are a celebration of raw beauty. Featuring embedded mirror work and intricate filigree, each piece tells a story of centuries-old craft.",
    highlights: ["92.5 Sterling Silver", "Oxidised Finish", "Mirror Inlay", "Artisan Made"],
    deliveryDate: "Monday, 7 July",
  },
  {
    id: 3,
    name: "Bridal Polki Chandelier",
    subtitle: "Uncut Diamond Polki in Gold Plated Setting",
    category: "Bridal",
    price: 4999,
    mrp: 8999,
    rating: 4.9,
    reviews: 763,
    bestseller: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
    ],
    badge: "Bridal Pick",
    badgeColor: "#9b1c1c",
    description: "The crown jewel of any bridal trousseau. These Polki chandeliers feature uncut diamonds in a traditional Mughal-inspired setting, layered with seed pearls and gold chains. A statement piece for the modern bride.",
    highlights: ["Uncut Polki Diamonds", "Seed Pearl Drops", "Mughal Design", "Bridal Collection"],
    deliveryDate: "Tuesday, 8 July",
  },
  {
    id: 4,
    name: "Filigree Pearl Drop Jhumka",
    subtitle: "Delicate Filigree with South Sea Pearl",
    category: "Gold Plated",
    price: 1599,
    mrp: 2799,
    rating: 4.7,
    reviews: 1102,
    bestseller: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
    ],
    badge: "New Arrival",
    badgeColor: "#1a5276",
    description: "Exquisite filigree workmanship meets the elegance of South Sea pearls. These jhumkas are perfect for both festive occasions and corporate events, offering versatility without compromising on luxury.",
    highlights: ["Filigree Crafted", "South Sea Pearl Drop", "Lightweight", "Versatile Wear"],
    deliveryDate: "Sunday, 6 July",
  },
  {
    id: 5,
    name: "Antique Temple Jhumka",
    subtitle: "Gold Plated Temple Jewellery with Ruby Beads",
    category: "Gold Plated",
    price: 2199,
    mrp: 3999,
    rating: 4.8,
    reviews: 988,
    bestseller: true,
    inStock: true,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    ],
    badge: "Bestseller",
    badgeColor: "#c8860a",
    description: "Drawing inspiration from the sacred temples of South India, these antique-finish jhumkas feature deeply embossed deity motifs and cascading ruby-red bead drops. A timeless piece of devotional art.",
    highlights: ["Temple Jewellery Style", "Ruby Bead Drops", "Antique Gold Finish", "South Indian Craft"],
    deliveryDate: "Monday, 7 July",
  },
  {
    id: 6,
    name: "Bridal Kundan Chandbali",
    subtitle: "Grand Bridal Set — Kundan with Emerald Drops",
    category: "Bridal",
    price: 3799,
    mrp: 6499,
    rating: 4.9,
    reviews: 542,
    bestseller: false,
    inStock: false,
    image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80",
    ],
    badge: "Sold Out",
    badgeColor: "#4a4a4a",
    description: "The Chandbali — moon-shaped earrings — have adorned queens and brides for millennia. This kundan masterpiece with emerald bead drops and intricate meenakari reverse detailing is reserved for life's most precious moments.",
    highlights: ["Kundan Setting", "Emerald Drops", "Meenakari Reverse", "Royal Collection"],
    deliveryDate: "Notify when available",
  },
];

const CATEGORIES = ["All", "Gold Plated", "Silver Oxidized", "Bridal"];

// ─── LOCALSTORAGE HELPERS ──────────────────────────────────────────────────────
const getProductsFromStorage = () => {
  try {
    const saved = localStorage.getItem("jhumka_products");
    return saved ? JSON.parse(saved) : PRODUCTS;
  } catch {
    return PRODUCTS;
  }
};

const saveProductsToStorage = (products) => {
  localStorage.setItem("jhumka_products", JSON.stringify(products));
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const discount = (price, mrp) => Math.round(((mrp - price) / mrp) * 100);
const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;

function StarRating({ rating, reviews }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.floor(rating) ? "#f0a500" : s - 0.5 <= rating ? "url(#half)" : "#d1d5db"}>
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#f0a500" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      <span style={{ fontSize: 12, color: "#c07000", marginLeft: 2 }}>
        {rating} ({reviews.toLocaleString()})
      </span>
    </div>
  );
}

// ─── ICONS (inline SVG) ───────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const CartIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
  </svg>
);
const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9,18 15,12 9,6" /></svg>
);
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="3,6 5,6 21,6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12" /></svg>
);

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header({ search, setSearch, cart, setView, setDrawerOpen }) {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <header style={{ background: "#0f1923", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,.5)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        {/* Hamburger */}
        <button onClick={() => setDrawerOpen(true)} style={{ background: "none", border: "none", color: "#f0c060", cursor: "pointer", padding: 6, display: "flex" }}>
          <MenuIcon />
        </button>

        {/* Logo */}
        <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 700, color: "#f0c060", letterSpacing: 1, lineHeight: 1 }}>
            Jhumka
          </span>
          <span style={{ fontFamily: "'Georgia', serif", fontSize: 10, color: "#c09030", letterSpacing: 4, textTransform: "uppercase" }}>
            Palace
          </span>
        </button>

        {/* Deliver to */}
        <div style={{ display: "none", flexDirection: "column", color: "#ccc", fontSize: 11, lineHeight: 1.3, cursor: "pointer" }} className="deliver-to">
          <span style={{ color: "#aaa" }}>Deliver to</span>
          <span style={{ color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
            <LocationIcon /> Jaipur 302001
          </span>
        </div>

        {/* Search */}
        <div style={{ flex: 1, display: "flex", background: "#fff", borderRadius: 6, overflow: "hidden", maxWidth: 700 }}>
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setView("home"); }}
            placeholder="Search jhumkas, bridal sets, silver oxidized..."
            style={{ flex: 1, border: "none", outline: "none", padding: "10px 14px", fontSize: 14, fontFamily: "inherit", color: "#111" }}
          />
          <button style={{ background: "#f0a500", border: "none", padding: "0 16px", cursor: "pointer", color: "#111", display: "flex", alignItems: "center" }}>
            <SearchIcon />
          </button>
        </div>

        {/* Cart */}
        <button onClick={() => setView("cart")} style={{ background: "none", border: "none", cursor: "pointer", position: "relative", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <CartIcon />
            {totalQty > 0 && (
              <span style={{ position: "absolute", top: -6, right: -8, background: "#f0a500", color: "#111", fontSize: 11, fontWeight: 700, borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {totalQty}
              </span>
            )}
          </div>
          <span style={{ fontSize: 11, marginTop: 2, color: "#e0b060" }}>Cart</span>
        </button>
      </div>

      {/* Deliver to row (desktop) */}
      <style>{`
        @media(min-width:640px){ .deliver-to { display: flex !important; } }
        @keyframes slideIn { from{transform:translateX(-100%)} to{transform:translateX(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Segoe UI', system-ui, sans-serif; background: #f8f4ee; }
        button { font-family: inherit; }
        input { font-family: inherit; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: #c8a060; border-radius: 3px; }
      `}</style>
    </header>
  );
}

// ─── SUB-HEADER / MEGA MENU ───────────────────────────────────────────────────
function SubHeader({ activeCategory, setActiveCategory, setView }) {
  const navItems = [
    { label: "🏆 Bestsellers", cat: "All" },
    { label: "✨ Gold Plated", cat: "Gold Plated" },
    { label: "🌙 Silver Oxidized", cat: "Silver Oxidized" },
    { label: "💍 Bridal", cat: "Bridal" },
    { label: "🎁 Gift Sets", cat: "All" },
    { label: "🔥 Sale", cat: "All" },
  ];
  return (
    <nav style={{ background: "#1a2530", overflowX: "auto", whiteSpace: "nowrap" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", padding: "0 8px" }}>
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => { setActiveCategory(item.cat); setView("home"); }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "10px 14px", fontSize: 13, color: activeCategory === item.cat ? "#f0c060" : "#ccc",
              fontWeight: activeCategory === item.cat ? 600 : 400,
              borderBottom: activeCategory === item.cat ? "2px solid #f0c060" : "2px solid transparent",
              transition: "all .2s", whiteSpace: "nowrap",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── DRAWER ───────────────────────────────────────────────────────────────────
function Drawer({ open, onClose, activeCategory, setActiveCategory, setView }) {
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", zIndex: 200, animation: "fadeIn .2s" }} />
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 280, background: "#0f1923",
        zIndex: 201, animation: "slideIn .25s ease-out", overflowY: "auto", display: "flex", flexDirection: "column"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #2a3a4a" }}>
          <span style={{ fontFamily: "Georgia, serif", color: "#f0c060", fontSize: 18, fontWeight: 700 }}>Jhumka Palace</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer" }}><CloseIcon /></button>
        </div>
        <div style={{ padding: "12px 0" }}>
          <p style={{ padding: "8px 20px", color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 2 }}>Categories</p>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setView("home"); onClose(); }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "13px 20px", background: activeCategory === cat ? "#1e3040" : "none",
                border: "none", color: activeCategory === cat ? "#f0c060" : "#ddd", cursor: "pointer",
                fontSize: 15, borderLeft: activeCategory === cat ? "3px solid #f0c060" : "3px solid transparent",
                transition: "all .15s"
              }}
            >
              <span>{cat === "All" ? "🏠 All Products" : cat === "Gold Plated" ? "✨ Gold Plated" : cat === "Silver Oxidized" ? "🌙 Silver Oxidized" : "💍 Bridal Collection"}</span>
              <ChevronRight />
            </button>
          ))}
        </div>
        <div style={{ marginTop: "auto", padding: 20, borderTop: "1px solid #1e2e3e" }}>
          <p style={{ color: "#888", fontSize: 12 }}>📍 Delivering to Jaipur</p>
          <p style={{ color: "#888", fontSize: 12 }}>📞 1800-123-4567 (Toll Free)</p>
        </div>
      </aside>
    </>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, onView, onAddToCart }) {
  const [hover, setHover] = useState(false);
  const disc = discount(product.price, product.mrp);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff", borderRadius: 10, overflow: "hidden", cursor: "pointer",
        boxShadow: hover ? "0 8px 32px rgba(200,134,10,.18)" : "0 2px 8px rgba(0,0,0,.08)",
        transition: "box-shadow .25s, transform .25s",
        transform: hover ? "translateY(-3px)" : "none",
        display: "flex", flexDirection: "column",
        animation: "fadeUp .4s ease-out both",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }} onClick={() => onView(product)}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block", transition: "transform .35s" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        />
        {/* Badge */}
        <span style={{
          position: "absolute", top: 10, left: 10,
          background: product.badgeColor, color: "#fff",
          fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4, letterSpacing: .5
        }}>
          {product.badge}
        </span>
        {!product.inStock && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ background: "#1a1a1a", color: "#eee", padding: "6px 16px", borderRadius: 4, fontSize: 13, fontWeight: 600 }}>Out of Stock</span>
          </div>
        )}
      </div>
      <div style={{ padding: "14px 14px 10px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <p style={{ margin: 0, fontSize: 13, color: "#888", lineHeight: 1.3 }}>{product.subtitle}</p>
        <h3 onClick={() => onView(product)} style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.4, cursor: "pointer" }}>{product.name}</h3>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>{fmt(product.price)}</span>
          <span style={{ fontSize: 13, color: "#999", textDecoration: "line-through" }}>{fmt(product.mrp)}</span>
          <span style={{ fontSize: 13, color: "#c0541a", fontWeight: 600 }}>({disc}% off)</span>
        </div>
        <button
          disabled={!product.inStock}
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          style={{
            marginTop: "auto", padding: "9px 0", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: product.inStock ? "pointer" : "not-allowed",
            background: product.inStock ? "linear-gradient(135deg,#f0a500,#c8780a)" : "#d1d5db",
            color: product.inStock ? "#1a1a1a" : "#888", border: "none", transition: "opacity .15s",
          }}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}

// ─── HOME VIEW ────────────────────────────────────────────────────────────────
function HomeView({ products, activeCategory, setActiveCategory, onViewProduct, cart, setCart }) {
  const addToCart = (product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const filtered = useMemo(() =>
    activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory),
    [products, activeCategory]
  );

  return (
    <main style={{ maxWidth: 1440, margin: "0 auto", padding: "24px 16px" }}>
      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg, #1a0a00 0%, #3d1f00 50%, #1a0a00 100%)",
        borderRadius: 12, padding: "32px 28px", marginBottom: 32, position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 200, height: 200, borderRadius: "50%", background: "rgba(240,165,0,.08)" }} />
        <div style={{ position: "absolute", bottom: -40, left: "40%", width: 150, height: 150, borderRadius: "50%", background: "rgba(240,165,0,.05)" }} />
        <p style={{ margin: "0 0 6px", color: "#f0c060", fontSize: 12, textTransform: "uppercase", letterSpacing: 3 }}>New Collection 2025</p>
        <h1 style={{ margin: "0 0 10px", fontFamily: "Georgia, serif", fontSize: "clamp(24px,5vw,42px)", color: "#fff", fontWeight: 700, lineHeight: 1.2 }}>
          Where Tradition Meets<br />
          <span style={{ color: "#f0c060" }}>Timeless Elegance</span>
        </h1>
        <p style={{ margin: "0 0 20px", color: "#c8a878", fontSize: 15, maxWidth: 480 }}>
          Handcrafted jhumkas from the heart of Jaipur. Each piece tells a story of centuries-old artisanal mastery.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {CATEGORIES.slice(1).map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "8px 18px", borderRadius: 20, border: "1px solid #f0a500", background: "transparent", color: "#f0a500", cursor: "pointer", fontSize: 13, fontWeight: 500, transition: "all .15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f0a500"; e.currentTarget.style.color = "#111"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f0a500"; }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ color: "#666", fontSize: 13 }}>Filter:</span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${activeCategory === cat ? "#c8860a" : "#ddd"}`,
              background: activeCategory === cat ? "#fef3c7" : "#fff",
              color: activeCategory === cat ? "#92400e" : "#555", cursor: "pointer", fontSize: 13, fontWeight: activeCategory === cat ? 600 : 400,
              transition: "all .15s"
            }}
          >
            {cat}
          </button>
        ))}
        <span style={{ marginLeft: "auto", color: "#888", fontSize: 13 }}>{filtered.length} products</span>
      </div>

      {/* Product Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 20
      }}>
        {filtered.map((p, i) => (
          <div key={p.id} style={{ animationDelay: `${i * 60}ms` }}>
            <ProductCard product={p} onView={onViewProduct} onAddToCart={addToCart} />
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
          <p style={{ fontSize: 40 }}>🔍</p>
          <p style={{ fontSize: 18, fontWeight: 600 }}>No products found</p>
          <p>Try adjusting your search or filter</p>
        </div>
      )}
    </main>
  );
}

// ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────
function ProductDetail({ product, cart, setCart, setView }) {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const disc = discount(product.price, product.mrp);

  const handleAddToCart = () => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const BuyBox = () => (
    <div style={{ background: "#fff", border: "1px solid #e0c080", borderRadius: 10, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <span style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a" }}>{fmt(product.price)}</span>
        <span style={{ marginLeft: 10, fontSize: 16, color: "#999", textDecoration: "line-through" }}>{fmt(product.mrp)}</span>
        <span style={{ marginLeft: 8, fontSize: 14, color: "#c0541a", fontWeight: 600 }}>Save {disc}%</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <CheckIcon />
        <span style={{ fontSize: 14, color: product.inStock ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
          {product.inStock ? "In Stock" : "Currently Unavailable"}
        </span>
      </div>
      {product.inStock && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, color: "#555" }}>Qty:</span>
            <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #ddd", borderRadius: 6, overflow: "hidden" }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ padding: "6px 14px", background: "#f9f9f9", border: "none", cursor: "pointer", fontSize: 18, color: "#444" }}>−</button>
              <span style={{ padding: "6px 16px", fontSize: 16, fontWeight: 600, color: "#111" }}>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} style={{ padding: "6px 14px", background: "#f9f9f9", border: "none", cursor: "pointer", fontSize: 18, color: "#444" }}>+</button>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            style={{
              padding: "13px", borderRadius: 8, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer",
              background: added ? "#16a34a" : "linear-gradient(135deg,#f0a500,#c8780a)",
              color: added ? "#fff" : "#1a1a1a", transition: "all .3s"
            }}
          >
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>
          <button
            onClick={() => { handleAddToCart(); setView("cart"); }}
            style={{ padding: "13px", borderRadius: 8, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", background: "#1a2530", color: "#fff" }}
          >
            Buy Now
          </button>
        </>
      )}
      <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#777", flexWrap: "wrap" }}>
        <span>🚚 Free delivery</span>
        <span>🔄 7-day returns</span>
        <span>🛡️ Authentic product</span>
      </div>
      {product.inStock && (
        <p style={{ margin: 0, fontSize: 13, color: "#555" }}>
          📅 Estimated delivery: <strong>{product.deliveryDate}</strong>
        </p>
      )}
    </div>
  );

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 20, fontSize: 13, color: "#888" }}>
        <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", color: "#c07000", fontSize: 13 }}>Home</button>
        <ChevronRight />
        <span style={{ color: "#888" }}>{product.category}</span>
        <ChevronRight />
        <span style={{ color: "#555", fontWeight: 500 }}>{product.name}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 32 }}>
        {/* Images */}
        <div>
          <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 12, background: "#f9f3e8" }}>
            <img src={product.images[activeImg]} alt={product.name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} style={{ flex: 1, border: `2px solid ${activeImg === i ? "#c8860a" : "transparent"}`, borderRadius: 8, overflow: "hidden", cursor: "pointer", padding: 0, background: "none" }}>
                <img src={img} alt="" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p style={{ margin: "0 0 4px", color: "#888", fontSize: 13 }}>{product.subtitle}</p>
            <h1 style={{ margin: "0 0 10px", fontFamily: "Georgia, serif", fontSize: "clamp(22px,3vw,30px)", color: "#1a1a1a", lineHeight: 1.3 }}>{product.name}</h1>
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>

          <p style={{ margin: 0, fontSize: 14, color: "#555", lineHeight: 1.7 }}>{product.description}</p>

          <div>
            <h3 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>Highlights</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
              {product.highlights.map((h) => (
                <li key={h} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#444" }}>
                  <span style={{ color: "#c8860a" }}>✦</span> {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Sticky buy box on mobile */}
          <div style={{ position: "sticky", bottom: 0, zIndex: 10 }}>
            <BuyBox />
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── CART VIEW ────────────────────────────────────────────────────────────────
function CartView({ cart, setCart, setView }) {
  const updateQty = (id, qty) => {
    if (qty < 1) { setCart((prev) => prev.filter((i) => i.id !== id)); return; }
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  };
  const remove = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const savings = cart.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0);
  const delivery = subtotal > 999 ? 0 : 79;

  if (cart.length === 0) return (
    <main style={{ maxWidth: 800, margin: "80px auto", textAlign: "center", padding: "0 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, color: "#1a1a1a", marginBottom: 8 }}>Your cart is empty</h2>
      <p style={{ color: "#888", marginBottom: 24 }}>Discover our exquisite collection of handcrafted jhumkas</p>
      <button onClick={() => setView("home")} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#f0a500,#c8780a)", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer", color: "#1a1a1a" }}>
        Continue Shopping
      </button>
    </main>
  );

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px", display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
      <h2 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 26, color: "#1a1a1a" }}>Shopping Cart</h2>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 20 }}>
        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.map((item) => (
            <div key={item.id} style={{ background: "#fff", borderRadius: 10, padding: 16, display: "flex", gap: 14, boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
              <img src={item.image} alt={item.name} style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 8, flexShrink: 0, cursor: "pointer" }} onClick={() => setView("product", item)} />
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#1a1a1a", cursor: "pointer" }} onClick={() => setView("product", item)}>{item.name}</h3>
                <p style={{ margin: 0, fontSize: 12, color: "#888" }}>{item.subtitle}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 17, fontWeight: 700 }}>{fmt(item.price)}</span>
                  <span style={{ fontSize: 13, color: "#999", textDecoration: "line-through" }}>{fmt(item.mrp)}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 4, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #ddd", borderRadius: 6, overflow: "hidden" }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ padding: "4px 10px", background: "#f9f9f9", border: "none", cursor: "pointer", fontSize: 16, color: "#444" }}>−</button>
                    <span style={{ padding: "4px 12px", fontSize: 15, fontWeight: 600 }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ padding: "4px 10px", background: "#f9f9f9", border: "none", cursor: "pointer", fontSize: 16, color: "#444" }}>+</button>
                  </div>
                  <button onClick={() => remove(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
                    <TrashIcon /> Remove
                  </button>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>{fmt(item.price * item.qty)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary — sticky */}
        <div style={{ position: "sticky", bottom: 0 }}>
          <div style={{ background: "#fff", borderRadius: 10, padding: 20, boxShadow: "0 4px 20px rgba(0,0,0,.1)", border: "1px solid #e0c060" }}>
            <h3 style={{ margin: "0 0 16px", fontFamily: "Georgia, serif", fontSize: 20, color: "#1a1a1a" }}>Order Summary</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Row label={`Items (${cart.reduce((s, i) => s + i.qty, 0)})`} value={fmt(subtotal)} />
              <Row label="Delivery" value={delivery === 0 ? "FREE" : fmt(delivery)} valueColor={delivery === 0 ? "#16a34a" : undefined} />
              {savings > 0 && <Row label="You Save" value={`-${fmt(savings)}`} valueColor="#16a34a" />}
              <div style={{ borderTop: "1px solid #eee", paddingTop: 12, marginTop: 4 }}>
                <Row label="Total" value={fmt(subtotal + delivery)} bold />
              </div>
            </div>
            {savings > 0 && <p style={{ margin: "12px 0 0", fontSize: 13, color: "#16a34a", fontWeight: 600, textAlign: "center" }}>
              🎉 You're saving {fmt(savings)} on this order!
            </p>}
            <button style={{ marginTop: 16, width: "100%", padding: 14, background: "linear-gradient(135deg,#f0a500,#c8780a)", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: "pointer", color: "#1a1a1a" }}>
              Proceed to Checkout →
            </button>
            <button onClick={() => setView("home")} style={{ marginTop: 10, width: "100%", padding: 12, background: "none", border: "1.5px solid #ccc", borderRadius: 8, fontWeight: 500, fontSize: 14, cursor: "pointer", color: "#555" }}>
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value, bold, valueColor }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
      <span style={{ color: "#555", fontWeight: bold ? 700 : 400 }}>{label}</span>
      <span style={{ color: valueColor || "#1a1a1a", fontWeight: bold ? 700 : 500, fontSize: bold ? 18 : 15 }}>{value}</span>
    </div>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ message, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      background: "#1a2530", color: "#f0c060", padding: "12px 24px", borderRadius: 8,
      fontSize: 14, fontWeight: 600, zIndex: 999, boxShadow: "0 4px 20px rgba(0,0,0,.3)",
      animation: "fadeUp .3s ease-out"
    }}>
      ✨ {message}
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({ productsFromApp, setProductsFromApp, setView }) {
  const [products, setProducts] = useState(productsFromApp);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleSave = () => {
    if (editingId === null) return;
    const updated = products.map((p) => (p.id === editingId ? formData : p));
    setProducts(updated);
    saveProductsToStorage(updated);
    setProductsFromApp(updated);
    setEditingId(null);
    setFormData({});
  };

  const handleAddProduct = () => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    const newProduct = {
      id: newId,
      name: formData.name || "New Product",
      subtitle: formData.subtitle || "",
      category: formData.category || "Gold Plated",
      price: parseInt(formData.price) || 0,
      mrp: parseInt(formData.mrp) || 0,
      rating: 4.5,
      reviews: 0,
      bestseller: false,
      inStock: true,
      image: formData.image || "https://via.placeholder.com/300",
      images: [formData.image || "https://via.placeholder.com/300"],
      badge: "New",
      badgeColor: "#1a5276",
      description: formData.description || "",
      highlights: [],
      deliveryDate: "Tomorrow",
    };
    const updated = [...products, newProduct];
    setProducts(updated);
    saveProductsToStorage(updated);
    setProductsFromApp(updated);
    setShowAddForm(false);
    setFormData({});
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      saveProductsToStorage(updated);
      setProductsFromApp(updated);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 16px", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#0f1923", margin: 0 }}>Admin Panel</h1>
        <button
          onClick={() => setView("home")}
          style={{ padding: "10px 20px", background: "#f0a500", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#1a1a1a" }}
        >
          ← Back to Store
        </button>
      </div>

      {/* Add Product Button */}
      <button
        onClick={() => { setShowAddForm(!showAddForm); setEditingId(null); }}
        style={{ marginBottom: 20, padding: "12px 24px", background: "#16a34a", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#fff" }}
      >
        + Add New Product
      </button>

      {/* Add Product Form */}
      {showAddForm && (
        <div style={{ background: "#fff", padding: 20, borderRadius: 8, marginBottom: 24, border: "2px solid #16a34a" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 600, color: "#0f1923" }}>Add New Product</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input
              placeholder="Product Name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ padding: 10, border: "1px solid #ddd", borderRadius: 4, fontSize: 14 }}
            />
            <input
              placeholder="Subtitle"
              value={formData.subtitle || ""}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              style={{ padding: 10, border: "1px solid #ddd", borderRadius: 4, fontSize: 14 }}
            />
            <input
              placeholder="Price"
              type="number"
              value={formData.price || ""}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              style={{ padding: 10, border: "1px solid #ddd", borderRadius: 4, fontSize: 14 }}
            />
            <input
              placeholder="MRP"
              type="number"
              value={formData.mrp || ""}
              onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
              style={{ padding: 10, border: "1px solid #ddd", borderRadius: 4, fontSize: 14 }}
            />
            <input
              placeholder="Image URL"
              value={formData.image || ""}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              style={{ padding: 10, border: "1px solid #ddd", borderRadius: 4, fontSize: 14, gridColumn: "1 / -1" }}
            />
            <textarea
              placeholder="Description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ padding: 10, border: "1px solid #ddd", borderRadius: 4, fontSize: 14, gridColumn: "1 / -1", minHeight: 80 }}
            />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button
              onClick={handleAddProduct}
              style={{ padding: "10px 20px", background: "#16a34a", border: "none", borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#fff" }}
            >
              Save Product
            </button>
            <button
              onClick={() => { setShowAddForm(false); setFormData({}); }}
              style={{ padding: "10px 20px", background: "#ccc", border: "none", borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0f0f0", borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "#0f1923" }}>ID</th>
              <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "#0f1923" }}>Name</th>
              <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "#0f1923" }}>Price</th>
              <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "#0f1923" }}>MRP</th>
              <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "#0f1923" }}>Category</th>
              <th style={{ padding: 12, textAlign: "center", fontWeight: 600, color: "#0f1923" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 12, color: "#666" }}>{product.id}</td>
                <td style={{ padding: 12, color: "#0f1923", fontWeight: 500 }}>{product.name}</td>
                <td style={{ padding: 12, color: "#16a34a", fontWeight: 600 }}>₹{product.price}</td>
                <td style={{ padding: 12, color: "#666" }}>₹{product.mrp}</td>
                <td style={{ padding: 12, color: "#666" }}>{product.category}</td>
                <td style={{ padding: 12, textAlign: "center", display: "flex", gap: 8, justifyContent: "center" }}>
                  <button
                    onClick={() => handleEdit(product)}
                    style={{ padding: "6px 12px", background: "#f0a500", border: "none", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#fff" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{ padding: "6px 12px", background: "#dc2626", border: "none", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#fff" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {editingId !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: 24, maxWidth: 500, width: "90%", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 20, fontWeight: 700, color: "#0f1923" }}>Edit Product</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 4 }}>Product Name</label>
                <input
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 4, fontSize: 14, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 4 }}>Price (₹)</label>
                <input
                  type="number"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                  style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 4, fontSize: 14, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 4 }}>MRP (₹)</label>
                <input
                  type="number"
                  value={formData.mrp || ""}
                  onChange={(e) => setFormData({ ...formData, mrp: parseInt(e.target.value) || 0 })}
                  style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 4, fontSize: 14, boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 4 }}>Image URL</label>
                <input
                  value={formData.image || ""}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 4, fontSize: 14, boxSizing: "border-box" }}
                />
                {formData.image && (
                  <img src={formData.image} alt="preview" style={{ marginTop: 12, maxWidth: "100%", height: 120, objectFit: "cover", borderRadius: 4 }} />
                )}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 4 }}>Description</label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 4, fontSize: 14, minHeight: 80, boxSizing: "border-box" }}
                />
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button
                  onClick={handleSave}
                  style={{ flex: 1, padding: 10, background: "#16a34a", border: "none", borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#fff" }}
                >
                  ✓ Save Changes
                </button>
                <button
                  onClick={() => { setEditingId(null); setFormData({}); }}
                  style={{ flex: 1, padding: 10, background: "#999", border: "none", borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#fff" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [allProducts, setAllProducts] = useState(() => getProductsFromStorage());
  const [view, setView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  // Keyboard shortcut to access admin (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        setView(view === "admin" ? "home" : "admin");
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [view]);

  const showToast = (msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  const filteredProducts = useMemo(() => {
    let p = allProducts;
    if (search.trim()) p = p.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()) || x.category.toLowerCase().includes(search.toLowerCase()) || x.subtitle.toLowerCase().includes(search.toLowerCase()));
    if (activeCategory !== "All") p = p.filter((x) => x.category === activeCategory);
    return p;
  }, [search, activeCategory, allProducts]);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSetView = (v, product = null) => {
    setView(v);
    if (product) setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const wrappedSetCart = (updater) => {
    const prev = cart;
    const next = typeof updater === "function" ? updater(prev) : updater;
    const prevLen = prev.reduce((s, i) => s + i.qty, 0);
    const nextLen = next.reduce((s, i) => s + i.qty, 0);
    if (nextLen > prevLen) {
      const added = next.find((n) => !prev.find((p) => p.id === n.id && p.qty === n.qty));
      if (added) showToast(`${added.name} added to cart`);
    }
    setCart(next);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f4ee" }}>
      <Header search={search} setSearch={setSearch} cart={cart} setView={handleSetView} setDrawerOpen={setDrawerOpen} />
      <SubHeader activeCategory={activeCategory} setActiveCategory={setActiveCategory} setView={handleSetView} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} activeCategory={activeCategory} setActiveCategory={setActiveCategory} setView={handleSetView} />

      {view === "home" && (
        <HomeView
          products={filteredProducts}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onViewProduct={handleViewProduct}
          cart={cart}
          setCart={wrappedSetCart}
        />
      )}
      {view === "product" && selectedProduct && (
        <ProductDetail product={selectedProduct} cart={cart} setCart={wrappedSetCart} setView={handleSetView} />
      )}
      {view === "cart" && (
        <CartView cart={cart} setCart={setCart} setView={handleSetView} />
      )}
      {view === "admin" && (
        <AdminPanel productsFromApp={allProducts} setProductsFromApp={setAllProducts} setView={setView} />
      )}

      {/* Footer */}
      {view !== "admin" && (
        <footer style={{ background: "#0f1923", color: "#888", textAlign: "center", padding: "24px 16px", marginTop: 40, fontSize: 13 }}>
          <p style={{ margin: "0 0 6px", fontFamily: "Georgia, serif", color: "#f0c060", fontSize: 16 }}>Jhumka Palace</p>
          <p style={{ margin: 0 }}>Handcrafted with love in Jaipur, Rajasthan · © 2025 All rights reserved</p>
        </footer>
      )}

      <Toast visible={toast.visible} message={toast.message} />
    </div>
  );
 
}