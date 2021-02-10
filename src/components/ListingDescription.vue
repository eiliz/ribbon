<template>
  <section>
    <div v-for="(section, i) in listing.Kenmerken" :key="i">
      <h3>{{ section.Titel }}</h3>
      <listing-description-section :data="section">
      </listing-description-section>
    </div>
  </section>
</template>

<script>
import ListingDescriptionSection from "@/components/ListingDescriptionSection.vue";

export default {
  components: {
    ListingDescriptionSection
  },
  props: {
    listing: {
      required: true
    }
  }
};
</script>
