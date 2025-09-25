import {
  Heart,
  Eye,
  Share2,
  MapPin,
  Shield,
  MessageCircle,
} from "lucide-react";
import { Product } from "@/types/types";
import Rating from "./Rating";

export default function ProductCard({
  product,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onOpenCustomize,
}: {
  product: Product;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onAddToCart: (product: Product) => void;
  onOpenCustomize: (product: Product) => void;
}) {
  const fav = favorites.includes(product.id);

  return (
    <div className="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border overflow-hidden bg-white border-orange-100">
      <div className="relative aspect-square bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500 overflow-hidden">
        <div className="flex space-x-2">
          {/* {product.images.map((emoji, index) => ( */}
          <span
            //   key={index}
            className="animate-pulse"
            style={{ animationDelay: ` 0.2s` }}
          >
            {/* {emoji} */}
            <p className="text-lg text-slate-500">ArtesaniaConecta</p>
          </span>
          {/* ))} */}
        </div>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.trending && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              🔥 Tendencia
            </span>
          )}
          {product.sustainable && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              🌱 Sostenible
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onToggleFavorite(product.id)}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              fav
                ? "bg-red-500 text-white"
                : "bg-white/80 text-slate-600 hover:bg-red-500 hover:text-white"
            }`}
          >
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-600 hover:bg-blue-500 hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-600 hover:bg-green-500 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-bold text-lg text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
            {product.name}
          </h4>
          {product.customizable && (
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full ml-2 flex gap-1">
              <div>✨</div>
              <div>Personalizable</div>
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">{product.artisan.avatar}</span>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-900 text-sm truncate">
              {product.artisan.name}
            </p>
            <div className="flex items-center space-x-1 text-xs text-slate-500">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{product.artisan.location}</span>
              {product.artisan.verified && (
                <Shield className="w-3 h-3 text-blue-500" />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Rating value={product.rating} />
          <span className="text-sm text-slate-500">
            ({product.reviews} reseñas)
          </span>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold text-orange-600">
            S/ {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-slate-400 line-through">
              S/ {product.originalPrice}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          {product.customizable ? (
            <div className="flex gap-2 flex-1">
              <button
                onClick={() => onAddToCart(product)}
                disabled={!product.inStock}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none text-sm"
              >
                {product.inStock ? "Comprar" : "Agotado"}
              </button>
              <button
                onClick={() => onOpenCustomize(product)}
                disabled={!product.inStock}
                className="px-4 py-3 border-2 border-purple-500 text-purple-600 rounded-full font-semibold transition-all duration-300 text-sm"
              >
                ✨
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none"
            >
              {product.inStock ? "Agregar al Carrito" : "Agotado"}
            </button>
          )}

          <button className="p-3 border-2 border-orange-200 text-orange-600 hover:bg-orange-50 rounded-full transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
