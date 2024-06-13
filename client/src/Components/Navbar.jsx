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
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import deer from '../assets/deer.jpg'

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['My Docs', 'Logout'];

function Navbar() {
  const navigate=useNavigate();
  const [UserID,SetUserID]=useState('');
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  const auth=getAuth();
  const HandleLogout=()=>{
    signOut(auth).then(() => {
      // console.log('signed out worked')
      // SetUser('');
      // navigate(`/`);
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    }); 
  }

  useEffect(()=>{
    const check=()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          SetUserID(user.uid)
          console.log(UserID)
        } else {
          // console.log('user state changed from editor jsx');
          // navigate('/')
          console.log('i am in Navbar.jsx checks else part');
          
        }
      });
    }
    check();
  },[auth])




  // const handelSetting=(setting)=>{
    // switch(setting){
    //   case 'Logout':
    //     HandleLogout();
    //     break;
    //   case 'My Docs':
    //     navigate(`/userdocs/:${UserID}`);
    //     break;
    //   default:
    //     break;
  //   }
  // }

  const HandleClicks=(setting)=>{
    switch(setting){
      case 'Logout':
        console.log('logout clicked ');
        HandleLogout();
        break;
      case 'My Docs':
        console.log('docs view clicked');
        navigate(`/userdocs/${UserID}`);
        break;
    }
  }

  return (
    <AppBar position="sticky" color='transparent' sx={{zIndex:300, backgroundImage:{deer}, backgroundColor:"#162938"}}>

      <Container maxWidth="xl" sx={{display:"flex", justifyContent:"space-between"}}>
        <Toolbar sx={{padding:"10px"}}>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'red',
              textDecoration: 'none',
              flex:'1',
              textAlign:"left"
            }}
          >
            GOOGLE DOCS CLONE 
          </Typography>
        </Toolbar>
          
        <Toolbar>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp"  />
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
                  <Typography textAlign="center" onClick={()=>{HandleClicks(setting)}}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>

      </Container>
    </AppBar>
  );
}
export default Navbar;
