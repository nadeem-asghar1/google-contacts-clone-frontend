import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteContacts } from "../../redux/features/contact";
import FavoriteContactTile from "../Elements/FavoriteContactTile";
import Grid from '@mui/material/Grid';

const FavoriteContacts = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [favoriteContacts, setFavoriteContacts] = useState([]);

  const fetchContacts = async () => {
    const result = await dispatch(
      getFavoriteContacts(user)
    );

    if (result.payload.status === 200) {
      setFavoriteContacts(result.payload.data);
    }
  };

  useEffect(() => {

    fetchContacts();

  }, [dispatch, user]);
  
  return (
    <div>
      {
        favoriteContacts && favoriteContacts.length > 0 ? (
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
            {
            favoriteContacts.map((contact) => (
              <FavoriteContactTile
                key={contact.id}c
                id={contact.id}
                name={(contact.first_name.trim() + ' ' + contact.last_name.trim()).trim()}
                phone={contact.phone}
                color={contact.color}
                is_favorite={contact.is_favorite}
              />
            ))
            }
          </div>
        ) : (
          <div>No favorite contact yet</div>
        )
      }
    </div>
  );
};

export default FavoriteContacts;
