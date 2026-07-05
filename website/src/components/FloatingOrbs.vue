<template>
  <div class="floating-orbs">
    <div v-for="i in 6" :key="i" class="orb" :class="`orb-${i}`"></div>
  </div>
</template>

<style scoped>
.floating-orbs {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(66, 184, 131, 0.3) 0%, transparent 70%);
  top: -10%;
  left: -10%;
  animation: float-1 20s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 70%);
  top: 30%;
  right: -10%;
  animation: float-2 25s ease-in-out infinite;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
  bottom: 10%;
  left: 20%;
  animation: float-3 22s ease-in-out infinite;
}

.orb-4 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(66, 184, 131, 0.2) 0%, transparent 70%);
  top: 60%;
  left: 60%;
  animation: float-4 18s ease-in-out infinite;
}

.orb-5 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%);
  top: 20%;
  left: 40%;
  animation: float-5 23s ease-in-out infinite;
}

.orb-6 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%);
  bottom: 30%;
  right: 30%;
  animation: float-6 19s ease-in-out infinite;
}

@keyframes float-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(50px, 30px) scale(1.1); }
  50% { transform: translate(20px, 60px) scale(0.9); }
  75% { transform: translate(-30px, 40px) scale(1.05); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-40px, 50px) scale(1.1); }
  50% { transform: translate(-60px, 20px) scale(0.9); }
  75% { transform: translate(-20px, -30px) scale(1.05); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(60px, -40px) scale(1.1); }
  50% { transform: translate(30px, -60px) scale(0.9); }
  75% { transform: translate(-40px, -20px) scale(1.05); }
}

@keyframes float-4 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-50px, -30px) scale(1.1); }
  50% { transform: translate(-20px, -60px) scale(0.9); }
  75% { transform: translate(30px, -40px) scale(1.05); }
}

@keyframes float-5 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(40px, 50px) scale(1.1); }
  50% { transform: translate(60px, 20px) scale(0.9); }
  75% { transform: translate(20px, -30px) scale(1.05); }
}

@keyframes float-6 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-30px, -50px) scale(1.1); }
  50% { transform: translate(-50px, -20px) scale(0.9); }
  75% { transform: translate(-10px, 30px) scale(1.05); }
}
</style>
