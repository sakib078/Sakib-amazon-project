
import { cart } from "../cart.js"
import { priceFormatter } from "../utils/money.js";
import { products } from "../products.js";
import { deliveryOptions } from "../deliveryOptions.js"

export function renderPaymentSummary() {
  console.log("Hello");

  let matchingItems = '';
  let cart_quantity = 0;
  let total_price = 0;
  let priceAfterTax = 0;
  let shippingCharges = 0;
  let tex_fees = 0;
  let finalprize = 0;

  cart.forEach(cartItem => {

    products.forEach(product => {
      if (product.getId() === cartItem.productId) {
        matchingItems = product;
      }
    })

    cart_quantity += cartItem.quantity;
    // console.log(cart_quantity);

    total_price += matchingItems.getPriceCents() * cartItem.quantity;

    deliveryOptions.forEach((delivery) => {
      if (cartItem.deliveryOptionId === delivery.id) {
        shippingCharges += parseFloat(delivery.PriceCents);
      }
    });

    console.log(shippingCharges);

    priceAfterTax = total_price + shippingCharges;
    tex_fees = priceAfterTax * 0.1;
    finalprize = priceAfterTax + tex_fees;

    // console.log(total_price);

    let orderSummary =
      `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${cart_quantity}):</div>
          <div class="payment-summary-money">$${priceFormatter(total_price)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${priceFormatter(shippingCharges)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${priceFormatter(priceAfterTax)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${priceFormatter(tex_fees)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${priceFormatter(finalprize)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
        `
    document.querySelector(".js-payment-summary").innerHTML = orderSummary;
  });
}