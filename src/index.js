import { pagesWithProducts } from './components/fetch-api.js';

window.addEventListener( 'load', async () => {
    const products = await pagesWithProducts(1);
});

