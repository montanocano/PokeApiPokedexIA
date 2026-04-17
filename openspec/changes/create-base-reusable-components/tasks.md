## 1. Estructura de carpetas y barrel export

- [x] 1.1 Crear la carpeta `src/shared/ui/components/` si no existe
- [x] 1.2 Crear el archivo barrel `src/shared/ui/components/index.ts` que reexportará todos los componentes

## 2. Componente Button

- [x] 2.1 Crear `src/shared/ui/components/Button/index.tsx` con las props: `variant` (primary | secondary | outline), `size` (sm | md | lg), `loading`, `disabled`, `onPress`, `children`
- [x] 2.2 Implementar variantes visuales usando `styled()` de Tamagui y los tokens de color
- [x] 2.3 Implementar estado `loading` mostrando LoadingSpinner y deshabilitando interacción
- [x] 2.4 Implementar estado `disabled` con opacidad reducida y bloqueo de `onPress`
- [x] 2.5 Exportar Button desde el barrel `index.ts`

## 3. Componente Card

- [x] 3.1 Crear `src/shared/ui/components/Card/index.tsx` con las props: `elevation` (none | sm | md | lg), `onPress`, `children`
- [x] 3.2 Implementar estilos de contenedor con bordes redondeados, fondo y sombra usando tokens
- [x] 3.3 Implementar prop `elevation` para controlar la sombra
- [x] 3.4 Implementar `onPress` con feedback táctil cuando se provee
- [x] 3.5 Exportar Card desde el barrel `index.ts`

## 4. Componente SearchInput

- [x] 4.1 Crear `src/shared/ui/components/SearchInput/index.tsx` con las props: `value`, `onChangeText`, `placeholder`, `onSubmitEditing`
- [x] 4.2 Implementar layout con icono de lupa a la izquierda y `TextInput` usando primitivos Tamagui
- [x] 4.3 Implementar botón limpiar (icono X) que aparece cuando `value` tiene contenido y llama a `onChangeText("")`
- [x] 4.4 Exportar SearchInput desde el barrel `index.ts`

## 5. Componente Chip/Tag

- [x] 5.1 Crear `src/shared/ui/components/Chip/index.tsx` con las props: `label`, `color`, `selected`, `onPress`
- [x] 5.2 Implementar diseño pill con bordes completamente redondeados usando tokens de tipografía
- [x] 5.3 Implementar prop `color` para fondo y texto con contraste adecuado
- [x] 5.4 Implementar prop `selected` que cambia visualmente el estado activo
- [x] 5.5 Exportar Chip desde el barrel `index.ts`

## 6. Componente LoadingSpinner

- [x] 6.1 Crear `src/shared/ui/components/LoadingSpinner/index.tsx` con las props: `size` (sm | md | lg), `color`
- [x] 6.2 Implementar usando `ActivityIndicator` de React Native, mapeando `size` a valores numéricos desde tokens
- [x] 6.3 Usar el color primario de los tokens como color por defecto, sobreescribible con prop `color`
- [x] 6.4 Exportar LoadingSpinner desde el barrel `index.ts`

## 7. Componente ErrorMessage

- [x] 7.1 Crear `src/shared/ui/components/ErrorMessage/index.tsx` con las props: `message`, `onRetry`
- [x] 7.2 Implementar renderizado con icono de error y texto usando color de error de los tokens
- [x] 7.3 Implementar retorno de `null` cuando `message` es falsy
- [x] 7.4 Implementar botón "Reintentar" condicional que aparece cuando se provee `onRetry`
- [x] 7.5 Exportar ErrorMessage desde el barrel `index.ts`
