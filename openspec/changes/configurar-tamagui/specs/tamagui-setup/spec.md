## ADDED Requirements

### Requirement: Archivo de configuración de Tamagui

El proyecto SHALL tener un archivo `tamagui.config.ts` en la raíz que exporte la configuración de Tamagui con los tokens de diseño del proyecto (colores, tipografía, espaciado).

#### Scenario: Archivo de configuración existe y exporta config válida

- **WHEN** se importa `tamagui.config.ts`
- **THEN** el módulo exporta un objeto de configuración compatible con `TamaguiProvider`

#### Scenario: Tokens del proyecto están presentes en la configuración

- **WHEN** se inspecciona la configuración exportada
- **THEN** los tokens de color y tipografía definidos en `src/shared/ui/tokens/` están reflejados en la configuración de Tamagui

### Requirement: TamaguiProvider en el punto de entrada de la app

La aplicación SHALL envolver su árbol de componentes con `TamaguiProvider` en `App.tsx`, pasando la configuración definida en `tamagui.config.ts`.

#### Scenario: App arranca sin errores con TamaguiProvider

- **WHEN** se inicia la aplicación Expo
- **THEN** `TamaguiProvider` está presente en el árbol de componentes sin errores de renderizado

#### Scenario: Configuración de Tamagui es accesible desde componentes hijos

- **WHEN** un componente hijo usa hooks o componentes de Tamagui
- **THEN** puede acceder a los tokens y temas definidos en `tamagui.config.ts`

### Requirement: Plugin de Babel configurado para Tamagui

El proyecto SHALL tener `@tamagui/babel-plugin` registrado en `babel.config.js` para habilitar las optimizaciones en tiempo de compilación de Tamagui.

#### Scenario: Plugin de Babel presente en la configuración

- **WHEN** se lee `babel.config.js`
- **THEN** `@tamagui/babel-plugin` está listado en los plugins con la configuración mínima requerida
