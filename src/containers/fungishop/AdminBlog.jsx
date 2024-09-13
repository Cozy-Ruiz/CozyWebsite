import React from "react";
import FungiBlogCard from "@components/fungishop/FungiBlogCard";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import HeaderBlogBar from "@components/fungishop/HeaderBlogBar";
import FormAddPost from "@components/fungishop/FormAddPost";

import getPublications from "@hooks/fungishop/getPublications";
import deletePost from "@hooks/fungishop/deletePost";

import Link from "next/link";


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

const AdminBlog = ({ openModal, element, setElement }) => {

    const [publications, setPublications] = React.useState([]);

    const fetchData = async () => {
        try {
            const data = await getPublications();
            setPublications(data);
        } catch (error) {
            console.error('Error fetching publications:', error);
        }
    };

    React.useEffect(() => {
        fetchData();
    },[]);

    return(
        <Stack style={{ width:'100%'}}>

            <HeaderBlogBar/>

            <Stack component={Paper} style={{alignContent:'center', width:'100%'}} sx={{ p: 1}} spacing={{ xs: 1, sm: 2 }} direction="column" useFlexGap flexWrap="wrap" overflow="auto">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>id</StyledTableCell>
                                <StyledTableCell align="center">Publication</StyledTableCell>
                                <StyledTableCell align="center">created</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {publications.map((publication) => (
                            <StyledTableRow key={publication.id}>
                                <StyledTableCell align="center">{publication.id}</StyledTableCell>
                                <StyledTableCell align='center' component="th" scope="row">{publication.title}</StyledTableCell>
                                <StyledTableCell align='center' component="th" scope="row">{publication.created}</StyledTableCell>
                                <Link href={`/fungishop/administration/blog/editPost/${publication.id}`}>
                                    <StyledTableCell align="center"><EditIcon /></StyledTableCell>
                                </Link>
                                <StyledTableCell align="center"><DeleteIcon onClick={ () => { deletePost(publication, fetchData); }}/></StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        
        </Stack>
    );
};

export default AdminBlog;