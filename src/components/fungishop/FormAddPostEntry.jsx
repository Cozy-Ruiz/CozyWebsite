import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
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


const FormAddPostEntry = ({postId, fetchPost, isVisible, setIsVisible}) => {

    const router = useRouter();

    const [entry, setEntry] = useState({
        title: '',
        content: '',
        observations: '',
        author: 1,
        organization: 1
    });

    const [entryImages, setEntryImages] = useState({   
        images: []
    });

    useEffect(() => {
        setEntry((prevEntry) => ({
            ...prevEntry,
            post: postId,
        }));
    }, [postId]);

    const handleInputChangeNewEntry = (event) => {
        const { name, value } = event.target;
        setEntry({
        ...entry,
        [name]: value
        });
    };

    const handleArchivosChangeNewEntry = (event) => {
        setEntryImages({
        ...entryImages,
        images: Array.from(event.target.files)
        });
    };

    const handleSubmitNewEntry = async (event) => {
        event.preventDefault();

        console.log(JSON.stringify('POST: ' + postId));
        
        console.log(entry);
        
        try {
            const response = await fetch('http://localhost:8000/apiClient/blog/Entrie/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entry)
            });
            
            if (response.ok) {
                response.json().then(async data => {

                    console.log('Post entry sent successfully');
                    
                    if (entryImages.hasOwnProperty('images')) {
                        for (const file of entryImages['images']) {
                            const formData = new FormData();
                            formData.append('entrie_image', file);
                            formData.append('entrie', data.id);
    
                            console.log('Entry image:', formData);
                            
                            try {
                                const responseImage = await fetch(`http://localhost:8000/apiClient/blog/EntrieImages/`, {
                                    method: 'POST',
                                    body: formData
                                });
                
                                if (responseImage.ok) {
                                    console.log('Entry image successfully');
                                } else {
                                    console.log('Failed image entry ');
                                    alert('Failed image entry ');
                                }
                            } catch (error) {
                                console.log('Error:', error);
                            }
                            
                        }
                    }
                    
                    setIsVisible(!isVisible);
                    fetchPost();
                });

                router.push(`/fungishop/administration/blog/editPost/${postId}`);
                
            } else {
                console.log('Failed to send post entry');
                alert('Failed to send post entry');
            }
        } catch (error) {
            console.log('Error:', error);
        }
        
    };

    return(
        
        <Container style={{overflow: 'auto'}} >
            
            <h3 align='center'>New Post Entry</h3>

            <TextField 
                label="Titulo"
                name="title"
                value={entry.title}
                onChange={handleInputChangeNewEntry}
                sx={{ m: 1, width: '100%' }}
            />

            <TextField 
                label="Descripción"
                name="content"
                value={entry.content}
                onChange={handleInputChangeNewEntry}
                multiline
                rows={4}
                sx={{ m: 1, width: '100%' }}
            />

            <TextField 
                label="Observaciones"
                name="observations"
                value={entry.observations}
                onChange={handleInputChangeNewEntry}
                multiline
                rows={4}
                sx={{ m: 1, width: '100%' }}
            />

            <FormControl>
                <InputLabel htmlFor="my-file">Imagenes</InputLabel>
                <Input 
                    type="file" 
                    id="archivos" 
                    onChange={handleArchivosChangeNewEntry}
                    inputProps={{ multiple: true }}
                    aria-describedby="my-helper-text" 
                    sx={{ m: 1, width: '100%' }} />
            </FormControl>

            <Stack direction="row" spacing={2} sx={{ m: 2, width: '100%' }} >
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmitNewEntry}>
                    Send
                </Button>
            </Stack>

        </Container>
        
    );
}

export default FormAddPostEntry;