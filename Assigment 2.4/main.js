const inputElement = document.querySelector('input');
let paragraphElement;

inputElement.addEventListener('input', async () => {
  const zipCodeField = inputElement.value;

  if (zipCodeField.length !== 5 && paragraphElement) {
    paragraphElement.remove();
    paragraphElement = undefined;
  }

  if (zipCodeField.length === 5) {
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zipCodeField}`);

      if (!response.ok) {
        throw new Error('Invalid zip code');
      }

      const data = await response.json();
      const cityName = data.places[0]['place name'];
      const state = data.places[0]['state'];

      paragraphElement = document.createElement('p');
      paragraphElement.innerText = 'Zip code ' + zipCodeField + ' is in ' + cityName + ', ' + state;

      document.body.appendChild(paragraphElement);
    } catch (error) {

      if (paragraphElement) {
        paragraphElement.remove();
      }
      
      paragraphElement = document.createElement('p');
      paragraphElement.innerText = 'Sorry, this zip code does not exist.';
      paragraphElement.style.color = 'red';

      document.body.appendChild(paragraphElement);
    }
  }
});
