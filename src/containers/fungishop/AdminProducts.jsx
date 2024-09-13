import React from 'react';
import { useSession } from 'next-auth/react';

import FungiProductCard from '@components/fungishop/FungiProductCard';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';

import FormAddProduct from '@components/fungishop/FormAddProduct';
import { Stack } from '@mui/material';

import getProducts from '@hooks/fungishop/getProducts';
import deleteProduct from '@hooks/fungishop/deleteProduct';
import HeaderProductBar from '@components/fungishop/HeaderProductBar';

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

import Link from 'next/link';

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


const AdminProducts = ({ openModal, closeModal }) => {

    const {data: session, status} = useSession();

    const [products, setProducts] = React.useState([]);

    const fetchData = async () => {
        try {
            const data = await getProducts( session?.accessToken );
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    console.log(products);

    return (
        <Stack style={{ width:'100%'}}>

            <HeaderProductBar/>

            <Stack component={Paper} style={{alignContent:'center', width:'100%'}} sx={{ p: 1}} spacing={{ xs: 1, sm: 2 }} direction="column" useFlexGap flexWrap="wrap" overflow="auto">

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>id</StyledTableCell>
                                <StyledTableCell align="center">Product Name</StyledTableCell>
                                <StyledTableCell align="center">Price</StyledTableCell>
                                <StyledTableCell align="center">Rating</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {products.map((product) => (
                            <StyledTableRow key={product.id}>
                                <StyledTableCell align="center">{product.id}</StyledTableCell>
                                <StyledTableCell align='center' component="th" scope="row">{product.name}</StyledTableCell>
                                <StyledTableCell align='center' component="th" scope="row">{product.price}</StyledTableCell>
                                <StyledTableCell align='center' component="th" scope="row">{product.rating}</StyledTableCell>
                                <Link href={`/fungishop/administration/products/editProduct/${product.id}`}>
                                    <StyledTableCell align="center"><EditIcon /></StyledTableCell>
                                </Link>
                                <StyledTableCell align="center"><DeleteIcon onClick={ () => { deleteProduct(product, fetchData); }}/></StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Stack>
    );
};

export default AdminProducts;