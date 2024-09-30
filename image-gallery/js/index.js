const accessKey = 'w5qDyHiYQqv5A4Kj3GHcWmYh-pIEfbA7y1gAZ7NBqrk';
const galleryContainer = document.querySelector('.gallery-container');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

let query = 'mountains';

async function getData(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=${accessKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const urls = [];

    if(!data.results.length) {
      galleryContainer.innerHTML = '<p class="error">Ничего не нашлось. Попробуйте другой запрос</p>'
    } else {
      data.results.forEach(picture => {
        urls.push(picture.urls.regular)
      })
      showImages(urls);
    }
  } catch(e) {
    galleryContainer.innerHTML = '<p class="error">Слишком много запросов. Попробуйте позже</p>'
  }
}

getData(query);