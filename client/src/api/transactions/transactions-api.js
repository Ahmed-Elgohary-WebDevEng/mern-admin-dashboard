import sendRequest from "../index";

const TransactionsApi = {
  getAllTransactions: async ({ page, pageSize, sort, search }) => {
    return await sendRequest.get(
      `/api/client/transactions?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${search}`
    );
  },
};

export default TransactionsApi;
