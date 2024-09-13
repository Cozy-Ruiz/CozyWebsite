import React from 'react';
import FungiProductCard from '@components/fungishop/FungiProductCard';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';

import FormAddCategory from '@components/fungishop/FormAddCategory';
import { Stack } from '@mui/material';

import getCategories from '@hooks/fungishop/getCategories';
import deleteCategory from '@hooks/fungishop/deleteCategory';
import HeaderCategoryBar from '@components/fungishop/HeaderCategoryBar';


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
import Header from '@components/Header';

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


const AdminCategories = ({ openModal, closeModal }) => {

    const [categories, setCategories] = React.useState([]);

    const fetchData = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    console.log(categories);

    return (
        <Stack style={{ width:'100%'}}>

            <HeaderCategoryBar/>

            <Stack component={Paper} style={{alignContent:'center', width:'100%'}} sx={{ p: 1}} spacing={{ xs: 1, sm: 2 }} direction="column" useFlexGap flexWrap="wrap" overflow="auto">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>id</StyledTableCell>
                                <StyledTableCell align="center">Category Name</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {categories.map((category) => (
                            <StyledTableRow key={category.id}>
                                <StyledTableCell align="center">{category.id}</StyledTableCell>
                                <StyledTableCell align='center' component="th" scope="row">
                                    {category.name}
                                </StyledTableCell>
                                <StyledTableCell align="center"><EditIcon /></StyledTableCell>
                                <StyledTableCell align="center"><DeleteIcon onClick={ () => { deleteCategory(category, fetchData); }}/></StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
            
        </Stack>
    );
};

export default AdminCategories;