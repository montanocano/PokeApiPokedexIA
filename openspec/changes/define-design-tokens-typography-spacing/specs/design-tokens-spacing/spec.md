## ADDED Requirements

### Requirement: Sistema de espaciado (spacing)
El sistema SHALL exportar un objeto `spacing` con una escala basada en múltiplos de 4px, cubriendo al menos los valores: `1` (4px), `2` (8px), `3` (12px), `4` (16px), `5` (20px), `6` (24px), `8` (32px), `10` (40px), `12` (48px) y `16` (64px).

#### Scenario: Importar espaciado estándar
- **WHEN** un componente importa `spacing[4]` desde `src/shared/ui/tokens/spacing`
- **THEN** recibe el valor 16 (o equivalente en la unidad definida) correspondiente a 4 unidades de la cuadrícula

#### Scenario: Escala de spacing completa
- **WHEN** se verifica el objeto `spacing`
- **THEN** contiene al menos 10 entradas que cubren desde `1` hasta `16`

### Requirement: Tamaños de componentes (sizes)
El sistema SHALL exportar un objeto `sizes` con dimensiones fijas predefinidas para componentes comunes de la UI: `icon` (tamaños de icono), `button` (alturas de botón) y `avatar` (tamaños de avatar/imagen de Pokémon).

#### Scenario: Importar tamaño de icono
- **WHEN** un componente importa `sizes.icon.md` desde `src/shared/ui/tokens/spacing`
- **THEN** recibe el valor numérico correspondiente al tamaño estándar de icono medio

#### Scenario: Tamaños de botón disponibles
- **WHEN** un componente importa `sizes.button`
- **THEN** tiene acceso a variantes `sm`, `md` y `lg` con sus valores de altura correspondientes

### Requirement: Radio de bordes (borderRadius)
El sistema SHALL exportar un objeto `borderRadius` con los radios de borde del Design System: `none` (0), `sm` (4px), `md` (8px), `lg` (12px), `xl` (16px) y `full` (9999px para elementos circulares).

#### Scenario: Importar radio de borde circular
- **WHEN** un componente importa `borderRadius.full` desde `src/shared/ui/tokens/spacing`
- **THEN** recibe el valor 9999 (o equivalente), produciendo bordes completamente redondeados

#### Scenario: Escala completa de radios disponible
- **WHEN** se verifica el objeto `borderRadius`
- **THEN** contiene al menos `none`, `sm`, `md`, `lg`, `xl` y `full`

### Requirement: Archivo spacing.ts como fuente única de verdad
El sistema SHALL contener todos los tokens de espaciado, tamaño y radio en `src/shared/ui/tokens/spacing.ts`. Ningún componente SHALL hardcodear valores de padding, margin, width/height fijos ni borderRadius directamente.

#### Scenario: Consumo correcto de tokens de espaciado
- **WHEN** se revisa el código de cualquier componente que use espaciado, tamaños o radios
- **THEN** los valores provienen de una importación de `src/shared/ui/tokens/spacing`, no de valores inline
