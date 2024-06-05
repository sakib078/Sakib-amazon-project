import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "./cart-class.js";
import { loadProductsFetch } from "../scripts/products.js";
import { loadCart } from "../scripts/cart.js";



/*

async await is much more cleaner way for promises and callbacks , it let us write the code in normal way.
await: let us wait for that function to finish first by prioritizing it then go to the next step.
*/

/*
error handling: 

1. we can use eventlistner function for something that we are using for eventlistner thing.
2. Try , catch method can be used to handle the error. But, we only use them when it is out of our control.
3. and what we can control for that one of the usecase could be to use throw error means manually create it. 


reject() function : let us create an error in future.
*/

// more cleaner way to use the promises.
async function loadCP() {
    console.log('loading page');

    try {
        // throw 'error1';   here i have created a manual error.
        await loadProductsFetch();

        await new Promise((resolve, reject) => {
            loadCart(() => {
                console.log('finish loading cart items');
                resolve();
            });
        })
    } catch (error) {
        console.log(`error found: ${error}`);
    }



    console.log('Loading payment summary');
    renderOrderSummary();
    renderPaymentSummary();

    return 'value await';
}

loadCP().then((value) => {

    console.log('next step');
    console.log(value);
})




// function loadCheckout() {

//     // Promise.all([
//     //     loadProductsFetch() // this thing is returing the promise directly, So no need to mention promise.
//     //     ,
//     //     new Promise((resolve, reject) => {
//     //         loadCart(() => {
//     //             console.log('finish loading cart items');
//     //             resolve();
//     //         });
//     //     })
//     // ]).then((values) => {
//     //     console.log(values);
//     //     console.log('Loading payment summary');
//     //     renderOrderSummary();
//     //     renderPaymentSummary();
//     // })

//     // new Promise((resolve, reject) => {
//     //     console.log('start promise');

//     //     loadProducts(() => {
//     //         console.log('finish loading product items ');
//     //         resolve('value1'); // Resolve the promise after finishing loading(wait untile the loading done).
//     //     });
//     // })
//     //     .then((value) => {
//     //         console.log('next step');
//     //         return new Promise((resolve, reject) => {
//     //             loadCart(() => {
//     //                 console.log('finish loading cart items');
//     //                 resolve();
//     //             });
//     //         });
//     //     })
//     //     .then(() => {
//     //         console.log('Loading payment summary');
//     //         renderOrderSummary();
//     //         renderPaymentSummary();
//     //     })
//     //     .catch((error) => {
//     //         console.error('Error in loadCheckout:', error);
//     //     });
// }

// loadCheckout();


//// issue resolved for promise not working bcuz of running the function two times not giving beckend
/// call enought time to run the promise bcuz of the asynchrounous nature the loadProduct was not loading using promise.
/// check the ordersummary last part of the code to see what wad the issue.


/*
promises let us flatten our code , No need to do nesting using callback function.

We can give resolve a value.

promise.all() , let us run mulltiple promises and wait for all to finish at the same time.
*/





