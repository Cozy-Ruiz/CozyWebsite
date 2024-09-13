import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Link from 'next/link';

import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';

import getUsers from "@hooks/fungishop/getUsers";

//tabla
import { Stack } from '@mui/material';
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

const AdminUsers = ({ openModal }) => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        
        <Stack style={{ width:'100%'}}>
            
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                        Users
                    </Typography>
                    <Button onClick={ () => openModal(<>Add User</>) } color="inherit"><AddIcon/>New User</Button>
                </Toolbar>
            </AppBar> 
            
            
            <Stack component={Paper} style={{alignContent:'center', width:'100%'}} sx={{ p: 1}} spacing={{ xs: 1, sm: 2 }} direction="column" useFlexGap flexWrap="wrap" overflow="auto">
            
                <TableContainer >
                    <Table style={{width:'100%'}}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>id</StyledTableCell>
                                <StyledTableCell align='center'>User name</StyledTableCell>
                                <StyledTableCell align='center'>Nombre</StyledTableCell>
                                <StyledTableCell align='center'>Email</StyledTableCell>
                                <StyledTableCell align='center'></StyledTableCell>
                                <StyledTableCell align='center'></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                        
                        {users.map((user) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell align="center">{user.id}</StyledTableCell>
                                <StyledTableCell align='center' component="th" scope="row">{user.username}</StyledTableCell>
                                <StyledTableCell align='center' component="th" scope="row">{user.first_name} {user.last_name}</StyledTableCell>
                                <StyledTableCell align='center' component="th" scope="row">{user.email}</StyledTableCell>
                                <Link href={`/fungishop/administration/products/editProduct/${user.id}`}>
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

export default AdminUsers;