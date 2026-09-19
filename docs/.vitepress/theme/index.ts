/// <reference types="vitepress/client" />

import { inject, pageview } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
import { h } from 'vue'
import { inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import WalineComment from './components/WalineComment.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    if (!inBrowser) return

    inject({ disableAutoTrack: true })
    const speedInsights = injectSpeedInsights()

    const reportRoute = (route: string) => {
      pageview({ route, path: route })
      speedInsights?.setRoute(route)
    }

    reportRoute(router.route.path)
    const previousOnAfterRouteChange = router.onAfterRouteChange
    router.onAfterRouteChange = async (to) => {
      await previousOnAfterRouteChange?.(to)
      reportRoute(to)
    }
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(WalineComment),
    })
  },
}
