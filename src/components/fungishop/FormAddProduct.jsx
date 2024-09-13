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

import getCategories from "@hooks/fungishop/getCategories";

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

const FormAddProduct = ({ closeModal, fetchData}) => {
    const router = useRouter();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        categories: [],
        price: '',
        organization: 1,
        productImages: []
    });

    const [categories, setCategories] = React.useState([]);
    
    React.useEffect(() => {

        console.log('Fetching categories...');
        
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();

    }, []);
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct({
        ...product,
        [name]: value
        });
    };

    const handleSelectChange = (event) => {
        setProduct({
        ...product,
        categories: Array.from(event.target.value)
        });
    }

    const handleArchivosChange = (event) => {
        setProduct({
        ...product,
        productImages: Array.from(event.target.files)
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(JSON.stringify(product));

        const formData = new FormData();
        Object.keys(product).forEach(key => {
            if (key === 'productImages') {
                product[key].forEach((file, index) => {
                    formData.append(`${key}`, file);
                });
            } else {
                formData.append(key, product[key]);
            }
        });
        console.log(formData);
        
        try {
            const response = await fetch('http://localhost:8000/apiClient/products/', {
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
                console.log('Product sent successfully');
                router.push('/fungishop/administration/products');
            } else {
                console.log('Failed to send product');
                alert('Failed to send product');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return(
        
        <Container style={{overflow: 'auto'}} >
            
            <h3 align='center'>New Product</h3>

            <TextField 
                label="Nombre"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                sx={{ m: 1, width: '100%' }}
            />

            <TextField 
                label="Descripción"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                sx={{ m: 1, width: '100%' }}
            />

            {/* <TextField 
                label="Información adicional"
                name="informacionAdicional"
                value={product.informacionAdicional}
                onChange={handleInputChange}
                multiline
                rows={4}
                sx={{ m: 1, width: '100%' }}
            /> */}

            <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">Categoría</InputLabel>
                <Select 
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    name="categories"
                    value={product.categories}
                    onChange={handleSelectChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    sx={{ m: 1, width: '100%' }}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            <Checkbox checked={product.categories.indexOf(category.id) > -1} />
                            <ListItemText primary={category.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField 
                label="Precio"
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                sx={{ m: 1, width: '100%' }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">$</InputAdornment>,
                }}
            />

            {/*<TextField 
                label="Descuento"
                type="number"
                name="descuento"
                value={product.descuento}
                onChange={handleInputChange}
                sx={{ m: 1, width: '100%' }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
            />*/}

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
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => router.push('/fungishop/administration/products')}>
                    Delete
                </Button>
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
                    Send
                </Button>
            </Stack>

        </Container>
        
    );
}

export default FormAddProduct;