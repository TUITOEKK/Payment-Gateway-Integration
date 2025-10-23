const methods = document.querySelectorAll('.method');
const message = document.getElementById('message');
let selectedMethod = null;

methods.forEach(method => {
  method.addEventListener('click', () => {
    methods.forEach(m => m.classList.remove('selected'));
    method.classList.add('selected');
    selectedMethod = method.dataset.method;
  });
});

document.getElementById('paymentForm').addEventListener('submit', e => {
  e.preventDefault();
  const amount = document.getElementById('amount').value;

  if (!selectedMethod) {
    message.textContent = 'Select a payment method.';
    message.style.color = 'red';
    return;
  }

  if (!amount || amount <= 0) {
    message.textContent = 'Enter a valid amount.';
    message.style.color = 'red';
    return;
  }

  message.textContent = `You selected ${selectedMethod} and entered amount ${amount}.`;
  message.style.color = 'green';
});
