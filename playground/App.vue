<template>
  <div class="container">
    <h1 class="title">VTE Playground</h1>
    <button class="btn btn-primary">Primary Button</button>
    <button class="btn btn-secondary">Secondary Button</button>
    <p class="text">This text uses token-based styling.</p>
    <hr style="margin: 1rem 0; border-color: #eee;" />
    <ScopedButton />
  </div>
</template>

<script setup>
import ScopedButton from "./ScopedButton.vue";
</script>

<style token>
.container {
  padding: $semantic.spacing.large;
  max-width: 600px;
  margin: 0 auto;
}

.title {
  color: $semantic.color.text;
  margin-bottom: $semantic.spacing.medium;
}

.btn {
  padding: $semantic.spacing.small $semantic.spacing.medium;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: $semantic.spacing.small;
}

.btn-primary {
  background: $semantic.color.primary;
  color: #ffffff;
}

.btn-secondary {
  background: $semantic.color.background;
  color: $semantic.color.text;
}

.text {
  color: $semantic.color.text;
  margin-top: $semantic.spacing.medium;
}
</style>
