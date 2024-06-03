import { cart, removeItem, savecartLocally, updateDeliveryOption, loadFromstorage } from "../cart.js";
import { products } from "../products.js";
import { priceFormatter } from "../utils/money.js";
import { renderPaymentSummary } from "../checkout/paymentSummary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

import { deliveryOptions } from "../deliveryOptions.js";

const today = dayjs();

console.log(today);

new Promise(() => {
  console.log('promise');
})


// loadProducts(renderOrderSummary);

export function renderOrderSummary() {

  let container = document.querySelector('.js-order-summary');

  // Clear the old content
  if (container) {
    container.innerHTML = '';
  }
  else {
    console.error('container is undefined');
  }


  loadFromstorage();

  let matchingProduct;


  cart.forEach((cartItem) => {
    let productId = cartItem.productId;


    products.forEach((product) => {
      if (productId === product.getId()) {
        matchingProduct = product;
      }
    })


    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (cartItem.deliveryOptionId === option.id) {
        deliveryOption = option;
      }
    })

    let today = dayjs();
    let deliveryDays = today.add(deliveryOption.deliveryDays, 'days');
    let datastring = deliveryDays.format('dddd, MMMM D');

    let cartSummary = `
      <div class="cart-item-container js-test-cart-item-container js-cart-item-container-${matchingProduct.getId()}">
        <div class="delivery-date">
          Delivery date: ${datastring}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${priceFormatter(matchingProduct.getPriceCents())}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <div class="updating-quantity">
                <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.getId()}">
                  Update
                </span>
                <input type="number" min="0" max="50" class="quantity-input js-quantity-input-${matchingProduct.getId()}">
                <span class="save-quantity-link link-primary js-save-quantity-link-${matchingProduct.getId()}" data-product-id="${matchingProduct.getId()}">
                  Save
                </span>
              </div>
              <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.getId()}">
                Delete
              </span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHtml(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;

    let orderSummaryElement = document.querySelector('.js-order-summary');

    // Check if orderSummaryElement is not null before setting its innerHTML
    if (orderSummaryElement) {
      orderSummaryElement.innerHTML += cartSummary;
    } else {
      console.error(`Element with selector .js-order-summary not found.`);
    }


  });

  function deliveryOptionHtml(matchingProduct, cartItem) {
    let deliveryHTML = "";
    deliveryOptions.forEach((delivery) => {
      let today = dayjs();
      let deliveryDays = today.add(delivery.deliveryDays, 'days');
      let datastring = deliveryDays.format('dddd, MMMM D');
      let pricestring = delivery.PriceCents === 0 ? "Free" : `$${priceFormatter(delivery.PriceCents)}-`;
      const isChecked = delivery.id === cartItem.deliveryOptionId;

      deliveryHTML += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.getId()}" data-delivery-id="${delivery.id}">
          <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.getId()}">
          <div>
            <div class="delivery-option-date">
              ${datastring}
            </div>
            <div class="delivery-option-price">
              ${pricestring} shipping
            </div>
          </div>
        </div>
      `;
    });
    return deliveryHTML;
  }

  // Delete link DOM changes
  document.querySelectorAll('.delete-quantity-link').forEach((deleteLink) => {
    let productId = deleteLink.dataset.productId;
    deleteLink.addEventListener('click', () => {
      removeItem(productId);
      const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      cartContainer.remove();
      renderPaymentSummary();
    });
  });

  // Update link DOM changes
  document.querySelectorAll(".update-quantity-link").forEach((updateLink) => {
    let productId = updateLink.dataset.productId;
    updateLink.addEventListener("click", () => {
      let quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      let saveLink = document.querySelector(`.js-save-quantity-link-${productId}`);

      // Show the 'Save' button and the input field
      quantityInput.style.display = "inline";
      saveLink.style.display = "inline";
      quantityInput.style.opacity = 1;
      saveLink.style.opacity = 1;
    });
  });

  // Save link DOM changes
  document.querySelectorAll(".save-quantity-link").forEach((saveLink) => {
    let productId = saveLink.dataset.productId;
    saveLink.addEventListener("click", () => {
      let quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      let updatedQuantity = quantityInput.value;

      // console.log(`q: ${quantityInput.value}`);

      // If the updated quantity is zero, remove the item from the cart
      if (updatedQuantity == 0) {
        removeItem(productId);
        const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        cartContainer.remove();
      } else {
        // Update the quantity in the cart
        cart.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            cartItem.quantity = Number(updatedQuantity);
          }
        });
      }

      savecartLocally(); // Save the updated cart to localStorage
      renderPaymentSummary();
      renderOrderSummary();

      setTimeout(() => {
        quantityInput.style.display = "none";
        saveLink.style.display = "none";
        quantityInput.style.opacity = 0;
        saveLink.style.opacity = 0;
      }, 500);
    });
  });


  // Delivery option changes
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryId } = element.dataset;
      updateDeliveryOption(productId, deliveryId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}


// issue resolved , i was running the function two times , and the promise was not working do not uncomment.
// renderOrderSummary();