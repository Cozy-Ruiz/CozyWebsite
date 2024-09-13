import React from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';


import FungiAppBar from '@components/fungishop/FungiAppBar';
import HeaderCartBar from '@components/fungishop/HeaderCartBar';
import FungiFooter from '@components/fungishop/FungiFooter';

import Container from '@mui/material/Container';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

//tabla
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';

import QuantityInput from '@components/fungishop/QuantityInput';
import { Form } from 'react-router-dom';
import FormCardPayment from '@components/fungishop/FormCardPayment';

//badge
import Badge, { BadgeProps } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

import getOrder from '@hooks/fungishop/getOrder';

   
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -6,
      top: 5,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const FinishPurchase = () => {

    const router = useRouter();
    const { orderId } = router.query;

    const [order, setOrder] = React.useState({});

    // Fetch order data using orderId
    React.useEffect(() => {
        if (!orderId) {
            return;
        }

        const fetchData = async () => {
            try {
                const data = await getOrder(orderId);
                setOrder(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchData();
    }, [orderId]);


    console.log(order);

    return (
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100%' }}>
            <FungiAppBar/>
            <Container component={Paper} sx={{p:3, mt:1, borderColor:'black'}}>

                <h1 align='center'>Gracias por su compra!!</h1>
                
                <Divider sx={{borderColor:'black'}}/>

                
                <h3 style={{margin:'1em'}} align='center'>Se acaba de enviar un correo con los detalles de su compra.</h3>

                {order.items && order.items.length > 0 && (
                    <Container component={Paper} elevation={2} sx={{p:5, width:350}}>
                        
                        {order.items.map((item, index) => (
                            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{m:1}}>
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={item.quantity} color="primary">
                                        <img src={`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/${item.product.images[0].product_image}`} style={{width:35, height:35}}/>
                                    </StyledBadge>
                                </IconButton>
                                <h5>{item.price * item.quantity}</h5>
                            </Box>
                        ))}

                        <Divider sx={{borderColor:'black'}}/>

                        <Box display="flex" justifyContent="space-between" sx={{mt:2, mb:2}}>
                            <h4>{order.items.length} articulos:</h4> <h4>{order.items.reduce((sum, item) => {return sum + item.price * item.quantity;}, 0).toFixed(2)}</h4>
                        </Box>

                        <Box display="flex" justifyContent="space-between" sx={{mt:2, mb:2}}>
                            <h4>Envio:</h4> <h4>300</h4>
                        </Box>

                        <Divider sx={{borderColor:'black'}}/>

                        <Box display="flex" justifyContent="space-between" sx={{mt:3, mb:3}}>
                            <h3 align='right'>Total:</h3> <h3>{(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 300).toFixed(2)}</h3>
                        </Box>

                        <Divider sx={{borderColor:'black'}}/>

                        <Link href="/fungishop/products/">
                            <Button variant="contained" style={{width:'100%', padding:10, marginTop:35}}>Seguir comprando</Button>
                        </Link>
                    </Container>
                )}

            </Container>

            <FungiFooter />
        </div>
    );
}

export default FinishPurchase;