import Pagination from "tui-pagination";
import { renderProducts } from "./markup-cards";

const totalItems = 461;
const itemsPerPage = 24;
const totalPages = Math.ceil(totalItems / itemsPerPage);

let currentPage = 1;
const maxVisibleButtons = 5;

const pagination = new Pagination(document.getElementById("pagination"), {
  totalItems,
  itemsPerPage,
  visiblePages: maxVisibleButtons,
  centerAlign: true,
  page: currentPage,
});

pagination.on("beforeMove", (eventData) => {
  currentPage = eventData.page;
  renderProducts(currentPage);
});

const lastBtn = document.querySelector(".tui-last");
lastBtn.textContent = totalPages;
