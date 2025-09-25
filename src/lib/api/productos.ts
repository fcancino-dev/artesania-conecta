export interface ProductoInput {
  nombre: string;
  precio: number;
}

const API_BASE = "/api/productos";

// GET → lista de productos
export async function getProductos() {
  const res = await fetch(API_BASE, { cache: "no-store" }); // evita cache en dev
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}

// POST → crear producto
export async function createProducto(data: ProductoInput) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}

// PUT → actualizar producto
export async function updateProducto(id: number, data: ProductoInput) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
}

// DELETE → eliminar producto
export async function deleteProducto(id: number) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return res.json();
}
