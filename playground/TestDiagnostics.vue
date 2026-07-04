<template>
  <div class="test-diagnostics">
    <button class="btn-valid">Valid Token</button>
    <button class="btn-invalid">Invalid Token</button>
  </div>
</template>

<style token>
.test-diagnostics {
  /* 正确的 token 引用 */
  color: $semantic.color.primary;
  background: $semantic.color.background;
  padding: $semantic.spacing.medium;
}

.btn-valid {
  /* 正确的 token 引用 */
  background: $semantic.color.primary;
  color: #ffffff;
}

.btn-invalid {
  /* 错误的 token 引用（拼写错误）*/
  background: $semantic.colr.primary;
  color: $semantic.color.nonexistent;
  border: $semantic.spacing.largee;
}
</style>
