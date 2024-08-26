import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Paper from '@mui/material/Paper';
import NavigationDrawer from './NavigationDrawer';
import InputBase from '@mui/material/InputBase';
import { useDispatch } from 'react-redux';
import { setSearchString } from '../../redux/features/utility';
import UserProfileMenu from './UserProfileMenu';
import { logout } from '../../redux/features/user';
import contactsIcon from "../../assets/contacts_icon.png";
import Avatar from '@mui/material/Avatar';

const drawerWidth = 250;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Appbar = ({ Component }) => {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [searchContact, setSearchContact] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleSearchChange = (event) => {
    setSearchContact(event.target.value);
    dispatch(
      setSearchString(event.target.value)
    );
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(
      logout()
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ backgroundColor: 'white', boxShadow: 'none', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 0 }}
            onClick={handleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            type="button"
            aria-label="search"
            sx={{
              padding: 0
            }}
          >
            <img src={contactsIcon} style={{
              width: '40px',
              height: '40px'
              }}
            />
            &nbsp;<span className='logo-text'>Contacts</span>
          </IconButton>

          <Paper
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 720,
              justifyContent: 'center',
              marginLeft: '90px',
              backgroundColor: '#f1f3f4',
              boxShadow: 'none'
            }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              value={searchContact}
              onChange={handleSearchChange}
            />
          </Paper>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large">
              <HelpOutlineOutlinedIcon />
            </IconButton>
            <IconButton size="large">
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="current user account"
              onClick={handleProfileMenuOpen}
            >
              <Avatar sx={{ bgcolor: '#000', height: 32, width: 32 }}>A</Avatar>
            </IconButton>
            <UserProfileMenu
              profileOpen={openProfile}
              anchorEl={anchorEl}
              handleClose={handleProfileMenuClose}
              handleLogout={handleLogout}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <NavigationDrawer 
        open={open}
        drawerWidth={drawerWidth}
      />

      <Main open={open}>
        <div className='app-bar-height' />
        <Component />
      </Main>
    </Box>
  );
};

export default Appbar;
