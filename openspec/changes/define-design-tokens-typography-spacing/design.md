## Context

Con los tokens de color ya definidos en `src/shared/ui/tokens/colors.ts`, el siguiente paso del Design System es establecer la escala tipográfica y el sistema de espaciado. Sin estos tokens, cada componente definiría sus propios `fontSize`, `fontWeight`, `padding` y `borderRadius` de forma inconsistente, imposibilitando un sistema visual coherente y escalable.

Esta tarjeta cubre las cinco áreas definidas en el backlog: escala tipográfica (fontSize), pesos de fuente (fontWeight), espaciados (spacing), tamaños de componentes (sizes) y radius para bordes (borderRadius).

## Goals / Non-Goals

**Goals:**
- Crear `src/shared/ui/tokens/typography.ts` con la escala de `fontSize` y valores de `fontWeight`
- Crear `src/shared/ui/tokens/spacing.ts` con `spacing`, `sizes` y `borderRadius`
- Que los tokens sean la única fuente de verdad: ningún componente hardcodea estos valores
- Mantener coherencia con la estructura de `colors.ts` (objetos exportados, TypeScript puro)

**Non-Goals:**
- No definir familias tipográficas (font-family) — eso es una tarjeta aparte
- No crear un sistema de theming con Context o CSS variables todavía
- No definir tokens de sombras (shadows) ni z-index en esta iteración

## Decisions

### TypeScript puro, misma convención que colors.ts

**Decisión**: Los tokens se exportan como constantes TypeScript, consistentes con `colors.ts`.

**Razón**: Mantiene uniformidad en el Design System. Permite autocompletado y detección de errores en build time. Fácil de migrar a Style Dictionary en el futuro si es necesario.

**Alternativa descartada**: CSS custom properties — más difícil de tipar y de usar de forma segura con TypeScript.

### Escala tipográfica basada en múltiplos de 4px

**Decisión**: La escala de `fontSize` seguirá incrementos de 2px/4px partiendo de una base de 12px: `xs: 12`, `sm: 14`, `md: 16`, `lg: 18`, `xl: 20`, `2xl: 24`, `3xl: 30`, `4xl: 36`.

**Razón**: Es la escala más usada en sistemas de diseño modernos (Tailwind, Material). Los múltiplos de 4 son compatibles con una cuadrícula base de 4px, lo que facilita alinear texto con otros elementos.

**Alternativa descartada**: Escala modular (ratio 1.25 o 1.333) — más elegante matemáticamente pero produce valores decimales que dificultan el uso manual.

### Spacing basado en cuadrícula de 4px

**Decisión**: El sistema de spacing usará una escala lineal de 4px: `1: 4`, `2: 8`, `3: 12`, `4: 16`, `5: 20`, `6: 24`, `8: 32`, `10: 40`, `12: 48`, `16: 64`.

**Razón**: La cuadrícula de 4px es el estándar de facto en diseño de interfaces. Mantiene consistencia visual y es fácil de razonar.

**Alternativa descartada**: Tokens semánticos (small/medium/large) sin valores numéricos — demasiado ambiguos para uso programático.

### Dos archivos separados

**Decisión**: `typography.ts` para fontSize y fontWeight; `spacing.ts` para spacing, sizes y borderRadius.

**Razón**: Separa responsabilidades por dominio. Un componente que solo necesita espaciado no importa tipografía y viceversa. Evita un archivo god de tokens.

## Risks / Trade-offs

- **[Trade-off] Valores numéricos en px vs rem** → Se usarán números como valores base (sin unidad o con px) para máxima flexibilidad. Los componentes aplican la unidad en los estilos. Esto facilita operaciones matemáticas pero requiere disciplina al aplicar.
- **[Riesgo] Escala insuficiente** → Mitigación: la escala cubre los casos más comunes. Si aparece un valor nuevo, se añade a la escala en lugar de hardcodearlo en el componente.
- **[Trade-off] Sizes vs Spacing duplican valores** → `sizes` define dimensiones fijas de componentes (height de botón, ancho de icono), mientras `spacing` define distancias internas/externas. Pueden coincidir en valor pero tienen semánticas distintas.
