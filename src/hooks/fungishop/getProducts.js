const getProducts = async ( accessToken ) => {

	try {

		const response = await fetch(`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/apiClient/products/?organization=1`, {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		})

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching products:", error);
		alert(`Error fetching products:`);
		return [];
	}
}

export default getProducts;