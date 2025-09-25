import { Star } from "lucide-react";

export default function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(value)
              ? "text-yellow-400 fill-current"
              : "text-slate-300"
          }`}
        />
      ))}
      <span className="text-sm font-medium text-slate-700 ml-2">{value}</span>
    </div>
  );
}
