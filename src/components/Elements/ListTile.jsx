import React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import ContactListMenu from './ContactListMenu';

const ListTile = ({ id, name, phone, color, handleFavorites, is_favorite, contact_image, handleMoveToTrash, anchorEl, openContactListMenu,
  closeContactListMenu, handleShowContact,
 }) => {

  return (
    <div>
      <List sx={{ padding: '0px' }}>
        <ListItem key={id} sx={{ padding: '0px' }}>
          <ListItemButton sx={{ padding: '5px' }} onClick={handleShowContact}>
              <Grid container>
                <Grid item xs={0.6} className='list-tile-item'>
                  <ListItemAvatar>
                    <Avatar src={contact_image} sx={{ bgcolor: !contact_image && color }}>{!contact_image && name.charAt(0)}</Avatar>
                  </ListItemAvatar>
                </Grid>
                <Grid item xs={6} className='list-tile-item'>
                  <ListItemText primary={name} />
                </Grid>
                <Grid item xs={3.4} className='list-tile-item'>
                  <ListItemText primary={phone} />
                </Grid>
              </Grid>
          </ListItemButton>
          <Grid item xs={2} className='list-tile-item'>
            <IconButton sx={{ p: '10px' }} onClick={() => handleFavorites(id)}>
              {is_favorite ? <StarIcon sx={{ color: '#1967d2' }} /> : <StarOutlineOutlinedIcon /> } 
            </IconButton>
            <IconButton sx={{ p: '10px' }}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              sx={{ p: '10px' }}
              onClick={(event) => openContactListMenu(event, id)}
              id={id}
            >
              <MoreVertIcon />
            </IconButton>
            <ContactListMenu
              closeContactListMenu={closeContactListMenu}
              anchorEl={anchorEl}
              handleMoveToTrash={handleMoveToTrash}
              id={id}
            />
          </Grid>
        </ListItem>
      </List>
    </div>
  );
};

export default ListTile;
