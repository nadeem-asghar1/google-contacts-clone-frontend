import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllContacts, addContactToFavorites, moveContactToTrash } from '../../redux/features/contact';
import { useState } from 'react';
import ListTile from '../Elements/ListTile';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";

const Contacts = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const utility = useSelector((state) => state.utility);
  const contactsState = useSelector((state) => state.contacts);

  const [contacts, setContacts] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const fetchContacts = async () => {
    const result = await dispatch(
      getAllContacts(user)
    );

    if (result.payload.status === 200) {
      setContacts(result.payload.data);
    }
  };

  useEffect(() => {

    fetchContacts();

  }, [dispatch, user]);

  useEffect(() => {
    if (utility.searchContact === '') {
      setContacts(contactsState.contacts);
    } else {
      const filteredData = contacts.filter((contact) => {
        const name = (contact.first_name.trim() + ' ' + contact.last_name.trim()).trim();
        if (name.toLowerCase().includes(utility.searchContact.toLowerCase())) {
          return contact;
        }
      });

      setContacts(filteredData);
    }
  }, [utility.searchContact]);

  const handleFavorites = async (id) => {
    const response = await dispatch(
      addContactToFavorites({ user, id })
    );

    if (response.payload.status) {
      fetchContacts();
    }
  };

  const openContactListMenu = (event, id) => {
    setAnchorEl({ [id]: event.currentTarget });
  };

  const closeContactListMenu = () => {
    setAnchorEl(null);
  };

  const handleMoveToTrash = async (id) => {
    const response = await dispatch(
      moveContactToTrash({ user, id })
    );

    if (response.payload.status) {
      fetchContacts();
      closeContactListMenu();
    }
  };

  const handleShowContact = (contact) => {
    navigate(
      `/show-contact/${contact.id}`,
      {
        state: {
          contact: contact
        }
      }
    );
  };

  return (
    <Box>
      {
        contacts && contacts.length > 0 ? (
          <div>
            <Grid container>
              <Grid item xs={6.5} sx={{ marginLeft: '10px' }}>
                Name
              </Grid>
              <Grid item xs={3.4}>
                Phone number
              </Grid>
              <Grid item xs={2}>
              </Grid>
            </Grid>
            <div className='horizontal-line' />
            <div className='contacts-size-label'>
              CONTACTS ({contacts.length})
            </div>
            {
              contacts.map((contact) => (
                <ListTile
                  key={contact.id}c
                  id={contact.id}
                  name={(contact.first_name.trim() + ' ' + contact.last_name.trim()).trim()}
                  phone={contact.phone}
                  color={contact.color}
                  is_favorite={contact.is_favorite}
                  contact_image={contact.contact_image}
                  handleFavorites={handleFavorites}
                  handleMoveToTrash={handleMoveToTrash}
                  anchorEl={anchorEl}
                  closeContactListMenu={closeContactListMenu}
                  openContactListMenu={openContactListMenu}
                  handleShowContact={() => handleShowContact(contact)}
                />
              ))
            }
          </div>
        ) : (
          <div>
            <h1>No contact yet</h1>
          </div>
        )
      }
    </Box>
  );
}

export default Contacts;
