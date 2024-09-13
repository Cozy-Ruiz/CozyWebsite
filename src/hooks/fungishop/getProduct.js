const getProduct = async ( productId, accessToken ) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/apiClient/products/${productId}/`, {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching product:", error);
		alert("Error fetching product:");
		return {};
	}
}

export default getProduct;