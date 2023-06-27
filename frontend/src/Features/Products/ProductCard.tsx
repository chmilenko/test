import React, { useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Product, { ProductId } from "./types/productType";

function ProductCard({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: (id: ProductId) => void;
}): JSX.Element {
  
  const handleRemove = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      onDelete(product.id);
    },
    [onDelete, product]
  );

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.img}
          alt="Product Foto"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Добавить в избранное
        </Button>
        <Button type="button" onClick={handleRemove}>
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
