<template>
  <div>
    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="$emit('retry')" />
    <EmptyState v-else-if="!products.length" />
    <div v-else class="product-grid" data-cy="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @favorite-changed="$emit('favorite-changed', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import LoadingState from './LoadingState.vue'
import ErrorState from './ErrorState.vue'
import EmptyState from './EmptyState.vue'

defineProps({
  products: { type: Array, default: () => [] },
  loading: Boolean,
  error: { type: String, default: null }
})
defineEmits(['retry', 'favorite-changed'])
</script>

<style scoped>
.product-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
@media (max-width: 1180px) { .product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 860px) { .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 560px) { .product-grid { grid-template-columns: 1fr; } }
</style>
