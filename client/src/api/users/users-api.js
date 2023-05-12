import sendRequest from "../index";

export const getUserById = async (id) => {
  return await sendRequest.get(`/api/general/user/${id}`);
};

export const getAdminsUsers = async () => {
  return await sendRequest.get("/api/management/admins");
};

export const getUserPerformanceStatApi = async (id) => {
  return await sendRequest.get(`/api/management/performance/${id}`);
}