export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export interface ProductFormData {
  title: string;
  description: string;
  category: string;
  image: string;
  price: number | null;
  rate: number | null;
  count: number | null;
}

export interface ProductInput {
  productInput: ProductFormData;
}

export interface BasketItem extends Product {
  count: number;
}

export interface BasketStorage {
  [key: string]: number;
}

export interface FilterData {
  title: string;
  min_price: number|null;
  max_price: number|null;
}

export interface Order {
  choice: number;
  count: number;
  name: string;
  phone: string;
  email: string;
  card_number: string;
  card_term: string;
  card_cvv: string;
  delivery: '1' | '2';
  country?: number;
  city?: string;
  street?: string;
  house?: string;
  agreement: boolean;
}

export interface User {
  name: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
}

export interface UserData {
  name: string;
  email: string;
}

export interface ProductsQueryResponse {
  products: Product[];
}

export interface AddProductMutationResponse {
  addProduct: {
    id: number;
  };
}
