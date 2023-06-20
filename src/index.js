import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function showLoader() {
  loader.classList.remove('hidden');
  breedSelect.classList.add('hidden');
  catInfo.classList.add('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
  breedSelect.classList.remove('hidden');
  catInfo.classList.remove('hidden');
}

function showError() {
  //   error.classList.remove('hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!',
    {
      timeout: 4000,
    }
  );
}

function hideError() {
  error.classList.add('hidden');
}

async function loadBreeds() {
  showLoader();
  hideError();
  try {
    const breeds = await fetchBreeds();
    console.log(breeds);
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    new SlimSelect({
      select: '#single',
    });
  } catch (err) {
    showError();
    document.querySelector('.wraper').classList.add('hidden');
  } finally {
    hideLoader();
  }
}

async function loadCatByBreed(breedId) {
  showLoader();
  hideError();
  try {
    const cat = await fetchCatByBreed(breedId);
    console.log(cat);
    catInfo.innerHTML = `
      <img src="${cat.url}" alt="${cat.breeds[0].name}" width="400px" class="imgStyle">
      <div class="infoCat"><h2 class="breed">${cat.breeds[0].name}</h2>
      <p>${cat.breeds[0].description}</p>
      <p class="temperament"><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p></div>
      
    `;
  } catch (err) {
    catInfo.innerHTML = '';
    showError();
  } finally {
    hideLoader();
  }
}

breedSelect.addEventListener('change', event => {
  loadCatByBreed(event.target.value);
});

loadBreeds();
