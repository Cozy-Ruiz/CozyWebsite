const getCategories = async () => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/apiClient/products/categories/?organization=1`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching categories:", error);
		alert("Error fetching categories:");
		return [];
	}
}

export default getCategories;

