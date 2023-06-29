import React, { useCallback, useEffect } from "react";
import ProductCard from "./ProductCard";
import Form from "./Form/Form";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { delProduct, loadProductList } from "./productSlice";
import { ProductId } from "./types/productType";
import { addNewSavedProduct } from "../Favorites/api";

function ProductView(): JSX.Element {
  const { products } = useSelector((store: RootState) => store.products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProductList());
  }, [dispatch]);

  const handleDeleteProduct = useCallback(
    (id: ProductId) => {
      dispatch(delProduct(id));
    },
    [dispatch]
  );

  return (
    <div>
      <Form />
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          onDelete={handleDeleteProduct}
        />
      ))}
    </div>
  );
}

export default ProductView;
