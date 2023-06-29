import React, { useCallback, useEffect } from "react";
import FavoriteCard from "./FavoriteCard";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { delSavedProduct, loadSavedProducts } from "./favoritesSlice";
import { FavoriteId } from "./types/favoritesType";

function FavoriteView(): JSX.Element {
  const dispatch = useAppDispatch();

  const { favoritesArr } = useSelector(
    (store: RootState) => store.favoritesArr
  );

  const handleDeleteFavorite = useCallback(
    (id: FavoriteId) => {
      dispatch(delSavedProduct(id));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(loadSavedProducts());
  }, [dispatch]);

  return (
    <div>
      {favoritesArr.map((favorite) => (
        <FavoriteCard
          favorite={favorite}
          key={favorite.id}
          onDeleteFavorite={handleDeleteFavorite}
        />
      ))}
    </div>
  );
}

export default FavoriteView;
