import axios from "axios";

axios.defaults.baseURL = "https://voodoo-sandbox.myshopify.com";

const itemsPerPage = 24;

export const getAllProducts = async (page) => {
  try {
    const params = {
      limit: itemsPerPage,
      page: page,
    };
    const res = await axios.get("/products.json", { params });

    const products = res.data.products;
    return products;
  } catch (error) {
    console.log(error);
  }
};

getAllProducts();
