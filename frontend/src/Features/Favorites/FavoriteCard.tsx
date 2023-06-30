import React, { useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { FavoriteId, Favorites } from "./types/favoritesType";

function FavoriteCard({
  favorite,
  onDeleteFavorite,
}: {
  favorite: Favorites;
  onDeleteFavorite: (id: FavoriteId) => void;
}): JSX.Element {
  const removeFavorite = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      onDeleteFavorite(favorite.id);
    },
    [onDeleteFavorite, favorite]
  );

  return (
    <Card sx={{ marginTop: 2, width: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="210"
          image={favorite["Product.img"]}
          alt="Product Foto"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {favorite["Product.name"]}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Цена: {favorite["Product.price"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {favorite["Product.description"]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button type="button" onClick={removeFavorite}>
          Удалить из избранного
        </Button>
      </CardActions>
    </Card>
  );
}

export default FavoriteCard;
