let removeCartButtons = document.getElementsByClassName("btn-danger");
let addToCartButtons = document.getElementsByClassName("shop-item-button");

for (let i = 0; i < removeCartButtons.length; i++) {
  let button = removeCartButtons[i];
  button.addEventListener("click", removeButton);
}

let quantityImputs = document.getElementsByClassName("cart-quantity-input");
for (let i = 0; i < quantityImputs.length; i++) {
  let input = quantityImputs[i];
  input.addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeButton(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addToCartClicked);
}

let purchaseButton = document.getElementsByClassName('btn-purchase')[0]
purchaseButton.addEventListener('click', purchaseItems)

function purchaseItems(){
    alert('thanks for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$0'
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement
  let name = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  addItemToCart(name, price, imageSrc)
}

function addItemToCart(name, price, image) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemsNames = document.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == name) {
        alert('item alrready on the cart')
        return;
    }
  }
  let cartRowContent = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${image}" width="100" height="100">
        <span class="cart-item-title">${name}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeButton)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
  updateCartTotal();
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    let price = parseFloat(
      cartRow.getElementsByClassName("cart-price")[0].innerText.replace("$", "")
    );
    let quantity = cartRow.getElementsByClassName("cart-quantity-input")[0]
      .value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  let cartTotalElement = (document.getElementsByClassName(
    "cart-total-price"
  )[0].innerText = `$${total}`);
}
