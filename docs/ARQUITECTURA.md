# Arquitectura de TechStore

La aplicación se organiza en capas para mantener responsabilidades separadas:

```text
App.vue
├── AppHeader.vue
├── router-view
│   ├── HomeView.vue
│   │   ├── HeroBanner.vue
│   │   ├── StatsStrip.vue
│   │   ├── CategoryFilter.vue
│   │   ├── ApiStatusBanner.vue
│   │   └── ProductList.vue
│   │       └── ProductCard.vue × n
│   ├── FavoritesView.vue
│   │   └── ProductList.vue
│   ├── ProductDetailView.vue
│   └── NotFoundView.vue
└── AppFooter.vue
```

## Flujo de datos

1. `HomeView` ejecuta `mounted()` y despacha `products/loadProducts`.
2. El módulo `products` delega la consulta HTTP a `productService.js`.
3. Axios consulta categorías tecnológicas de DummyJSON.
4. Los datos se normalizan y se almacenan en Vuex.
5. `filters` conserva búsqueda, categoría y ordenamiento.
6. `products/filteredProducts` calcula el catálogo visible mediante un getter.
7. `favorites` administra identificadores favoritos y los persiste en `localStorage`.
8. Los componentes visuales consumen getters y emiten acciones sin gestionar la API directamente.

## Manejo de fallos

Las solicitudes de categorías se ejecutan con `Promise.allSettled()`. Si una parte de la API falla, TechStore conserva los productos que sí pudieron sincronizarse y completa el resto con datos locales. Si todas las solicitudes fallan, se carga un catálogo local completo y se informa el modo de respaldo en la interfaz.
