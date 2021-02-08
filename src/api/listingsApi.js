import httpClient from "./httpClient";

const apiKey = process.env.VUE_APP_FUNDA_API_KEY;

const endpoints = {
  listing: id => `/api/detail/${apiKey}/koop/${id}/`,
  search: `/api/${apiKey}/`
};

const getListing = id => httpClient.get(endpoints.listing(id));

const searchListings = filtersList =>
  httpClient.get(endpoints.search, {
    params: {
      type: "koop",
      zo: filtersList || "/amsterdam/tuin/video/"
    }
  });

export default {
  getListing,
  searchListings
};
