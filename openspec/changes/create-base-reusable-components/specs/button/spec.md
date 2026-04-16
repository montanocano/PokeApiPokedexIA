## ADDED Requirements

### Requirement: Button acepta variantes visuales
El componente Button SHALL soportar las variantes `primary`, `secondary` y `outline`, aplicando estilos visuales distintos para cada una usando los tokens de color del Design System.

#### Scenario: Variante primary por defecto
- **WHEN** se renderiza `<Button>` sin especificar `variant`
- **THEN** se muestra con estilos de variante `primary` (fondo de color primario, texto blanco)

#### Scenario: Variante outline
- **WHEN** se renderiza `<Button variant="outline">`
- **THEN** el botón muestra borde visible y fondo transparente

### Requirement: Button soporta estado loading
El componente Button SHALL mostrar un spinner en lugar del label cuando la prop `loading` es `true`, y SHALL deshabilitar la interacción durante ese estado.

#### Scenario: Estado loading activo
- **WHEN** se renderiza `<Button loading={true}>`
- **THEN** se muestra un indicador de carga y el botón no responde a pulsaciones

### Requirement: Button soporta estado disabled
El componente Button SHALL aplicar estilos de opacidad reducida y SHALL ignorar eventos de pulsación cuando la prop `disabled` es `true`.

#### Scenario: Estado disabled
- **WHEN** se renderiza `<Button disabled={true}>`
- **THEN** el botón tiene opacidad reducida y no ejecuta `onPress` al pulsarlo

### Requirement: Button acepta tamaños configurables
El componente Button SHALL soportar las tallas `sm`, `md` (default) y `lg`, ajustando padding y tamaño de fuente según los tokens de espaciado y tipografía.

#### Scenario: Tamaño md por defecto
- **WHEN** se renderiza `<Button>` sin `size`
- **THEN** el botón usa el tamaño medio definido por los tokens
