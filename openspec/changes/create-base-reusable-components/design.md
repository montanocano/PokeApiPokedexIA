## Context

La app es una Pokedex en React Native (Expo) que usa Tamagui como librería de componentes y sistema de estilos. Los design tokens de colores, tipografía y espaciado ya están definidos en `src/shared/ui/tokens/`. Los componentes base se crearán en `src/shared/ui/components/` y serán consumidos por las features de la app.

## Goals / Non-Goals

**Goals:**

- Crear 6 componentes base reutilizables: Button, Card, SearchInput, Chip/Tag, LoadingSpinner, ErrorMessage
- Usar los tokens de diseño ya definidos (colores, tipografía, espaciado)
- Construir sobre primitivos de Tamagui para aprovechar su sistema de temas y variantes
- Cada componente debe exportar sus tipos TypeScript

**Non-Goals:**

- No se crearán historias de Storybook ni documentación visual
- No se implementará lógica de negocio dentro de los componentes (son puramente presentacionales)
- No se manejan animaciones complejas en esta fase

## Decisions

### Tamagui como base de los componentes

Usar los primitivos de Tamagui (`Stack`, `XStack`, `YStack`, `Text`, `styled`) en lugar de los primitivos básicos de React Native.

- **Rationale**: Tamagui ya está configurado en el proyecto con los tokens. Usar sus primitivos garantiza que el theming y los tokens se apliquen de forma consistente.
- **Alternativa descartada**: `StyleSheet` de React Native puro — no integra con el sistema de tokens de Tamagui.

### Variantes con `styled()` de Tamagui

Implementar variantes (size, variant, color) usando el sistema `variants` de `styled()`.

- **Rationale**: Permite definir variantes declarativas en tiempo de compilación que Tamagui optimiza. Evita lógica condicional en el render.

### Estructura de archivos por componente

Cada componente vive en su propia carpeta: `src/shared/ui/components/<ComponentName>/index.tsx`

- **Rationale**: Facilita colocación de tipos, subcomponentes o variantes futuras sin contaminar el directorio raíz.

### Barrel export

Un archivo `src/shared/ui/components/index.ts` reexporta todos los componentes.

- **Rationale**: Importaciones limpias desde cualquier feature: `import { Button, Card } from '@/shared/ui/components'`

## Risks / Trade-offs

- [Acoplamiento a Tamagui] Si en el futuro se migra a otra librería, los componentes necesitarán reescribirse → Mitigation: los contratos de props (interfaces TypeScript) permanecen estables, solo cambia la implementación.
- [Tokens incompletos] Si un componente necesita un valor que no está en los tokens, el developer podría hardcodear valores → Mitigation: documentar en cada componente qué tokens usa y revisar en code review.
