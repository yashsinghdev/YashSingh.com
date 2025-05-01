document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".step");
  const nextBtn = document.getElementById("next-btn");
  const backBtn = document.getElementById("back-btn");
  const placeOrderBtn = document.getElementById("place-order-btn");
  const sections = document.querySelectorAll("section");
  let currentStep = 0;

  // Load cart items for order summary
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Initialize checkout steps
  function initCheckout() {
    showStep(currentStep);

    // If cart is empty, redirect to products page
    if (cartItems.length === 0) {
      window.location.href = "products.html";
    }
  }

  // Show current step and hide others
  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      if (index === stepIndex) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });

    sections.forEach((section, index) => {
      if (index === stepIndex) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });

    // Update button visibility
    if (stepIndex === 0) {
      backBtn.classList.add("hidden");
      nextBtn.classList.remove("hidden");
      placeOrderBtn.classList.add("hidden");
    } else if (stepIndex === steps.length - 1) {
      backBtn.classList.remove("hidden");
      nextBtn.classList.add("hidden");
      placeOrderBtn.classList.remove("hidden");
      updateOrderSummary();
    } else {
      backBtn.classList.remove("hidden");
      nextBtn.classList.remove("hidden");
      placeOrderBtn.classList.add("hidden");
    }
  }

  // Next button click handler
  nextBtn.addEventListener("click", function () {
    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
    }
  });

  // Back button click handler
  backBtn.addEventListener("click", function () {
    currentStep--;
    showStep(currentStep);
  });

  // Validate current step before proceeding
  function validateStep(stepIndex) {
    if (stepIndex === 0) {
      // Validate shipping information
      const requiredFields = document.querySelectorAll(
        ".shipping-info input[required], .shipping-info select[required]"
      );
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          field.style.borderColor = "red";
          isValid = false;
        } else {
          field.style.borderColor = "#ddd";
        }
      });

      if (!isValid) {
        alert("Please fill in all required shipping information.");
        return false;
      }
    }

    return true;
  }

  // Update order summary in the final step
  function updateOrderSummary() {
    const orderSummary = document.querySelector(".order-summary");
    let summaryHTML = `
            <h3>Order Items</h3>
            <table class="order-items-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
        `;

    cartItems.forEach((item) => {
      summaryHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
            `;
    });

    const shippingCost = 15.0;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shippingCost + tax;

    summaryHTML += `
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3">Subtotal:</td>
                        <td>$${subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="3">Shipping:</td>
                        <td>$${shippingCost.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="3">Tax:</td>
                        <td>$${tax.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="3"><strong>Total:</strong></td>
                        <td><strong>$${total.toFixed(2)}</strong></td>
                    </tr>
                </tfoot>
            </table>
            
            <div class="shipping-info-summary">
                <h3>Shipping To</h3>
                <p>${document.getElementById("full-name").value}</p>
                <p>${document.getElementById("address").value}</p>
                <p>${document.getElementById("city").value}, ${
      document.getElementById("zip").value
    }</p>
                <p>${document.getElementById("country").value}</p>
            </div>
        `;

    orderSummary.innerHTML = summaryHTML;
  }

  // Place order button click handler
  placeOrderBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // In a real application, you would send the order to your server here
    alert("Order placed successfully! Thank you for your purchase.");

    // Clear the cart
    localStorage.removeItem("cart");

    // Redirect to confirmation page (not implemented in this example)
    window.location.href = "index.html";
  });

  // Initialize checkout process
  initCheckout();
});
