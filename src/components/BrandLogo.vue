<script setup>
import joyCardsLogoWhite from '../assets/joycards-logo-white.png'

defineProps({ compact: { type: Boolean, default: false } })
</script>

<template>
  <span class="joy-logo" :class="{ 'joy-logo--compact': compact }" role="img" aria-label="JoyCards">
    <img :src="joyCardsLogoWhite" alt="" aria-hidden="true" />
  </span>
</template>

<style scoped>
.joy-logo {
  width: 96px;
  height: 66px;
  display: inline-flex;
  align-items: center;
}

.joy-logo img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  filter: drop-shadow(0 4px 9px rgba(0, 0, 0, .24));
}

.joy-logo--compact {
  width: 68px;
  height: 47px;
}
</style>
