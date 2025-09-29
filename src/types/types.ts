// Producto que viene de la API
export interface Product {
  // originalPrice: any;
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  id_artesano: number;
}

// Artesano que viene de la API
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  especialidad: string,
  descripcion: string,
  foto: string,
  location : string,
}
