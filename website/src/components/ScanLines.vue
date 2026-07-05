<template>
  <div class="scan-lines">
    <div class="scan-line line-1"></div>
    <div class="scan-line line-2"></div>
    <div class="grid-overlay"></div>
  </div>
</template>

<style scoped>
.scan-lines {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(66, 184, 131, 0.3), transparent);
}

.line-1 {
  top: 0;
  animation: scan-down 8s linear infinite;
}

.line-2 {
  top: 0;
  animation: scan-down 12s linear infinite;
  animation-delay: -4s;
  opacity: 0.5;
}

@keyframes scan-down {
  0% { top: -2%; opacity: 0; }
  5% { opacity: 1; }
  95% { opacity: 1; }
  100% { top: 102%; opacity: 0; }
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(66, 184, 131, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(66, 184, 131, 0.02) 1px, transparent 1px);
  background-size: 100px 100px;
  opacity: 0.5;
}
</style>
