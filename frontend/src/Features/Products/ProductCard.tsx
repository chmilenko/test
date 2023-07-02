import React, { useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Product, { ProductId } from "./types/productType";
import { addNewSavedProduct } from "../Favorites/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function ProductCard({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: (id: ProductId) => void;
}): JSX.Element {
  const { user } = useSelector((store: RootState) => store.auth);

  const clickDelete = () => {
    alert("Только админ может удалять товар");
  };

  // const handleRemove = useCallback(
  //   (event: React.MouseEvent) => {
  //     event.stopPropagation();
  //     event.preventDefault();
  //     onDelete(product.id);
  //   },
  //   [onDelete, product.id]
  // );

  const handleAddFavorite = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    addNewSavedProduct(product);
  }, []);

  return (
    <Card sx={{ width: 300, marginTop: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={product.img}
          alt="Product Foto"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Цена: {product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {user ? (
          <Button
            size="small"
            color="primary"
            type="button"
            onClick={handleAddFavorite}
          >
            Добавить в избранное
          </Button>
        ) : (
          <></>
        )}
        {/* СДЕЛАТЬ Админку*/}
        <Button type="button" onClick={clickDelete}>
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
