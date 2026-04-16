## ADDED Requirements

### Requirement: Escala tipográfica (fontSize)
El sistema SHALL exportar un objeto `fontSize` con los tamaños de fuente del Design System, cubriendo al menos los tamaños: `xs` (12px), `sm` (14px), `md` (16px), `lg` (18px), `xl` (20px), `2xl` (24px), `3xl` (30px) y `4xl` (36px).

#### Scenario: Importar tamaño de fuente base
- **WHEN** un componente importa `fontSize.md` desde `src/shared/ui/tokens/typography`
- **THEN** recibe el valor 16 (o equivalente en la unidad definida) correspondiente al tamaño base

#### Scenario: Escala completa disponible
- **WHEN** se verifica el objeto `fontSize`
- **THEN** contiene al menos 8 entradas que cubren desde `xs` hasta `4xl`

### Requirement: Pesos de fuente (fontWeight)
El sistema SHALL exportar un objeto `fontWeight` con los pesos tipográficos disponibles: `regular` (400), `medium` (500), `semibold` (600) y `bold` (700).

#### Scenario: Importar peso de fuente bold
- **WHEN** un componente importa `fontWeight.bold` desde `src/shared/ui/tokens/typography`
- **THEN** recibe el valor 700

#### Scenario: Todos los pesos cubiertos
- **WHEN** se verifica el objeto `fontWeight`
- **THEN** contiene al menos los pesos `regular`, `medium`, `semibold` y `bold`

### Requirement: Archivo typography.ts como fuente única de verdad
El sistema SHALL contener todos los tokens tipográficos en `src/shared/ui/tokens/typography.ts`. Ningún componente SHALL hardcodear valores de `fontSize` ni `fontWeight` directamente.

#### Scenario: Consumo correcto de tokens tipográficos
- **WHEN** se revisa el código de cualquier componente que use tamaños o pesos de fuente
- **THEN** los valores provienen de una importación de `src/shared/ui/tokens/typography`, no de valores inline
