<template>
  <div class="glide">
    <div class="glide__track h-5/6" data-glide-el="track">
      <div class="glide__slides h-full">
        <slot name="slides"></slot>

        <slot name="extra" :goToStart="goToStart"></slot>
      </div>
    </div>

    <div
      v-if="showNav"
      class="glide__arrows absolute top-2/4 -left-16 -right-16 flex justify-between"
      data-glide-el="controls"
    >
      <button
        :disabled="shouldDisablePrev"
        class="glide__arrow glide__arrow--left disabled:opacity-50"
        data-glide-dir="<"
      >
        <span class="sr-only">Previous</span>
        <chevron-left></chevron-left>
      </button>
      <button
        :disabled="shouldDisableNext"
        class="glide__arrow glide__arrow--right disabled:opacity-50"
        data-glide-dir=">"
      >
        <span class="sr-only">Next</span>
        <chevron-right></chevron-right>
      </button>
    </div>

    <div v-if="showCurrentIndex" class="pt-8 text-center">
      {{ currentImageIndex }} from {{ slidesCount }}
    </div>
  </div>
</template>

<script>
import Glide from "@glidejs/glide";
import ChevronLeft from "@/assets/svg/chevron-left.svg";
import ChevronRight from "@/assets/svg/chevron-right.svg";

export default {
  props: {
    showCurrentIndex: {
      required: false,
      default: false
    },
    slidesCount: {
      required: true
    },
    options: {
      required: false,
      default: () => ({
        focusAt: "center",
        throttle: 50,
        rewind: false
      })
    },
    startAt: {
      required: false,
      default: 0
    },
    showNav: {
      required: false,
      default: false
    }
  },
  components: {
    ChevronLeft,
    ChevronRight
  },
  data() {
    return {
      currentImageIndex: this.startAt + 1,
      hasExtraSlide: false,
      shouldDisablePrev: this.startAt === 0,
      shouldDisableNext: false
    };
  },
  mounted() {
    this.glide = new Glide(".glide", {
      startAt: this.startAt,
      ...this.options
    });

    this.glide.on("run", () => {
      // Update the number shown at the bottom but don't update if the current
      // position is at the extra slide added at the end.
      if (this.glide.index + 1 <= this.slidesCount) {
        this.currentImageIndex = this.glide.index + 1;
      }

      // This should have been computed properties but because shouldDisableNext
      // depends on this.extraSlide which doesn't change, Vue doesn't recompute
      // the value so it didn't update it correctly.
      this.shouldDisablePrev = this.currentImageIndex === 1;
      this.shouldDisableNext = this.hasExtraSlide
        ? this.glide.index === this.slidesCount
        : this.currentImageIndex === this.slidesCount;
    });

    this.glide.mount();

    // Destroy the slider when the component is removed
    this.$once("hook:destroyed", () => this.glide.destroy());

    if (this.$scopedSlots.extra) {
      this.hasExtraSlide = true;
    }
  },
  methods: {
    goToStart() {
      this.glide.go("<<");
      this.currentImageIndex = 1;
    }
  }
};
</script>

<style lang="scss">
@import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
</style>
