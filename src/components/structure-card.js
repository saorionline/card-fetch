export const cardSketch = (product) => {
    const imageUrl = product.images[0] || "";
    const title = product.title || "Producto Nuevo";
    const price = `$${product.price} `;
    return `
        <section class= "card">
            <img class= "img" src= "${imageUrl} alt="${title}/>
            <h2 ${title} <small> ${price} </small></h2>
        </section>    
    `
};
