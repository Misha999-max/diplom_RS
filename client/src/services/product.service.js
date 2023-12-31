import httpService from "./http.service";
const productParamEndpoint = "product/";

const productService = {
  fetchAll: async () => {
    const { content } = await httpService.get(productParamEndpoint);
    return content;
  },
  createProduct: async (payload) => {
    const { content } = await httpService.post(productParamEndpoint, payload);
    return content;
  },
  removeProduct: async (productId) => {
    const { content } = await httpService.delete(
      productParamEndpoint + productId
    );
    return content;
  },
  update: async (payload) => {
    const { content } = await httpService.patch(
      productParamEndpoint + payload.id,
      payload
    );
    console.log(content);
    return content;
  },
};
export default productService;
