<template>
  <glide-carousel
    :slides-count="collection.length"
    :start-at="startAt"
    :show-current-index="showCurrentIndex"
    :show-nav="showNav"
  >
    <template v-slot:slides>
      <div
        v-for="(img, i) in collection"
        :key="i"
        class="glide__slide
      flex flex-col justify-center"
      >
        <!-- If the API had offered a wider range of image sizes, I'd have had
        multiple source tags in here to load the appropriate sizes based on the
        screen size. However the largest image size offered by the API is the
        one that's usable from medium and larger screens. -->
        <!-- :loading="i > 3 ? 'lazy' : 'eager'" -->
        <picture>
          <source :srcset="`${img.xl.url} 1x`" media="(min-width: 768px)" />
          <img
            :alt="img.alt"
            :src="img.lg.url"
            loading="lazy"
            class="object-fit mx-auto w-full"
          />
        </picture>
      </div>
    </template>

    <template v-slot:extra="{ goToStart }">
      <div class="glide__slide">
        <div class="flex items-center justify-center h-full text-center">
          <div>
            <h2>{{ listingIntro.address }}</h2>
            <p class="mb-2">{{ listingIntro.location }}</p>
            <p class="font-bold mb-2">{{ listingIntro.price }}</p>

            <base-button @click.prevent="goToStart" class="mt-16 ml-auto"
              >Go to start</base-button
            >
          </div>
        </div>
      </div>
    </template>
  </glide-carousel>
</template>

<script>
import GlideCarousel from "@/components/GlideCarousel.vue";

export default {
  props: {
    collection: {
      required: true
    },
    listingIntro: {
      required: true
    },
    startAt: {
      required: false,
      default: 0
    },
    showCurrentIndex: {
      required: false,
      default: false
    },
    showNav: {
      required: false,
      default: false
    }
  },
  components: {
    GlideCarousel
  }
};
</script>
