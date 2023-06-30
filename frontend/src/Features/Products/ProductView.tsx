import React, { useCallback } from "react";
import ProductCard from "./ProductCard";
import Form from "./Form/Form";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { delProduct } from "./productSlice";
import { ProductId } from "./types/productType";
// import "./Css/Product.sass";

function ProductView(): JSX.Element {
  const { products } = useSelector((store: RootState) => store.products);

  const dispatch = useAppDispatch();

  const handleDeleteProduct = useCallback(
    (id: ProductId) => {
      dispatch(delProduct(id));
    },
    [dispatch]
  );

  return (
    <div className="productView">
      <Form />
      <div className="productsCard">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductView;
