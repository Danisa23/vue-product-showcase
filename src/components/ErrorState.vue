<template>
  <section class="state-card error-state" role="alert" data-cy="error-state">
    <div class="state-icon"><AppIcon name="cloud" :size="36" /></div>
    <h3>No pudimos cargar el catálogo</h3>
    <p>{{ message || 'Ocurrió un error inesperado al consultar la API.' }}</p>
    <v-btn color="error" variant="tonal" @click="$emit('retry')">
      <AppIcon name="refresh" :size="18" /> Reintentar
    </v-btn>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
defineProps({ message: { type: String, default: '' } })
defineEmits(['retry'])
</script>

<style scoped>
.state-card { min-height: 290px; border-radius: 25px; border: 1px solid var(--tech-border); background: rgba(var(--v-theme-surface-variant), .65); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 36px; }
.state-icon { width: 70px; height: 70px; border-radius: 22px; display: grid; place-items: center; margin-bottom: 16px; color: rgb(var(--v-theme-error)); background: rgba(var(--v-theme-error), .10); }
h3 { margin: 0; font-size: 1.2rem; } p { max-width: 560px; color: var(--tech-muted); line-height: 1.6; margin: 9px 0 20px; }
.v-btn :deep(.v-btn__content) { display: flex; align-items: center; gap: 8px; }
</style>
