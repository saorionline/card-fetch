import { getData, loadData } from './components/fetch-api.js';
async function fetchData() {
    try {
        const products = await getData();
        loadData(products);
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}

fetchData();