## ADDED Requirements

### Requirement: LoadingSpinner muestra un indicador de actividad

El componente LoadingSpinner SHALL renderizar un indicador de carga circular animado usando el `ActivityIndicator` de React Native o un equivalente de Tamagui, con el color primario de los tokens por defecto.

#### Scenario: Render por defecto

- **WHEN** se renderiza `<LoadingSpinner>`
- **THEN** se muestra un spinner animado con el color primario del Design System

### Requirement: LoadingSpinner acepta tamaños configurables

El componente LoadingSpinner SHALL soportar la prop `size` con valores `sm`, `md` (default) y `lg`, mapeando cada uno a un tamaño numérico definido por los tokens de espaciado.

#### Scenario: Tamaño pequeño

- **WHEN** se renderiza `<LoadingSpinner size="sm">`
- **THEN** el spinner se muestra con dimensiones reducidas

#### Scenario: Tamaño grande

- **WHEN** se renderiza `<LoadingSpinner size="lg">`
- **THEN** el spinner se muestra con dimensiones aumentadas

### Requirement: LoadingSpinner acepta color personalizable

El componente LoadingSpinner SHALL aceptar una prop `color` que sobreescriba el color por defecto del spinner.

#### Scenario: Color personalizado

- **WHEN** se renderiza `<LoadingSpinner color="#FF0000">`
- **THEN** el spinner se muestra en color rojo
