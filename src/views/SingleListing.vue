<template>
  <div class="xl:pt-8 xl:px-8">
    <template v-if="isLoaded">
      <!-- ListingImagesCollection is just a data provider around various components that want need formatted data. -->
      <listing-images-collection
        :media="images"
        :video="video"
        :title="listing.Adres"
        #default="{collection, video}"
      >
        <!-- This component will either show a carousel on small screens or a grid of images for larger screens -->
        <component
          v-bind:is="currentMediaComponent"
          :collection="collection"
          :video="video"
          :listing-intro="listingIntro"
          @image-click="onMediaItemClick"
        ></component>
      </listing-images-collection>

      <!-- This is the button to show the modal with all of the media items
      available for the listing. -->
      <div class="flex justify-end px-4">
        <base-button
          @click.prevent="onShowAllMedia"
          class="mt-4 ml-auto text-red-500"
          >Show all media</base-button
        >
      </div>

      <!-- This section holds the listing detail information plus the map. -->
      <section class="max-w-5xl mx-auto px-4 xl:px-0 py-4 xl:py-8">
        <listing-intro
          :data="listingIntro"
          class="border-b border-gray-300 pb-2 mb-4 md:mb-8"
        >
        </listing-intro>

        <listing-description :listing="listing"></listing-description>

        <listing-map
          :mapLocation="mapLocation"
          class="my-8 md:my-24"
        ></listing-map>
      </section>

      <!-- This modal will either show the carousel if the user clicked one of the images in the image grid on larger screens or show the collection of all media items if the user clicked the "Show all media" button. -->
      <modal-dialog :show="showModal" @close="showModal = false">
        <!-- ListingImagesCollection is just a data provider around various components that want need formatted data. -->
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
      </modal-dialog>
    </template>

    <div v-else-if="isPending" class="flex justify-center">
      <base-spinner></base-spinner>
    </div>

    <div v-else-if="hasError" class="flex justify-center">
      {{ error.message }}
    </div>
  </div>
</template>

<script>
import ListingImagesCollection from "@/components/ListingImagesCollection.vue";
import ListingIntroGallery from "@/components/ListingIntroGallery.vue";
import ListingCarousel from "@/components/ListingCarousel.vue";
import ListingIntro from "@/components/ListingIntro.vue";
import ListingDescription from "@/components/ListingDescription.vue";
import ListingMap from "@/components/ListingMap.vue";
import apiStatus from "@/api/constants/apiStatus";
import statusMixin from "@/mixins/statusMixin";

export default {
  components: {
    ListingImagesCollection,
    // Based on the screen size the user will either see the ListingIntroGallery
    // component on larger screens or the ListingCarousel on smaller screens.
    // I'm including both in the main bundle to be made available immediatelly
    // because if the user is on mobile they will need it right away and if
    // they're on a larger screen there's a high change that they'll be clicking
    // on an image quickly and that will open the modal and use the same
    // carousel component inside of it.
    ListingIntroGallery,
    ListingCarousel,
    // I'm setting up a lazy import for this component since they're not
    // used in the first render.
    ListingAllMedia: () => import("../components/ListingAllMedia.vue"),
    ModalDialog: () => import("@/components/ModalDialog.vue"),
    ListingIntro,
    ListingDescription,
    ListingMap
  },
  mixins: [statusMixin],
  data() {
    return {
      // The actual object data.
      listing: null,
      // The main section at the top is going to either be a carousel or a grid
      // of images, based on screen size and I'm using a dynamic component for
      // that. This property controls which component is currently being shown there.
      currentMediaComponent: "ListingCarousel",
      // This is the same thing except it's for the modal and it's using a v-if
      // rather than a dynamic component.
      currentComponentInModal: null,
      // If I'm currently showing the grid of images at the top and the user
      // clicks on one of the images I want to store the index of that image and
      // pass it to the carousel that will open in the modal so that the
      // carousel starts at that index.
      indexOfClickedImage: null,
      // This controls the visibility of the modal.
      showModal: false
    };
  },
  computed: {
    // I'm filtering just the regular images to use in this setup, discarding
    // the others like the 360 ones.
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
    mapLocation() {
      return `${this.listing.Adres} ${this.listing.Postcode} ${this.listing.Plaats}`;
    },
    // These 2 computed properties just return what the current dynamic
    // component that's shown in the modal is.
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
    // Get the listing data
    this.fetchListing();

    // Setup the logic regarding screen size
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
      // This media query controls when the carousel is displayed as the main
      // section at the top.
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
    // This is the handler for the Show all media button and its role is to open
    // the modal and set the component to be shown inside the modal to the one
    // that shows all media items for the listing.
    onShowAllMedia() {
      this.currentComponentInModal = "ListingAllMedia";
      this.showModal = true;
    },
    // This is the handler for when the user clicks on an image from the images
    // grid that shows on larger screens. It opens the modal and sets the
    // component that the modal show should to the carousel of images.
    onMediaItemClick(imageIndex) {
      this.indexOfClickedImage = imageIndex;
      this.currentComponentInModal = "ListingCarousel";
      this.showModal = true;
    }
  }
};
</script>
