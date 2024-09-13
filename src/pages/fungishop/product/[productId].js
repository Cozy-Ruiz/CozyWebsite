import React from 'react';
import { useRouter } from 'next/router'
import FungiAppBar from '@components/fungishop/FungiAppBar';
import FungiFooter from '@components/fungishop/FungiFooter';
import getProduct from '@hooks/fungishop/getProduct';
import Image from 'next/image';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Product = () => {

    const router = useRouter();
    const { productId } = router.query;

    const [product, setProduct] = React.useState({
        name: '',
        description: '',
        categories: [],
        price: '',
        organization: 1,
        images: [],
    });

    // Fetch product data using productId
    React.useEffect(() => {
        if (!productId) {
            return;
        }

        const fetchData = async () => {
            try {
                const data = await getProduct(productId);
                setProduct(data);
                //console.log(product);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchData();
    }, [productId]);
    
    console.log(product);

    return (
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100%' }}>
            <FungiAppBar/>
            <Container component={Paper} sx={{mt:'30px', mb:'30px', p:'30px', overflow:'auto'}} elevation={2}>
                <Box key={product.id} >

                    <h2 align='center'>{product.name}</h2>
                    
                    <Stack direction={'row'} style={ {overflow:'auto', justifyContent:'center'} } sx={{mt:'30px', mb:'30px', p:'30px'}}>
                        {product.images.map((image) => (
                            <img width={700} height={700}
                                srcSet={`http://localhost:8000/${image.product_image}?fit=crop&auto=format&dpr=2 2x`}
                                src={`http://localhost:8000/${image.product_image}?fit=crop&auto=format`}
                                loading="lazy"
                            />
                        ))}
                    </Stack>

                    <p>{product.created_at}</p>
                    
                    {product.description.split('\r\n').map((paragraph, index) => (
                        <p key={index}><b>Description: </b>{paragraph}</p>
                    ))}
                    <p><b>Price: </b>{product.price}</p>
                    <p><b>Rating: </b>{product.rating}</p>
                    
                </Box>
                    
            </Container>

            <FungiFooter />
        </div>
    );
}

export default Product;