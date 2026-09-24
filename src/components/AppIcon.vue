<template>
  <svg
    class="app-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-for="(segment, index) in segments"
      :key="index"
      :d="segment"
      :fill="filled ? 'currentColor' : 'none'"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 }
})

const iconMap = {
  api: ['M7 8h10', 'M7 12h10', 'M7 16h7', 'M4 5h16v14H4z'],
  'arrow-left': ['M19 12H5', 'M11 6l-6 6 6 6'],
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
  camera: ['M4 8h4l2-2h4l2 2h4v10H4z', 'M9 13a3 3 0 1 0 6 0 3 3 0 0 0-6 0z'],
  verified: ['M12 3l2 2.1 2.9-.2.8 2.8 2.6 1.3-.3 2.9L20 16l-1.3 2.6-2.9-.3L12 21l-2.1-2.7-2.9.3L5.7 16 3 14.7l.3-2.9L4 9l2.8-.8L8 5.1l2.9.2z', 'M8.5 12l2.1 2.1L15.8 9'],
  'chevron-down': ['M6 9l6 6 6-6'],
  'chevron-right': ['M9 6l6 6-6 6'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  cloud: ['M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4 1.5A3.5 3.5 0 0 0 7 18z', 'M9 13l2 2 4-4'],
  'cloud-sync': ['M7 18h9a4 4 0 0 0 1-7.9A6 6 0 0 0 6 11.5 3.5 3.5 0 0 0 7 18z', 'M9 13h5l-2-2', 'M14 15H9l2 2'],
  database: ['M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3z', 'M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6', 'M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6'],
  domain: ['M4 21V7l5-3v17', 'M9 21V10l5-3v14', 'M14 21V12l6-2v11', 'M2 21h20'],
  headphones: ['M4 14v-2a8 8 0 0 1 16 0v2', 'M4 14h3v6H5a1 1 0 0 1-1-1z', 'M20 14h-3v6h2a1 1 0 0 0 1-1z'],
  heart: ['M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.4-7 10-7 10z'],
  'heart-outline': ['M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.4-7 10-7 10z'],
  keyboard: ['M3 7h18v10H3z', 'M6 10h1', 'M9 10h1', 'M12 10h1', 'M15 10h1', 'M18 10h1', 'M6 13h1', 'M9 13h1', 'M12 13h1', 'M15 13h3'],
  laptop: ['M4 5h16v11H4z', 'M2 19h20', 'M8 19h8'],
  lightning: ['M13 2L5 13h6l-1 9 8-12h-6z'],
  search: ['M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z', 'M16 16l5 5'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  mouse: ['M12 3a6 6 0 0 0-6 6v6a6 6 0 0 0 12 0V9a6 6 0 0 0-6-6z', 'M12 3v6'],
  package: ['M4 7l8-4 8 4-8 4z', 'M4 7v10l8 4 8-4V7', 'M12 11v10'],
  'package-closed': ['M4 7l8-4 8 4-8 4z', 'M4 7v10l8 4 8-4V7', 'M8 9l8 8'],
  refresh: ['M19 7v5h-5', 'M5 17v-5h5', 'M7 8a7 7 0 0 1 11 2', 'M17 16a7 7 0 0 1-11-2'],
  responsive: ['M4 5h16v10H4z', 'M8 19h8', 'M10 15v4', 'M18 9h3v8h-5v-2'],
  'shield-check': ['M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z', 'M8.5 12l2.2 2.2L15.8 9'],
  'shield-lock': ['M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z', 'M9 13h6v4H9z', 'M10 13v-1a2 2 0 0 1 4 0v1'],
  shape: ['M5 5h6v6H5z', 'M13 13h6v6h-6z', 'M14 5h5v5', 'M5 14h5v5'],
  sort: ['M8 6h10', 'M8 12h7', 'M8 18h4', 'M4 5v14', 'M2 17l2 2 2-2'],
  star: ['M12 3l2.7 5.5 6 .9-4.4 4.3 1 6-5.3-2.8-5.3 2.8 1-6L3.3 9.4l6-.9z'],
  tablet: ['M6 3h12v18H6z', 'M10 18h4'],
  test: ['M9 3h6', 'M10 3v5l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V3', 'M8 15h8'],
  truck: ['M3 6h11v10H3z', 'M14 10h4l3 3v3h-7z', 'M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'],
  grid: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
  watch: ['M9 3h6l1 4H8z', 'M8 7h8v10H8z', 'M9 17h6l-1 4h-4z'],
  moon: ['M19 15a7 7 0 0 1-10-10 8 8 0 1 0 10 10z'],
  sun: ['M12 5V2', 'M12 22v-3', 'M5 12H2', 'M22 12h-3', 'M7 7L5 5', 'M19 19l-2-2', 'M17 7l2-2', 'M5 19l2-2', 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z'],
  phone: ['M7 2h10v20H7z', 'M11 18h2'],
  'phone-link': ['M5 3h7v11H5z', 'M8 11h1', 'M15 8h4v10h-4z', 'M16.5 15h1', 'M12 8h3', 'M12 14h3']
}

const segments = computed(() => iconMap[props.name] || iconMap.package)
const filled = computed(() => ['heart', 'star'].includes(props.name))
</script>

<style scoped>
.app-icon { display: inline-block; flex: 0 0 auto; vertical-align: middle; }
</style>
