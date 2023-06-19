const API_KEY =
  'live_SnetZ9QCTvWXxWUMqIsDkC7TcuSmm67DzGWIDTiJ5TBSjogvm0xJzPLx022xx4E1';
const API_URL = 'https://api.thecatapi.com/v1';

export async function fetchBreeds() {
  const response = await fetch(`${API_URL}/breeds`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function fetchCatByBreed(breedId) {
  const response = await fetch(
    `${API_URL}/images/search?breed_ids=${breedId}`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data[0];
}
