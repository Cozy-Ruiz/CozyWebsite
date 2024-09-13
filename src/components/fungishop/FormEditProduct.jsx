import React from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
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

import getProduct from "@hooks/fungishop/getProduct";
import getCategories from "@hooks/fungishop/getCategories";
import deleteImageProduct from "@hooks/fungishop/deleteImageProduct";

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

const FormEditProduct = ( {productId} ) => {
    const {data: session, status} = useSession();
    const router = useRouter();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        categories: [],
        price: '',
        organization: 1,
        images: [],
    });
    const [categories, setCategories] = React.useState([]);

    const fetchProduct = async () => {
        try {
            let data = await getProduct( productId, session?.accessToken );
            data = {
                ...data,
                categories: data.category.map(cat => cat.id),
                productImages: []
            };
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };
    
    React.useEffect(() => {

        if (!productId || categories.length > 0) {
            return;
        }

        console.log('Fetching product ' + productId);

        fetchProduct();

    }, [productId]);

    
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

    
    React.useEffect(() => {
        console.log(product);
        console.log(categories);
    }, [product]);
    
    
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
        
        if (product.hasOwnProperty('productImages')) {
            for (const file of product['productImages']) {
                const formData = new FormData();
                formData.append('product_image', file);
                formData.append('product', product['id']);
    
                try {
                    const response = await fetch(`http://localhost:8000/apiClient/products/product-images/`, {
                        method: 'POST',
                        body: formData
                    });
    
                    if (response.ok) {
                        console.log('Product image post successfully');
                    } else {
                        console.log('Failed image post product');
                        alert('Failed image post product');
                    }
                } catch (error) {
                    console.log('Error:', error);
                }
            }
    
            delete product['productImages'];
        }
        
        try {
            const response = await fetch(`http://localhost:8000/apiClient/products/${product.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
                
            });

            if (response.ok) {
                if (response.ok) {
                    console.log('Product update successfully');
                    router.push('/fungishop/administration/products');
                } else {
                    console.log('Failed to update product');
                    alert('Failed to update product');
                }
            } else {
                console.log('Failed to update product');
                alert('Failed to update product');
            }
        } catch (error) {
            console.log('Error:', error);
        }
        
    };

    return(
        
        <Container style={{overflow: 'auto'}} >
            
            <h3 align='center'>Edit Product {productId}</h3>
            
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

            <Stack direction={'row'} spacing={2} style={ {overflow:'auto'} }>
                {product.images.map((image) => (
                    <>
                    <img
                        srcSet={`http://localhost:8000${image.product_image}?fit=crop&auto=format&dpr=2 2x`}
                        src={`http://localhost:8000${image.product_image}?fit=crop&auto=format`}
                        loading="lazy"
                    />
                    <DeleteIcon onClick={ () => deleteImageProduct(image, fetchProduct) }/>
                    </>
                ))}
            </Stack>

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

export default FormEditProduct;