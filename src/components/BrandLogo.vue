<script setup>
defineProps({ compact: { type: Boolean, default: false } })
</script>

<template>
  <span class="joy-logo" :class="{ 'joy-logo--compact': compact }" aria-label="JoyCards">
    <span class="joy-logo__joy">JOY</span>
    <span class="joy-logo__cards">CARDS</span>
    <span class="joy-logo__bolt">✦</span>
  </span>
</template>

<style scoped>
.joy-logo {
  position: relative;
  width: 91px;
  height: 54px;
  display: inline-block;
  color: #fff9ec;
  font-family: "Trebuchet MS", sans-serif;
  font-weight: 1000;
  line-height: .78;
  letter-spacing: -.1em;
  filter: drop-shadow(0 4px 9px rgba(0, 0, 0, .24));
  transform: rotate(-3deg);
}

.joy-logo__joy,
.joy-logo__cards {
  position: absolute;
  left: 7px;
  text-shadow: 1px 0 currentColor, -1px 0 currentColor;
}

.joy-logo__joy {
  top: 3px;
  font-size: 25px;
  transform: rotate(-5deg);
}

.joy-logo__cards {
  top: 27px;
  left: 0;
  font-size: 24px;
  transform: rotate(5deg);
}

.joy-logo__bolt {
  position: absolute;
  top: -4px;
  right: 5px;
  color: #ff7a3d;
  font-size: 17px;
}

.joy-logo--compact {
  width: 72px;
  height: 42px;
  transform: scale(.8) rotate(-3deg);
  transform-origin: left center;
}
</style>
