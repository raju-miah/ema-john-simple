import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    // get products
    const productsData = await fetch('http://localhost:5000/products');
    const { products } = await productsData.json();
    // console.log(products);

    // get cart
    const savedCart = getStoredCart();
    // console.log(savedCart);
    const initialCart = [];
    for (const id in savedCart) {
        // console.log(id)
        const addedProduct = products.find(product => product._id === id);
        // console.log(addedProduct);
        if (addedProduct) {
            const quantity = savedCart[id];
            // console.log(quantity)
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }
    }
    return { products, initialCart };

}