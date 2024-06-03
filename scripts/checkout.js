import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "./cart-class.js";
import { loadProductsFetch } from "../scripts/products.js";
import { loadCart } from "../scripts/cart.js";



function loadCheckout() {

    Promise.all([
        loadProductsFetch() // this thing is returing the promise directly, So no need to mention promise.
        ,
        new Promise((resolve, reject) => {
            loadCart(() => {
                console.log('finish loading cart items');
                resolve();
            });
        })
    ]).then((values) => {
        console.log(values);
        console.log('Loading payment summary');
        renderOrderSummary();
        renderPaymentSummary();
    })

    // new Promise((resolve, reject) => {
    //     console.log('start promise');

    //     loadProducts(() => {
    //         console.log('finish loading product items ');
    //         resolve('value1'); // Resolve the promise after finishing loading(wait untile the loading done).
    //     });
    // })
    //     .then((value) => {
    //         console.log('next step');
    //         return new Promise((resolve, reject) => {
    //             loadCart(() => {
    //                 console.log('finish loading cart items');
    //                 resolve();
    //             });
    //         });
    //     })
    //     .then(() => {
    //         console.log('Loading payment summary');
    //         renderOrderSummary();
    //         renderPaymentSummary();
    //     })
    //     .catch((error) => {
    //         console.error('Error in loadCheckout:', error);
    //     });
}

loadCheckout();



//// issue resolved for promise not working bcuz of running the function two times not giving beckend
/// call enought time to run the promise bcuz of the asynchrounous nature the loadProduct was not loading using promise.
/// check the ordersummary last part of the code to see what wad the issue.


/*
promises let us flatten our code , No need to do nesting using callback function.

We can give resolve a value.

promise.all() , let us run mulltiple promises and wait for all to finish at the same time.
*/







