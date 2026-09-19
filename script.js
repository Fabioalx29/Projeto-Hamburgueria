// ===================== //
// Menu mobile            //
// ===================== //

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// ===================== //
// Carrinho de compras    //
// ===================== //

const WHATSAPP_NUMBER = '5511999999999';
const STORAGE_KEY = 'devburger-cart';

const cartToggle = document.getElementById('cartToggle');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsEl = document.getElementById('cartItems');
const cartEmptyEl = document.getElementById('cartEmpty');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');
const cartCheckoutBtn = document.getElementById('cartCheckout');

let cart = loadCart();

function loadCart() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (err) {
        return [];
    }
}

function saveCart() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
        // Se o armazenamento não estiver disponível, o carrinho
        // continua funcionando normalmente durante a sessão.
    }
}

function formatBRL(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function addToCart(name, price) {
    const existing = cart.find((item) => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    saveCart();
    renderCart();
    openCart();
}

function changeQty(name, delta) {
    const item = cart.find((item) => item.name === name);
    if (!item) return;

    item.qty += delta;

    if (item.qty <= 0) {
        cart = cart.filter((i) => i.name !== name);
    }

    saveCart();
    renderCart();
}

function removeFromCart(name) {
    cart = cart.filter((item) => item.name !== name);
    saveCart();
    renderCart();
}

function cartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCart() {
    cartItemsEl.innerHTML = '';

    const isEmpty = cart.length === 0;
    cartEmptyEl.style.display = isEmpty ? 'block' : 'none';
    cartItemsEl.style.display = isEmpty ? 'none' : 'block';
    cartCheckoutBtn.disabled = isEmpty;

    cart.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'cart-item';

        li.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">${formatBRL(item.price * item.qty)}</span>
            <div class="cart-item-qty">
                <button type="button" data-action="dec" aria-label="Diminuir quantidade">−</button>
                <span>${item.qty}</span>
                <button type="button" data-action="inc" aria-label="Aumentar quantidade">+</button>
            </div>
            <button type="button" class="cart-item-remove" data-action="remove">Remover</button>
        `;

        li.querySelector('[data-action="inc"]').addEventListener('click', () => changeQty(item.name, 1));
        li.querySelector('[data-action="dec"]').addEventListener('click', () => changeQty(item.name, -1));
        li.querySelector('[data-action="remove"]').addEventListener('click', () => removeFromCart(item.name));

        cartItemsEl.appendChild(li);
    });

    cartTotalEl.textContent = formatBRL(cartTotal());

    const count = cartCount();
    cartCountEl.textContent = count;
    cartCountEl.style.display = count > 0 ? 'flex' : 'none';
}

function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
}

function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
}

function checkout() {
    if (cart.length === 0) return;

    const lines = cart.map(
        (item) => `${item.qty}x ${item.name} - ${formatBRL(item.price * item.qty)}`
    );

    const message =
        'Olá! Gostaria de fazer o seguinte pedido:\n\n' +
        lines.join('\n') +
        `\n\nTotal: ${formatBRL(cartTotal())}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Botões "Adicionar ao carrinho" no cardápio
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const { name, price } = button.dataset;
        addToCart(name, parseFloat(price));

        const originalText = button.textContent;
        button.textContent = 'Adicionado ✓';
        button.classList.add('added');
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('added');
        }, 1200);
    });
});

cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
cartCheckoutBtn.addEventListener('click', checkout);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
});

renderCart();
