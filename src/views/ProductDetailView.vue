<template>
  <main class="page-shell detail-page">
    <button class="back-button" type="button" @click="$router.back()"><AppIcon name="arrow-left" :size="19" /> Volver</button>

    <LoadingState v-if="loading && !product" />
    <ErrorState v-else-if="error" :message="error" @retry="load" />
    <section v-else-if="product" class="detail-card">
      <div class="detail-image">
        <img :src="product.image" :alt="product.title" />
        <div class="source-label"><AppIcon name="api" :size="18" /> {{ product.source === 'api' ? 'Datos sincronizados desde API REST' : 'Catálogo local de respaldo' }}</div>
      </div>

      <div class="detail-copy">
        <span class="detail-category">{{ product.categoryLabel }}</span>
        <h1>{{ product.title }}</h1>
        <p class="description">{{ product.description }}</p>
        <div class="rating-line"><AppIcon name="star" :size="19" /><strong>{{ product.rating.toFixed(1) }}</strong><span>· {{ product.stock }} unidades disponibles</span></div>

        <div class="detail-facts">
          <div><AppIcon name="domain" :size="21" /><span>Marca</span><strong>{{ product.brand }}</strong></div>
          <div><AppIcon name="shape" :size="21" /><span>Categoría</span><strong>{{ product.categoryLabel }}</strong></div>
          <div><AppIcon name="cloud" :size="21" /><span>Origen</span><strong>{{ product.source === 'api' ? 'API REST' : 'Respaldo local' }}</strong></div>
        </div>

        <div class="api-note" v-if="product.apiReference">
          Referencia recibida de la API: <strong>{{ product.apiReference }}</strong>. TechStore normaliza el contenido para mantener un catálogo visual consistente.
        </div>

        <div class="detail-actions">
          <div class="detail-price"><small>Precio</small><strong>${{ product.price.toFixed(2) }}</strong></div>
          <v-btn color="primary" size="large" @click="toggleFavorite">
            <AppIcon :name="favorite ? 'heart' : 'heart-outline'" :size="19" />
            {{ favorite ? 'Quitar de favoritos' : 'Guardar favorito' }}
          </v-btn>
        </div>
      </div>
    </section>

    <section v-else-if="!loading" class="missing-product">
      <AppIcon name="package-closed" :size="42" />
      <h2>Producto no encontrado</h2>
      <v-btn color="primary" to="/">Volver al catálogo</v-btn>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import AppIcon from '@/components/AppIcon.vue'
import LoadingState from '@/components/LoadingState.vue'
import ErrorState from '@/components/ErrorState.vue'

const route = useRoute()
const store = useStore()
const product = computed(() => store.getters['products/selected'])
const loading = computed(() => store.getters['products/loading'])
const error = computed(() => store.getters['products/error'])
const favorite = computed(() => product.value ? store.getters['favorites/isFavorite'](product.value.id) : false)

async function load() { await store.dispatch('products/loadProduct', route.params.id) }
function toggleFavorite() { if (product.value) store.commit('favorites/toggle', product.value.id) }
onMounted(load)
watch(() => route.params.id, load)
</script>

<style scoped>
.detail-page { padding-top: 46px; padding-bottom: 34px; }
.back-button { border: 0; background: transparent; color: var(--tech-muted); font: inherit; font-weight: 800; display: inline-flex; align-items: center; gap: 8px; padding: 10px 0; cursor: pointer; }
.back-button:hover { color: rgb(var(--v-theme-secondary)); }
.detail-card { margin-top: 18px; display: grid; grid-template-columns: minmax(0, 1.02fr) minmax(0, .98fr); border-radius: 31px; border: 1px solid var(--tech-border); overflow: hidden; background: rgba(var(--v-theme-surface), .95); }
.detail-image { position: relative; min-height: 590px; background: #eef2f7; display: grid; place-items: center; }
.detail-image > img { width: 100%; height: 100%; min-height: 590px; object-fit: cover; }
.source-label { position: absolute; left: 20px; bottom: 20px; padding: 10px 13px; border-radius: 14px; display: flex; align-items: center; gap: 8px; background: rgba(5, 12, 21, .84); color: #e7f6ff; border: 1px solid rgba(255,255,255,.16); font-size: .73rem; font-weight: 800; backdrop-filter: blur(12px); }
.detail-copy { padding: 56px; display: flex; flex-direction: column; justify-content: center; }
.detail-category { align-self: flex-start; border-radius: 999px; padding: 7px 10px; background: rgba(var(--v-theme-primary), .11); color: rgb(var(--v-theme-secondary)); font-size: .72rem; font-weight: 900; }
.detail-copy h1 { margin: 17px 0 14px; font-size: clamp(2.3rem, 4vw, 4.25rem); line-height: 1; letter-spacing: -.045em; }
.description { color: var(--tech-muted); line-height: 1.75; margin: 0; }
.rating-line { display: flex; align-items: center; gap: 7px; margin-top: 18px; color: var(--tech-muted); }
.rating-line .app-icon { color: rgb(var(--v-theme-warning)); } .rating-line strong { color: rgb(var(--v-theme-on-surface)); }
.detail-facts { margin-top: 28px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.detail-facts > div { min-height: 110px; border-radius: 18px; border: 1px solid var(--tech-border); background: rgba(var(--v-theme-surface-variant), .55); padding: 14px; display: flex; flex-direction: column; gap: 4px; }
.detail-facts .app-icon { color: rgb(var(--v-theme-secondary)); margin-bottom: 5px; }
.detail-facts span { color: var(--tech-muted); font-size: .68rem; } .detail-facts strong { font-size: .82rem; }
.api-note { margin-top: 18px; border-radius: 16px; padding: 13px 15px; background: rgba(var(--v-theme-primary), .065); color: var(--tech-muted); font-size: .76rem; line-height: 1.55; }
.detail-actions { margin-top: 30px; padding-top: 25px; border-top: 1px solid var(--tech-border); display: flex; justify-content: space-between; align-items: end; gap: 18px; }
.detail-price { display: flex; flex-direction: column; } .detail-price small { color: var(--tech-muted); } .detail-price strong { margin-top: 3px; font-size: 2rem; color: rgb(var(--v-theme-secondary)); }
.detail-actions .v-btn :deep(.v-btn__content) { display: flex; align-items: center; gap: 8px; font-weight: 800; }
.missing-product { min-height: 420px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 14px; color: var(--tech-muted); }
@media (max-width: 960px) { .detail-card { grid-template-columns: 1fr; } .detail-image, .detail-image > img { min-height: 420px; } .detail-copy { padding: 38px; } }
@media (max-width: 620px) { .detail-copy { padding: 28px 22px; } .detail-facts { grid-template-columns: 1fr; } .detail-actions { align-items: stretch; flex-direction: column; } .detail-actions .v-btn { width: 100%; } .detail-image, .detail-image > img { min-height: 310px; } }
</style>
