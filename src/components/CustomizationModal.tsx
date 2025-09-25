import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Product } from "@/types/types";

function calculateCustomizationPrice(
  customizations: Record<string, string> | null,
  product: Product
) {
  if (!customizations || !product.customizationOptions) return 0;
  let total = 0;
  product.customizationOptions.forEach((opt) => {
    if (customizations[opt.id]) total += opt.price;
  });
  return total;
}

export default function CustomizationModal({
  product,
  visible,
  onClose,
  onConfirm,
}: {
  product: Product | null;
  visible: boolean;
  onClose: () => void;
  onConfirm: (customizations: Record<string, string>) => void;
}) {
  const [choices, setChoices] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!visible) setChoices({});
  }, [visible]);

  if (!visible || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">✨ Personalizar Producto</h3>
              <p className="text-slate-600">{product.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-orange-50 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Precio base:</p>
              <p className="text-2xl font-bold text-orange-600">
                S/ {product.price}
              </p>
            </div>
            <div className="text-4xl">{product.images[0]}</div>
          </div>

          <div className="space-y-6 mb-6">
            <h4 className="text-lg font-semibold text-slate-900">
              Opciones de Personalización:
            </h4>

            {product.customizationOptions?.map((option) => (
              <div key={option.id} className="border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium">{option.name}</h5>
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                    +S/ {option.price}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {option.options.map((choice) => (
                    <label
                      key={choice}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                        choices[option.id] === choice
                          ? "border-purple-500 bg-purple-50"
                          : "border-slate-200 hover:border-purple-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={option.id}
                        value={choice}
                        className="sr-only"
                        checked={choices[option.id] === choice}
                        onChange={() =>
                          setChoices((s) => ({ ...s, [option.id]: choice }))
                        }
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          choices[option.id] === choice
                            ? "border-purple-500 bg-purple-500"
                            : "border-slate-300"
                        }`}
                      ></div>
                      <span className="text-slate-700">{choice}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between text-slate-600">
              <span>Precio base:</span>
              <span>S/ {product.price}</span>
            </div>

            {product.customizationOptions?.map((option) => {
              if (!choices[option.id]) return null;
              return (
                <div
                  key={option.id}
                  className="flex justify-between text-slate-600"
                >
                  <span>{option.name}:</span>
                  <span>+S/ {option.price}</span>
                </div>
              );
            })}

            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold text-slate-900">
                <span>Total:</span>
                <span className="text-orange-600">
                  S/{" "}
                  {product.price +
                    calculateCustomizationPrice(choices, product)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 border py-3 rounded-full"
            >
              Cancelar
            </button>
            <button
              onClick={() => onConfirm(choices)}
              disabled={Object.keys(choices).length === 0}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full disabled:opacity-50"
            >
              ✨ Agregar Personalizado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
