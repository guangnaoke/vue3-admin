import { shallowMount } from '@vue/test-utils'
import SvgIcon from '@/components/SvgIcon/index.vue'

describe('SvgIcon.vue', () => {
  it('iconClass', () => {
    const wrapper = shallowMount(SvgIcon, {
      props: {
        prefix: 'icon',
        name: 'test'
      }
    })
    expect(wrapper.find('use').attributes().href).toBe('#icon-test')
  })
})
