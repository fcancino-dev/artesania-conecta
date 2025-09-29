import React from "react";

export default function Footer() {
  return (
    // <div>
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
    // </div>
  );
}
