import { mount } from '@vue/test-utils'
import ErrorState from '@/components/ErrorState.vue'

const buttonStub = { template: '<button type="button" @click="$emit(\'click\')"><slot /></button>' }

describe('ErrorState.vue', () => {
  it('muestra una respuesta visual ante un error de API y emite retry', async () => {
    const wrapper = mount(ErrorState, {
      props: { message: 'La API no respondió.' },
      global: { stubs: { VBtn: buttonStub } }
    })

    expect(wrapper.get('[data-cy="error-state"]').text()).toContain('La API no respondió.')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('retry')).toBeTruthy()
  })
})
