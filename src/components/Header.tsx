import { Search, Heart, ShoppingCart, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import ThemeToggle from "./ThemeToggle";

export default function Header({
  searchTerm,
  onSearchChange,
  cartCount,
  favoritesCount,
  onToggleMenu,
  isMenuOpen,
}: {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  cartCount: number;
  favoritesCount: number;
  onToggleMenu: () => void;
  isMenuOpen: boolean;
}) {
  const { theme } = useTheme();

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b shadow-lg ${
        theme === "dark"
          ? "text-slate-900 border-slate-700"
          : "text-white border-orange-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            {/* <div className="text-3xl">🎨</div> */}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                ArtesaníaConecta
              </h1>
              <p
                className={`text-xs ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Conectando culturas
              </p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar artesanías, artesanos..."
                className={`w-full pl-10 pr-4 py-3 rounded-full border-2 focus:outline-none transition-colors ${
                  theme === "dark"
                    ? "border-slate-600 bg-slate-800 text-white focus:border-orange-400"
                    : "border-orange-200 bg-white text-slate-900  focus:border-orange-500"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <button
              className={`relative p-2 rounded-full transition-colors ${
                theme === "dark" ? "hover:bg-slate-700" : "hover:bg-orange-100"
              }`}
            >
              <Heart
                className={`w-6 h-6 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button className="relative p-2 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6 text-slate-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={onToggleMenu}
              className="md:hidden p-2 rounded-full hover:bg-orange-100"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar artesanías..."
            className="w-full pl-10 pr-4 py-3 rounded-full border-2  focus:border-orange-500 focus:outline-none border-orange-200 bg-white"
          />
        </div>
      </div>
    </header>
  );
}
