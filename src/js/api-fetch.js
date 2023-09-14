import axios from "axios";
import Notiflix from "notiflix";

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
    return Notiflix.Notify.failure(
      "Oops! Something went wrong, please try again later."
    );
  }
};

getAllProducts();
