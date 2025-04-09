import { Product } from "../../domain/models/Product";

const STORAGE_KEY = "products";

export const ProductService = {
  getAll: (): Product[] => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  create: (product: Product): void => {
    const products = ProductService.getAll();
    products.push(product);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  },

  update: (updated: Product): void => {
    const products = ProductService.getAll().map((p) =>
      p.id === updated.id ? updated : p
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  },

  delete: (id: string): void => {
    const products = ProductService.getAll().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  },
};
