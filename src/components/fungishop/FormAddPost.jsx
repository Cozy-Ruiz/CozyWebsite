import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container } from "@mui/material";
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';


const FormAddPost = () => {

    const router = useRouter();

    const [post, setPost] = useState({
        title: '',
        content: '',
        observations: '',
        created: '',
        updated: '',
        author: 1,
        organization: 1,    
        images: [],
        entries: []
    });

    const [postImages, setPostImages] = useState({   
        images: []
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost({
        ...post,
        [name]: value
        });
    };

    const handleArchivosChange = (event) => {
        setPostImages({
        ...postImages,
        images: Array.from(event.target.files)
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        console.log(JSON.stringify(post));
        
        try {
            const response = await fetch('http://localhost:8000/apiClient/blog/', {
                method: 'POST',
                //body: formData
                
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            });
            if (response.ok) {
                response.json().then(async data => {

                    console.log('Post sent successfully');

                    if (postImages.hasOwnProperty('images')) {
                        for (const file of postImages['images']) {
                            const formData = new FormData();
                            formData.append('post_image', file);
                            formData.append('post', data.id);
    
                            console.log('Post image:', formData);
                            
                            try {
                                const responseImage = await fetch(`http://localhost:8000/apiClient/blog/PostImages/`, {
                                    method: 'POST',
                                    body: formData
                                });
                
                                if (responseImage.ok) {
                                    console.log('Post image successfully');
                                } else {
                                    console.log('Failed image post ');
                                    alert('Failed image post ');
                                }
                            } catch (error) {
                                console.log('Error:', error);
                            }
                            
                        }
                    }
                });

                router.push('/fungishop/administration/blog');
                
            } else {
                console.log('Failed to send post');
                alert('Failed to send post');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return(
        
        <Container style={{overflow: 'auto'}} >
            
            <h3 align='center'>New Post</h3>

            <TextField 
                label="Titulo"
                name="title"
                value={post.title}
                onChange={handleInputChange}
                sx={{ m: 1, width: '100%' }}
            />

            <TextField 
                label="Descripción"
                name="content"
                value={post.content}
                onChange={handleInputChange}
                multiline
                rows={4}
                sx={{ m: 1, width: '100%' }}
            />

            <TextField 
                label="Observaciones"
                name="observations"
                value={post.observations}
                onChange={handleInputChange}
                multiline
                rows={4}
                sx={{ m: 1, width: '100%' }}
            />

            <FormControl>
                <InputLabel htmlFor="my-file">Imagenes</InputLabel>
                <Input 
                    type="file" 
                    id="archivos" 
                    onChange={handleArchivosChange}
                    inputProps={{ multiple: true }}
                    aria-describedby="my-helper-text" 
                    sx={{ m: 1, width: '100%' }} />
            </FormControl>

            <Stack direction="row" spacing={2} sx={{ m: 2, width: '100%' }} >
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
                    Send
                </Button>
            </Stack>

        </Container>
        
    );
}

export default FormAddPost;