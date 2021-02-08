<template>
  <portal to="modals" v-if="show" appear>
    <div
      class="fixed inset-0 bg-white overflow-auto p-4 md:px-24 md:py-10"
      role="dialog"
    >
      <div class="absolute top-0 right-0 pt-4 pr-4">
        <button
          @click="dismiss"
          type="button"
          class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          <span class="sr-only">Close</span>
          <close-button class="h-6 w-6"></close-button>
        </button>
      </div>
      <div class="mx-auto max-w-7xl flex justify-center items-center">
        <slot></slot>
      </div>
    </div>
  </portal>
</template>

<script>
import CloseButton from "@/assets/svg/close.svg";

export default {
  props: {
    show: {
      required: true,
      type: Boolean
    },
    preventBackgroundScrolling: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  components: {
    CloseButton
  },
  methods: {
    dismiss() {
      this.$emit("close");
    }
  },
  watch: {
    show: {
      immediate: true,
      handler: function(show) {
        if (!this.preventBackgroundScrolling) {
          return;
        }

        if (show) {
          document.body.style.setProperty("overflow", "hidden");
        } else {
          document.body.style.removeProperty("overflow");
        }
      }
    }
  },
  created() {
    const escapeHandler = e => {
      if (e.key === "Escape" && this.show) {
        this.dismiss();
      }
    };

    document.addEventListener("keydown", escapeHandler);

    this.$once("hook:destroyed", () => {
      document.removeEventListener("keydown", escapeHandler);
    });
  }
};
</script>
