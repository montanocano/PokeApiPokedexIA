## Why

El proyecto necesita tokens de tipografía y espaciado centralizados para garantizar consistencia visual en toda la app. Sin estos tokens, cada componente definiría sus propios tamaños de fuente, pesos y espaciados de forma arbitraria, haciendo imposible mantener una escala visual coherente y dificultando cambios globales de diseño.

## What Changes

- Crear `tokens/typography.ts` con la escala tipográfica (fontSize) y pesos de fuente (fontWeight)
- Crear `tokens/spacing.ts` con el sistema de espaciado (spacing), tamaños de componentes (sizes) y radio de bordes (borderRadius)
- Aplicar los tokens en toda la app en lugar de valores hardcodeados

## Capabilities

### New Capabilities

- `design-tokens-typography`: Escala tipográfica centralizada con tamaños de fuente (fontSize) y pesos de fuente (fontWeight).
- `design-tokens-spacing`: Sistema de espaciado con valores de spacing, tamaños de componentes (sizes) y radius para bordes (borderRadius).

### Modified Capabilities

<!-- Sin cambios a specs existentes -->

## Impact

- **Nuevos archivos**: `src/shared/ui/tokens/typography.ts`, `src/shared/ui/tokens/spacing.ts`
- **Afecta**: todos los componentes que usen texto, padding, margin o border-radius — deberán importar desde estos tokens
- **Dependencias**: ninguna externa; complementa `design-tokens-colors` como capa base del Design System
- **Riesgo**: bajo — es código nuevo sin romper nada existente
