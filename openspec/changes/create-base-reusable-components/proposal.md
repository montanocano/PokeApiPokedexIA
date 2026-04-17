## Why

El proyecto carece de una librería de componentes UI reutilizables que garanticen consistencia visual y de UX a lo largo de toda la aplicación. Crear estos componentes base ahora permite que el resto de features los consuman de forma uniforme y alineada con el Design System definido.

## What Changes

- Nuevo componente `Button` personalizado con variantes (primary, secondary, outline) y estados (loading, disabled)
- Nuevo componente `Card` como contenedor genérico con soporte de sombra, bordes y padding configurable
- Nuevo componente `SearchInput` con icono integrado, estado de limpieza y callback de búsqueda
- Nuevo componente `Chip/Tag` para mostrar etiquetas, filtros o badges con variantes de color
- Nuevo componente `LoadingSpinner` con tamaños configurables para indicar estados de carga
- Nuevo componente `ErrorMessage` para mostrar mensajes de error de forma consistente

## Capabilities

### New Capabilities

- `button`: Componente Button reutilizable con variantes visuales y estados interactivos
- `card`: Componente Card como contenedor visual genérico
- `search-input`: Componente SearchInput con funcionalidad de búsqueda y limpieza
- `chip-tag`: Componente Chip/Tag para etiquetas y categorías
- `loading-spinner`: Componente LoadingSpinner para indicar carga
- `error-message`: Componente ErrorMessage para mostrar errores

### Modified Capabilities

## Impact

- Carpeta `src/shared/ui/components/` donde vivirán todos los componentes
- Los tokens de diseño (`src/shared/ui/tokens/`) ya definidos serán consumidos por estos componentes
- Estos componentes serán la base para features posteriores como la pantalla de listado de Pokémon y el detalle
