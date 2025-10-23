const methods = document.querySelectorAll('.method');
const message = document.getElementById('message');
const paymentDetails = document.querySelectorAll('.payment-details');
const confirmationPopup = document.getElementById('confirmationPopup');
const confirmText = document.getElementById('confirmText');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');
let selectedMethod = null;

paymentDetails.forEach(section => section.style.display = 'none');

methods.forEach(method => {
  method.addEventListener('click', () => {
    const methodType = method.dataset.method;
    if (selectedMethod === methodType) {
      method.classList.remove('selected');
      selectedMethod = null;
      paymentDetails.forEach(section => section.style.display = 'none');
      return;
    }
    methods.forEach(m => m.classList.remove('selected'));
    method.classList.add('selected');
    selectedMethod = methodType;
    paymentDetails.forEach(section => section.style.display = 'none');
    document.getElementById(`${selectedMethod}-details`).style.display = 'block';
  });
});

document.getElementById('paymentForm').addEventListener('submit', e => {
  e.preventDefault();
  message.textContent = '';
  message.style.color = 'red';

  const amount = document.getElementById('amount').value.trim();
  if (!amount || amount <= 0) {
    message.textContent = 'Enter a valid amount.';
    return;
  }

  if (!selectedMethod) {
    message.textContent = 'Select a payment method.';
    return;
  }

  let valid = false;
  let displayDetail = '';

  if (selectedMethod === 'mpesa') {
    const phone = document.getElementById('mpesaNumber').value.trim();
    valid = /^07\d{8}$/.test(phone);
    if (!valid) {
      message.textContent = 'Enter a valid Mpesa number.';
      return;
    }
    displayDetail = phone.slice(0, 4) + '******' + phone.slice(-2);
  }

  if (selectedMethod === 'paypal') {
    const email = document.getElementById('paypalEmail').value.trim();
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      message.textContent = 'Enter a valid PayPal email.';
      return;
    }
    const parts = email.split('@');
    displayDetail = parts[0].slice(0, 2) + '***@' + parts[1];
  }

  if (selectedMethod === 'visa') {
    const card = document.getElementById('cardNumber').value.replace(/\s+/g, '');
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    valid =
      /^\d{16}$/.test(card) &&
      /^\d{2}\/\d{2}$/.test(expiry) &&
      /^\d{3}$/.test(cvv);
    if (!valid) {
      message.textContent = 'Enter valid Visa details.';
      return;
    }
    displayDetail = '**** **** **** ' + card.slice(-4);
  }

  confirmText.textContent = `Confirm payment of ${amount} using ${selectedMethod.toUpperCase()} (${displayDetail})`;
  confirmationPopup.style.display = 'flex';
});

confirmYes.addEventListener('click', () => {
  confirmationPopup.style.display = 'none';
  window.location.href = 'success.html';
});

confirmNo.addEventListener('click', () => {
  confirmationPopup.style.display = 'none';
  message.style.color = 'orange';
  message.textContent = 'Payment canceled.';
});
