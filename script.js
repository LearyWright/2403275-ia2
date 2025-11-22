/*
Name: Leary Wright
ID: 2403275
Assignment: Individual Assignment #2
*/

// pop ups and cart declaration
// popups
function openPopup(type) {
  document.getElementById("popup-bg").style.display = "flex";
  document.getElementById("login").style.display = (type === "login") ? "block" : "none";
  document.getElementById("register").style.display = (type === "register") ? "block" : "none";
}

function closePopup() {
  document.getElementById("popup-bg").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "none";
}

// init cart
if (!localStorage.getItem("count")) {
  localStorage.setItem("count", 0);
}

// show message
function showCartMsg(text) {
  var msg = document.getElementById("cart-msg");
  msg.innerHTML = text;
  msg.style.display = "block";
  setTimeout(function() { msg.style.display = "none"; }, 1200);
}

// add to cart
function addToCart(name, price) {
  var c = Number(localStorage.getItem("count")) + 1;
  localStorage.setItem("count", c);
  localStorage.setItem("name" + c, name);
  localStorage.setItem("price" + c, price);
  showCartMsg(name + " added to cart!");
  if (document.getElementById("cart-body")) loadCart();
}

// load cart
function loadCart() {
  var body = document.getElementById("cart-body");
  if (!body) return;

  body.innerHTML = "";
  var total = 0;
  var count = Number(localStorage.getItem("count"));

  for (var i = 1; i <= count; i++) {
    var name = localStorage.getItem("name" + i);
    var price = Number(localStorage.getItem("price" + i));
    if (name && price) {
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + name + "</td><td>$" + price.toFixed(2) + "</td><td>1</td><td>$" + price.toFixed(2) + "</td>";
      body.appendChild(tr);
      total += price;
    }
  }

  document.getElementById("cart-total").innerHTML = "$" + total.toFixed(2);
  localStorage.setItem("total", total);
}

// clear cart
function clearCart() {
  localStorage.clear();
  alert("Cart cleared!");
  window.location = "index.html";
}

// checkout total
function loadTotal() {
  var t = Number(localStorage.getItem("total")) || 0;
  document.getElementById("order-total").innerHTML = "$" + t.toFixed(2);
}

// confirm order
function confirmOrder() {
  var t = Number(localStorage.getItem("total")) || 0;
  localStorage.setItem("final", t);
  window.location = "invoice.html";
}

// invoice
function loadInvoice() {
  var t = Number(localStorage.getItem("final")) || 0;
  var tax = t * 0.10;
  var grand = t + tax;
  document.getElementById("invoice-total").innerHTML = "$" + t.toFixed(2);
  document.getElementById("invoice-tax").innerHTML = "$" + tax.toFixed(2);
  document.getElementById("invoice-grand").innerHTML = "$" + grand.toFixed(2);
}