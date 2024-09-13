const deleteImagePostEntry = async ( image, fetchPost ) => {

	let res = confirm('Are you sure you want to delete this Image?');

	if(res == true){

		try {
			console.log('Deleting image ' + image.id);
			const response = await fetch(`http://localhost:8000/apiClient/blog/EntrieImages/${image.id}/`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				console.log('Image delete successfully');
                fetchPost();
			} else {
				console.log('Failed to delete product');
				alert('Failed to delete image');
			}
		} catch (error) {
			console.error("Error deleting image:", error);
			alert("Error deleting image");
		}

	}
}

export default deleteImagePostEntry;