import { fetchProducts } from '@/services/productService'

export default {
  namespaced: true,
  state: () => ({
    items: [],
    loading: false,
    error: null,
    warning: null,
    source: null,
    selected: null
  }),
  mutations: {
    setLoading(state, value) { state.loading = Boolean(value) },
    setItems(state, items) { state.items = Array.isArray(items) ? items : [] },
    setError(state, value) { state.error = value || null },
    setWarning(state, value) { state.warning = value || null },
    setSource(state, value) { state.source = value || null },
    setSelected(state, value) { state.selected = value || null }
  },
  actions: {
    async loadProducts({ commit }) {
      commit('setLoading', true)
      commit('setError', null)
      commit('setWarning', null)
      try {
        const result = await fetchProducts()
        commit('setItems', result.items)
        commit('setSource', result.source)
        commit('setWarning', result.warning)
        return result.items
      } catch (error) {
        commit('setItems', [])
        commit('setSource', null)
        commit('setError', error?.message || 'No se pudieron cargar los productos.')
        return []
      } finally {
        commit('setLoading', false)
      }
    },
    async loadProduct({ state, dispatch, commit }, id) {
      const numericId = Number(id)
      commit('setError', null)
      commit('setSelected', null)
      if (!Number.isFinite(numericId)) return null

      let product = state.items.find((item) => item.id === numericId)
      if (!product) {
        await dispatch('loadProducts')
        product = state.items.find((item) => item.id === numericId)
      }
      commit('setSelected', product || null)
      return product || null
    }
  },
  getters: {
    all: (state) => state.items,
    loading: (state) => state.loading,
    error: (state) => state.error,
    warning: (state) => state.warning,
    source: (state) => state.source,
    selected: (state) => state.selected,
    categories: (state) => [...new Set(state.items.map((item) => item.category))],
    filteredProducts: (state, _getters, rootState) => {
      const category = rootState.filters.category
      const term = rootState.filters.search.trim().toLowerCase()
      const sort = rootState.filters.sort || 'featured'

      const filtered = state.items.filter((product) => {
        const categoryMatch = category === 'all' || product.category === category
        const searchMatch = !term || [product.title, product.description, product.brand, product.categoryLabel]
          .some((value) => String(value || '').toLowerCase().includes(term))
        return categoryMatch && searchMatch
      })

      if (sort === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price)
      if (sort === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price)
      if (sort === 'rating-desc') return [...filtered].sort((a, b) => b.rating - a.rating)
      if (sort === 'title-asc') return [...filtered].sort((a, b) => a.title.localeCompare(b.title, 'es'))
      return filtered
    }
  }
}
