interface Product {
  id?: number;
  name: string;
  price: string;
  description: string;
  img: string;
  user_id?: Number;
}

export type ProductId = Product["id"];

export default Product;
