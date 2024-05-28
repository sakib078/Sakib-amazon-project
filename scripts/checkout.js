import { cart, removeItem, savecartLocally } from "../scripts/cart.js";
import { products } from "../scripts/products.js";
import { priceFormatter } from "./utils/money.js";


cart.forEach((cartItem) => {

  let productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  })

  console.log(matchingProduct);

  let cartSummary =
    `
    <div class="cart-item-container  js-cart-item-container-${matchingProduct.id} ">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                 $${priceFormatter(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label"> ${cartItem.quantity}</span>
                </span>
                <div class= "updating-quality">
                 <span class="update-quantity-link link-primary " data-product-id ="${matchingProduct.id} ">
                 Update
                 </span>
                 <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
                 <span class="save-quantity-link link-primary js-save-quantity-link-${matchingProduct.id}" data-product-id ="${matchingProduct.id}"> Save </span>
                </div>
                <span class="delete-quantity-link link-primary " data-product-id ="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `

  // console.log(cartSummary);
  document.querySelector('.js-order-summary').innerHTML += cartSummary;

})

document.querySelectorAll('.delete-quantity-link')
  .forEach((deletLink) => {

    let productId = deletLink.dataset.productId;

    deletLink.addEventListener('click', () => {
      removeItem(productId);

      const cartcontainer = document.querySelector(`.js-cart-item-container-${productId}`);
      cartcontainer.remove();
    })

  })


document.querySelectorAll(".update-quantity-link")
  .forEach((updateLink) => {
    let productId = updateLink.dataset.productId; // Assign value to productId here

    updateLink.addEventListener("click", () => {
      let quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      let saveLink = document.querySelector(`.js-save-quantity-link-${productId}`);


      quantityInput.classList.add("quantity-input");
      saveLink.classList.add("save-quantity-link");

      // Show the 'Save' button and the input field
      quantityInput.style.display = "inline";
      saveLink.style.display = "inline";
      quantityInput.style.opacity = 1;
      saveLink.style.opacity = 1;
    })
  })


let updated_quantity = " ";

document.querySelectorAll(".save-quantity-link")
  .forEach((savelink) => {
    let productId = savelink.dataset.productId;

    savelink.addEventListener("click", () => {

      let quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      let saveLink = document.querySelector(`.js-save-quantity-link-${productId}`);

      quantityInput.classList.add("quantity-input");
      saveLink.classList.add("save-quantity-link");


      updated_quantity = quantityInput.value;

      console.log(updated_quantity);

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          cartItem.quantity = Number(updated_quantity);
          // console.log(updated_quantity);
          // console.log(cartItem);
        }
      })

      savecartLocally(); // Save the updated cart to localStorage

      setTimeout(() => {
        quantityInput.style.display = "none";
        saveLink.style.display = "none";
        quantityInput.style.opacity = 0;
        saveLink.style.opacity = 0;
      }, 500);
    })
  })

