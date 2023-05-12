import sendRequest from "../index";

const SalesApi = {
  getAllSales: async () => {
    return await sendRequest.get("/api/sales");
  },
};

export default SalesApi;
