const FetchDT = async ({ type, searchWord }) => {
    const url = `https://baseline-preset-modern-2.myshopify.com/collections/${type}/products.json`;
    let products = [];
    let error = null;
    const search = searchWord

    try {
        const res = await fetch(url, { next: { revalidate: 120 } });
        if (!res.ok) {
            throw new Error('Failed to get products');
        }
        const data = await res.json();
        products = data.products || [];
    } catch (err) {
        error = err.message;
    }
    const cleanedSearch = search?.trim().toLowerCase() || '';
    let searchedProducts = products.filter(product => product.title.toLowerCase().includes(cleanedSearch)) || [];
    return { products, error, searchedProducts }
}
export default FetchDT