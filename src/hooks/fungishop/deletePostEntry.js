const deletePostEntry = async (entry, fetchData) => {

	let res = confirm('Are you sure you want to delete this entry?');

	if(res == true){

		try {
			const response = await fetch(`http://localhost:8000/apiClient/blog/Entrie/${entry.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				console.log('Entry delete successfully');
                fetchData();
			} else {
				console.log('Failed to delete entry');
				alert('Failed to delete entry');
			}
		} catch (error) {
			console.error("Error deleting entry:", error);
			alert("Error deleting entry");
		}

	}
}

export default deletePostEntry;