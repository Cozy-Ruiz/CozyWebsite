import * as React from 'react';
import FungiAppBar from "@components/fungishop/FungiAppBar";
import FungiBlogCard from '@components/fungishop/FungiBlogCard';
import FungiFooter from '@components/fungishop/FungiFooter';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Typography from '@mui/material/Typography';

import { Stack } from '@mui/material';
import { Container } from '@mui/material';

import FungiAdminNav from '@components/fungishop/FungiAdminNav';
import AdminProducts from '@containers/fungishop/AdminProducts';

import { useState } from 'react';

import Modal from '@mui/material/Modal';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AdminBlog2 = () => {

    return(
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100%' }}>
            <FungiAppBar/>

            <Stack Container={Paper} sx={{ p: 1, m: 1}} spacing={{ xs: 1, sm: 2 }} direction={{xs:'column', sm: 'row'}} overflow="auto">
                <FungiAdminNav />
                <AdminProducts/>       
            </Stack>

            <FungiFooter />
        </div>
    );
}

export default AdminBlog2;