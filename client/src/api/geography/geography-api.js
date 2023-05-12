import sendRequest from "../index";

const GeographyApi = {
  getGeography: async () => {
    return await sendRequest.get("/api/client/geography");
  },
};

export default GeographyApi;
