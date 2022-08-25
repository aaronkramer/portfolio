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
import { trpc } from "../../utils/trpc";
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';

const pages = [
  {
    id: 'home',
    text: 'Home',
    redirect: '/',
    acessStatuses: ['all'],
    isActive: true
  },
  {
    id: 'sys-admin',
    text: 'System Administration',
    redirect: '/system-administration',
    acessStatuses: ['all'],
    isActive: true
  },
  {
    id: 'product-management',
    text: 'Product Management',
    redirect: '/product-management',
    acessStatuses: ['all'],
    isActive: true
  },
  {
    id: 'dev',
    text: 'Code',
    redirect: '/dev',
    acessStatuses: ['all'],
    isActive: true
  },
  {
    id: 'about-me',
    text: 'About Me',
    redirect: '/about-me',
    acessStatuses: ['all'],
    isActive: true
  },
];

const settings = [
  {
    id: 'profile',
    text: 'Profile',
    redirect: '/profile',
    acessStatuses: ['loggedIn'],
    isActive: true
  },
  {
    id: 'logout',
    text: 'Logout',
    redirect: '/api/logout',
    acessStatuses: ['loggedIn'],
    isActive: true
  },
  {
    id: 'signin',
    text: 'Sign In',
    redirect: '/api/login',
    acessStatuses: ['loggedOut'],
    isActive: true
  },


]

// const settings = [
//   {
//     text: 'Profile',
//     id: 'profile'
//   },
//   {
//     text: 'Account',
//     id: 'account'
//   },
//   {
//     text: 'Dashboard',
//     id: 'dashboard'
//   },
//   {
//     text: 'Logout',
//     id: 'logout'
//   },
// ]

const ResponsiveAppBar = () => {
  const router = useRouter()
  const { data, isLoading } = trpc.useQuery(["pages.getAll"], {
    initialData: []
  });
  const accessStatus = 'loggedIn'
  const visibleSettings = settings.filter(row => row.isActive && row.acessStatuses.includes(accessStatus))

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (e) => {
    e.preventDefault()
    // console.log(e.currentTarget.id)
    const page = pages.find(ar => ar.id === e.currentTarget.id)
    page ? router.push(page.redirect) : null
  }
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
              href="/"
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
              LOGO
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
                {pages.map((page) => (
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"><a href={page.redirect}>{page.text}</a></Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
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
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  // redirect={page.redirect}
                  onClick={handleMenuClick}
                  id={page.id}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.text}
                </Button>
              ))}
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
                {visibleSettings.map((setting) => (
                  <MenuItem key={setting.id} onClick={() => handleCloseUserMenu}>
                      <Typography textAlign="center">{setting.text}</Typography>
                    </MenuItem>
                      )
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default ResponsiveAppBar;
