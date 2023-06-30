import Product, { ProductId } from "./types/productType";

export const initProductsList = async (): Promise<Product[]> => {
  try {
    const res = await fetch("/api/product");
    return res.json();
  } catch (error) {
    throw new Error("Ошибка сервера, попробуйте позже");
  }
};

export const addNewProduct = async (obj: Product): Promise<Product> => {
  try {
    const addToFav = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await addToFav.json();
    if (!addToFav.ok) {
      const { message } = await addToFav.json();
      throw message;
    }
    return result;
  } catch (error) {
    throw new Error("Ошибка сервера, попробуйте позже");
  }
};

export const deleteProduct = async (id: ProductId): Promise<number> => {
  try {
    const result = await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });
    if (!result.ok) {
      const { message } = await result.json();
      throw message;
    }
    return await result.json();
  } catch (error) {
    throw new Error("Ошибка сервера, попробуйте позже");
  }
};
