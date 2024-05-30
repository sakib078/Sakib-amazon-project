import { cart, addProductToCart, calculateCartTotal, } from "../scripts/cart.js";
import { products } from "../scripts/products.js";
import { priceFormatter } from "../scripts/utils/money.js";

let productHtml = '';

// Loop through the products array and generate the HTML for each product
products.forEach((product) => {
  productHtml += `
    <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src=" ${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${priceFormatter(product.priceCents)}
        </div>

        <div class="product-quantity-container js-product-quantity-container">
          <select class="quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button js-add-to-cart " data-product-id ="${product.id}">
          Add to Cart
        </button>
      </div>
    `
})

console.log(productHtml);

// adding the html into the page

document.querySelector(".js-product-grid").innerHTML = productHtml;


document.querySelectorAll(".js-add-to-cart")
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      addProductToCart(productId);

      calculateCartTotal();
    })
  })




