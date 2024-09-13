const getOrder = async ( orderId ) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/apiClient/orders/${orderId}/`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching order:", error);
		alert("Error fetching order:");
		return {};
	}
}

export default getOrder;