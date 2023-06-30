import Product from "../Products/types/productType";
import { FavoriteId, Favorites } from "./types/favoritesType";

export const initSavedProductList = async (): Promise<Favorites[]> => {
  try {
    const res = await fetch("/api/saved");
    return await res.json();
  } catch (error) {
    throw new Error("Ошибка сервера, попробуйте позже");
  }
};

export const addNewSavedProduct = async (obj: Product): Promise<Favorites> => {
  try {
    const addNewFavorite = await fetch(`/api/saved/${obj.id}`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await addNewFavorite.json();
    if (!addNewFavorite.ok) {
      const { message } = await addNewFavorite.json();
      throw message;
    }
    return result;
  } catch (error) {
    throw new Error("Ошибка сервера, попробуйте позже");
  }
};

export const deleteSavedProduct = async (id: FavoriteId): Promise<number> => {
  try {
    const result = await fetch(`/api/saved/${id}`, {
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
