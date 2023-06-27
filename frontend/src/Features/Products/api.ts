import Product, { ProductId } from "./types/productType";

export const initProductsList = async (): Promise<Product[]> => {
  const res = await fetch("/api/product");
  return res.json();
};

export const addNewProduct = async (obj: Product): Promise<Product> => {
  const res = await fetch("/api/product", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const deleteProduct = async (id: ProductId): Promise<number> => {
  const res = await fetch(`/api/product/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
