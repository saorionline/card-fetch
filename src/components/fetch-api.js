import { cardSketch } from './structure-card.js';

const url = process.env.PLATZI_API;

export async function pagesWithProducts(page) {
  return fetchPages(page)
  .then( products => loadElements(products));
}

async function fetchPages(page){
  const offset = (page - 1 ) * STEPS;
  const limit = Number(process.env.LIMIT) || 10;

  const url = `${PLATZI_API}?offset=${offset}&limit=${limit}`;
  try {
    const products = await getData(url);
    return products
  } catch(error) {
    console.error('Error al obtener los datos:', error)
  }
}

const getData = async (url) => {
  try{
    const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`La solicitud ha fallado con el error ${response.status}`);
      }
      const rawProducts = await response.json();
      const processedProducts = rawProducts.map((product, index) => cardSketch(product, index));
      return processedProducts;
  } catch(error) {
    if (error.name === 'NetworkError')  {
      throw new Error('Error en la obtención de datos');
    } else {
      throw Error
    }
    return [];
  }
}

async function loadElements() {
  try {
    const products = await getData(); // Wait for data from getData
    
    if (!products || products.length === 0) {
      // Handle empty product data (optional)
      console.warn("No se han encontrado productos.");
      return;
    }
    const makeSection = document.createElement('section');
    makeSection.classList.add('card');
    const sectionSelector = document.querySelector('.card'); 

    if(sectionSelector) {
      const fragment = document.createDocumentFragment();
      products.forEach((product) => {
        const image = document.createElement('img');
        image.className = 'img'; // Add the class "img"
        image.src = product.images[0]; // Access the first image URL
        image.alt = product.title || "New Product"; // Set alt text (use product title if available)
  
        // Create the title element with price
        const title = document.createElement('h2');
        title.textContent = `${product.title}`; // Set the title text
        const priceSpan = document.createElement('small');
        priceSpan.textContent = `$${product.price}`; // Set the price text
        title.appendChild(priceSpan); // Append the price span to the title element
          try {
            fragment.append(image,title)
          } catch (error) {
            console.error ('Error al añadir elementos:', error);
          }
        }
      );
     sectionSelector.appendChild(fragment);     
    } else {
      console.error('Error: Elemento contenedor ".box" no encontrado');
      }
    } catch (error) {
      console.error('Error en la obtención de datos:', error);
    }
}