import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number, lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  // google apiに送信
  axios
    .get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
    .then(response => {
      throw new Error('座標を取得できませんでした。');
      const coordinates = response.data.results[0].geometry.location;

    })
    .catch(err => {
      alert(err.message);
      console.log(err);
    });
};

form.addEventListener('submit', searchAddressHandler);
