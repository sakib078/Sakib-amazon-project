import { cart } from "../scripts/cart.js";
import { priceFormatter } from "./utils/money.js";
import { products, loadProductsFetch } from "./products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export let order = JSON.parse(localStorage.getItem('order')) || [];

export function saveorderLocally() {
    localStorage.setItem('order', JSON.stringify(order));
}

export function addOrder() {
    try {
        document.querySelector('.js-place-order')
            .addEventListener('click', async () => {
                const response = await fetch('https://supersimplebackend.dev/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cart: cart
                    })
                });

                order = await response.json();
                saveorderLocally();
                console.log(order);

                window.location.href = 'orders.html';
            });
    }
    catch (error) {
        console.log('error occurred')
        console.error(error);
    }
}

async function loadCP() {
    console.log('loading page');
    try {
        // throw 'error1';   // here I have created a manual error.
        await loadProductsFetch();
    } catch (error) {
        console.log(`error found: ${error}`);
    }
}

loadCP().then((value) => {
    console.log('next step');
    console.log(value);

    let ordersHTML = '';

    let orderMap = new Map();
    order.products.forEach(OrderedProducts => {
        if (!orderMap.has(order.id)) {
            orderMap.set(order.id, []);
        }
        orderMap.get(order.id).push(OrderedProducts);
    });

    orderMap.forEach((orderedProducts, orderId) => {
        let matchingProducts = orderedProducts.map(op => products.find(p => op.productId === p.getId()));
        let OrderDate = dayjs(order.orderTime);
        let orderDateString = OrderDate.format('MMMM D');

        let orderHTML = `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${orderDateString}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${priceFormatter(order.totalCostCents)}</div>
                        </div>
                    </div>
                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>
        `;

        matchingProducts.forEach((matchingProduct, index) => {
            if (matchingProduct) {
                let OrderedProduct = orderedProducts[index];
                let ArrivingDate = dayjs(OrderedProduct.estimatedDeliveryTime);
                let arrivingDateString = ArrivingDate.format('MMMM D');

                orderHTML += `
                    <div class="order-details-grid">
                        <div class="product-image-container">
                            <img src="${matchingProduct.image}">
                        </div>
                        <div class="product-details">
                            <div class="product-name">
                                ${matchingProduct.name}
                            </div>
                            <div class="product-delivery-date">
                                Arriving on: ${arrivingDateString}
                            </div>
                            <div class="product-quantity">
                                Quantity: ${OrderedProduct.quantity}
                            </div>
                            <button class="buy-again-button button-primary">
                                <img class="buy-again-icon" src="images/icons/buy-again.png">
                                <span class="buy-again-message">Buy it again</span>
                            </button>
                        </div>
                        <div class="product-actions">
                            <a href="tracking.html">
                                <button class="track-package-button button-secondary">
                                    Track package
                                </button>
                            </a>
                        </div>
                    </div>
                `;
            }
        });

        orderHTML += `</div>`; // Close order-container
        ordersHTML += orderHTML;
    });

    document.querySelector('.js-main').innerHTML = ordersHTML;

    console.log(order);
});
