<template>
  <div class="bg-white shadow-md">
    <header class="xl:container flex items-center px-8 py-4 pb-4 mx-auto">
      <figure>
        <img class="w-12 h-auto mr-4" src="/img/logo.svg" />
      </figure>
      <h1 class="flex flex-col text-gray-500 mb-0">
        <router-link
          :to="{ name: 'home' }"
          tag="span"
          class="text-lg uppercase font-bold cursor-pointer"
          >Ribbon</router-link
        >
      </h1>
    </header>
  </div>
</template>
