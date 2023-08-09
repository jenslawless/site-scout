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
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { useUser, UserButton, useAuth, SignOutButton, useClerk } from "@clerk/clerk-react";


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { isLoaded, isSignedIn, user } = useUser();
    const { sessionId } = useAuth();

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

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <AppBar className="custom-app-bar" sx={{ width: '100%', backgroundColor: '#53917E', height: '100px' }}>
            <Toolbar>
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        marginLeft: 0,
                        fontSize: '50px',
                        marginRight: '40px',

                    }}
                >
                    Site Scout
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
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                    >
                        <MenuItem component={NavLink} to='/my-maps' onClick={handleCloseNavMenu}>My Maps</MenuItem>
                        <MenuItem component={NavLink} to='/create-new' onClick={handleCloseNavMenu}>Create New Map</MenuItem>
                    </Menu>
                </Box>
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        marginRight: 'auto',  // Push the logo to the far left
                    }}
                >
                    LOGO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Button component={NavLink} to='/my-maps' sx={{ marginTop: 'auto', marginBottom: 'auto', color: 'white', display: 'block', fontSize: '17px' }}>My Maps</Button>
                    <Button component={NavLink} to='/create-new' sx={{ marginTop: 'auto', marginBottom: 'auto', color: 'white', display: 'block', fontSize: '17px' }}>Create New Map</Button>
                </Box>
                <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <UserButton />
                    <Typography sx={{ fontSize: '17px' }}>Welcome, {user.firstName}!</Typography>
                </Box>
            </Toolbar>
        </AppBar>

    );
}
export default ResponsiveAppBar;
