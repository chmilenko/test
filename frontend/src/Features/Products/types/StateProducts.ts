import Product from "./productType";

export type State = {
  products: Product[];
  error?: string;
};
