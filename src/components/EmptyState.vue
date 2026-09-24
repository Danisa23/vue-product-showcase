<template>
  <section class="state-card" data-cy="empty-state">
    <div class="state-icon"><AppIcon name="package-closed" :size="38" /></div>
    <h3>Sin resultados</h3>
    <p>Prueba otra búsqueda o selecciona una categoría diferente.</p>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
</script>

<style scoped>
.state-card { min-height: 290px; border-radius: 25px; border: 1px solid var(--tech-border); background: rgba(var(--v-theme-surface-variant), .65); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 36px; }
.state-icon { width: 70px; height: 70px; border-radius: 22px; display: grid; place-items: center; margin-bottom: 16px; color: rgb(var(--v-theme-secondary)); background: rgba(var(--v-theme-primary), .10); }
h3 { margin: 0; font-size: 1.2rem; } p { color: var(--tech-muted); margin: 9px 0 0; }
</style>
