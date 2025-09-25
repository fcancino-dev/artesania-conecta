export type CustomizationOption = {
  id: string;
  name: string;
  options: string[];
  price: number;
};

export type Artisan = {
  id: number;
  name: string;
  location: string;
  speciality: string;
  rating: number;
  verified: boolean;
  avatar: string;
  story?: string;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  artisan: Artisan;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
  deliveryTime: string;
  trending: boolean;
  sustainable: boolean;
  customizable: boolean;
  customizationPrice?: number;
  customizationOptions?: CustomizationOption[];
};

export type CartItem = {
  cartId: number;
  product: Product;
  customizations?: Record<string, string>;
  finalPrice: number;
};
