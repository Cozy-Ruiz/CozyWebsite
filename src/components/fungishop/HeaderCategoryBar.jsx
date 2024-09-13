import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import Link from 'next/link';

const HeaderCategoryBar = () => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                    Categories
                </Typography>
                <Link href="/fungishop/administration/categories/addCategory" style={{textDecoration:'none', color:'white'}}>
                    <AddIcon />New Category
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderCategoryBar;

