import { useLocalSearchParams } from "expo-router";
import { DetailScreen } from "../../src/shared/ui/screens/DetailScreen";

export default function DetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <DetailScreen pokemonId={Number(id)} />;
}
