"use client";
import { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "@/lib/api/productos";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    getProductos().then(setProductos).catch(console.error);
  }, []);

  const handleCrear = async () => {
    if (!nombre || precio <= 0) return alert("Ingrese nombre y precio válido");
    if (editId) return handleActualizar(); // si hay editId, actualizar
    const nuevo = await createProducto({ nombre, precio });
    setProductos([...productos, nuevo]);
    setNombre("");
    setPrecio(0);
  };

  const handleEditar = (producto: Producto) => {
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setEditId(producto.id);
  };

  const handleActualizar = async () => {
    if (!editId) return;
    const actualizado = await updateProducto(editId, { nombre, precio });
    setProductos(productos.map((p) => (p.id === editId ? actualizado : p)));
    setNombre("");
    setPrecio(0);
    setEditId(null);
  };

  const handleEliminar = async (id: number) => {
    await deleteProducto(id);
    setProductos(productos.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h1>Productos</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
          placeholder="Precio"
        />
        <button onClick={handleCrear}>{editId ? "Actualizar" : "Crear"}</button>
      </div>

      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - S/{p.precio}{" "}
            <button onClick={() => handleEditar(p)}>Editar</button>{" "}
            <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
