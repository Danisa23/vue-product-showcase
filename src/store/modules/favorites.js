const STORAGE_KEY = 'techstore-favorites-v2'

function readFavorites() {
  if (typeof window === 'undefined' || !window.localStorage) return []
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(value) ? value.map(Number).filter(Number.isFinite) : []
  } catch {
    return []
  }
}

function persist(ids) {
  if (typeof window === 'undefined' || !window.localStorage) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export default {
  namespaced: true,
  state: () => ({ ids: readFavorites() }),
  mutations: {
    toggle(state, id) {
      const numericId = Number(id)
      if (!Number.isFinite(numericId)) return
      state.ids = state.ids.includes(numericId)
        ? state.ids.filter((item) => item !== numericId)
        : [...state.ids, numericId]
      persist(state.ids)
    },
    clear(state) {
      state.ids = []
      persist(state.ids)
    }
  },
  getters: {
    ids: (state) => state.ids,
    count: (state) => state.ids.length,
    isFavorite: (state) => (id) => state.ids.includes(Number(id))
  }
}
