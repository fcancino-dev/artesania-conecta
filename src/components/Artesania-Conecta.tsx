"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Grid, List, Filter, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

import { Product, Artisan, CartItem } from "@/types/types";
import Header from "./Header";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import ArtisanCard from "./ArtisanCard";
import CustomizationModal from "./CustomizationModal";

const MOCK_ARTISANS: Artisan[] = [
  {
    id: 1,
    name: "María Gonzalez",
    location: "Cusco, Perú",
    speciality: "Textiles Andinos",
    rating: 4.9,
    verified: true,
    avatar: "👩‍🎨",
    story: "3ra generación de tejedoras quechuas",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    location: "Chulucanas, Perú",
    speciality: "Cerámica",
    rating: 4.8,
    verified: true,
    avatar: "👨‍🎨",
    story: "Maestro ceramista con 25 años de experiencia",
  },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Manta Andina Tradicional",
    category: "textiles",
    price: 180,
    originalPrice: 220,
    artisan: MOCK_ARTISANS[0],
    rating: 4.9,
    reviews: 47,
    images: ["🧵", "🌈", "✨"],
    description:
      "Manta tejida a mano con lana de alpaca 100% natural. Diseños ancestrales quechuas.",
    features: [
      "100% Lana de Alpaca",
      "Tejido a mano",
      "Diseño ancestral",
      "Colores naturales",
    ],
    inStock: true,
    stockCount: 12,
    deliveryTime: "7-10 días",
    trending: true,
    sustainable: true,
    customizable: true,
    customizationPrice: 35,
    customizationOptions: [
      {
        id: "size",
        name: "Tamaño",
        options: ["Pequeño", "Mediano", "Grande"],
        price: 15,
      },
      {
        id: "colors",
        name: "Colores adicionales",
        options: ["Azul añil", "Rojo cochinilla", "Verde natural"],
        price: 20,
      },
      {
        id: "personalization",
        name: "Bordado personalizado",
        options: ["Nombre", "Frase corta", "Símbolo"],
        price: 25,
      },
    ],
  },
  {
    id: 2,
    name: "Vasija Ceremonial Moche",
    category: "ceramics",
    price: 320,
    artisan: MOCK_ARTISANS[1],
    rating: 4.8,
    reviews: 23,
    images: ["🏺", "🎨", "⚱️"],
    description: "Réplica auténtica de cerámica Moche. Cada pieza es única.",
    features: [
      "Cerámica artesanal",
      "Diseño Moche",
      "Pintado a mano",
      "Pieza única",
    ],
    inStock: true,
    stockCount: 5,
    deliveryTime: "5-7 días",
    trending: false,
    sustainable: true,
    customizable: false,
  },
  {
    id: 3,
    name: "Collar de Plata Inca",
    category: "jewelry",
    price: 450,
    artisan: { ...MOCK_ARTISANS[0], speciality: "Joyería Ancestral" },
    rating: 5.0,
    reviews: 18,
    images: ["💎", "✨", "🌟"],
    description:
      "Collar de plata 950 con diseños inspirados en la iconografía Inca.",
    features: [
      "Plata 950",
      "Filigrana artesanal",
      "Diseño Inca",
      "Certificado de autenticidad",
    ],
    inStock: true,
    stockCount: 8,
    deliveryTime: "3-5 días",
    trending: true,
    sustainable: false,
    customizable: true,
    customizationPrice: 50,
    customizationOptions: [
      {
        id: "engraving",
        name: "Grabado personalizado",
        options: ["Iniciales", "Fecha especial", "Símbolo Inca"],
        price: 30,
      },
      {
        id: "stones",
        name: "Piedras adicionales",
        options: ["Turquesa", "Lapislázuli", "Obsidiana"],
        price: 40,
      },
      {
        id: "chain_length",
        name: "Longitud de cadena",
        options: ["40cm", "45cm", "50cm"],
        price: 15,
      },
    ],
  },
  {
    id: 4,
    name: "Caja Musical Andina",
    category: "wood",
    price: 125,
    artisan: MOCK_ARTISANS[1],
    rating: 4.7,
    reviews: 31,
    images: ["🎵", "🪵", "🎶"],
    description:
      "Caja musical tallada en madera de cedro con melodías andinas.",
    features: [
      "Madera de cedro",
      "Tallado a mano",
      "Melodía andina",
      "Mecanismo suizo",
    ],
    inStock: true,
    stockCount: 15,
    deliveryTime: "4-6 días",
    trending: false,
    sustainable: true,
    customizable: false,
  },
];

const STORAGE_KEYS = {
  CART: "ac_cart_v1",
  FAVORITES: "ac_favs_v1",
};

export default function ArtesaniaConecta() {
  const { theme } = useTheme();

  // const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CART);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customizeProduct, setCustomizeProduct] = useState<Product | null>(
    null
  );
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const products = useMemo(() => MOCK_PRODUCTS, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.artisan.name.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const toggleFavorite = (id: number) =>
    setFavorites((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );

  const addToCart = (
    product: Product,
    customizations: Record<string, string> | null = null
  ) => {
    const finalPrice =
      product.price +
      (customizations
        ? product.customizationOptions?.reduce(
            (acc, opt) => (customizations[opt.id] ? acc + opt.price : acc),
            0
          ) || 0
        : 0);
    const item: CartItem = {
      cartId: Date.now(),
      product,
      customizations: customizations || undefined,
      finalPrice,
    };
    setCartItems((s) => [...s, item]);
  };

  const openCustomization = (product: Product) => {
    setCustomizeProduct(product);
    setIsCustomizeOpen(true);
  };

  const confirmCustomization = (customizations: Record<string, string>) => {
    if (!customizeProduct) return;
    addToCart(customizeProduct, customizations);
    setIsCustomizeOpen(false);
    setCustomizeProduct(null);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        theme === "dark" ? "from-slate-900 to-slate-800" : "bg-[#FAF7F0]"
      }`}
    >
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={cartItems.length}
        favoritesCount={favorites.length}
        onToggleMenu={() => setIsMenuOpen((s) => !s)}
        isMenuOpen={isMenuOpen}
      />

      <section className="relative py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-bounce mb-6">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                theme === "dark"
                  ? "bg-orange-900/50 text-orange-200"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              <Sparkles className="w-4 h-4 mr-2" /> Conectando tradiciones
              milenarias con el mundo moderno
            </span>
          </div>

          <h2
            className={`text-4xl md:text-6xl font-bold mb-6  ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Descubre el Arte
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent block">
              Hecho a Mano
            </span>
          </h2>

          <p
            className={`text-xl max-w-3xl mx-auto mb-8 ${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Cada pieza cuenta una historia. Conecta directamente con artesanos
            de toda Latinoamérica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold">
              Explorar Artesanías
            </button>
            <button className="border-2 border-orange-500 px-8 py-4 rounded-full text-lg font-semibold text-orange-600">
              Conocer Artesanos
            </button>
          </div>
        </div>
      </section>

      <section className={`py-8 backdrop-blur-sm bg-white/50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <Categories
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />

            {/* <div className="flex items-center gap-4">
              <div className="flex bg-white rounded-full p-1 border border-orange-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full ${
                    viewMode === "grid"
                      ? "bg-orange-500 text-white"
                      : "text-slate-600 hover:bg-orange-100"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full ${
                    viewMode === "list"
                      ? "bg-orange-500 text-white"
                      : "text-slate-600 hover:bg-orange-100"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-orange-200 rounded-full">
                <Filter className="w-4 h-4" /> <span>Filtros</span>
              </button>
            </div> */}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                {filteredProducts.length} artesanías encontradas
              </h3>
              <p className="text-slate-600">
                Piezas únicas creadas con amor y tradición
              </p>
            </div>
          </div>

          <div
            className="grid gap-8 
                grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onAddToCart={(p) => addToCart(p)}
                onOpenCustomize={openCustomization}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-500/5 to-red-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Conoce a Nuestros{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent block">
                Artesanos Destacados
              </span>
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Cada artesano tiene una historia única. Descubre las tradiciones y
              técnicas que dan vida a cada creación.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {MOCK_ARTISANS.map((a) => (
              <ArtisanCard key={a.id} artisan={a} />
            ))}
          </div>
        </div>
      </section>

      <CustomizationModal
        product={customizeProduct}
        visible={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        onConfirm={confirmCustomization}
      />

      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl">🎨</span>
                <div>
                  <h4 className="text-xl font-bold">ArtesaníaConecta</h4>
                  <p className="text-sm text-slate-400">Conectando culturas</p>
                </div>
              </div>
              <p className="text-slate-400 mb-6">
                Plataforma que conecta artesanos latinoamericanos con el mundo,
                preservando tradiciones y creando oportunidades.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-orange-600 rounded-full">
                  📘
                </button>
                <button className="w-10 h-10 bg-orange-600 rounded-full">
                  📷
                </button>
                <button className="w-10 h-10 bg-orange-600 rounded-full">
                  🐦
                </button>
              </div>
            </div>

            <div>
              <h5 className="font-bold mb-4">Explorar</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Todas las Categorías
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Artesanos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Productos Destacados
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Ofertas Especiales
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-4">Soporte</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Envíos y Devoluciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Garantía de Autenticidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-4">Para Artesanos</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Vende en nuestra plataforma
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Recursos para Artesanos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Programa de Mentores
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Historias de Éxito
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-700 text-center text-slate-400">
            © 2025 ArtesaníaConecta. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
