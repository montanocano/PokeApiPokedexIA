## 1. Instalación de dependencias

- [x] 1.1 Instalar `tamagui`, `@tamagui/core` y `@tamagui/config` con el gestor de paquetes del proyecto
- [x] 1.2 Instalar `@tamagui/babel-plugin` como dependencia de desarrollo

## 2. Configuración de Babel

- [x] 2.1 Añadir `@tamagui/babel-plugin` a los plugins en `babel.config.js` con la configuración mínima requerida

## 3. Archivo de configuración de Tamagui

- [x] 3.1 Crear `tamagui.config.ts` en la raíz del proyecto
- [x] 3.2 Importar y extender el preset base de `@tamagui/config`
- [x] 3.3 Mapear los tokens de color de `src/shared/ui/tokens/` a la configuración de Tamagui
- [x] 3.4 Mapear los tokens de tipografía y espaciado de `src/shared/ui/tokens/` a la configuración de Tamagui
- [x] 3.5 Exportar la configuración final con `createTamagui`

## 4. Integración en App.tsx

- [x] 4.1 Importar `TamaguiProvider` desde `tamagui` en `App.tsx`
- [x] 4.2 Importar la configuración exportada desde `tamagui.config.ts`
- [x] 4.3 Envolver el árbol de componentes existente con `TamaguiProvider` pasando la `config`

## 5. Verificación

- [x] 5.1 Arrancar la app y confirmar que no hay errores de compilación ni de runtime relacionados con Tamagui
- [x] 5.2 Verificar que un componente hijo puede consumir tokens de Tamagui correctamente
