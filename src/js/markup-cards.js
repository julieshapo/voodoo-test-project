import { getAllProducts } from "./api-fetch";
import { onCartBtnClick } from "./shopping-cart";
import { DEFAULT_IMG } from "./constants";

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
  return `<div class="card card-compact h-full bg-transparent product-card">
      <figure class="border border-black">
          <img src="${images[0]?.src ?? `${DEFAULT_IMG}`}" alt="${title}"/>
      </figure>
      <div class="card-body ">
          <div class="card-text-wrap">
          <h2 class="card-title">${title}</h2>
          <p>${variants[0]?.price} KR.</p>
          </div>
          <div class="card-actions justify-end">
              <button class="btn bg-black text-white w-full add-cart-btn" data-id="${id}">Add to cart</button>
          </div>
      </div>
  </div>`;
};

export const renderProducts = async (page) => {
  try {
    const products = await getAllProducts(page);
    createProductsList(products);
  } catch (error) {
    console.log(error);
  }
};

renderProducts();
