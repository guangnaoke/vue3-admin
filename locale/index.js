import { createI18n } from 'vue-i18n'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import { getLocalLanguage, setLocalLanguage } from '@/utils/auth'
import settings from '@/settings'
import zhCN from './zh-CN'
import en from './en'

const messages = {
  'zh-CN': {
    ...zhCN,
    ...elementZhLocale
  },
  en: {
    ...en,
    ...elementEnLocale
  }
}

const localeLanguage = () => {
  if (!getLocalLanguage()) {
    setLocalLanguage(settings.localLanguage)
    return settings.localLanguage
  }
  return getLocalLanguage()
}

const i18n = createI18n({
  locale: localeLanguage(),
  messages
})

export default i18n
