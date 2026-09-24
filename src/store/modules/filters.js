export default {
  namespaced: true,
  state: () => ({ category: 'all', search: '', sort: 'featured' }),
  mutations: {
    setCategory(state, value) { state.category = value || 'all' },
    setSearch(state, value) { state.search = value || '' },
    setSort(state, value) { state.sort = value || 'featured' },
    reset(state) {
      state.category = 'all'
      state.search = ''
      state.sort = 'featured'
    }
  },
  getters: {
    category: (state) => state.category,
    search: (state) => state.search,
    sort: (state) => state.sort
  }
}
