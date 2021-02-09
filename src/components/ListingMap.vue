<template>
  <div>
    <div ref="map" class="w-full h-96"></div>

    <div v-if="isPending" class="flex justify-center">
      <base-spinner></base-spinner>
    </div>
    <div v-else-if="hasError" class="flex justify-center">
      {{ error.message }}
    </div>
  </div>
</template>

<script>
import gmapsInit from "@/helpers/gmaps";
import statusMixin from "@/mixins/statusMixin";
import apiStatus from "@/api/constants/apiStatus";

export default {
  props: {
    mapLocation: {
      required: true
    }
  },
  mixins: [statusMixin],
  async mounted() {
    try {
      this.status = apiStatus.PENDING;
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();

      const map = new google.maps.Map(this.$refs.map);

      geocoder.geocode({ address: this.mapLocation }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          this.status = apiStatus.ERROR;
          this.error = status;
        }

        this.status = apiStatus.SUCCESS;

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
        map.setZoom(17);
        new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
