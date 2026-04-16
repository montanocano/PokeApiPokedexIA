## 1. Preparación de la estructura

- [x] 1.1 Crear el directorio `src/tokens/` si no existe
- [x] 1.2 Crear el archivo vacío `src/tokens/colors.ts`

## 2. Implementar paleta de colores primarios

- [x] 2.1 Definir y exportar el objeto `primary` con colores de marca (`brand`), fondo (`background`), superficie (`surface`) y texto (`text`)

## 3. Implementar colores por tipo de Pokémon

- [x] 3.1 Definir y exportar el objeto `pokemonTypes` con los 18 tipos canónicos (Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, Fairy)
- [x] 3.2 Verificar que los colores son visualmente reconocibles comparándolos con la referencia de los juegos oficiales

## 4. Implementar soporte de tema

- [x] 4.1 Definir y exportar el objeto `theme.light` con colores de fondo, superficie y texto para modo claro
- [x] 4.2 Definir y exportar el objeto `theme.dark` con colores de fondo, superficie y texto para modo oscuro

## 5. Implementar colores semánticos

- [x] 5.1 Definir y exportar el objeto `semantic` con propiedades `success`, `error` y `warning`

## 6. Verificación final

- [x] 6.1 Confirmar que `src/tokens/colors.ts` exporta los cuatro objetos: `primary`, `pokemonTypes`, `theme`, `semantic`
- [x] 6.2 Verificar que el archivo compila sin errores TypeScript (`tsc --noEmit`)
- [x] 6.3 Confirmar que no hay valores hex hardcodeados fuera de este archivo en el código existente
