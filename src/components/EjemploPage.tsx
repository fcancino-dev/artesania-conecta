"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Marketplace() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // evita flash de SSR

  const productos = [
    {
      id: 1,
      nombre: "Cerámica Shipibo",
      descripcion: "Pieza artesanal",
      precio: "S/ 120.00",
      imagen: "https://placehold.co/300x200?text=Cerámica",
    },
    {
      id: 2,
      nombre: "Collar Amazónico",
      descripcion: "Hecho con semillas",
      precio: "S/ 80.00",
      imagen: "https://placehold.co/300x200?text=Collar",
    },
    {
      id: 3,
      nombre: "Textil Yarinacocha",
      descripcion: "Tejido artesanal",
      precio: "S/ 150.00",
      imagen: "https://placehold.co/300x200?text=Textil",
    },
  ];

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-4xl font-bold mb-8 text-center">
        Marketplace Artesanal Iquiteño
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((p) => (
          <div
            key={p.id}
            className={`rounded-2xl shadow-md p-4 flex flex-col transition-colors ${
              theme === "dark"
                ? "bg-gray-800 text-gray-200"
                : "bg-white text-gray-800"
            }`}
          >
            <img
              src={p.imagen}
              alt={p.nombre}
              className="rounded-xl mb-4 object-cover w-full h-48"
            />
            <h2 className="text-xl font-semibold">{p.nombre}</h2>
            <p className="text-sm flex-grow">{p.descripcion}</p>
            <p
              className={`text-lg font-semibold mt-2 ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            >
              {p.precio}
            </p>
            <button
              className={`mt-4 py-2 rounded-lg transition-colors text-white ${
                theme === "dark"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Comprar
            </button>
            {/* <button className="mt-4 py-2 rounded-lg dark:bg-blue-900 bg-blue-200 text-white ">
              Comprar
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
}
