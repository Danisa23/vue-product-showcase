# TechStore · Vue Product Showcase

Aplicación SPA de catálogo tecnológico desarrollada para la evaluación del módulo **Desarrollo de aplicaciones Front-End con Framework Vue**. La solución utiliza Vue 3 con Vue CLI, Vue Router, Vuex, Axios, Vuetify 3, Jest, Vue Test Utils y Cypress.

## Funcionalidades

- Catálogo con ocho productos visualmente diferenciados.
- Productos tecnológicos sincronizados desde categorías reales de una API REST mediante Axios, con datos locales de respaldo para completar el catálogo.
- Respaldo local automático si la API no está disponible.
- Búsqueda, categorías y ordenamiento.
- Vista de detalle individual.
- Favoritos con Vuex y persistencia en localStorage.
- Estados loading, error y empty.
- Tema oscuro predeterminado y tema claro alternativo.
- Interfaz responsive.
- Dos pruebas unitarias y una prueba end-to-end.

## Instalación

```bash
npm install
npm run serve
```

La aplicación queda disponible normalmente en `http://localhost:8080`.

## Pruebas

```bash
npm run test:unit
```

Para Cypress, deja la aplicación ejecutándose y en otra terminal utiliza:

```bash
npm run test:e2e
```

## Arquitectura

```text
src/
├── components/
├── plugins/
├── router/
├── services/
├── store/
│   └── modules/
├── styles/
├── views/
├── App.vue
└── main.js
```

El estado se divide en tres módulos: `products`, `filters` y `favorites`. `productService.js` concentra la comunicación HTTP, mientras los componentes visuales permanecen desacoplados de la lógica de obtención de datos.

## Consumo de API

`productService.js` consulta categorías tecnológicas reales de DummyJSON (`laptops`, `smartphones`, `tablets` y `mobile-accessories`) mediante Axios. Los resultados se normalizan sobre una estructura TechStore y se combinan con imágenes locales distintas para mantener una presentación consistente. Los periféricos que no están disponibles como categoría específica se completan con datos locales de respaldo. Ante un problema de red, la aplicación continúa operativa e informa al usuario de que el modo local está activo.

## Decisiones técnicas

Se eligió **Vuetify 3** como librería UI por su compatibilidad con Vue 3 y su sistema de temas. Los íconos se renderizan como SVG mediante `@mdi/js`; de esa forma no dependen de fuentes externas y se evita que nombres como `mdi-star` aparezcan como texto. El logo se distribuye en SVG y PNG con fondo transparente.

La migración a Nuxt o Quasar se considera opcional y no se aplicó porque la evaluación puede resolverse de manera completa como SPA con Vue CLI. La estructura actual permite una migración futura sin reorganizar la capa de datos.
