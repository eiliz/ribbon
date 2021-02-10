<template>
  <div class="bg-white shadow-md">
    <header class="xl:container flex items-center px-8 py-4 pb-4 mx-auto">
      <router-link
        :to="{ name: 'home' }"
        class="flex items-center hover:no-underline text-gray-500 hover:text-yellow-500"
      >
        <figure>
          <img class="w-12 h-auto mr-4" src="/img/logo.svg" />
        </figure>
        <h1 class="mb-0 text-lg uppercase font-bold">
          Ribbon
        </h1>
      </router-link>
    </header>
  </div>
</template>
