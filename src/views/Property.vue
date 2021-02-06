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
  created() {
    this.fetchProperty();
  },
  methods: {
    async fetchProperty() {
      this.status = apiStatus.PEDNING;
      const id = this.$route.params.id;

      try {
        const res = await this.$propertiesApi.getProperty(id);
        console.log(res);
        this.propertyObject = res.data;
        this.status = apiStatus.SUCCESS;
      } catch (err) {
        this.status = apiStatus.ERROR;
      }
    }
  }
};
</script>
