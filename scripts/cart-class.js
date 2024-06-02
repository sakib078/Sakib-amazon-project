class Cart {

    cartItems = undefined;
    localStorageKey = undefined;

    constructor(localStorageKey) {

        this.localStorageKey = localStorageKey;
        this.loadFromstorage();

    }

    loadFromstorage() {
        if (this.cartItems === undefined) {
            console.error("cart is undefined");
        }
        else {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        }

        if (!this.cartItems) {
            this.cartItems = [
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

    savecartLocally() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    }

    matchProduct(productId) {
        let matchingItem;
        this.loadFromstorage;

        this.cartItems.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
                // console.log("Hello1");
            }
        })

        return matchingItem;
    }


    addProductToCart(productId) {

        let matchingItem;

        let option = document.querySelector(`.quantity-selector-${productId}`);

        let product_quantity = option ? Number(option.value) : 1;

        matchingItem = this.matchProduct(productId);

        if (matchingItem) {
            matchingItem.quantity += product_quantity;
            // console.log("Hello2");
        }
        else {
            this.cartItems.push(
                {
                    productId: productId,
                    quantity: product_quantity,
                    deliveryOptionId: '1'
                }
            );
            // console.log("Hello3");
        }
        this.savecartLocally();

        // Animation for adding to cart.
        this.cartItems.forEach((item) => {
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

    calculateCartTotal() {
        let cart_quantity = 0;
        this.cartItems.forEach((item) => {
            cart_quantity += item.quantity;
        })

        document.querySelector(".js-cart-quality")
            .innerHTML = cart_quantity;
        // console.log(cart);
        // console.log(cart_quantity);
    }

    removeItem(productId) {
        let newCart = [];
        this.cartItems.forEach((cartItem) => {
            // console.log(cartItem.productId);

            if (cartItem.productId != productId) {
                newCart.push(cartItem);
            }

        })

        this.cartItems.length = 0;
        Array.prototype.push.apply(this.cartItems, newCart);

        savecartLocally();
        // console.log(newCart);
        // console.log(cart);
    }

    updateDeliveryOption(productId, deliveryOptionId) {

        let matchingItem = matchProduct(productId);

        matchingItem.deliveryOptionId = deliveryOptionId;

        savecartLocally();
    }

}



let cart = new Cart('cart-oop');
let cartbusiness = new Cart('cart-bussiness');


// cart.addProductToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b');
// cartbusiness.addProductToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b');


console.log(cart);
console.log(cartbusiness);

