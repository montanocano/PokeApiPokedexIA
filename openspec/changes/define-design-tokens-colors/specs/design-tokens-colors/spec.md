## ADDED Requirements

### Requirement: Paleta de colores primarios

El sistema SHALL exportar un objeto `primary` con los colores base de la Pokédex: colores de marca, fondos neutros y texto.

#### Scenario: Importar colores primarios

- **WHEN** un componente importa `colors.primary` desde `src/tokens/colors`
- **THEN** tiene acceso a las propiedades `brand`, `background`, `surface` y `text` con sus valores hex

### Requirement: Colores por tipo de Pokémon

El sistema SHALL exportar un objeto `pokemonTypes` con un color representativo para cada uno de los 18 tipos de Pokémon (Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, Fairy).

#### Scenario: Obtener el color de un tipo

- **WHEN** un componente accede a `colors.pokemonTypes.fire`
- **THEN** recibe un valor de color hex reconocible como el color del tipo Fuego

#### Scenario: Todos los tipos cubiertos

- **WHEN** se verifica el objeto `pokemonTypes`
- **THEN** contiene exactamente 18 entradas, una por cada tipo canónico de Pokémon

### Requirement: Soporte de tema claro y oscuro

El sistema SHALL exportar un objeto `theme` con variantes `light` y `dark`, cada una con las propiedades de color necesarias para renderizar la UI en ambos modos.

#### Scenario: Acceder a colores del tema claro

- **WHEN** un componente accede a `colors.theme.light`
- **THEN** obtiene los colores de fondo, superficie y texto apropiados para fondo claro

#### Scenario: Acceder a colores del tema oscuro

- **WHEN** un componente accede a `colors.theme.dark`
- **THEN** obtiene los colores de fondo, superficie y texto apropiados para fondo oscuro

### Requirement: Colores semánticos de estado

El sistema SHALL exportar un objeto `semantic` con colores para los estados `success`, `error` y `warning`, usables en mensajes de feedback, badges y alertas.

#### Scenario: Usar color de error

- **WHEN** un componente necesita indicar un error
- **THEN** puede importar `colors.semantic.error` y obtener un valor hex rojo apropiado

#### Scenario: Usar color de éxito

- **WHEN** un componente necesita indicar una operación exitosa
- **THEN** puede importar `colors.semantic.success` y obtener un valor hex verde apropiado

### Requirement: Archivo tokens/colors.ts como fuente única de verdad

El sistema SHALL contener todos los tokens de color en `src/tokens/colors.ts`. Ningún componente SHALL hardcodear valores de color hexadecimales directamente.

#### Scenario: Consumo correcto de tokens

- **WHEN** se revisa el código de cualquier componente que use colores
- **THEN** los valores de color provienen de una importación de `src/tokens/colors`, no de strings hex inline
