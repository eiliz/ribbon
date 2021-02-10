<template>
  <div
    class="md:grid md:grid-cols-4 md:grid-rows-2 xl:rounded-lg overflow-y-hidden"
  >
    <div
      v-for="(img, i) in shownImages"
      :key="img.index"
      :class="{
        'md:col-span-2 md:row-span-2': i === 0,
        'md:col-span-1 md:row-span-1': i > 0
      }"
    >
      <!-- If the API had offered a wider range of image sizes, I'd have had multiple source tags in here to load the appropriate sizes based on the screen size. However the largest image size offered by the API is the one that's usable from medium and larger screens. -->
      <picture>
        <source :srcset="`${img.xl.url} 1x`" media="(min-width: 768px)" />
        <img
          @click="onImageClick(i)"
          :alt="img.alt"
          :src="img.lg.url"
          :loading="i > 3 ? 'lazy' : 'eager'"
          class="object-cover cursor-pointer"
        />
      </picture>
    </div>

    <div v-if="video" class="md:col-span-1 md:row-span-1">
      <video-modal :video="video" class="h-full"></video-modal>
    </div>
  </div>
</template>

<script>
const VideoModal = () => import("@/components/VideoModal");

export default {
  props: {
    collection: {
      required: true
    },
    video: {
      required: false
    }
  },
  components: {
    VideoModal
  },
  computed: {
    shownImages() {
      const noOfImages = this.video ? 4 : 5;
      return this.collection.slice(0, noOfImages);
    }
  },
  methods: {
    onImageClick(imageOrder) {
      this.$emit("image-click", imageOrder);
    }
  }
};
</script>
