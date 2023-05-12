import sendRequest from "../index";

const CustomerApi = {
  getAllCustomers: async () => {
    return await sendRequest.get("/api/client/customers");
  },
};

export default CustomerApi;
