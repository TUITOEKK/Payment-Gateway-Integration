const methods = document.querySelectorAll('.method');
const message = document.getElementById('message');
const paymentDetails = document.querySelectorAll('.payment-details');
let selectedMethod = null;

// Hide all payment detail sections on load
paymentDetails.forEach(section => section.style.display = 'none');

// Handle method selection and deselection
methods.forEach(method => {
  method.addEventListener('click', () => {
    const methodType = method.dataset.method;

    // If clicking the already selected method, deselect it
    if (selectedMethod === methodType) {
      method.classList.remove('selected');
      selectedMethod = null;
      paymentDetails.forEach(section => section.style.display = 'none');
      return;
    }

    // Otherwise, select new method
    methods.forEach(m => m.classList.remove('selected'));
    method.classList.add('selected');
    selectedMethod = methodType;

    // Hide all sections
    paymentDetails.forEach(section => section.style.display = 'none');

    // Show selected section
    document.getElementById(`${selectedMethod}-details`).style.display = 'block';
  });
});

// Handle form submission
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
