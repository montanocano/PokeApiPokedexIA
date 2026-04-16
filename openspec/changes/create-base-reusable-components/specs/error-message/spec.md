## ADDED Requirements

### Requirement: ErrorMessage muestra un mensaje de error con icono
El componente ErrorMessage SHALL renderizar un icono de advertencia/error junto al texto del mensaje, usando los tokens de color de error del Design System.

#### Scenario: Render básico
- **WHEN** se renderiza `<ErrorMessage message="Pokémon no encontrado">`
- **THEN** se muestra el icono de error y el texto "Pokémon no encontrado" en color error

### Requirement: ErrorMessage acepta acción de reintentar
El componente ErrorMessage SHALL mostrar un botón "Reintentar" cuando se provee la prop `onRetry`, y SHALL ejecutar esa función al pulsarlo.

#### Scenario: Botón reintentar visible
- **WHEN** se renderiza `<ErrorMessage message="Error de red" onRetry={fn}>`
- **THEN** se muestra el mensaje de error y un botón "Reintentar"

#### Scenario: Acción reintentar
- **WHEN** el usuario pulsa el botón "Reintentar"
- **THEN** se ejecuta la función `onRetry` provista

### Requirement: ErrorMessage no renderiza nada si no hay mensaje
El componente ErrorMessage SHALL retornar `null` cuando la prop `message` es `undefined`, `null` o string vacío.

#### Scenario: Sin mensaje
- **WHEN** se renderiza `<ErrorMessage message="">` o sin `message`
- **THEN** el componente no renderiza ningún elemento en el árbol de vistas
