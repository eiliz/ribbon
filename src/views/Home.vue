<template>
  <div>
    <fetch-listings #default="{listings, isLoaded}">
      <section v-if="isLoaded">
        <div v-for="listing in listings" :key="listing.Id" class="flex mb-6">
          <img :src="listing.Foto" class="mr-2" />
          <div>
            <router-link
              :to="{ name: 'SingleListing', params: { id: listing.Id } }"
              class="text-gray-500 hover:text-gray-700"
              ><h2 class="text-lg">{{ listing.Adres }}</h2>
              <h3 class="text-base">
                {{ listing.Postcode }} {{ listing.Plaats }}
              </h3>
            </router-link>
            <p>
              {{ listing.Prijs.Koopprijs }} {{ listing.Prijs.KoopAbbreviation }}
            </p>
          </div>
          <!-- <pre>{{ listing }}</pre> -->
        </div>
      </section>
      <div v-else>Loading</div>
    </fetch-listings>

    <div id="map" class="w-1/2 h-full"></div>
  </div>
</template>

<script>
import FetchListings from "../components/FetchListings.vue";
import gmapsInit from "@/helpers/gmaps";

export default {
  name: "Home",
  components: { FetchListings },
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el.querySelector("#map"));

      geocoder.geocode({ address: "Austria" }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

// Kruisstraat 10 // 1561 PJ Krommenie // € 375.000 k.k. // 141 m² / 187 m²6
kamers
