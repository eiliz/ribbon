<template>
  <div>
    <template v-if="isLoaded">
      <h1>{{ propertyObject.Adres }}</h1>
    </template>
  </div>
</template>

<script>
import apiStatus from "@/api/constants/apiStatus";

export default {
  data() {
    return {
      propertyObject: null,
      status: apiStatus.IDLE
    };
  },
  computed: {
    isLoaded() {
      return this.status === apiStatus.SUCCESS;
    }
  },
  async created() {
    this.fetchProperty();
  },
  methods: {
    async fetchProperty() {
      this.status = apiStatus.PEDNING;
      const id = this.$route.params.id;

      try {
        const { data } = await this.$propertiesApi.getProperty(id);
        this.propertyObject = data;
        this.status = apiStatus.SUCCESS;
      } catch (err) {
        this.status = apiStatus.ERROR;
      }
    }
  }
};
</script>
