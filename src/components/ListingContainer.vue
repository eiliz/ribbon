<template>
  <div>
    <fetch-listings
      #default="{listings, meta, isLoaded, isPending, hasError, error}"
    >
      <section
        v-if="isLoaded"
        itemprop="itemList"
        itemtype="http://schema.org/ItemList"
      >
        <h2 class="mb-8">{{ meta.Titel }}</h2>

        <div
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-8
        md:gap-6 xl:gap-8"
        >
          <listing-card
            v-for="listing in listings"
            :key="listing.Id"
            :listing="listing"
          >
          </listing-card>
        </div>
      </section>

      <div v-else-if="isPending" class="flex justify-center">
        <base-spinner></base-spinner>
      </div>

      <div v-else-if="hasError" class="flex justify-center">
        {{ error.message }}
      </div>
    </fetch-listings>
  </div>
</template>

<script>
import FetchListings from "@/components/FetchListings.vue";
import ListingCard from "@/components/ListingCard.vue";

export default {
  components: {
    FetchListings,
    ListingCard
  }
};
</script>
