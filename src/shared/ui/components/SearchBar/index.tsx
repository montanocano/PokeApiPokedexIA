import React, { useState } from "react";
import { SearchInput } from "../SearchInput";
import { useSearchFilter } from "../../../../features/pokemon-list/search-filter/hooks/useSearchFilter";

export function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const { handleQueryChange, setSearchQuery, cancelPending } =
    useSearchFilter();

  const handleChangeText = (text: string) => {
    setInputValue(text);
    if (text === "") {
      cancelPending();
      setSearchQuery("");
    } else {
      handleQueryChange(text);
    }
  };

  return (
    <SearchInput
      value={inputValue}
      onChangeText={handleChangeText}
      placeholder="Search Pokémon…"
    />
  );
}
