<template functional>
  <div
    :class="data.staticClass"
    class="flex flex-col md:flex-row bg-white shadow rounded-md overflow-y-hidden hover:shadow-md transition duration-200 ease-in-out"
    itemprop="itemListElement"
    itemtype="http://schema.org/ListItem"
  >
    <div class="w-full md:w-1/3">
      <router-link
        :to="{ name: 'single-listing', params: { id: props.listing.Id } }"
        class="block h-full"
        ><img
          :src="props.listing.Foto"
          :alt="props.listing.Adres"
          class="w-full h-full object-cover"
      /></router-link>
    </div>

    <div class="w-full md:w-2/3 p-4">
      <router-link
        :to="{ name: 'single-listing', params: { id: props.listing.Id } }"
        class="text-gray-700 hover:text-gray-500 hover:no-underline"
        ><h3 class="text-base mb-1">{{ props.listing.Adres }}</h3>
        <h4 class="text-xs text-gray-400">
          {{ props.listing.Postcode }} {{ props.listing.Plaats }}
        </h4>
      </router-link>
      <p>
        <span class="font-bold mr-1">{{ props.listing.Prijs.Koopprijs }}</span>
        <span class="text-sm">{{ props.listing.Prijs.KoopAbbreviation }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listing: {
      required: true
    }
  }
};
</script>

<!-- <pre>{{ listing }}</pre> -->
