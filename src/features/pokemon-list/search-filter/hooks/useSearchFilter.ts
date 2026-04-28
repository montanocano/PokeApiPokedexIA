import { useRef, useCallback } from "react";
import { SEARCH_DEBOUNCE_MS } from "../../../../shared/config";
import { usePokemonListStore } from "../../store/store";

export function useSearchFilter() {
  const setSearchQuery = usePokemonListStore((s) => s.setSearchQuery);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelPending = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleQueryChange = useCallback(
    (query: string) => {
      cancelPending();
      timerRef.current = setTimeout(() => {
        setSearchQuery(query);
      }, SEARCH_DEBOUNCE_MS);
    },
    [setSearchQuery, cancelPending],
  );

  return { handleQueryChange, setSearchQuery, cancelPending };
}
