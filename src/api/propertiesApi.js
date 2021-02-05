import httpClient from "./httpClient";

const apiKey = process.env.VUE_APP_FUNDA_API_KEY;

const endpoints = {
  property: id => `detail/${apiKey}/koop/${id}/`,
  search: `${apiKey}/`
};

const getProperty = id => httpClient.get(endpoints.property(id));

const searchForProperties = ({ filtersList }) =>
  httpClient.get(endpoints.search, {
    params: {
      type: "koop",
      zo: filtersList || "/amsterdam/tuin/video/"
    }
  });

export default {
  getProperty,
  searchForProperties
};
