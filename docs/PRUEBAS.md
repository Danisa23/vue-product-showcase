# Pruebas incluidas

## Unitarias

### ProductCard.spec.js
Valida que `ProductCard` represente título, precio, imagen alternativa y marca del producto recibido mediante `props`.

### ErrorState.spec.js
Valida la respuesta visual ante un error de API y comprueba que el botón de reintento emita el evento `retry`.

Ejecutar:

```bash
npm run test:unit
```

## End-to-end

### filter-products.cy.js
Cypress intercepta las categorías de la API con datos controlados, carga el catálogo, selecciona `Periféricos`, verifica dos resultados, escribe `mouse` y confirma que quede visible un único producto.

Ejecutar con la aplicación activa:

```bash
npm run serve
npm run test:e2e
```
