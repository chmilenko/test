import Product from "../Products/types/productType";
import { FavoriteId, Favorites, Message } from "./types/favoritesType";

export const initSavedProductList = async (): Promise<Favorites[]> => {
  const res = await fetch("/api/saved");
  return await res.json();
};

export const addNewSavedProduct = async (obj: Product): Promise<Favorites> => {
  const res = await fetch(`/api/saved/${obj.id}`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const deleteSavedProduct = async (id: FavoriteId): Promise<number> => {
  const res = await fetch(`/api/saved/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
