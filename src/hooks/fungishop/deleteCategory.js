import { fetchData } from "next-auth/client/_utils";

const deleteCategory = async (category, fetchData) => {

	let res = confirm('Are you sure you want to delete this category?');

	if(res == true){

		try {
			const response = await fetch(`http://localhost:8000/apiClient/products/categories/${category.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				console.log('Category delete successfully');
                fetchData();
			} else {
				console.log('Failed to delete category');
				alert('Failed to delete category');
			}
		} catch (error) {
			console.error("Error deleting category:", error);
			alert("Error deleting category:");
		}

	}
}

export default deleteCategory;