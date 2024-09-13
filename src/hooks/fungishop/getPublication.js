const getPublication = async ( postId ) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/apiClient/blog/Post/${postId}/`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching publication:", error);
		alert("Error fetching publication:");
		return [];
	}
}

export default getPublication;