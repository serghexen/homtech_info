<script setup>
import joyCardsWordmark from '../assets/joycards-wordmark.jpg'

const props = defineProps({ compact: { type: Boolean, default: false } })
const filterId = props.compact ? 'joy-logo-key-compact' : 'joy-logo-key-full'
</script>

<template>
  <span class="joy-logo" :class="{ 'joy-logo--compact': compact }" role="img" aria-label="JoyCards">
    <svg viewBox="0 0 248 140" aria-hidden="true">
      <defs>
        <filter :id="filterId" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 .98  0 0 0 0 .93  .333 .333 .333 0 -.06" />
        </filter>
      </defs>
      <image :href="joyCardsWordmark" width="248" height="140" :filter="`url(#${filterId})`" />
    </svg>
  </span>
</template>

<style scoped>
.joy-logo {
  width: 118px;
  height: 66px;
  display: inline-flex;
  align-items: center;
}

.joy-logo svg {
  width: 100%;
  height: 100%;
  display: block;
  filter: drop-shadow(0 4px 9px rgba(0, 0, 0, .24));
}

.joy-logo--compact {
  width: 82px;
  height: 46px;
}
</style>
