import { getAllProducts } from "./api-fetch";
import { DEFAULT_IMG, REMOVE_BTN_SVG } from "./constants";
import Notiflix from "notiflix";

const cartDrawer = document.getElementById("my-drawer-4");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");

let shoppingCart = [];

// Save shopping cart items to localStorage
function saveToLocalStorage() {
  try {
    localStorage.setItem("ShoppingCartItems", JSON.stringify(shoppingCart));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

// load shopping cart items from localStorage
function loadFromLocalStorage() {
  try {
    const savedCart =
      JSON.parse(localStorage.getItem("ShoppingCartItems")) || [];
    shoppingCart = savedCart;
    shoppingCartMarkup(shoppingCart);
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
}

// Create shopping cart markup
const shoppingCartMarkup = (shoppingCart) => {
  cartList.innerHTML = "";

  shoppingCart?.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `<div class="cart-item-wrap">
    <div class="flex cart-content-wrap">
        <img class="cart-img" src="${item.src ?? DEFAULT_IMG}" alt="${
      item.title
    }" width=74 height=74/>
        <div class="cart-item-text-wrap">
          <p class="cart-text">${item.title}</p>
          <p class="cart-price">${item.price} KR.</p>
          <div class="cart-quantity">
            <button class="cart-decrement-btn">-</button>
            <p>${item.quantity}</p>
            <button class="cart-increment-btn">+</button>
          </div>
        </div>
    </div>
    <button class="cart-remove-btn">
      ${REMOVE_BTN_SVG}
    </button>
    </div>`;

    const removeBtn = cartItem.querySelector(".cart-remove-btn");
    removeBtn.addEventListener("click", () => removeFromShoppingCart(item.id));

    const decrementBtn = cartItem.querySelector(".cart-decrement-btn");
    decrementBtn.addEventListener("click", () => decrementQuantity(item));

    const incrementBtn = cartItem.querySelector(".cart-increment-btn");
    incrementBtn.addEventListener("click", () => incrementQuantity(item));

    cartList.appendChild(cartItem);
  });

  const totalPrice = shoppingCart?.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  cartTotal.textContent = `${totalPrice.toFixed(2)} KR.`;
};

// Decrement quantity
function decrementQuantity(item) {
  if (item.quantity > 1) {
    item.quantity -= 1;
    shoppingCartMarkup(shoppingCart);
    saveToLocalStorage();
  }
}

// Increment quantity
function incrementQuantity(item) {
  item.quantity += 1;
  shoppingCartMarkup(shoppingCart);
  saveToLocalStorage();
}

// Check is the product is already added to shopping cart
function isItemInCart(productId) {
  return shoppingCart.some((item) => item.id === productId);
}

// Add product to shopping cart
export const onCartBtnClick = async (e) => {
  try {
    const products = await getAllProducts();
    const btn = e.target.closest("button");
    const productId = await btn.getAttribute("data-id");

    const productToAdd = products?.find(
      (product) => product.id === parseInt(productId)
    );

    if (productToAdd) {
      if (isItemInCart(productToAdd.id)) {
        const existingItem = shoppingCart.find(
          (item) => item.id === productToAdd.id
        );
        existingItem.quantity += 1;
      } else {
        shoppingCart.push({
          id: productToAdd.id,
          title: productToAdd.title,
          price: productToAdd.variants[0]?.price || 0,
          quantity: 1,
        });
      }

      shoppingCartMarkup(shoppingCart);
      saveToLocalStorage();

      return Notiflix.Notify.success(
        "The product has been added to the Shopping cart!"
      );
    }
  } catch (error) {
    return Notiflix.Notify.failure(
      "Oops! Something went wrong, please try again later."
    );
  }
};

// Remove product from shopping cart
const removeFromShoppingCart = (productId) => {
  const indexToRemove = shoppingCart.findIndex((item) => item.id === productId);

  if (indexToRemove !== -1) {
    shoppingCart.splice(indexToRemove, 1);

    shoppingCartMarkup(shoppingCart);
    saveToLocalStorage();

    return Notiflix.Notify.info(
      "The product has been removed from the Shopping cart!"
    );
  }
};

// Close drawer with button
const shoppingCartCloseBtn = document.querySelector(".cart-btn-close");
shoppingCartCloseBtn.addEventListener("click", () => {
  cartDrawer.checked = false;
});

loadFromLocalStorage();
