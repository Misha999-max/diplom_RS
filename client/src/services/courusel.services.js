/* eslint-disable react/prop-types */

import httpService from "./http.service";
const couruselEndpoint = "couresel/";

const couruselService = {
  get: async () => {
    const { data } = await httpService.get(couruselEndpoint);
    return data;
  },
};
export default couruselService;
