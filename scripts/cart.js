export const cart = [];


export function addProductToCart(productId) {

    let matchingItem;

    let option = document.querySelector(`.quantity-selector-${productId}`);

    let product_quantity = Number(option.value);

    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
            console.log("Hello1");
        }
    })

    if (matchingItem) {
        matchingItem.quantity += product_quantity;
        console.log("Hello2");
    }
    else {
        cart.push(
            {
                productId: productId,
                quantity: product_quantity
            }
        );
        console.log("Hello3");
    }

    // Animation for adding to cart.
    cart.forEach((item) => {
        if (productId === item.productId || matchingItem) {
            let added_to_cart = document.querySelector(`.js-added-to-cart-${productId}`);
            added_to_cart.classList.add("added-to-cart");
            added_to_cart.style.opacity = 1;
            setTimeout(() => {
                added_to_cart.classList.remove("added-to-cart");
                added_to_cart.style.opacity = 0;
            }, 1500);

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
    console.log(cart);
    console.log(cart_quantity);
  }