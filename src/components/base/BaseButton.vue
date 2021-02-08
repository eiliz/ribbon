<template functional>
  <button
    v-bind="data.attrs"
    v-on="listeners"
    class="text-blue-500 underline hover:no-underline font-bold"
    :class="data.staticClass"
  >
    <slot></slot>
  </button>
</template>
