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
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"

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
    acessStatuses: ['authenticated'],
    isActive: true
  },
  {
    id: 'logout',
    text: 'Logout',
    redirect: '/api/auth/signout',
    acessStatuses: ['authenticated'],
    isActive: true
  },
  {
    id: 'signin',
    text: 'Sign In',
    redirect: '/api/auth/signin',
    acessStatuses: ['unauthenticated'],
    isActive: true
  },


]

const UserMenu = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const userImage = session && session.user && session.user.image && session.user.image
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    if (!userImage) return
    console.log(userImage)
  };
  const handleUserMenuClick = (e) => {
    e.preventDefault()
    const setting = settings.find(ar => ar.id === e.currentTarget.id)
    setting ? router.push(setting.redirect) : null
  }
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src={userImage} />
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
        {(()=>{
          const visibleSettings = settings.filter(row => row.isActive && row.acessStatuses.includes(status))
          const renderedSettings = visibleSettings.map((setting) => (
            <MenuItem id={setting.id} onClick={handleUserMenuClick}>
              <Typography textAlign="center">{setting.text}</Typography>
            </MenuItem>
          ))
          if (status==='loading') {return <Typography textAlign="center">...</Typography>}
          return renderedSettings
        })()
        }
      </Menu>
    </Box>
  )
}

const ResponsiveAppBar = () => {
  const router = useRouter()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
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

            <UserMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default ResponsiveAppBar;
