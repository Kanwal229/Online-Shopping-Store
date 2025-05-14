// Sample product data


const products = [
    {
      id: 1,
      name: 'Glasses',
      price: 2500,
      image: 'images/glasses picture.jpg'
    },
    {
        id: 2,
        name: 'Mens Watch',
        price: 10500,
        image: 'images/mens-watch.jpg'
      },
      {
        id: 3,
        name: 'Women Watch',
        price: 7500,
        image: 'images/women-watch.jpg'
      },
      {
        id: 4,
        name: 'Mens Wallet',
        price: 4000,
        image: 'images/wallet.jpg'
      },
      {
        id: 5,
        name: 'Mobile Cover',
        price: 1200,
        image: 'images/mobile-cover.jpg'
      },
      {
        id: 6,
        name: 'Tumbler',
        price: 2300,
        image: 'images/Tumbler.jpg'
      },
      {
        id: 7,
        name: 'Women Bag',
        price: 4500,
        image: 'images/women-bag.jpg'
      },
      {
        id: 8,
        name: 'SunBlock',
        price: 1500,
        image: 'images/SunBlock.jpg'
      },
    {
      id: 9,
      name: 'Ring',
      price: 1300,
      image: 'images/Ring.jpg'
    },
    {
      id: 10,
      name: 'Air Pods',
      price: 2300,
      image: 'images/Air pods.jpg'
    },
    {
      id: 11,
      name: 'Uroosa Perfume',
      price: 4500,
      image: 'images/Uroosa.jpg'
    },
    {
      id: 12,
      name: 'Body Spary',
      price: 1200,
      image: 'images/Body-Spray.jpg'
    },
  ];
    
  
  // Currency formatter for PKR
  const currencyFormatter = new Intl.NumberFormat('ur-PK', {
    style: 'currency',
    currency: 'PKR',
  });
  
  const productsContainer = document.querySelector('.products');
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalElement = document.querySelector('.total');
  const checkoutButton = document.getElementById('checkout');
  
  let cart = [];
  
  // Display products
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <h3>${product.name}</h3>
      <p>Price: ${currencyFormatter.format(product.price)}</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productsContainer.appendChild(productDiv);
  });
  
  // Add to cart functionality
  productsContainer.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      const id = parseInt(e.target.getAttribute('data-id'));
      const product = products.find(p => p.id === id);
      const cartItem = cart.find(item => item.id === id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      updateCart();
    }  
  });
  // Update cart display
  function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const li = document.createElement('li');
      li.classList.add('cart-item');
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
        <span>${item.name} x ${item.quantity} - ${currencyFormatter.format(item.price * item.quantity)}</span>
      `;
      cartItemsContainer.appendChild(li);
    });
    totalElement.textContent = currencyFormatter.format(total);
  }
  
  
  // Checkout functionality
  checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    let summary = 'Order Summary:\n';
    cart.forEach(item => {
      summary += `${item.name} x ${item.quantity} - ${currencyFormatter.format(item.price * item.quantity)}\n`;
    });
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    summary += `Total: ${currencyFormatter.format(totalAmount)}`;
    alert(summary);
    cart = [];
    updateCart();
  });
  
  // Reference to the search input field
const searchInput = document.getElementById('searchInput');

// Event listener for input changes
searchInput.addEventListener('input', function () {
  const query = searchInput.value.toLowerCase();
  const productElements = document.querySelectorAll('.product');

  productElements.forEach(product => {
    const name = product.querySelector('h3').textContent.toLowerCase();
    if (name.includes(query)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
});
