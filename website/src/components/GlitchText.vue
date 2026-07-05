<template>
  <span class="glitch-text" :data-text="text">
    <span class="glitch-layer">{{ text }}</span>
    <span class="glitch-layer">{{ text }}</span>
    <span class="glitch-layer">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<style scoped>
.glitch-text {
  position: relative;
  display: inline-block;
}

.glitch-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.glitch-text:hover .glitch-layer:nth-child(1) {
  animation: glitch-1 0.3s infinite;
  color: #ff00ff;
  opacity: 0.8;
}

.glitch-text:hover .glitch-layer:nth-child(2) {
  animation: glitch-2 0.3s infinite;
  color: #00ffff;
  opacity: 0.8;
}

.glitch-text:hover .glitch-layer:nth-child(3) {
  animation: glitch-3 0.3s infinite;
  color: #42b883;
  opacity: 0.8;
}

@keyframes glitch-1 {
  0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, -1px); }
  20% { clip-path: inset(92% 0 1% 0); transform: translate(1px, 2px); }
  40% { clip-path: inset(43% 0 1% 0); transform: translate(-1px, -2px); }
  60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, 1px); }
  80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, -1px); }
  100% { clip-path: inset(58% 0 43% 0); transform: translate(1px, 2px); }
}

@keyframes glitch-2 {
  0% { clip-path: inset(65% 0 13% 0); transform: translate(2px, 1px); }
  20% { clip-path: inset(17% 0 63% 0); transform: translate(-1px, -2px); }
  40% { clip-path: inset(79% 0 2% 0); transform: translate(1px, 2px); }
  60% { clip-path: inset(2% 0 78% 0); transform: translate(-2px, -1px); }
  80% { clip-path: inset(30% 0 38% 0); transform: translate(2px, 1px); }
  100% { clip-path: inset(14% 0 52% 0); transform: translate(-1px, -2px); }
}

@keyframes glitch-3 {
  0% { clip-path: inset(20% 0 62% 0); transform: translate(-1px, -2px); }
  20% { clip-path: inset(53% 0 18% 0); transform: translate(2px, 1px); }
  40% { clip-path: inset(8% 0 75% 0); transform: translate(-2px, -1px); }
  60% { clip-path: inset(83% 0 4% 0); transform: translate(1px, 2px); }
  80% { clip-path: inset(45% 0 30% 0); transform: translate(-1px, -2px); }
  100% { clip-path: inset(68% 0 11% 0); transform: translate(2px, 1px); }
}
</style>
