export type Product = {
  slug: string;
  country: string;
  name: string; // e.g. "Argentina - World Cup 2026"
  colorway: string;
  image: string;
  gallery: string[]; // extra real product shots (away kit + alternates) shown as thumbnails
  accent: string; // national accent colour for subtle UI touches
  blurb: string;
  sizes: string[];
};

export const SIZES = ["S", "M", "L", "XL"] as const;

export type Edition = "Player" | "Fan";

/** Uniform pricing across all jerseys: discounted `price` shown, `regular` struck through. */
export const PRICING: Record<Edition, { price: number; regular: number }> = {
  Player: { price: 1149, regular: 1600 },
  Fan: { price: 899, regular: 1200 },
};

export const products: Product[] = [
  {
    slug: "argentina",
    country: "Argentina",
    name: "Argentina - World Cup 2026",
    colorway: "Celeste & White / Sol de Mayo",
    image: "/jerseys/argentina.png",
    gallery: ["/jerseys/argentina-g1.png", "/jerseys/argentina-g2.png"],
    accent: "#6c9ad6",
    blurb:
      "The albiceleste reimagined. Sky-blue stripes engineered into a second-skin Aura Fit for the champions.",
    sizes: [...SIZES],
  },
  {
    slug: "brazil",
    country: "Brazil",
    name: "Brazil - World Cup 2026",
    colorway: "Canarinho Yellow / Selva Green",
    image: "/jerseys/brazil.png",
    gallery: ["/jerseys/brazil-g1.png", "/jerseys/brazil-g2.png"],
    accent: "#f4c430",
    blurb:
      "O jogo bonito, distilled. Iconic canary yellow with a precision-knit collar and aerodynamic seams.",
    sizes: [...SIZES],
  },
  {
    slug: "england",
    country: "England",
    name: "England - World Cup 2026",
    colorway: "Pure White / Navy Trim",
    image: "/jerseys/england.png",
    gallery: ["/jerseys/england-g1.png"],
    accent: "#1d2d5c",
    blurb:
      "Clean, classic, relentless. A crisp white shell with navy ribbing built for the modern game.",
    sizes: [...SIZES],
  },
  {
    slug: "france",
    country: "France",
    name: "France - World Cup 2026",
    colorway: "Midnight Navy / Metric Gold",
    image: "/jerseys/france.png",
    gallery: ["/jerseys/france-g1.png", "/jerseys/france-g2.png"],
    accent: "#1a2a6c",
    blurb:
      "Les Bleus, elevated. Deep midnight navy with metric-gold detailing and a tailored athletic cut.",
    sizes: [...SIZES],
  },
  {
    slug: "germany",
    country: "Germany",
    name: "Germany - World Cup 2026",
    colorway: "White / Schwarz-Rot-Gold",
    image: "/jerseys/germany.png",
    gallery: ["/jerseys/germany-g1.png", "/jerseys/germany-g2.png"],
    accent: "#111111",
    blurb:
      "Die Mannschaft, engineered. Stark white with the national tricolour woven across the chest.",
    sizes: [...SIZES],
  },
  {
    slug: "spain",
    country: "Spain",
    name: "Spain - World Cup 2026",
    colorway: "Rojo / Amarillo",
    image: "/jerseys/spain.png",
    gallery: ["/jerseys/spain-g1.png", "/jerseys/spain-g2.png"],
    accent: "#c60b1e",
    blurb:
      "La Roja in full voice. Bold red with gold accents and a frictionless competition-grade weave.",
    sizes: [...SIZES],
  },
  {
    slug: "portugal",
    country: "Portugal",
    name: "Portugal - World Cup 2026",
    colorway: "Vinho Red / Estrela Green",
    image: "/jerseys/portugal.png",
    gallery: ["/jerseys/portugal-g1.png", "/jerseys/portugal-g2.png"],
    accent: "#a1241b",
    blurb:
      "A Seleção, sharpened. Deep vinho red with estrela-green trim and a sculpted Player-Edition fit.",
    sizes: [...SIZES],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Size-guide spec table shown on product detail pages. */
export const sizeGuide = {
  fan: [
    { size: "S", chestIn: 38, lengthIn: 27 },
    { size: "M", chestIn: 41, lengthIn: 28 },
    { size: "L", chestIn: 44, lengthIn: 29 },
    { size: "XL", chestIn: 47, lengthIn: 30 },
  ],
  player: [
    { size: "S", chestIn: 36, lengthIn: 27 },
    { size: "M", chestIn: 39, lengthIn: 28 },
    { size: "L", chestIn: 42, lengthIn: 29 },
    { size: "XL", chestIn: 45, lengthIn: 30 },
  ],
};
