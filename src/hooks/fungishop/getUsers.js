const getUsers = async () => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/apiClient/users/?organization_id=1`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching products:", error);
		alert("Error fetching products:");
		return [];
	}
}

export default getUsers;