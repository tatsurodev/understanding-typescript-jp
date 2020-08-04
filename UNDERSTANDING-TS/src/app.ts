const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  // google apiに送信
};

form.addEventListener('submit', searchAddressHandler);
