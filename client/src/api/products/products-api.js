import sendRequest from "../index";

const ProductsApi = {
  getAllProducts: async () => {
    return await sendRequest.get("/api/client/products");
  },
};

export default ProductsApi;
