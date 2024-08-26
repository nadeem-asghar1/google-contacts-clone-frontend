import React from "react";
import { Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

const ShowContact = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const contact = state.contact;

  const handleBackNavigate = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <IconButton
        onClick={handleBackNavigate}
      >
        <ArrowBackIcon />
      </IconButton>
      <div className='save-btn-div'>
        <Button
          variant='contained'
        >
          Edit
        </Button>
      </div>
      <div className='horizontal-line' />
      <div>
        Contact Details
        Name: {(contact.first_name.trim() + ' ' + contact.last_name.trim()).trim()}
      </div>
    </Box>
  );
};

export default ShowContact;
