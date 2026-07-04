<template>
  <div class="rename-test">
    <p class="text">This text uses $semantic.color.primary</p>
    <button class="btn">Button</button>
  </div>
</template>

<style token>
.rename-test {
  /* 测试重命名功能：将 $semantic.color.primary 重命名为 $semantic.color.accent */
  color: $semantic.color.primary;
  background: $semantic.color.background;
}

.text {
  color: $semantic.color.text;
  margin: $semantic.spacing.small;
}

.btn {
  background: $semantic.color.primary;
  padding: $semantic.spacing.medium;
}
</style>
