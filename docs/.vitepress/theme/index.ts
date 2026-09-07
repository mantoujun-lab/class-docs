/// <reference types="vitepress/client" />

import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import WalineComment from './components/WalineComment.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-bottom': () => h(WalineComment),
    })
  },
}
