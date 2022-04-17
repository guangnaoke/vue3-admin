import { defineStore } from 'pinia'
import defaultSettings from '@/settings'
import { getLocalLanguage } from '@/utils/auth'

const { showSettings, fixedHeader, sidebarLogo, localLanguage } =
  defaultSettings

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      showSettings,
      fixedHeader,
      sidebarLogo,
      localLanguage: getLocalLanguage() || localLanguage
    }
  },
  actions: {
    changeSetting(key, value) {
      const hasKeyProperty = Object.prototype.hasOwnProperty.call(
        this.$state,
        key
      )
      if (hasKeyProperty) {
        this.$state[key] = value
      }
    }
  }
})
