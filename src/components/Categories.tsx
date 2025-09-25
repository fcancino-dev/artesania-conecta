const CATEGORIES = [
  { id: "all", name: "Todo", emoji: "🎨" },
  { id: "ceramics", name: "Cerámica", emoji: "🏺" },
  { id: "textiles", name: "Textiles", emoji: "🧵" },
  { id: "wood", name: "Madera", emoji: "🪵" },
  { id: "jewelry", name: "Joyería", emoji: "💎" },
  { id: "leather", name: "Cuero", emoji: "👜" },
  { id: "metal", name: "Metal", emoji: "⚒️" },
];

export default function Categories({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selected === category.id
              ? "bg-orange-500 text-white shadow-lg transform scale-105"
              : "bg-white text-slate-700 hover:bg-orange-100 border border-orange-200"
          }`}
        >
          {/* <span className="text-lg">{category.emoji}</span> */}
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}
