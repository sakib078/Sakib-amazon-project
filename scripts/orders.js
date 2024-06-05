import { cart } from "../scripts/cart.js";

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
        console.log('error occured')
        console.error(error);
    }

}

