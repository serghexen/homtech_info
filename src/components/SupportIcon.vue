<script setup>
defineProps({ name: { type: String, required: true } })
</script>

<template>
  <svg v-if="name === 'telegram'" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="currentColor" d="M40.7 8.2 34.9 38c-.4 2.1-1.6 2.6-3.3 1.6l-8.8-6.5-4.3 4.1c-.5.5-.9.9-1.8.9l.6-9 16.4-14.8c.7-.6-.2-1-1.1-.4L12.3 26.7l-8.7-2.8c-1.9-.6-1.9-1.9.4-2.8L38.1 8c1.6-.6 3 .4 2.6.2Z" />
  </svg>
  <svg v-else-if="name === 'vk'" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="currentColor" d="M6.4 14.4h7.3c.5 0 .9.3 1.1.8 2.4 6.8 5.4 9.6 7.2 10.5V15.9c0-1 .8-1.8 1.8-1.8h5.6c.9 0 1.5.7 1.5 1.5v5.5c0 1 .6 1.3 1.2.8 2.5-2.8 4.3-5.6 5.2-7 .2-.4.7-.7 1.2-.7h6.4c1.3 0 2 1.5 1.3 2.5-1.7 2.6-3.9 5.5-6.6 8.5-.7.7-.7 1.8 0 2.5 2.6 2.6 5.1 5.4 7 7.9.7 1 .1 2.3-1.1 2.3h-7c-.5 0-1-.3-1.3-.7-2.3-3.3-4.4-5.7-5.4-5.7-.8 0-.9.7-.9 1.7v3c0 .9-.7 1.7-1.7 1.7h-2.9C15.7 38 8.8 30.8 5.1 16.3c-.2-1 .4-1.9 1.3-1.9Z" />
  </svg>
  <svg v-else-if="name === 'max'" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" d="M23.5 8.5c-8.3 0-15 6.3-15 14.2 0 4.6 2.3 8.7 5.9 11.3l-3.2 6.1 7-3.5c1.7.5 3.5.8 5.3.8 8.3 0 15-6.3 15-14.3S31.8 8.5 23.5 8.5Z" />
  </svg>
  <svg v-else-if="name === 'clock'" viewBox="0 0 48 48" aria-hidden="true">
    <circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" stroke-width="3" />
    <path d="M24 14v11l7 5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
  </svg>
  <svg v-else-if="name === 'chat'" viewBox="0 0 48 48" aria-hidden="true">
    <path d="M8 11h32v23H22l-9 7v-7H8z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
    <path d="M16 23h.1M24 23h.1M32 23h.1" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
  </svg>
  <svg v-else-if="name === 'lock'" viewBox="0 0 48 48" aria-hidden="true">
    <rect x="11" y="21" width="26" height="21" rx="5" fill="none" stroke="currentColor" stroke-width="3" />
    <path d="M17 21v-6a7 7 0 0 1 14 0v6" fill="none" stroke="currentColor" stroke-width="3" />
  </svg>
  <svg v-else-if="name === 'shield'" viewBox="0 0 48 48" aria-hidden="true">
    <path d="M24 5 39 11v12c0 10-6 16-15 21-9-5-15-11-15-21V11z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
    <path d="m17 24 5 5 9-11" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  <svg v-else viewBox="0 0 48 48" aria-hidden="true">
    <path d="M24 41S7 31 7 18c0-9 11-12 17-4 6-8 17-5 17 4 0 13-17 23-17 23Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
  </svg>
</template>
