const deletePost = async (post, fetchData) => {

	let res = confirm('Are you sure you want to delete this post?');

	if(res == true){

		try {
			const response = await fetch(`http://localhost:8000/apiClient/blog/${post.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				console.log('Post delete successfully');
                fetchData();
			} else {
				console.log('Failed to delete post');
				alert('Failed to delete post');
			}
		} catch (error) {
			console.error("Error deleting post:", error);
			alert("Error deleting post");
		}

	}
}

export default deletePost;