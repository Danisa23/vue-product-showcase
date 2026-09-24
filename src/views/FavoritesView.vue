<template>
  <main class="page-shell favorites-page">
    <div class="page-heading">
      <div>
        <div class="section-kicker">TU SELECCIÓN</div>
        <h1 class="section-title">Productos favoritos</h1>
        <p>Los productos guardados permanecen disponibles entre sesiones.</p>
      </div>
      <div class="favorite-summary"><AppIcon name="heart" :size="22" /><strong>{{ favorites.length }}</strong><span>guardados</span></div>
    </div>

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="load" />
    <section v-else-if="!favorites.length" class="empty-favorites">
      <div class="empty-heart"><AppIcon name="heart-outline" :size="40" /></div>
      <h2>Aún no tienes favoritos</h2>
      <p>Marca el corazón de cualquier producto para construir tu selección.</p>
      <v-btn color="primary" to="/">Explorar catálogo</v-btn>
    </section>
    <div v-else>
      <ProductList :products="favorites" :loading="false" :error="null" @favorite-changed="onFavoriteChanged" />
      <div class="clear-row"><v-btn variant="tonal" color="error" @click="clearFavorites">Limpiar favoritos</v-btn></div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ProductList from '@/components/ProductList.vue'
import LoadingState from '@/components/LoadingState.vue'
import ErrorState from '@/components/ErrorState.vue'
import AppIcon from '@/components/AppIcon.vue'

const store = useStore()
const loading = computed(() => store.getters['products/loading'])
const error = computed(() => store.getters['products/error'])
const favorites = computed(() => {
  const ids = store.getters['favorites/ids']
  return store.getters['products/all'].filter((item) => ids.includes(item.id))
})

async function load() {
  if (!store.getters['products/all'].length) await store.dispatch('products/loadProducts')
}
function clearFavorites() { store.commit('favorites/clear') }
function onFavoriteChanged() { /* computed actualiza la lista automáticamente */ }
onMounted(load)
</script>

<style scoped>
.favorites-page { padding-top: 68px; padding-bottom: 40px; }
.page-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 30px; }
.page-heading h1 { margin: 7px 0 7px; }
.page-heading p { margin: 0; color: var(--tech-muted); }
.favorite-summary { display: flex; align-items: center; gap: 8px; border-radius: 15px; padding: 11px 14px; border: 1px solid var(--tech-border); background: rgba(var(--v-theme-surface-variant), .65); color: rgb(var(--v-theme-error)); }
.favorite-summary strong { font-size: 1.1rem; } .favorite-summary span { color: var(--tech-muted); font-size: .78rem; }
.empty-favorites { min-height: 390px; border-radius: 28px; border: 1px solid var(--tech-border); background: rgba(var(--v-theme-surface-variant), .62); display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center; padding: 36px; }
.empty-heart { width: 76px; height: 76px; display: grid; place-items: center; border-radius: 24px; background: rgba(var(--v-theme-error), .10); color: rgb(var(--v-theme-error)); }
.empty-favorites h2 { margin: 17px 0 7px; } .empty-favorites p { margin: 0 0 20px; color: var(--tech-muted); }
.clear-row { margin-top: 24px; display: flex; justify-content: flex-end; }
@media (max-width: 680px) { .page-heading { align-items: flex-start; flex-direction: column; } }
</style>
