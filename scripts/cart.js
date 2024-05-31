export let cart;


export function loadFromstorage() {
    if (cart === undefined) {
        console.error("cart is undefined");
    }
    else {
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    if (!cart) {
        cart = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '2'
            }
        ];
    }

}



export function savecartLocally() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function matchProduct(productId) {
    let matchingItem;
    loadFromstorage();

    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
            // console.log("Hello1");
        }
    })

    return matchingItem;
}

export function addProductToCart(productId) {

    let matchingItem;

    let option = document.querySelector(`.quantity-selector-${productId}`);

    let product_quantity = option ? Number(option.value) : 1;

    matchingItem = matchProduct(productId);

    if (matchingItem) {
        matchingItem.quantity += product_quantity;
        // console.log("Hello2");
    }
    else {
        cart.push(
            {
                productId: productId,
                quantity: product_quantity,
                deliveryOptionId: '1'
            }
        );
        // console.log("Hello3");
    }
    savecartLocally();

    // Animation for adding to cart.
    cart.forEach((item) => {
        if (productId === item.productId || matchingItem) {
            let added_to_cart = document.querySelector(`.js-added-to-cart-${productId}`);

            // Check if added_to_cart is not null or undefined before accessing its classList
            if (added_to_cart) {
                added_to_cart.classList.add("added-to-cart");
                added_to_cart.style.opacity = 1;
                setTimeout(() => {
                    added_to_cart.classList.remove("added-to-cart");
                    added_to_cart.style.opacity = 0;
                }, 1500);
            } else {
                console.error(`Element with selector .js-added-to-cart-${productId} not found.`);
            }
        }
    })

}

export function calculateCartTotal() {
    let cart_quantity = 0;
    cart.forEach((item) => {
        cart_quantity += item.quantity;
    })

    document.querySelector(".js-cart-quality")
        .innerHTML = cart_quantity;
    // console.log(cart);
    // console.log(cart_quantity);
}

export function removeItem(productId) {
    let newCart = [];
    cart.forEach((cartItem) => {
        // console.log(cartItem.productId);

        if (cartItem.productId != productId) {
            newCart.push(cartItem);
        }

    })

    cart.length = 0;
    Array.prototype.push.apply(cart, newCart);

    savecartLocally();
    // console.log(newCart);
    // console.log(cart);
}


export function updateDeliveryOption(productId, deliveryOptionId) {

    let matchingItem = matchProduct(productId);

    matchingItem.deliveryOptionId = deliveryOptionId;

    savecartLocally();
}


