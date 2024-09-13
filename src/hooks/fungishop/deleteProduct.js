const deleteProduct = async (product, fetchData) => {

	let res = confirm('Are you sure you want to delete this product?');

	if(res == true){

		try {
			const response = await fetch(`http://localhost:8000/apiClient/products/${product.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				console.log('Product delete successfully');
                fetchData();
			} else {
				console.log('Failed to delete product');
				alert('Failed to delete product');
			}
		} catch (error) {
			console.error("Error deleting product:", error);
			alert("Error deleting product");
		}

	}
}

export default deleteProduct;