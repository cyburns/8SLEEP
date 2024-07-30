export const useAddFavorite = (userId: string) => {
  localStorage.setItem(
    "favorites",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("favorites") || "[]"),
      userId,
    ])
  );
};

export const useRemoveFavorite = (userId: string) => {
  localStorage.setItem(
    "favorites",
    JSON.stringify(
      JSON.parse(localStorage.getItem("favorites") || "[]").filter(
        (favorite: string) => favorite !== userId
      )
    )
  );
};
