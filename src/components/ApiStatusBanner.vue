<template>
  <div v-if="source" class="api-banner" :class="source" role="status">
    <span class="status-dot"></span>
    <div>
      <strong>{{ statusTitle }}</strong>
      <small v-if="source === 'api'">El catálogo usa datos sincronizados mediante Axios.</small>
      <small v-else>{{ warning }}</small>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  source: { type: String, default: null },
  warning: { type: String, default: null }
})
const statusTitle = computed(() => {
  if (props.source === 'api') return 'API REST conectada'
  if (props.source === 'hybrid') return 'Catálogo híbrido sincronizado'
  return 'Modo de respaldo activo'
})
</script>

<style scoped>
.api-banner { display: inline-flex; align-items: center; gap: 10px; padding: 10px 13px; border-radius: 14px; border: 1px solid var(--tech-border); background: rgba(var(--v-theme-surface-variant), .62); max-width: 560px; }
.status-dot { width: 9px; height: 9px; border-radius: 50%; flex: 0 0 auto; }
.api-banner.api .status-dot, .api-banner.hybrid .status-dot { background: rgb(var(--v-theme-success)); box-shadow: 0 0 0 5px rgba(var(--v-theme-success), .10); }
.api-banner.fallback .status-dot { background: rgb(var(--v-theme-warning)); box-shadow: 0 0 0 5px rgba(var(--v-theme-warning), .10); }
.api-banner div { display: flex; flex-direction: column; min-width: 0; }
.api-banner strong { font-size: .76rem; }
.api-banner small { color: var(--tech-muted); margin-top: 2px; line-height: 1.4; font-size: .7rem; }
</style>
