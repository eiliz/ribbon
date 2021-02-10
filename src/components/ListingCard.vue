<template functional>
  <div
    :class="data.staticClass"
    class="bg-white shadow rounded-md overflow-y-hidden hover:shadow-md transition duration-200 ease-in-out"
    itemprop="itemListElement"
    itemtype="http://schema.org/ListItem"
  >
    <div>
      <router-link
        :to="{ name: 'single-listing', params: { id: props.listing.Id } }"
        class="block h-full"
      >
        <img
          :alt="props.listing.Adres"
          :srcset="
            `
            ${props.listing.FotoMedium} 242w,
            ${props.listing.FotoLarge} 580w,
            ${props.listing.FotoLargest} 922w
          `
          "
          sizes="(min-width:768px) calc(.333*(100vw-7rem)),
        (min-width:1280px) calc(.25*(100vw-8.5rem)), calc(100vw-4rem)"
          :src="props.listing.Foto"
          :loading="props.imageLoading"
          class="w-full h-full object-cover"
      /></router-link>
    </div>

    <div class="p-4 flex flex-col justify-between">
      <router-link
        :to="{ name: 'single-listing', params: { id: props.listing.Id } }"
        class="text-gray-700 hover:text-gray-500 hover:no-underline mb-2"
        ><h3 class="text-xl mb-1">{{ props.listing.Adres }}</h3>
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
    },
    imageLoading: {
      required: false,
      default: "eager"
    }
  }
};
</script>
