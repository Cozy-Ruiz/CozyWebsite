import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import Link from 'next/link';

import { useContext } from "react";
import AppContext from "@context/AppContext";

const FungiProductCard = ( {product} ) => {

    const context = useContext(AppContext);

    const productImage = product.images && product.images.length > 0 ? `${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/${product.images[0].product_image}`  : null;

    console.log(context);

    return(
        <Card sx={{ maxWidth: 345, p: 1, m: 1 }}>
            <CardMedia
                sx={{ height: 400 }}
                image={productImage}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Link href={`/fungishop/product/${product.id}`}>
                    <Button size="small">Learn More</Button>
                </Link>
                <AddShoppingCartIcon onClick={() => context.addToCart(product)}/>
            </CardActions>
        </Card>
    );
}

export default FungiProductCard;