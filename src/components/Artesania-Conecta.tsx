// src/components/Artesania-Conecta.tsx
"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import Header from "./Header";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import ArtisanCard from "./ArtisanCard";
import Footer from "./iniciomarket/footer";
import { Product, Usuario } from "@/types/types";

export default function ArtesaniaConecta() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [artesanos, setArtesanos] = useState<Usuario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const prodRes = await fetch("/api/productos");
      const productos = await prodRes.json();
      setProductos(productos);

      const artRes = await fetch("/api/artesanos"); // ⚡ Ajusta aquí si tienes endpoint especial
      const usuarios = await artRes.json();
      console.log("Usuarios desde backend:", usuarios);
      // setArtesanos(usuarios.filter((u: Usuario) => u.rol === "artesano"));
      setArtesanos(usuarios);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={0}
        favoritesCount={0}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />

      {/* Hero */}
      <section className="relative py-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium animate-bounce">
            <Sparkles className="w-4 h-4 mr-2" /> Conectando tradiciones
            milenarias con el mundo moderno
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-6 mb-4 text-slate-900">
            Descubre el Arte{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent block">
              Hecho a Mano
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Cada pieza cuenta una historia. Conecta directamente con artesanos
            de toda Latinoamérica.
          </p>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <Categories selected="all" onSelect={() => {}} />
        </div>
      </section>

      {/* Productos */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            {productos.length} artesanías encontradas
          </h3>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {productos.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                favorites={[]}
                onToggleFavorite={() => {}}
                onAddToCart={() => {}}
                onOpenCustomize={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Artesanos */}
      <section className="py-16 bg-gradient-to-r from-orange-500/5 to-red-500/5">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Conoce a Nuestros{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent block">
              Artesanos Destacados
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {artesanos.map((a) => (
              <ArtisanCard key={a.id} artisan={a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
