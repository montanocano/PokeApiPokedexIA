import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useFavoritesStore } from "../../../../features/pokemon-favorite/store/store";

interface FavoriteButtonProps {
  pokemonId: number;
  size?: number;
  color?: string;
}

export function FavoriteButton({
  pokemonId,
  size = 24,
  color = "#E53E3E",
}: FavoriteButtonProps) {
  const favorited = useFavoritesStore((state) =>
    state.favorites.includes(pokemonId),
  );
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const handlePress = () => {
    if (favorited) {
      removeFavorite(pokemonId);
    } else {
      addFavorite(pokemonId);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityLabel={
        favorited ? "Remove from favorites" : "Add to favorites"
      }
      accessibilityRole="button"
    >
      <Ionicons
        name={favorited ? "heart" : "heart-outline"}
        size={size}
        color={color}
      />
    </Pressable>
  );
}
