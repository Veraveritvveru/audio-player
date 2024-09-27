const url = 'https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=w5qDyHiYQqv5A4Kj3GHcWmYh-pIEfbA7y1gAZ7NBqrk';

async function getData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
  } catch(e) {
    // console.log(e);
  alert('попробуйте по другому');
  }
}

getData();

function createHtmlElem(tag, className, parent) {
  const element = document.createElement(tag);
  element.classList.add(className);
  parent.append(element);
}

const imageContainer = document.querySelector('.image-container');

for (let i = 0; i <= 30; i++) {
  createHtmlElem('div', 'gallery-item', imageContainer);
}

// function createImages() {
//   const container = document.createElement('div');
//   container
// }