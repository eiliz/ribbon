import httpClient from "./httpClient";

const apiKey = process.env.VUE_APP_FUNDA_API_KEY;

const endpoints = {
  listing: id => `/api/detail/${apiKey}/koop/${id}/`,
  search: `/api/${apiKey}/`
};

const getListing = id => httpClient.get(endpoints.listing(id));

const searchListings = (filters = [], page = 1) => {
  const filtersString = filters.join("/");

  return httpClient.get(endpoints.search, {
    params: {
      type: "koop",
      zo: filtersString
        ? `${filtersString}/p${page}`
        : `/amsterdam/tuin/video/p${page}`
    }
  });
};
export default {
  getListing,
  searchListings
};
