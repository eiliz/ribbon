<script>
import apiStatus from "@/api/constants/apiStatus";

export default {
  data() {
    return {
      listings: null,
      paging: null,
      meta: null,
      status: apiStatus.IDLE
    };
  },
  computed: {
    isLoaded() {
      return this.status === apiStatus.SUCCESS;
    }
  },
  created() {
    this.fetchListings();
  },
  methods: {
    async fetchListings() {
      this.status = apiStatus.PEDNING;

      try {
        const {
          data: { Objects, Metadata, Paging }
        } = await this.$listingsApi.searchListings();

        this.listings = Objects;
        this.paging = Paging;
        this.meta = Metadata;

        this.status = apiStatus.SUCCESS;
      } catch (err) {
        console.log(err);
        this.status = apiStatus.ERROR;
      }
    }
  },
  render() {
    return this.$scopedSlots.default({
      listings: this.listings,
      isLoaded: this.isLoaded
    });
  }
};
</script>

// property/f4bf9fea-53c0-4492-a0bf-1b156f121a8a
