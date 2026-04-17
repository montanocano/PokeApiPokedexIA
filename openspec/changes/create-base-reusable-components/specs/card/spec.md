## ADDED Requirements

### Requirement: Card actúa como contenedor visual genérico

El componente Card SHALL envolver su `children` en un contenedor con fondo, bordes redondeados y sombra configurable, usando los tokens de diseño.

#### Scenario: Render básico con children

- **WHEN** se renderiza `<Card><Text>Hola</Text></Card>`
- **THEN** el contenido aparece dentro de un contenedor con estilos de tarjeta aplicados

### Requirement: Card acepta elevación configurable

El componente Card SHALL soportar una prop `elevation` (`none`, `sm`, `md`, `lg`) que controla la sombra visual de la tarjeta.

#### Scenario: Sin elevación

- **WHEN** se renderiza `<Card elevation="none">`
- **THEN** la tarjeta no muestra sombra

#### Scenario: Elevación media por defecto

- **WHEN** se renderiza `<Card>` sin especificar `elevation`
- **THEN** la tarjeta muestra la sombra media por defecto

### Requirement: Card acepta onPress para ser pulsable

El componente Card SHALL ejecutar la prop `onPress` al ser pulsado cuando esta es provista, aplicando feedback visual táctil.

#### Scenario: Card pulsable

- **WHEN** se renderiza `<Card onPress={fn}>` y el usuario pulsa la tarjeta
- **THEN** se ejecuta `fn` y se muestra feedback visual (opacidad o highlight)
