## Why

El proyecto necesita un sistema de UI consistente y tipado para construir la interfaz de la Pokedex. Tamagui proporciona un design system performante con soporte para tokens de diseño, temas y componentes universales, alineado con la etiqueta "Design System" de alta prioridad en el backlog.

## What Changes

- Instalación y configuración de Tamagui como librería principal de UI
- Creación del archivo `tamagui.config.ts` con tokens de color, tipografía y espaciado base
- Integración de `TamaguiProvider` en el punto de entrada `App.tsx` para envolver la aplicación

## Capabilities

### New Capabilities

- `tamagui-setup`: Configuración inicial de Tamagui incluyendo el provider y el archivo de configuración con tokens base del design system

### Modified Capabilities

## Impact

- **Archivos afectados**: `App.tsx`, nuevo archivo `tamagui.config.ts`
- **Dependencias**: Se añade `tamagui`, `@tamagui/core`, y paquetes relacionados al `package.json`
- **Design System**: Establece la base para todos los componentes UI futuros del proyecto
