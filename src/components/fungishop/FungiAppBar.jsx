import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

//import hai from '@img/ha.jpg'
//import HongoHeader from 'HongoHeader.jpg'
import Image from 'next/image';
import Link from 'next/link';

//badge
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

//Drawer
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import QuantityInput from './QuantityInput';

import { useContext } from 'react';
import AppContext from '@context/AppContext';

import { signIn, signOut, useSession } from 'next-auth/react';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard'];

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -6,
      top: 5,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

const FungiAppBar = () => {

    const { data: session } = useSession();
    const context = useContext(AppContext);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpenDrawer(newOpen);
    };

    // Calculate total
    const total = context.stateContext.cart.reduce((sum, product) => {
        return sum + product.price * product.quantity;
    }, 0);
    
    const DrawerList = (
        <>
        <Box>
            <h2 align="center">Mi Carrito</h2>
        </Box>

        <Box sx={{ width: 400, height: '80%', overflow:'auto' }} role="presentation">
            <List>
                {context.stateContext.cart.map((product) => {
                    return (
                        <>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/${product.images[0].product_image}`} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box display="flex" justifyContent="space-between">
                                        <span>{product.name}</span>
                                        <ClearIcon onClick={() => context.removeFromCart(product)}/>
                                    </Box> 
                                }
                                secondary={
                                    <Box display="flex" justifyContent="space-between" alignItems="center" >
                                        <QuantityInput productId={product.id} quantity={product.quantity} setQuantity={context.setQuantity}/> <strong>x ${product.price} =</strong> <strong>${(product.price * product.quantity).toFixed(2)}</strong>
                                    </Box>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        </>
                    )})}
            </List>
            
        </Box>

        <Container sx={{ width: 400 }} >

            <Box display="flex" justifyContent="space-between">
                <h3>Total:</h3> <h3>${total.toFixed(2)}</h3>
            </Box>
            
            <Link href="/fungishop/cart/">
                <Button variant="outlined" style={{width:'100%'}}>Ver Carrito</Button>
            </Link>

            <a href='/fungishop/finishPurchase/'>
                <Button variant="contained" style={{width:'100%'}}>Finalizar Compra</Button>
            </a>
        </Container>
        </>
    );

    return (
        <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                    >
                    FUNGISHOP
                    </Typography>

                
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                            display: { xs: 'block', md: 'none' },
                            }}
                        >

                            <Link href="/fungishop/">
                                <MenuItem key="3" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Blog</Typography>
                                </MenuItem>
                            </Link>

                            <Link href="/fungishop/products/">
                                <MenuItem key="1" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Products</Typography>
                                </MenuItem>
                            </Link>

                            <Link href="/fungishop/contact/">
                                <MenuItem key="2" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Contact</Typography>
                                </MenuItem>
                            </Link>

                            <Link href="/fungishop/administration/">
                                <MenuItem key="2" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Administration</Typography>
                                </MenuItem>
                            </Link>

                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                    >
                    FUNGISHOP
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        <Link href="/fungishop/">
                            <Button
                                key="1"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Blog
                            </Button>
                        </Link>

                        <Link href="/fungishop/products/">
                            <Button
                                key="2"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Products
                            </Button>
                        </Link>

                        <Link href="/fungishop/contact/">
                            <Button
                                key="3"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Contact
                            </Button>
                        </Link>

                        <Link href="/fungishop/administration/">
                            <Button
                                key="4"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Administration
                            </Button>
                        </Link>
                    
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >   
                            
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}

                            {session ? 
                                <MenuItem onClick={() => signOut()}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                                : 
                                <MenuItem onClick={() => signIn()}>
                                    <Typography textAlign="center">Login</Typography>
                                </MenuItem>
                            }
                        </Menu>
                    </Box>

                    <Box>
                        <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
                            <StyledBadge badgeContent={context.stateContext.cart.length} color="primary">
                                <ShoppingCartIcon style={{color:'white', fontSize:30}} />
                            </StyledBadge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        <Drawer anchor='right' open={openDrawer} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
        </>
    );
}

export default FungiAppBar;