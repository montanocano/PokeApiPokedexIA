// metro.config.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Some packages (e.g. zustand v5) ship ESM-only .mjs files that contain
// `import.meta`, which Metro includes without transformation and the browser
// rejects in a non-module script context.  Removing the "import" condition
// forces Metro to resolve to the CommonJS builds of those packages instead.
config.resolver.unstable_conditionNames = [
  "react-native",
  "browser",
  "require",
  "default",
];

module.exports = config;
