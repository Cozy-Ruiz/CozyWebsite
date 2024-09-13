import * as React from 'react';
import FungiAppBar from "@components/fungishop/FungiAppBar";
import FungiBlogCard from '@components/fungishop/FungiBlogCard';

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

import AdminDashboard from '@containers/fungishop/AdminDashboard';
import AdminUsers from '@containers/fungishop/AdminUsers';
import AdminProducts from '@containers/fungishop/AdminProducts';
import AdminBlog from '@containers/fungishop/AdminBlog';
import AdminCategories from '@containers/fungishop/AdminCategories';
import FormEditPost from '@components/fungishop/FormEditPost';

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

const administration = ({ apiUrl }) => {

    const [element, setElement] = useState('AdminDashboard');
    const [modalContent, setModalContent] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = (content) => {
        setModalContent(content);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return(
        <>
        <FungiAppBar/>

        <Stack spacing={2} direction={{xs:'column', md:'row'}}>
            <Item>
                <Stack direction={{xs:'row', md:'column'}} >
                    <MenuItem onClick={ () => setElement( 'AdminDashboard' ) }>
                        <ListItemIcon sx={{ display: {xs:'none', md:'block'} }} >
                            <ContentCut fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </MenuItem>
                    
                    <MenuItem onClick={ () => setElement( 'AdminUsers' ) }>
                        <ListItemIcon sx={{ display: {xs:'none', md:'block'} }}>
                            <ContentCopy fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Users</ListItemText>
                    </MenuItem>
                        
                    <MenuItem onClick={ () => setElement( 'AdminProducts' ) }>
                        <ListItemIcon sx={{ display: {xs:'none', md:'block'} }}>
                            <ContentPaste fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Products</ListItemText>
                    </MenuItem>

                    <MenuItem onClick={ () => setElement( 'AdminCategories' ) }>
                        <ListItemIcon sx={{ display: {xs:'none', md:'block'} }}>
                            <ContentPaste fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Categories</ListItemText>
                    </MenuItem>

                    <MenuItem onClick={ () => setElement( 'AdminBlog' ) }>
                        <ListItemIcon sx={{ display: {xs:'none', md:'block'} }}>
                            <ContentPaste fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Blog</ListItemText>
                    </MenuItem>

                    <MenuItem onClick={ () => setElement( 'AdminBlog' ) }>
                        <ListItemIcon sx={{ display: {xs:'none', md:'block'} }}>
                            <ContentPaste fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Blog 2</ListItemText>
                    </MenuItem>
                </Stack>
            </Item>

            <Item sx={{ width: { xs: 'auto', md: '100%' } }} >
                <Container>
                {(() => {
                    if (element === 'AdminDashboard') {
                        return <AdminDashboard openModal={handleOpen} closeModal={handleClose} />;
                    } else if (element === 'AdminUsers') {
                        return <AdminUsers openModal={handleOpen} closeModal={handleClose} />;
                    } else if (element === 'AdminProducts') {
                        return <AdminProducts openModal={handleOpen} closeModal={handleClose} />;
                    } else if (element === 'AdminCategories') {
                        return <AdminCategories openModal={handleOpen} closeModal={handleClose} />;
                    } else if (element === 'AdminBlog') {
                        return <AdminBlog openModal={handleOpen} closeModal={handleClose} setElement={setElement}/>;
                    }else if (element === 'FormEditPost') {
                        return <FormEditPost openModal={handleOpen} closeModal={handleClose} setElement={setElement}/>;
                    }
                })()}
                </Container>
            </Item>
        </Stack>
        
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {modalContent}
            </Box>
        </Modal>
        </>
    );
}

export default administration;

/*
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <MenuList>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCut fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘X
                        </Typography>
                    </MenuItem>
                    
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCopy fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Users</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘C
                        </Typography>
                    </MenuItem>
                        
                    <MenuItem>
                        <ListItemIcon>
                            <ContentPaste fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Products</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘V
                        </Typography>
                    </MenuItem>

                    <MenuItem>
                        <ListItemIcon>
                            <ContentPaste fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Blog</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘V
                        </Typography>
                    </MenuItem>
                </MenuList>
            </Grid>
            <Grid item xs={10}>
                <FungiBlogCard/>
                <FungiBlogCard/>
            </Grid>
        </Grid>
*/