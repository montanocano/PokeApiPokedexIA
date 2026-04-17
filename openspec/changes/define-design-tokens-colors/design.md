## Context

La Pokédex IA necesita una capa de Design System antes de construir componentes. En este momento no existe ningún sistema de colores — los valores se pondrían directamente en los estilos de cada componente, creando un caos de mantenimiento inmediato. La tarjeta "Definir Design Tokens - Colores" es el punto de partida del Design System.

La decisión de empezar por los colores es intencionada: es la capa más transversal (todos los componentes los usan), y sin ella no tiene sentido definir tipografía, espaciados ni componentes.

## Goals / Non-Goals

**Goals:**
- Crear `src/tokens/colors.ts` como fuente única de verdad para todos los colores
- Cubrir los 18 tipos de Pokémon con colores representativos
- Soportar tema claro y tema oscuro desde el primer día
- Definir colores semánticos (success, error, warning) reutilizables en toda la UI

**Non-Goals:**
- No definir tokens de tipografía ni espaciado (serán otras tarjetas)
- No integrar con ningún sistema de theming de React todavía (Context, CSS vars) — solo el archivo de valores
- No cubrir colores de generaciones o regiones de Pokémon

## Decisions

### TypeScript puro sobre CSS custom properties

**Decisión**: Los tokens se exportan como constantes TypeScript, no como CSS variables.

**Razón**: El proyecto usa TypeScript + React. Tener los tokens en TS permite autocompletado, detección de errores en build time y refactors seguros. Las CSS variables pueden generarse a partir de los tokens si hace falta, pero el origen de verdad es el archivo TS.

**Alternativa descartada**: CSS custom properties directamente en un `:root {}` — más difícil de tipar y de usar con styled-components o CSS modules con seguridad.

### Un objeto por dominio, no una lista plana

**Decisión**: Organizar los tokens en objetos agrupados: `primary`, `pokemonTypes`, `semantic`, `theme`.

**Razón**: Facilita el consumo (`colors.pokemonTypes.fire` vs buscar entre 60 constantes sueltas) y la documentación automática.

### Colores de Pokémon: inspirados en los juegos oficiales

**Decisión**: Los colores de tipo se basarán en los usados en los juegos de Game Freak y en Bulbapedia, ajustados para accesibilidad mínima (contraste AA).

**Razón**: Los usuarios de una Pokédex reconocen intuitivamente "el verde de Planta" o "el rojo de Fuego" de los juegos. Usar colores arbitrarios rompería esa expectativa.

## Risks / Trade-offs

- **[Riesgo] Colores no accesibles en tema oscuro** → Mitigación: definir variantes `light` y `dark` por separado y no asumir que un color funciona en ambos fondos.
- **[Trade-off] Hardcodear hex values** → A largo plazo se podría migrar a una herramienta como Style Dictionary, pero para este proyecto es sobreingeniería. Los valores en TS son suficientes y fáciles de cambiar.
- **[Riesgo] Crecer sin criterio** → Mitigación: cada nuevo color debe caer en una de las 4 categorías definidas. Si no encaja, se revisa la categoría, no se añade un quinto grupo ad-hoc.
