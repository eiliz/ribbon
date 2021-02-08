<template>
  <div>
    <template v-if="isLoaded">
      <listing-images-collection
        :media="images"
        :video="video"
        :title="listing.Adres"
        #default="{collection, video}"
      >
        <component
          v-bind:is="currentMediaComponent"
          :collection="collection"
          :video="video"
          :listing-intro="listingIntro"
          @image-click="onMediaItemClick"
        ></component>
      </listing-images-collection>

      <div class="flex justify-end px-4">
        <base-button
          @click.prevent="onShowAllMedia"
          class="mt-4 ml-auto text-red-500"
          >Show all media</base-button
        >
      </div>

      <section class="max-w-5xl mx-auto px-4 xl:px-0 mt-4 py-4 md:py-8">
        <listing-intro
          :data="listingIntro"
          class="border-b border-gray-300 pb-2"
        >
        </listing-intro>

        <listing-description :listing="listing"></listing-description>
      </section>

      <ModalDialog :show="showModal" @close="showModal = false">
        <listing-images-collection
          :media="images"
          :video="video"
          :title="listing.Adres"
          #default="{collection, video}"
        >
          <listing-carousel
            v-if="showCarouselInModal"
            :collection="collection"
            :listing-intro="listingIntro"
            :start-at="indexOfClickedImage"
            :show-current-index="true"
            :show-nav="true"
            class="flex flex-col justify-center h-screen"
          ></listing-carousel>

          <listing-all-media
            v-else-if="showAllMediaInModal"
            :collection="collection"
            :video="video"
          ></listing-all-media>
        </listing-images-collection>
      </ModalDialog>
    </template>
  </div>
</template>

<script>
import apiStatus from "@/api/constants/apiStatus";
import ListingImagesCollection from "../components/ListingImagesCollection.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import ListingIntro from "@/components/ListingIntro.vue";
import ListingDescription from "@/components/ListingDescription.vue";

export default {
  components: {
    ListingImagesCollection,
    ListingIntroGallery: () => import("../components/ListingIntroGallery.vue"),
    ListingCarousel: () => import("../components/ListingCarousel.vue"),
    ListingAllMedia: () => import("../components/ListingAllMedia.vue"),
    ModalDialog,
    ListingIntro,
    ListingDescription
  },
  data() {
    return {
      listing: null,
      status: apiStatus.IDLE,
      currentMediaComponent: "ListingIntroGallery",
      currentComponentInModal: null,
      indexOfClickedImage: null,
      showModal: false
    };
  },
  computed: {
    isLoaded() {
      return this.status === apiStatus.SUCCESS;
    },
    images() {
      return this.listing.Media.filter(entry => entry.Categorie === 1);
    },
    video() {
      if (!this.listing.Video) {
        return null;
      }

      return {
        thumbnail: this.listing.Video.ThumbnailUrl,
        sources: this.listing.Video.Videos.map(entry => ({
          width: entry.Stream.Width,
          url: entry.Url
        }))
      };
    },
    listingIntro() {
      return {
        address: this.listing.Adres,
        location: `${this.listing.Postcode} ${this.listing.Plaats}`,
        price: `€ ${this.listing.Prijs.Koopprijs} ${this.listing.Prijs.KoopAbbreviation}`,
        surfaceSize: `${this.listing.WoonOppervlakte} m²`,
        landSize: `${this.listing.PerceelOppervlakte} m²`
      };
    },
    showCarouselInModal() {
      return this.currentComponentInModal === "ListingCarousel";
    },
    showAllMediaInModal() {
      return this.currentComponentInModal === "ListingAllMedia";
    }
  },
  watch: {
    $route: "fetchListing"
  },

  created() {
    this.fetchListing();
    this.setupGalleryMatchMedia();
  },
  methods: {
    async fetchListing() {
      this.status = apiStatus.PEDNING;
      const id = this.$route.params.id;

      try {
        const { data } = await this.$listingsApi.getListing(id);
        this.listing = data;
        this.status = apiStatus.SUCCESS;
      } catch (err) {
        console.log(err);
        this.status = apiStatus.ERROR;
      }
    },
    setupGalleryMatchMedia() {
      const carouselMq = window.matchMedia(`(max-width: 767px)`);

      // Save the handler on the instance itself, doesn't need to go in the data
      // object because it doesn't need to be reactive.
      this.matchMediaHandler = e => {
        this.currentMediaComponent = e.matches
          ? "ListingCarousel"
          : "ListingIntroGallery";
      };

      // Run it once when the component is first created
      this.matchMediaHandler(carouselMq);

      carouselMq.addEventListener("change", this.matchMediaHandler);

      // Remove listener if the component is removed
      this.$once("hook:destroyed", () =>
        carouselMq.removeEventListener("change", this.matchMediaHandler)
      );
    },
    onShowAllMedia() {
      this.currentComponentInModal = "ListingAllMedia";
      this.showModal = true;
    },
    onMediaItemClick(imageIndex) {
      this.indexOfClickedImage = imageIndex;
      this.currentComponentInModal = "ListingCarousel";
      this.showModal = true;
    }
  }
};
</script>
