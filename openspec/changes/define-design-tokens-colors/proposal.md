## Why

El proyecto necesita un sistema de colores consistente y centralizado antes de construir cualquier componente visual. Sin design tokens definidos, cada desarrollador usaría colores a ojo en cada componente, lo que lleva a inconsistencias visuales difíciles de mantener y a un tema claro/oscuro imposible de implementar después.

## What Changes

- Crear el archivo `tokens/colors.ts` con todos los colores del Design System
- Definir la paleta de colores primarios de la Pokédex
- Mapear colores específicos para cada tipo de Pokémon (fuego, agua, planta, etc.)
- Configurar variables para tema claro y oscuro
- Incluir colores semánticos de estado: success, error y warning

## Capabilities

### New Capabilities

- `design-tokens-colors`: Sistema centralizado de tokens de color que incluye paleta primaria, colores por tipo de Pokémon, soporte de tema claro/oscuro y colores de estado semánticos.

### Modified Capabilities

<!-- Sin cambios a specs existentes -->

## Impact

- **Nuevo archivo**: `src/tokens/colors.ts`
- **Afecta**: todos los componentes futuros que usen colores — se esperará que importen desde este archivo en lugar de hardcodear valores
- **Dependencias**: ninguna externa, es una capa base del Design System
- **Riesgo**: bajo — es código nuevo sin romper nada existente
