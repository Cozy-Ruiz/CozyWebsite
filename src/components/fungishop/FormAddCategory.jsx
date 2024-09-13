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


import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';


import { Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Category } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const FormAddCategory = ({ closeModal, fetchData }) => {

    const router = useRouter();

    const [category, setCategory] = useState({
        name: '',
        title: '',
        organization: 1,
        avatar: []
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategory({
        ...category,
        [name]: value
        });
    };

    const handleArchivosChange = (event) => {
        setCategory({
        ...category,
        avatar: Array.from(event.target.files)
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(JSON.stringify(product));

        const formData = new FormData();
        Object.keys(category).forEach(key => {
            if (key === 'avatar') {
                category[key].forEach((file, index) => {
                    formData.append(`${key}`, file);
                });
            } else {
                formData.append(key, category[key]);
            }
        });
        console.log(formData);
        
        try {
            const response = await fetch('http://localhost:8000/apiClient/products/categories/', {
                method: 'POST',
                body: formData
                /*
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
                */
            });
            if (response.ok) {
                console.log('Category sent successfully');
                router.push('/fungishop/administration/categories');
            } else {
                console.log('Failed to send category');
                alert('Failed to send category');
                closeModal();
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return(
        
        <Container style={{overflow: 'auto'}} >
            
            <h3 align='center'>New Category</h3>

            <TextField 
                label="Nombre"
                name="name"
                value={category.name}
                onChange={handleInputChange}
                sx={{ m: 1, width: '100%' }}
            />

            <TextField 
                label="Title"
                name="title"
                value={category.title}
                onChange={handleInputChange}
                multiline
                rows={4}
                sx={{ m: 1, width: '100%' }}
            />

            {/*}
            <FormControl>
                <InputLabel htmlFor="my-file">Imagen</InputLabel>
                <Input 
                    type="file" 
                    id="archivos" 
                    onChange={handleArchivosChange}
                    inputProps={{ multiple: true }}
                    aria-describedby="my-helper-text" 
                    sx={{ m: 1, width: '100%' }} />
            </FormControl>
            */}

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

export default FormAddCategory;