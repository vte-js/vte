<template>
  <template v-if="enabled">
    <div class="mouse-glow" ref="glowRef"></div>
    <div class="cursor-trail" ref="trailRef"></div>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const glowRef = ref<HTMLElement | null>(null);
const trailRef = ref<HTMLElement | null>(null);
const enabled = ref(false);

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
let trailX = 0;
let trailY = 0;
let animationId: number;

function handleMouseMove(e: MouseEvent) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function animate() {
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;
  trailX += (mouseX - trailX) * 0.05;
  trailY += (mouseY - trailY) * 0.05;

  if (glowRef.value) {
    glowRef.value.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
  }

  if (trailRef.value) {
    trailRef.value.style.transform = `translate(${trailX - 100}px, ${trailY - 100}px)`;
  }

  animationId = requestAnimationFrame(animate);
}

onMounted(() => {
  if (window.matchMedia('(hover: hover)').matches) {
    enabled.value = true;
    window.addEventListener("mousemove", handleMouseMove);
    animate();
  }
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.mouse-glow {
  position: fixed;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(66, 184, 131, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: opacity 0.3s;
  mix-blend-mode: screen;
}

.cursor-trail {
  position: fixed;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.05) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
}
</style>
