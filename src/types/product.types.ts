export interface Product {
  id: string;
  name: string;
  price: number;
  images: { colorId: string; src: string }[];
  sizes: string[];
  colors: { id: string; name: string }[];
  description: string;
}
