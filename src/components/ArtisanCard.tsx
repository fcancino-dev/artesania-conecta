import { Star, Shield, MapPin, Award, MessageCircle } from "lucide-react";
import { Artisan } from "@/types/types";

export default function ArtisanCard({ artisan }: { artisan: Artisan }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
      <div className="flex items-start space-x-6">
        <div className="text-6xl">{artisan.avatar}</div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h4 className="text-xl font-bold text-slate-900">{artisan.name}</h4>
            {artisan.verified && (
              <div className="flex items-center space-x-1 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                <Shield className="w-3 h-3" />
                <span>Verificado</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 text-slate-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{artisan.location}</span>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <Award className="w-4 h-4 text-orange-500" />
            <span className="text-slate-700 font-medium">
              {artisan.speciality}
            </span>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(artisan.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-slate-300"
                }`}
              />
            ))}
            <span className="text-sm font-medium text-slate-700 ml-2">
              {artisan.rating}
            </span>
          </div>

          <p className="text-slate-600 mb-4 italic">
            &quot;{artisan.story}&quot;
          </p>

          <div className="flex gap-3">
            <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-full font-semibold">
              Ver Productos
            </button>
            <button className="p-2 border border-orange-200 text-orange-600 hover:bg-orange-50 rounded-full">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
