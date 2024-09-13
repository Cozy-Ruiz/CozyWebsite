import React from "react";
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

import getPublication from "@hooks/fungishop/getPublication";
import getCategories from "@hooks/fungishop/getCategories";
import { images } from "../../../next.config";

import deleteImagePost from "@hooks/fungishop/deleteImagePost";
import deleteImagePostEntry from "@hooks/fungishop/deleteImagePostEntry";
import deletePostEntry from "@hooks/fungishop/deletePostEntry";

import Divider from '@mui/material/Divider';


import HeaderEntriesBar from "./HeaderEntriesBar";
import FormAddPostEntry from "./FormAddPostEntry";

const FormEditPost = ( {postId} ) => {

    const [isVisible, setIsVisible] = useState(false);

    const [post, setPost] = useState({
        title: '',
        content: '',
        observations: '',
        created: '',
        updated: '',
        author: '',
        organization: '',    
        images: [],
        entries: []
    });

    const fetchPost = async () => {
        try {
            let data = await getPublication( postId );
            data = {
                ...data,
                postImages: []
            };
            setPost(data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };
    
    React.useEffect(() => {

        if (!postId) {
            return;
        }

        console.log('Fetching post ' + postId);

        fetchPost();

    }, [postId]);

    
    React.useEffect(() => {
        console.log(post);
    }, [post]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost({
        ...post,
        [name]: value
        });
    };

    const handleInputEntryChange = (event, id) => {
        const { name, value } = event.target;
        setPost(prevPost => {
            const updatedEntries = prevPost.entries.map((entry, index) => {
                if (index === id) {
                    return { ...entry, [name]: value };
                }
                return entry;
            });
            return { ...prevPost, entries: updatedEntries };
        });
    };

    const handleArchivosChange = (event) => {
        setPost({
        ...post,
        postImages: Array.from(event.target.files)
        });
    };

    const handleSubmitPost = async (event) => {
        
        event.preventDefault();
        
        if (post.hasOwnProperty('postImages')) {
            for (const file of post['postImages']) {
                const formData = new FormData();
                formData.append('post_image', file);
                formData.append('post', post['id']);
    
                try {
                    const response = await fetch(`http://localhost:8000/apiClient/blog/PostImages/`, {
                        method: 'POST',
                        body: formData
                    });
    
                    if (response.ok) {
                        console.log('Post image successfully');
                    } else {
                        console.log('Failed image post ');
                        alert('Failed image post ');
                    }
                } catch (error) {
                    console.log('Error:', error);
                }
            }
    
            delete post['postImages'];
        }
        
        try {
            const response = await fetch(`http://localhost:8000/apiClient/blog/Post/${post.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
                
            });

            if (response.ok) {
                if (response.ok) {
                    console.log('Post update successfully');
                    alert('Post update successfully');
                    fetchPost();
                } else {
                    console.log('Failed to update post');
                    alert('Failed to update product');
                }
            } else {
                console.log('Failed to update post');
                alert('Failed to update post');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleArchivosEntryChange = (event, id) => {+
        setPost(prevPost => {
            const updatedEntries = prevPost.entries.map((entry, index) => {
                if (index === id) {
                    return { ...entry, entryImages: Array.from(event.target.files) };
                }
                return entry;
            });
            return { ...prevPost, entries: updatedEntries };
        });
    };

    const handleSubmitEntry = async (event, id) => {
        event.preventDefault();

        const entry = post.entries[id];

        if (entry.hasOwnProperty('entryImages')) {
            for (const file of entry['entryImages']) {
                const formData = new FormData();
                formData.append('entrie_image', file);
                formData.append('entrie', entry['id']);
    
                try {
                    const response = await fetch(`http://localhost:8000/apiClient/blog/EntrieImages/`, {
                        method: 'POST',
                        body: formData
                    });
    
                    if (response.ok) {
                        console.log('Entry image successfully');
                    } else {
                        console.log('Failed image Entry ');
                        alert('Failed image Entry ');
                    }
                } catch (error) {
                    console.log('Error:', error);
                }
            }
    
            delete entry['entryImages'];
        }
        
        try {
            const response = await fetch(`http://localhost:8000/apiClient/blog/Entrie/${entry.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entry)
                
            });

            if (response.ok) {
                if (response.ok) {
                    console.log('Entry ' + (id+1) + ' update successfully');
                    alert('Entry ' + (id+1) + ' update successfully');
                    fetchPost();
                } else {
                    console.log('Failed to update entry' + (id+1));
                    alert('Failed to update entry ' + (id+1));
                }
            } else {
                console.log('Failed to update entry' + (id+1));
                alert('Failed to update entry' + (id+1));
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return(
        
        <Container style={{overflow: 'auto', marginTop:'2em', marginBottom: '2em'}} >

            <div style={{marginBottom: '2em'}}>
            
                <h3 align='center'>Edit Post</h3>

                <form onSubmit={handleSubmitPost}>
                    <Stack direction={'row'} spacing={2} style={ {overflow:'auto'} }>
                        {post.images.map((image) => (
                            <>
                            <img
                                srcSet={`${image.post_image}?fit=crop&auto=format&dpr=2 2x`}
                                src={`${image.post_image}?fit=crop&auto=format`}
                                loading="lazy"
                            />
                            <DeleteIcon onClick={ () => deleteImagePost(image, fetchPost) }/>
                            </>
                        ))}
                    </Stack>

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
                        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                            Save
                        </Button>
                    </Stack>
                </form>
            </div>

            <HeaderEntriesBar isVisible={isVisible} setIsVisible={setIsVisible}/>
            {isVisible && (
                <FormAddPostEntry postId={post.id} fetchPost={fetchPost} isVisible={isVisible} setIsVisible={setIsVisible}/>
            )}

            {post.entries.map((entry, index) => (  

                <div key={entry.id} style={{marginTop:'2em'}}>

                    <h3>Entrada {index + 1}</h3>

                    <form onSubmit={(event) => handleSubmitEntry(event, index)}>
                        <TextField 
                            label="Titulo"
                            name="title"
                            value={entry.title}
                            onChange={(event) => handleInputEntryChange(event, index)}
                            sx={{ m: 1, width: '100%' }}
                        />
                        
                        <TextField 
                            label="Descripción"
                            name="content"
                            value={entry.content}
                            onChange={(event) => handleInputEntryChange(event, index)}
                            multiline
                            rows={4}
                            sx={{ m: 1, width: '100%' }}
                        />
                        
                        <TextField 
                            label="Observaciones"
                            name="observations"
                            value={entry.observations}
                            onChange={(event) => handleInputEntryChange(event, index)}
                            multiline
                            rows={4}
                            sx={{ m: 1, width: '100%' }}
                        />

                        <Stack direction={'row'} spacing={2} style={ {overflow:'auto'} }>
                            {entry.images.map((image) => (
                                <>
                                <img
                                    srcSet={`${image.entrie_image}?fit=crop&auto=format&dpr=2 2x`}
                                    src={`${image.entrie_image}?fit=crop&auto=format`}
                                    loading="lazy"
                                />
                                <DeleteIcon onClick={ () => deleteImagePostEntry(image, fetchPost) }/>
                                </>
                            ))}
                        </Stack>
                        
                        <FormControl>
                            <InputLabel htmlFor="my-file">Imagenes</InputLabel>
                            <Input 
                                type="file" 
                                id="archivos" 
                                onChange={(event) => handleArchivosEntryChange(event, index)}
                                inputProps={{ multiple: true }}
                                aria-describedby="my-helper-text" 
                                sx={{ m: 1, width: '100%' }} />
                        </FormControl>

                        <Stack direction="row" spacing={2} sx={{ m: 2, width: '100%' }} >
                            <Button onClick={() => deletePostEntry(entry, fetchPost) } variant="outlined" startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                                Save
                            </Button>
                        </Stack>
                    </form>

                    <Divider component="li" />
                </div> 

            ))}

        </Container>
        
    );
}

export default FormEditPost;