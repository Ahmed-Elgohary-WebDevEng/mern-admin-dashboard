import sendRequest from "../index";

const DashboardApi = {
  getDashboardStats: async () => {
    return await sendRequest.get("/api/general/dashboard");
  },
};

export default DashboardApi;
