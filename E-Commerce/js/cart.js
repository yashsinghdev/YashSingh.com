document.addEventListener("DOMContentLoaded", function () {
  // Load cart items from localStorage or initialize empty array
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".cart-items");
  const emptyCartMessage = document.querySelector(".empty-cart-message");
  const cartSummary = document.querySelector(".cart-summary");

  // Display cart items
  function displayCartItems() {
    if (cartItems.length === 0) {
      emptyCartMessage.style.display = "block";
      cartSummary.style.display = "none";
      return;
    }

    emptyCartMessage.style.display = "none";
    cartSummary.style.display = "block";

    let cartHTML = "";
    let subtotal = 0;

    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="images/products/${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <button class="decrease-btn" data-id="${
                              item.id
                            }">-</button>
                            <input type="number" value="${
                              item.quantity
                            }" min="1" class="quantity-input" data-id="${
        item.id
      }">
                            <button class="increase-btn" data-id="${
                              item.id
                            }">+</button>
                        </div>
                        <button class="cart-item-remove" data-id="${
                          item.id
                        }">Remove</button>
                    </div>
                </div>
            `;
    });

    cartContainer.innerHTML = cartHTML;
    document.querySelector(".subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector(".total-amount").textContent = `$${subtotal.toFixed(
      2
    )}`;

    // Add event listeners to buttons
    document.querySelectorAll(".decrease-btn").forEach((btn) => {
      btn.addEventListener("click", decreaseQuantity);
    });

    document.querySelectorAll(".increase-btn").forEach((btn) => {
      btn.addEventListener("click", increaseQuantity);
    });

    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", updateQuantity);
    });

    document.querySelectorAll(".cart-item-remove").forEach((btn) => {
      btn.addEventListener("click", removeItem);
    });
  }

  // Decrease quantity
  function decreaseQuantity(e) {
    const id = e.target.getAttribute("data-id");
    const item = cartItems.find((item) => item.id == id);

    if (item.quantity > 1) {
      item.quantity--;
      updateCart();
    }
  }

  // Increase quantity
  function increaseQuantity(e) {
    const id = e.target.getAttribute("data-id");
    const item = cartItems.find((item) => item.id == id);
    item.quantity++;
    updateCart();
  }

  // Update quantity from input
  function updateQuantity(e) {
    const id = e.target.getAttribute("data-id");
    const quantity = parseInt(e.target.value);

    if (quantity > 0) {
      const item = cartItems.find((item) => item.id == id);
      item.quantity = quantity;
      updateCart();
    } else {
      e.target.value = 1;
    }
  }

  // Remove item from cart
  function removeItem(e) {
    const id = e.target.getAttribute("data-id");
    cartItems = cartItems.filter((item) => item.id != id);
    updateCart();
  }

  // Update cart in localStorage and refresh display
  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayCartItems();
  }

  // Initialize cart display
  displayCartItems();
});
