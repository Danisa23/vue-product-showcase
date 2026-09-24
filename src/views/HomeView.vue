<template>
  <div>
    <HeroBanner />
    <StatsStrip />

    <section id="catalogo" class="page-shell catalog-section">
      <div class="heading-row">
        <div>
          <div class="section-kicker">CATÁLOGO INTERACTIVO</div>
          <h2 class="section-title">Productos destacados</h2>
          <p>{{ resultLabel }}</p>
        </div>
        <ApiStatusBanner :source="source" :warning="warning" />
      </div>

      <CategoryFilter
        :categories="categories"
        :category="category"
        :search="search"
        :sort="sort"
        @update:category="setCategory"
        @update:search="setSearch"
        @update:sort="setSort"
      />

      <div class="product-area">
        <ProductList
          :products="products"
          :loading="loading"
          :error="error"
          @retry="loadProducts"
          @favorite-changed="showFavoriteToast"
        />
      </div>
    </section>

    <section class="page-shell value-banner" aria-label="Beneficios técnicos">
      <div><span class="value-icon"><AppIcon name="truck" :size="23" /></span><span><strong>Experiencia ágil</strong><small>Interfaz optimizada para navegar el catálogo con rapidez.</small></span></div>
      <div><span class="value-icon"><AppIcon name="shield-lock" :size="23" /></span><span><strong>Estado persistente</strong><small>Los favoritos se conservan mediante almacenamiento local.</small></span></div>
      <div><span class="value-icon"><AppIcon name="phone-link" :size="23" /></span><span><strong>Diseño escalable</strong><small>Base preparada para evolucionar hacia móvil o escritorio.</small></span></div>
    </section>

    <v-snackbar v-model="snackbar" location="bottom right" :timeout="2300" color="surface-variant">
      {{ snackbarText }}
      <template #actions><v-btn color="secondary" variant="text" @click="snackbar = false">Cerrar</v-btn></template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeroBanner from '@/components/HeroBanner.vue'
import StatsStrip from '@/components/StatsStrip.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import ProductList from '@/components/ProductList.vue'
import ApiStatusBanner from '@/components/ApiStatusBanner.vue'
import AppIcon from '@/components/AppIcon.vue'

export default {
  name: 'HomeView',
  components: { HeroBanner, StatsStrip, CategoryFilter, ProductList, ApiStatusBanner, AppIcon },
  data: () => ({ snackbar: false, snackbarText: '' }),
  computed: {
    ...mapGetters('products', {
      products: 'filteredProducts',
      categories: 'categories',
      loading: 'loading',
      error: 'error',
      warning: 'warning',
      source: 'source'
    }),
    category() { return this.$store.getters['filters/category'] },
    search() { return this.$store.getters['filters/search'] },
    sort() { return this.$store.getters['filters/sort'] },
    resultLabel() {
      if (this.loading) return 'Consultando productos mediante Axios...'
      const count = this.products.length
      return `${count} producto${count === 1 ? '' : 's'} disponible${count === 1 ? '' : 's'}`
    }
  },
  mounted() {
    if (!this.$store.getters['products/all'].length) this.loadProducts()
  },
  methods: {
    loadProducts() { return this.$store.dispatch('products/loadProducts') },
    setCategory(value) { this.$store.commit('filters/setCategory', value) },
    setSearch(value) { this.$store.commit('filters/setSearch', value) },
    setSort(value) { this.$store.commit('filters/setSort', value) },
    showFavoriteToast(product) {
      const active = this.$store.getters['favorites/isFavorite'](product.id)
      this.snackbarText = active ? `${product.title} se guardó en favoritos.` : `${product.title} se quitó de favoritos.`
      this.snackbar = true
    }
  }
}
</script>

<style scoped>
.catalog-section { padding-top: 78px; }
.heading-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 28px; }
.heading-row h2 { margin: 7px 0 8px; }
.heading-row p { margin: 0; color: var(--tech-muted); }
.product-area { margin-top: 30px; }
.value-banner { margin-top: 72px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 20px; border-radius: 27px; border: 1px solid var(--tech-border); background: linear-gradient(120deg, rgba(var(--v-theme-primary), .08), rgba(var(--v-theme-secondary), .035)); }
.value-banner > div { display: flex; gap: 13px; align-items: flex-start; padding: 12px; }
.value-icon { width: 45px; height: 45px; border-radius: 14px; background: rgba(var(--v-theme-primary), .10); color: rgb(var(--v-theme-secondary)); display: grid; place-items: center; flex: 0 0 auto; }
.value-banner > div > span:last-child { display: flex; flex-direction: column; }
.value-banner strong { font-size: .88rem; }
.value-banner small { color: var(--tech-muted); margin-top: 4px; line-height: 1.45; }
@media (max-width: 850px) { .heading-row { align-items: flex-start; flex-direction: column; } .value-banner { grid-template-columns: 1fr; } }
</style>
