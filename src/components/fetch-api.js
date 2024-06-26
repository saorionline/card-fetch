const appElement = document.getElementById("app");

export const getData = async (page = 1) => {
  try {
    const api = process.env.PLATZI_API;

    const response = await fetch(`${api}?offset=${10 * (page - 1)}&limit=10`);
    if (!response.ok) {
      throw new Error(`La solicitud de API ha fallado bajo el estado: ${response.status}`);
    }
    const rawProducts = await response.json();
    return Promise.resolve(rawProducts); // Return a Promise resolving with products
  } catch (error) {
    console.error("Obteniendo datos... fallido:", error);
    // Handle errors based on their type (optional):
    return Promise.reject([]); // Return a rejected Promise with an empty array
  }
};

export async function loadData() {
  try {
    const products = await getData();
    const nodeArray = products.map((product) => {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('items');

      //Loop through product images array (assuming product.images exists)
      product.images.forEach((imageUrl, index) => {
        if (index === 1) { // Check for the functional image
          const image = document.createElement('img');
          image.className = 'img';
          image.src = `${imageUrl}`;
          image.src = imageUrl.slice(1, -1); // Remove first and last character (assuming quotes)
          image.alt = "New Product";
          imageContainer.appendChild(image);
        }
      });

      //Wrap images and priceAndTitle (if using container)
      const card = document.createElement('div');
      card.classList.add('card');
      card.appendChild(imageContainer);
      return card;
    });

    appElement.append(...nodeArray);
  } catch (error) {
    console.error("Disculpa, error!:", error);
  }
}
