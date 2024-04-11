<script setup>
defineProps(["color"]);
</script>

<template>
  <button class="color-preset" :style="`background-color: #${color}`"></button>
</template>

<style scoped>
button.color-preset {
  border-color: transparent;
  margin-bottom: 0.5rem;
  aspect-ratio: 1/1;
  border-radius: 99rem;
}

@media (width <= 768px) {
  button.color-preset {
    height: 5rem;
    
  }
}
</style>
