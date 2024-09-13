const getPublications = async () => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/apiClient/blog/?organization=1`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching publications:", error);
		alert("Error fetching publications:");
		return [];
	}
}

export default getPublications;