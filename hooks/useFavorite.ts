import { useEffect, useState } from "react";

export const useFavorite = (userId: string) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const getUserFavorites = () => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      setFavorites(JSON.parse(favorites));

      if (JSON.parse(favorites).includes(userId)) {
        setIsFavorite(true);
      }
    }
  };

  useEffect(() => {
    getUserFavorites();
  }, []);

  return { favorites, isFavorite };
};
