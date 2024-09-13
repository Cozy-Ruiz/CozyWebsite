import React from "react";
import { Stack, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import Container from "@mui/material/Container";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Paper from '@mui/material/Paper';

import Link from "next/link";

const FungiAdminNav = () => {
    
    return (

        <Stack direction={{sm: 'column'}} alignContent={{sm:'center'}} style={{minHeight:'65px'}} maxHeight={{xs:'65px', sm:'100%'}} width={{ xs:'100%', sm:'15%'}} component={Paper} sx={{ p: 1, m: 1}} spacing={{ xs: 1, sm: 2 }} useFlexGap flexWrap="wrap" overflow="auto">
            
            <Link href={`/fungishop/administration/`}>
                <MenuItem>
                    <ListItemIcon sx={{ display: {xs:'none', md:'block'} }} >
                        <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                </MenuItem>
            </Link>
            
            <Link href={`/fungishop/administration/users/`}>
                <MenuItem>
                    <ListItemIcon sx={{ display: {xs:'none', md:'block'} }}>
                        <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Users</ListItemText>
                </MenuItem>
            </Link>
                
            <Link href={`/fungishop/administration/products/`}>
                <MenuItem>
                    <ListItemIcon sx={{ display: {xs:'none', md:'block'} }}>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Products</ListItemText>
                </MenuItem>
            </Link>

            <Link href={`/fungishop/administration/categories/`}>
                <MenuItem>
                    <ListItemIcon sx={{ display: {xs:'none', md:'block'} }}>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Categories</ListItemText>
                </MenuItem>
            </Link>

            <Link href={`/fungishop/administration/blog/`}>
                <MenuItem>
                    <ListItemIcon sx={{ display: {xs:'none', md:'block'} }}>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Blog</ListItemText>
                </MenuItem>
            </Link>
        </Stack>
       
    );
}

export default FungiAdminNav;