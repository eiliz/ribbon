<template>
  <div class="py-4 md:py-8">
    <section>
      <h2>Fotos ({{ collection.length }})</h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
      >
        <div v-for="img in collection" :key="img.index">
          <picture>
            <source :srcset="`${img.xl.url} 1x`" media="(min-width: 768px)" />
            <img
              :alt="img.alt"
              :src="img.lg.url"
              loading="eager"
              class="object-cover"
            />
          </picture>
        </div>
      </div>
    </section>

    <section v-if="video" class="mt-8">
      <h2>Video</h2>
      <video
        controls
        :poster="video.thumbnail"
        preload="metadata"
        class="w-full"
      >
        <source :src="video.sources[0].url" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    collection: {
      required: true
    },
    video: {
      required: false
    }
  }
};
</script>
