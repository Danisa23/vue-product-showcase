<template>
  <div class="loading-grid" aria-label="Cargando productos">
    <v-skeleton-loader v-for="n in 8" :key="n" class="skeleton" type="image, article, actions" />
  </div>
</template>

<style scoped>
.loading-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
.skeleton { min-height: 420px; border: 1px solid var(--tech-border); background: rgba(var(--v-theme-surface), .8); }
@media (max-width: 1180px) { .loading-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 860px) { .loading-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .loading-grid { grid-template-columns: 1fr; } }
</style>
