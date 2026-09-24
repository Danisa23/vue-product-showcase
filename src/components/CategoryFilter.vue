<template>
  <section class="filter-panel" aria-label="Filtros del catálogo">
    <div class="filter-toolbar">
      <label class="search-field">
        <span class="sr-only">Buscar productos</span>
        <AppIcon name="search" :size="20" />
        <input
          :value="search"
          type="search"
          autocomplete="off"
          placeholder="Buscar por producto, marca o categoría..."
          data-cy="search-input"
          @input="$emit('update:search', $event.target.value)"
        />
      </label>

      <label class="sort-field">
        <span class="sr-only">Ordenar catálogo</span>
        <AppIcon name="sort" :size="19" />
        <select :value="sort" data-cy="sort-select" @change="$emit('update:sort', $event.target.value)">
          <option value="featured">Destacados</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="rating-desc">Mejor puntuación</option>
          <option value="title-asc">Nombre A–Z</option>
        </select>
        <AppIcon name="chevron-down" :size="18" />
      </label>
    </div>

    <div class="category-grid" data-cy="category-list">
      <button
        v-for="item in categoryItems"
        :key="item.value"
        class="category-button"
        :class="{ active: category === item.value }"
        type="button"
        :data-cy="`category-${item.value}`"
        @click="$emit('update:category', item.value)"
      >
        <span class="category-icon"><AppIcon :name="item.icon" :size="23" /></span>
        <span class="category-copy"><strong>{{ item.label }}</strong><small>{{ item.caption }}</small></span>
        <AppIcon name="chevron-right" :size="18" class="category-arrow" />
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  categories: { type: Array, default: () => [] },
  category: { type: String, default: 'all' },
  search: { type: String, default: '' },
  sort: { type: String, default: 'featured' }
})

defineEmits(['update:category', 'update:search', 'update:sort'])

const catalog = {
  laptops: { label: 'Laptops', caption: 'Productividad', icon: 'laptop' },
  audio: { label: 'Audio', caption: 'Sonido personal', icon: 'headphones' },
  smartphones: { label: 'Smartphones', caption: 'Movilidad', icon: 'phone' },
  wearables: { label: 'Wearables', caption: 'Conectividad', icon: 'watch' },
  peripherals: { label: 'Periféricos', caption: 'Escritorio', icon: 'keyboard' },
  tablets: { label: 'Tablets', caption: 'Versatilidad', icon: 'tablet' },
  cameras: { label: 'Cámaras', caption: 'Videollamadas', icon: 'camera' }
}

const categoryItems = computed(() => [
  { value: 'all', label: 'Todo', caption: 'Catálogo completo', icon: 'grid' },
  ...props.categories.map((value) => ({
    value,
    ...(catalog[value] || { label: value, caption: 'Categoría', icon: 'package' })
  }))
])
</script>

<style scoped>
.filter-panel { display: grid; gap: 17px; }
.filter-toolbar { display: grid; grid-template-columns: minmax(260px, 1fr) 270px; gap: 13px; }
.search-field, .sort-field { min-height: 52px; border: 1px solid var(--tech-border); border-radius: 17px; background: rgba(var(--v-theme-surface-variant), .74); display: flex; align-items: center; gap: 11px; padding: 0 16px; color: var(--tech-muted); transition: border-color .2s ease, box-shadow .2s ease; }
.search-field:focus-within, .sort-field:focus-within { border-color: rgba(var(--v-theme-primary), .65); box-shadow: 0 0 0 3px rgba(var(--v-theme-primary), .10); }
.search-field input, .sort-field select { width: 100%; min-width: 0; background: transparent; border: 0; outline: 0; color: rgb(var(--v-theme-on-surface)); font: inherit; font-size: .9rem; }
.search-field input::placeholder { color: var(--tech-muted); opacity: .86; }
.sort-field select { appearance: none; cursor: pointer; }
.sort-field option { background: rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-on-surface)); }
.category-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 11px; }
.category-button { min-height: 82px; border: 1px solid var(--tech-border); border-radius: 19px; background: rgba(var(--v-theme-surface-variant), .66); color: rgb(var(--v-theme-on-surface)); display: grid; grid-template-columns: 42px 1fr 18px; align-items: center; gap: 10px; text-align: left; padding: 13px; cursor: pointer; transition: .2s ease; }
.category-button:hover { border-color: rgba(var(--v-theme-primary), .42); transform: translateY(-1px); }
.category-button.active { border-color: rgba(var(--v-theme-primary), .82); background: linear-gradient(135deg, rgba(var(--v-theme-primary), .17), rgba(var(--v-theme-surface-variant), .82)); box-shadow: inset 0 0 0 1px rgba(var(--v-theme-primary), .09); }
.category-icon { width: 42px; height: 42px; border-radius: 14px; display: grid; place-items: center; color: rgb(var(--v-theme-secondary)); background: rgba(var(--v-theme-primary), .09); }
.category-copy { min-width: 0; display: flex; flex-direction: column; }
.category-copy strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: .82rem; }
.category-copy small { margin-top: 3px; color: var(--tech-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: .69rem; }
.category-arrow { color: var(--tech-muted); justify-self: end; }
@media (max-width: 980px) { .category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 700px) { .filter-toolbar { grid-template-columns: 1fr; } }
@media (max-width: 520px) { .category-grid { grid-template-columns: 1fr; } }
</style>
