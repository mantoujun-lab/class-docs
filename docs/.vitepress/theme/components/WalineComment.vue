<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, ref } from 'vue'
import { useRoute } from 'vitepress'
import { init } from '@waline/client/full'
import type { WalineInstance } from '@waline/client/full'
import '@waline/client/waline.css'

const route = useRoute()

const SERVER_URL = 'https://waline.mantoujun-lab.com'

const walineEl = ref<HTMLElement | null>(null)
let walineInstance: WalineInstance | null = null

function mount() {
  walineInstance?.destroy()
  walineInstance = null
  if (!walineEl.value) return
  try {
    walineInstance = init({
      el: walineEl.value,
      serverURL: SERVER_URL,
      path: route.path,
      dark: 'html.dark',
      lang: 'zh-CN',
      reaction: true,
      pageview: true,
      comment: true,
      requiredMeta: ['nick'],
      emoji: [
        'https://unpkg.com/@waline/emojis@1.2.0/tw-emoji',
      ],
    })
  } catch (err) {
    // el 没找到 / serverURL 无效时不会阻塞页面
    console.error('[waline] init failed:', err)
  }
}

onMounted(mount)
watch(() => route.path, mount)
onBeforeUnmount(() => walineInstance?.destroy())
</script>

<template>
  <div class="waline-wrapper">
    <div ref="walineEl" class="waline-comment" />
  </div>
</template>

<style>
.waline-wrapper {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.waline-wrapper .waline-comment {
  min-height: 80px;
}
</style>