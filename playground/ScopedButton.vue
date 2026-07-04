<template>
  <div class="scoped-container">
    <button class="scoped-btn">Scoped Button</button>
    <p class="scoped-text">This text uses scoped token-based styling.</p>
  </div>
</template>

<style token scoped>
.scoped-container {
  padding: $semantic.spacing.medium;
  border: 2px solid $semantic.color.primary;
  border-radius: 8px;
  margin: $semantic.spacing.small;
}

.scoped-btn {
  background: $semantic.color.primary;
  color: #ffffff;
  padding: $semantic.spacing.small $semantic.spacing.medium;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.scoped-text {
  color: $semantic.color.text;
  margin-top: $semantic.spacing.small;
}
</style>
