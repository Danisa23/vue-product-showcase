# Matriz de cumplimiento · Vue Product Showcase

| Requisito | Implementación | Evidencia principal |
|---|---|---|
| Vue CLI | Proyecto configurado con `@vue/cli-service` | `package.json`, `vue.config.js` |
| Componentes reutilizables | Header, Footer, Hero, filtros, estados, ProductCard y ProductList | `src/components/` |
| Ciclo de vida | Carga inicial mediante `mounted()` | `src/views/HomeView.vue` |
| API REST + Axios | Consulta a DummyJSON con normalización y respaldo local | `src/services/productService.js` |
| Loading / error / empty | Estados visuales separados | `LoadingState.vue`, `ErrorState.vue`, `EmptyState.vue` |
| Filtro por categoría | Estado centralizado y getter de productos filtrados | `filters.js`, `products.js`, `CategoryFilter.vue` |
| Vuex modular | Módulos products, filters y favorites | `src/store/modules/` |
| Getters | Filtrado, favoritos, categorías y estados | módulos Vuex |
| Pruebas unitarias | ProductCard y estado de error | `tests/unit/` |
| Prueba E2E | Filtrado por categoría + búsqueda | `cypress/e2e/filter-products.cy.js` |
| Librería UI | Vuetify 3 | `src/plugins/vuetify.js` y componentes `v-btn`, `v-snackbar`, `v-skeleton-loader` |
| Responsive | Grid, hero, navegación y detalle adaptables | estilos scoped + `main.css` |
| Tema claro/oscuro | `techDark` / `techLight` con persistencia | Vuetify + `AppHeader.vue` |
| Favoritos | Vuex + localStorage | `favorites.js` |
| SPA y detalle | Vue Router con rutas dinámicas | `src/router/index.js` |
| Documentación | README, matriz y plan de evidencias | `/docs` |
