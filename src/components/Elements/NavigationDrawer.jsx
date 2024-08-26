import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useSelector } from 'react-redux';
import googlePlusIcon from '../../assets/create_contact_btn_icon.png';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import SyncProblemOutlinedIcon from '@mui/icons-material/SyncProblemOutlined';

const NavigationDrawer = ({ open, drawerWidth }) => {

  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts);
  const sessionStorageSelectedItem = sessionStorage.getItem('selectedItem');

  const [selectedItem, setSelectedItem] = useState(sessionStorageSelectedItem ? +sessionStorageSelectedItem : 1);

  const handleNavigation = (param, index) => {
    setSelectedItem(index);
    sessionStorage.setItem('selectedItem', index);

    if (param === 'newContact') {
      navigate('/new-contact');
    } else if (param === 'allContacts') {
      navigate('/');
    } else if (param == 'favoriteContacts') {
      navigate('/favorite-contacts')
    }
  };

  const sidebar = [
    {
      index: 1,
      buttonText: 'Contacts',
      icon: Person2OutlinedIcon,
      lastText: contacts.contacts ? contacts.contacts.length : '',
      routeName: 'allContacts',
      cssClass: 'nav-sidebar-btn'
    },
    {
      index: 2,
      buttonText: 'Favorite contacts',
      icon: StarOutlineOutlinedIcon,
      lastText: '',
      routeName: 'favoriteContacts',
      cssClass: 'nav-sidebar-btn'
    },
    {
      index: 3,
      buttonText: 'Merge & fix',
      icon: SyncProblemOutlinedIcon,
      lastText: '',
      routeName: 'mergeFix',
      cssClass: 'nav-sidebar-btn'
    },
    {
      index: 4,
      buttonText: 'Import',
      icon: FileDownloadOutlinedIcon,
      lastText: '',
      routeName: 'import',
      cssClass: 'nav-sidebar-btn'
    },
    {
      index: 5,
      buttonText: 'Export',
      icon: CloudDownloadOutlinedIcon,
      lastText: '',
      routeName: 'export',
      cssClass: 'nav-sidebar-btn'
    },
    {
      index: 6,
      buttonText: 'Print',
      icon: PostAddOutlinedIcon,
      lastText: '',
      routeName: 'print',
      cssClass: 'nav-sidebar-btn'
    },
    {
      index: 7,
      buttonText: 'Trash',
      icon: DeleteOutlinedIcon,
      lastText: '',
      routeName: 'trash',
      cssClass: 'nav-sidebar-btn'
    }
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none'
        },
      }}
      variant='persistent'
      anchor='left'
      open={open}
    >
      <div className='app-bar-height' />
      <div className='create-contact-btn-div'>
        <Button
          className='create-contact-btn'
          onClick={() => handleNavigation('newContact')}
        >
          <div className='create-contact-btn-inner-div'>
            <img  src={googlePlusIcon} style={{ width: 36, height: 36 }} />
            Create contact
          </div>
        </Button>
      </div>
      <List>
        {
          sidebar.map((item) => (
            <ListItem key={item.index} disablePadding className={`${item.cssClass} ${item.index === selectedItem ? 'nav-selected-item' : ''}`} onClick={() => handleNavigation(item.routeName, item.index)}>
              <ListItemButton>
                <ListItemIcon>
                  <item.icon sx={{ color: item.index === selectedItem ?  '#1967d2' : '' }} />
                </ListItemIcon>
                <ListItemText primary={item.buttonText}/>
                <ListItemText primary={item.lastText}/>
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    </Drawer>
  );
};

export default NavigationDrawer;
