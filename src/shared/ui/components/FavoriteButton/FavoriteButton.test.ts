import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { FavoriteButton } from "./index";
import { useFavoritesStore } from "../../../../features/pokemon-favorite/store/store";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

beforeEach(() => {
  useFavoritesStore.setState({ favorites: [], isHydrated: true });
});

describe("FavoriteButton", () => {
  it("shows outlined heart when pokemon is not favourited", () => {
    const { getByLabelText } = render(
      React.createElement(FavoriteButton, { pokemonId: 1 }),
    );
    const btn = getByLabelText("Add to favorites");
    expect(btn).toBeTruthy();
  });

  it("shows filled heart when pokemon is favourited", () => {
    useFavoritesStore.setState({ favorites: [1], isHydrated: true });

    const { getByLabelText } = render(
      React.createElement(FavoriteButton, { pokemonId: 1 }),
    );
    const btn = getByLabelText("Remove from favorites");
    expect(btn).toBeTruthy();
  });

  it("calls addFavorite when pressed on a non-favourite", () => {
    const { getByLabelText } = render(
      React.createElement(FavoriteButton, { pokemonId: 25 }),
    );

    fireEvent.press(getByLabelText("Add to favorites"));

    expect(useFavoritesStore.getState().favorites).toContain(25);
  });

  it("calls removeFavorite when pressed on a favourite", () => {
    useFavoritesStore.setState({ favorites: [25], isHydrated: true });

    const { getByLabelText } = render(
      React.createElement(FavoriteButton, { pokemonId: 25 }),
    );

    fireEvent.press(getByLabelText("Remove from favorites"));

    expect(useFavoritesStore.getState().favorites).not.toContain(25);
  });

  it("toggles accessibility label after press", () => {
    const { getByLabelText, queryByLabelText } = render(
      React.createElement(FavoriteButton, { pokemonId: 7 }),
    );

    fireEvent.press(getByLabelText("Add to favorites"));

    expect(queryByLabelText("Remove from favorites")).toBeTruthy();
  });
});
