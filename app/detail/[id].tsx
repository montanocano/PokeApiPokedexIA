import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { DetailScreen } from "../../src/shared/ui/screens/DetailScreen";

export default function DetailRoute() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const parsedId = !id || Array.isArray(id) ? NaN : Number(id);

  if (!id || Array.isArray(id) || Number.isNaN(parsedId)) {
    return <Text>Invalid Pokémon id.</Text>;
  }

  return <DetailScreen pokemonId={parsedId} />;
}
