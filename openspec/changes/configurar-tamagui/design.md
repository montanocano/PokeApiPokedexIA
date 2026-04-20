## Context

El proyecto es una Pokedex construida con React Native / Expo. Actualmente no tiene un design system formal. La tarjeta de Trello "Configuración Inicial de Tamagui" (Prioridad Alta) solicita integrar Tamagui como base del sistema de UI, con dos entregables concretos: el `TamaguiProvider` en `App.tsx` y el archivo `tamagui.config.ts`.

## Goals / Non-Goals

**Goals:**

- Instalar Tamagui y sus dependencias necesarias en el proyecto
- Crear `tamagui.config.ts` con tokens base (colores, tipografía, espaciado) reutilizando los tokens ya definidos en `src/shared/ui/tokens/`
- Envolver la app con `TamaguiProvider` en `App.tsx` pasando la configuración creada

**Non-Goals:**

- Migrar componentes existentes a componentes Tamagui
- Definir temas completos (dark/light) — eso va en un cambio posterior
- Configurar animaciones avanzadas de Tamagui

## Decisions

### 1. Usar `@tamagui/core` + preset `@tamagui/config`

**Decisión**: Usar el preset oficial de Tamagui (`@tamagui/config`) como base del `tamagui.config.ts` y extenderlo con los tokens propios del proyecto.

**Alternativas consideradas**:

- Configuración desde cero: más control pero mucho más trabajo para la configuración inicial.
- Elegido el preset porque reduce el boilerplate inicial y podemos sobreescribir solo lo necesario.

### 2. Reutilizar tokens existentes de `src/shared/ui/tokens/`

**Decisión**: Importar los tokens de color y tipografía ya definidos en el proyecto al `tamagui.config.ts` para mantener consistencia.

**Alternativas consideradas**:

- Definir tokens duplicados dentro de Tamagui: genera deuda técnica e inconsistencia.

### 3. Punto de entrada: `App.tsx`

**Decisión**: Envolver el árbol de componentes con `TamaguiProvider` directamente en `App.tsx`, que es el punto de entrada de la aplicación Expo.

## Risks / Trade-offs

- [Compatibilidad con Expo] Tamagui requiere configuración del babel plugin. → Mitigation: Añadir `@tamagui/babel-plugin` al `babel.config.js`.
- [Tamaño del bundle] Tamagui añade peso al bundle. → Mitigation: Usar tree-shaking y evaluar en iteraciones futuras si es un problema.
- [Versiones] Incompatibilidades entre versiones de Tamagui y Expo SDK. → Mitigation: Revisar la matriz de compatibilidad oficial antes de instalar.
