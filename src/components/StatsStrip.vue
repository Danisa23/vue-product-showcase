<template>
  <section class="page-shell stats-strip" aria-label="Características técnicas">
    <article v-for="item in items" :key="item.title" class="stat-card">
      <div class="icon-wrap"><AppIcon :name="item.icon" :size="22" /></div>
      <div><strong>{{ item.title }}</strong><small>{{ item.subtitle }}</small></div>
    </article>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
const items = [
  { icon: 'cloud-sync', title: 'API REST', subtitle: 'Datos dinámicos con Axios' },
  { icon: 'database', title: 'Vuex modular', subtitle: 'Estado global centralizado' },
  { icon: 'test', title: 'Pruebas', subtitle: 'Jest + Cypress' },
  { icon: 'responsive', title: 'Responsive', subtitle: 'Diseño adaptable' }
]
</script>

<style scoped>
.stats-strip { margin-top: 18px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 13px; }
.stat-card { min-height: 88px; display: flex; align-items: center; gap: 14px; padding: 18px; border-radius: 21px; border: 1px solid var(--tech-border); background: linear-gradient(145deg, rgba(var(--v-theme-surface-variant), .82), rgba(var(--v-theme-surface), .96)); }
.icon-wrap { width: 45px; height: 45px; border-radius: 15px; display: grid; place-items: center; background: rgba(var(--v-theme-primary), .10); color: rgb(var(--v-theme-secondary)); flex: 0 0 auto; }
.stat-card div:last-child { display: flex; flex-direction: column; min-width: 0; }
.stat-card strong { font-size: .88rem; }
.stat-card small { margin-top: 4px; color: var(--tech-muted); line-height: 1.35; }
@media (max-width: 900px) { .stats-strip { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .stats-strip { grid-template-columns: 1fr; } }
</style>
