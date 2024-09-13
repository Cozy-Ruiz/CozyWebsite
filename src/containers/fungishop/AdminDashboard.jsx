import React from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Stack } from "@mui/material";
import { Paper } from "@mui/material";

const AdminDashboard = () => {
    return(
        <Stack style={{ width:'100%'}}>

            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <Button color="inherit"></Button>
                </Toolbar>
            </AppBar>

            <Stack component={Paper} style={{alignContent:'center', width:'100%'}} sx={{p: 1}} spacing={{ xs: 1, sm: 2 }} direction="column" useFlexGap flexWrap="wrap" overflow="auto">   
            </Stack>

        </Stack>
    );
};

export default AdminDashboard;