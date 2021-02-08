<template functional>
  <header :class="data.staticClass">
    <h1>{{ props.data.address }}</h1>
    <p class="text-gray-400 mb-2 text-sm">{{ props.data.location }}</p>
    <p class="text-sm mb-4">
      <span class="mr-4"
        ><strong>{{ props.data.surfaceSize }}</strong> wonen</span
      ><span class="mr-4"
        ><strong>{{ props.data.landSize }}</strong> perceel</span
      >
    </p>
    <p class="text-xl text-gray-700 font-bold">
      {{ props.data.price }}
    </p>
  </header>
</template>
