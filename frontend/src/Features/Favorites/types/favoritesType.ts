

export interface Favorites {
  id?: number;
  user_id: number;
  product_id: number;
  ["Product.name"]: string;
  ["Product.description"]: string;
  ["Product.price"]: string;
  ["Product.img"]: string;
}

export type Message = { message: string };

export type FavoriteId = Favorites["id"];
