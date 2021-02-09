import apiStatus from "@/api/constants/apiStatus";

export default {
  data() {
    return {
      status: apiStatus.IDLE,
      error: null
    };
  },
  computed: {
    isLoaded() {
      return this.status === apiStatus.SUCCESS;
    },
    isPending() {
      return this.status === apiStatus.PENDING;
    },
    hasError() {
      return this.status === apiStatus.ERROR;
    }
  }
};
