import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'

const product = {
  id: 101,
  title: 'AeroBook Pro 14',
  category: 'laptops',
  categoryLabel: 'Laptops',
  description: 'Laptop de prueba',
  brand: 'AeroTech',
  image: '/images/products/laptop.webp',
  price: 1299,
  rating: 4.8,
  stock: 12
}

const buttonStub = { template: '<button type="button"><slot /></button>' }

function buildStore() {
  return createStore({
    modules: {
      favorites: {
        namespaced: true,
        state: () => ({ ids: [] }),
        getters: { isFavorite: (state) => (id) => state.ids.includes(Number(id)) },
        mutations: {
          toggle(state, id) {
            const numericId = Number(id)
            state.ids = state.ids.includes(numericId) ? [] : [numericId]
          }
        }
      }
    }
  })
}

describe('ProductCard.vue', () => {
  it('renderiza correctamente la información principal del producto', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div />' } },
        { path: '/product/:id', name: 'product-detail', component: { template: '<div />' } }
      ]
    })
    await router.push('/')
    await router.isReady()

    const wrapper = mount(ProductCard, {
      props: { product },
      global: {
        plugins: [buildStore(), router],
        stubs: { VBtn: buttonStub }
      }
    })

    expect(wrapper.get('h3').text()).toBe('AeroBook Pro 14')
    expect(wrapper.text()).toContain('$1299.00')
    expect(wrapper.get('img').attributes('alt')).toBe('AeroBook Pro 14')
    expect(wrapper.text()).toContain('AeroTech')
  })
})
