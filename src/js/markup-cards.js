import { getAllProducts } from "./api-fetch";
import { onCartBtnClick } from "./shopping-cart";
import { DEFAULT_IMG } from "./constants";
import Notiflix from "notiflix";

const productsList = document.querySelector(".products-list");

const createProductsList = (array) => {
  array?.forEach((item) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = createProductItem(item);

    const addCartBtn = productItem.querySelector(".add-cart-btn");
    addCartBtn.addEventListener("click", onCartBtnClick);

    productsList.appendChild(productItem);
  });
};

const createProductItem = ({ id, images, title, variants }) => {
  return `<div class="card card-compact  bg-transparent product-card">
      <figure class="border border-black rounded">
          <img src="${
            images[0]?.src ?? `${DEFAULT_IMG}`
          }" alt="${title}" width="100%" height="100%" class="product-img" />
      </figure>
      <div class="badge uppercase bg-black text-white rounded p-2">used</div>
      <div class="card-body ">
        <div class="card-description-wrap">  
          <div class="card-text-wrap">
            <h2 class="card-title">${title}</h2>
            <p class="card-price">${variants[0]?.price} kr.</p>
          </div>
          <div class="card-condition-wrap">
            <p class="card-condition">Condition</p>
            <p>Slightly used</p>
          </div>
        </div>
          <div class="card-actions justify-end">
              <button class="btn text-white bg-black hover:bg-slate-950 rounded w-full add-cart-btn" data-id="${id}">Add to cart</button>
          </div>
      </div>
  </div>`;
};

export const renderProducts = async (page) => {
  try {
    const products = await getAllProducts(page);
    createProductsList(products);
  } catch (error) {
    return Notiflix.Notify.failure(
      "Oops! Something went wrong, please try again later."
    );
  }
};

renderProducts();
