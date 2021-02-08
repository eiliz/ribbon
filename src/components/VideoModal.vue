<template>
  <div class="relative">
    <img
      :src="video.thumbnail"
      loading="eager"
      class="object-cover h-full w-full"
    />
    <div
      class="absolute inset-0 flex items-center
      justify-center bg-gray-700 opacity-50 cursor-pointer"
    >
      <play-icon
        @click="showModal = true"
        class="w-12 lg:w-24 h-auto text-white"
      ></play-icon>

      <ModalDialog :show="showModal" @close="showModal = false">
        <video
          controls
          :poster="video.thumbnail"
          preload="metadata"
          class="w-full"
        >
          <source :src="video.sources[0].url" type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </ModalDialog>
    </div>
  </div>
</template>

<script>
import PlayIcon from "@/assets/svg/play.svg";
import ModalDialog from "@/components/ModalDialog.vue";

// The supported video sizes are saved in a separate file so they could
// potentially be reused. In case these change it's also easier to update them
// in a single place rather than everywhere they're being used.
// import videoSizes from "@/api/constants/videoSizes";

export default {
  props: {
    video: {
      required: true
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  components: {
    PlayIcon,
    ModalDialog
  }
};
</script>
