<script>
import apiStatus from "@/api/constants/apiStatus";
import statusMixin from "@/mixins/statusMixin";

export default {
  props: {
    filters: {
      required: false,
      default: () => []
    },
    page: {
      required: false,
      default: 1
    }
  },
  mixins: [statusMixin],
  data() {
    return {
      listings: null,
      paging: null,
      meta: null
    };
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
        } = await this.$listingsApi.searchListings(this.filters, this.page);

        this.listings = Objects;
        this.paging = Paging;
        this.meta = Metadata;

        this.status = apiStatus.SUCCESS;
      } catch (err) {
        console.error(err);
        this.status = apiStatus.ERROR;
        this.error = err;
      }
    }
  },
  render() {
    return this.$scopedSlots.default({
      listings: this.listings,
      meta: this.meta,
      paging: this.paging,
      isLoaded: this.isLoaded,
      hasError: this.hasError,
      error: this.error
    });
  }
};
</script>
