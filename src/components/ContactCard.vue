<script setup>
import SupportIcon from './SupportIcon.vue'

defineProps({ contact: { type: Object, required: true } })
</script>

<template>
  <a
    class="contact-card"
    :class="`contact-card--${contact.code}`"
    :href="contact.url"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`${contact.action}, откроется в новой вкладке`"
  >
    <span class="contact-card__icon"><SupportIcon :name="contact.code" /></span>
    <span class="contact-card__copy">
      <strong>{{ contact.name }}</strong>
      <span>{{ contact.description }}</span>
    </span>
    <span class="contact-card__action">
      <span>{{ contact.action }}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </span>
  </a>
</template>
