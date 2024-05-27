let productHtml = '';

products.forEach((product) => {

  productHtml += `
    <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src=" ${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container js-product-quantity-container">
          <select class="quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button js-add-to-cart " data-product-id ="${product.id}">
          Add to Cart
        </button>
      </div>
    `
})

console.log(productHtml);

// adding the html into the page

document.querySelector(".js-product-grid").innerHTML = productHtml;


document.querySelectorAll(".js-add-to-cart")
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      let matchingItem;
      let cart_quantity = 0;


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

      cart.forEach((item) => {
        cart_quantity += item.quantity;
      })

      document.querySelector(".js-cart-quality")
        .innerHTML = cart_quantity;
      console.log(cart);
      console.log(cart_quantity);


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

    })
  })



// let quantity_selector = selectContainer.querySelector(".quantity-selector");

// console.log(`qs: ${quantity_selector.innerHTML}`);




