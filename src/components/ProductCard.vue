<template>
  <article class="product-card" data-cy="product-card">
    <div class="image-wrap">
      <button class="image-button" type="button" :aria-label="`Ver detalle de ${product.title}`" @click="openProduct">
        <img :src="product.image" :alt="product.title" loading="lazy" />
        <span class="image-overlay"></span>
        <span v-if="product.stock <= 10" class="stock-badge">Últimas {{ product.stock }}</span>
      </button>
      <button class="favorite-button" :class="{ active: favorite }" type="button" :aria-label="favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'" @click="toggleFavorite">
        <AppIcon :name="favorite ? 'heart' : 'heart-outline'" :size="21" />
      </button>
    </div>

    <div class="card-body">
      <div class="card-meta">
        <span class="category-pill">{{ product.categoryLabel }}</span>
        <span class="rating"><AppIcon name="star" :size="16" /> {{ product.rating.toFixed(1) }}</span>
      </div>

      <h3>{{ product.title }}</h3>
      <p>{{ product.description }}</p>

      <div class="brand-line"><AppIcon name="verified" :size="17" /> {{ product.brand }}</div>

      <div class="card-bottom">
        <div class="price"><small>Precio</small><strong>${{ product.price.toFixed(2) }}</strong></div>
        <v-btn color="primary" variant="flat" class="detail-btn" @click="openProduct">
          Ver detalle <AppIcon name="arrow-right" :size="17" />
        </v-btn>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppIcon from './AppIcon.vue'

const props = defineProps({ product: { type: Object, required: true } })
const emit = defineEmits(['favorite-changed'])
const router = useRouter()
const store = useStore()

const favorite = computed(() => store.getters['favorites/isFavorite'](props.product.id))
function openProduct() { router.push({ name: 'product-detail', params: { id: props.product.id } }) }
function toggleFavorite() {
  store.commit('favorites/toggle', props.product.id)
  emit('favorite-changed', props.product)
}
</script>

<style scoped>
.product-card { height: 100%; overflow: hidden; border-radius: 25px; background: linear-gradient(150deg, rgba(var(--v-theme-surface-variant), .88), rgba(var(--v-theme-surface), .98)); border: 1px solid var(--tech-border); display: flex; flex-direction: column; transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease; }
.product-card:hover { transform: translateY(-5px); border-color: rgba(var(--v-theme-primary), .40); box-shadow: 0 24px 55px rgba(0, 0, 0, .22); }
.image-wrap { position: relative; overflow: hidden; background: #e9eef5; }
.image-button { width: 100%; padding: 0; border: 0; display: block; position: relative; background: transparent; cursor: pointer; }
.image-button img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; transition: transform .28s ease; }
.product-card:hover .image-button img { transform: scale(1.025); }
.image-overlay { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, transparent 62%, rgba(3, 10, 18, .10)); }
.stock-badge { position: absolute; top: 14px; left: 14px; border-radius: 999px; padding: 7px 10px; background: rgba(5, 11, 20, .84); border: 1px solid rgba(255, 201, 106, .30); color: #ffd585; font-size: .69rem; font-weight: 900; }
.favorite-button { position: absolute; right: 14px; top: 14px; width: 43px; height: 43px; border-radius: 14px; border: 1px solid rgba(255, 255, 255, .20); background: rgba(7, 15, 27, .78); color: white; display: grid; place-items: center; cursor: pointer; backdrop-filter: blur(12px); }
.favorite-button:hover, .favorite-button.active { color: #ff8392; transform: translateY(-1px); }
.favorite-button.active { background: rgba(65, 14, 28, .82); border-color: rgba(255, 131, 146, .30); }
.card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; min-height: 300px; }
.card-meta { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.category-pill { border-radius: 999px; padding: 6px 10px; background: rgba(var(--v-theme-primary), .12); color: rgb(var(--v-theme-secondary)); font-size: .7rem; font-weight: 900; }
.rating { display: inline-flex; align-items: center; gap: 5px; color: var(--tech-muted); font-size: .78rem; }
.rating .app-icon { color: rgb(var(--v-theme-warning)); }
h3 { margin: 14px 0 8px; font-size: 1.13rem; line-height: 1.28; letter-spacing: -.018em; }
p { margin: 0; color: var(--tech-muted); font-size: .87rem; line-height: 1.62; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.brand-line { margin-top: 14px; color: var(--tech-muted); display: flex; align-items: center; gap: 7px; font-size: .77rem; }
.brand-line .app-icon { color: rgb(var(--v-theme-success)); }
.card-bottom { margin-top: auto; padding-top: 22px; display: flex; align-items: end; justify-content: space-between; gap: 12px; }
.price { display: flex; flex-direction: column; }
.price small { color: var(--tech-muted); font-size: .68rem; }
.price strong { margin-top: 3px; color: rgb(var(--v-theme-secondary)); font-size: 1.35rem; line-height: 1.1; }
.detail-btn :deep(.v-btn__content) { display: flex; align-items: center; gap: 8px; font-weight: 800; }
@media (max-width: 500px) { .card-bottom { align-items: stretch; flex-direction: column; } .detail-btn { width: 100%; } }
</style>
