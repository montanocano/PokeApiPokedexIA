/**
 * 4.1 — Bottom tab bar: verify both tab screens are registered.
 *
 * The Expo Router Tabs component is complex to render in isolation.
 * We verify the layout module exports a default component and that
 * both expected screen names ("index", "favorites") are referenced.
 */

import fs from "fs";
import path from "path";
import * as layoutMod from "../../../../app/(tabs)/_layout";

describe("TabsLayout — bottom tab bar", () => {
  it("exports a default component", () => {
    expect(typeof layoutMod.default).toBe("function");
  });

  it("contains both 'index' and 'favorites' screen names in the source", () => {
    const layoutSrc = fs.readFileSync(
      path.resolve(__dirname, "../../../../app/(tabs)/_layout.tsx"),
      "utf8",
    );

    expect(layoutSrc).toContain('name="index"');
    expect(layoutSrc).toContain('name="favorites"');
  });

  it("uses the 'list' Ionicons name for the List tab", () => {
    const layoutSrc = fs.readFileSync(
      path.resolve(__dirname, "../../../../app/(tabs)/_layout.tsx"),
      "utf8",
    );

    expect(layoutSrc).toContain('name="list"');
  });

  it("uses the 'heart' Ionicons name for the Favorites tab", () => {
    const layoutSrc = fs.readFileSync(
      path.resolve(__dirname, "../../../../app/(tabs)/_layout.tsx"),
      "utf8",
    );

    expect(layoutSrc).toContain('name="heart"');
  });
});
