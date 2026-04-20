## ADDED Requirements

### Requirement: Chip muestra una etiqueta con texto

El componente Chip SHALL renderizar un contenedor pill (bordes completamente redondeados) con texto en su interior, usando los tokens de diseño.

#### Scenario: Render básico

- **WHEN** se renderiza `<Chip label="Fuego">`
- **THEN** se muestra un pill con el texto "Fuego"

### Requirement: Chip acepta variantes de color

El componente Chip SHALL soportar una prop `color` que aplica el color de fondo y texto correspondiente, alineado con los colores de tipo de Pokémon definidos en los tokens.

#### Scenario: Color custom

- **WHEN** se renderiza `<Chip label="Agua" color="blue">`
- **THEN** el chip muestra fondo azul con texto de contraste adecuado

#### Scenario: Color por defecto

- **WHEN** se renderiza `<Chip label="Normal">` sin `color`
- **THEN** el chip usa el color neutral por defecto de los tokens

### Requirement: Chip puede ser seleccionable

El componente Chip SHALL soportar la prop `selected` (booleano) que cambia visualmente el estado a seleccionado, y SHALL ejecutar `onPress` al ser pulsado.

#### Scenario: Estado seleccionado

- **WHEN** se renderiza `<Chip selected={true}>`
- **THEN** el chip muestra estilos de estado activo/seleccionado (fondo sólido o borde destacado)
