## ADDED Requirements

### Requirement: SearchInput muestra un campo de texto con icono de búsqueda
El componente SearchInput SHALL renderizar un campo de texto con un icono de lupa integrado a la izquierda, usando los tokens de color y tipografía del Design System.

#### Scenario: Render inicial
- **WHEN** se renderiza `<SearchInput>`
- **THEN** se muestra un campo de texto con el icono de búsqueda visible a la izquierda

### Requirement: SearchInput muestra botón de limpiar cuando hay texto
El componente SearchInput SHALL mostrar un icono de "limpiar" (X) a la derecha cuando el campo tiene contenido, y al pulsarlo SHALL limpiar el texto y llamar a `onChangeText("")`.

#### Scenario: Aparición del botón limpiar
- **WHEN** el usuario escribe texto en el SearchInput
- **THEN** aparece un icono X pulsable a la derecha del campo

#### Scenario: Limpieza del campo
- **WHEN** el usuario pulsa el icono X
- **THEN** el campo queda vacío y se invoca `onChangeText` con string vacío

### Requirement: SearchInput acepta placeholder y callbacks estándar
El componente SearchInput SHALL aceptar las props `placeholder`, `value`, `onChangeText` y `onSubmitEditing` con la misma semántica que el `TextInput` de React Native.

#### Scenario: Placeholder visible
- **WHEN** se renderiza `<SearchInput placeholder="Buscar Pokémon..." value="">`
- **THEN** el texto placeholder es visible en el campo vacío
