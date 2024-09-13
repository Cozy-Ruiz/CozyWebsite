import * as React from 'react';
import { useContext } from 'react';
import AppContext from '@context/AppContext';
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
import IconButton from '@mui/material/IconButton';

//badge
import Badge, { BadgeProps } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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

const Cart = () => {

    const context = useContext(AppContext);

    // Calculate total
    const total = context.stateContext.cart.reduce((sum, product) => {
        return sum + product.price * product.quantity;
    }, 0);

    return (
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100%' }}>
            <FungiAppBar/>
            <Container component={Paper} sx={{p:3, mt:1, borderColor:'black'}}>

                <h1 align='center'>Carrito de compras</h1>
                
                <Divider sx={{borderColor:'black'}}/>

                <Grid container spacing={2} sx={{p:5}} >

                    <Grid item xs={12} md={8}>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'></StyledTableCell>
                                        <StyledTableCell align="center">Product Name</StyledTableCell>
                                        <StyledTableCell align="center">Quantity</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                        <StyledTableCell align="center">Price</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                        <StyledTableCell align="center">Total</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {context.stateContext.cart.map((product, index) => (
                                    <StyledTableRow key={product.id}>
                                        <StyledTableCell align="center"><Avatar alt="Remy Sharp" src={`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/${product.images[0].product_image}`} /></StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">{product.name}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row"><QuantityInput productId={product.id} quantity={product.quantity} setQuantity={context.setQuantity}/></StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">x</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">{product.price}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">=</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row"><b>{product.quantity * product.price}</b></StyledTableCell>
                                        <StyledTableCell align="center"><DeleteIcon onClick={ () => context.removeFromCart(product) }/></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Container component={Paper} elevation={2}>

                            {context.stateContext.cart.map((product, index) => (
                                <Box display="flex" justifyContent="space-between" sx={{m:1}}>
                                    <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={product.quantity} color="primary">
                                            <img src={`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/${product.images[0].product_image}`} style={{width:35, height:35}}/>
                                        </StyledBadge>
                                    </IconButton>
                                    <h5>{product.price * product.quantity}</h5>
                                </Box>
                            ))}

                            <Divider sx={{borderColor:'black'}}/>

                            <Box display="flex" justifyContent="space-between" sx={{mt:2, mb:2}}>
                                <h4>{context.stateContext.cart.length} articulos:</h4> <h4>{total.toFixed(2)}</h4>
                            </Box>

                            <Box display="flex" justifyContent="space-between" sx={{mt:2, mb:2}}>
                                <h4>Envio:</h4> <h4>300</h4>
                            </Box>

                            <Divider sx={{borderColor:'black'}}/>

                            <Box display="flex" justifyContent="space-between" sx={{mt:3, mb:3}}>
                                <h3 align='right'>Total:</h3> <h3>${(total + 300).toFixed(2)}</h3>
                            </Box>

                            <Divider sx={{borderColor:'black'}}/>

                            <Box align='center'>   
                                <a href='/fungishop/finishPurchase'>
                                    <Button variant="contained" color="success" size='large' sx={{m:5}}>
                                        Finalizar compra
                                    </Button>
                                </a>
                            </Box>

                        </Container>
                    </Grid> 

                </Grid>

            </Container>

            <FungiFooter />
        </div>
    );
}

export default Cart;