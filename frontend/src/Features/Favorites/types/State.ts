import { Favorites } from "./favoritesType";

interface State {
  loading: boolean;
  error: string | undefined;
  favoritesArr: Favorites[];
}

export default State;
