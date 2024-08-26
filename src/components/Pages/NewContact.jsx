import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewContact } from '../../redux/features/contact';
import { toast } from 'react-toastify';
import { contactColors } from '../../Constants';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Avatar from '@mui/material/Avatar';

const NewContact = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const contactImageRef = useRef(null)

  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    contactImage: null,
  });

  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]));

      setNewContact({
        ...newContact,
        contactImage: event.target.files[0]
      })
    } else {
      setNewContact({
        ...newContact,
        [event.target.name]: event.target.value
      }); 
    }
  };

  const handleImageClick = () => {
    contactImageRef.current.click();
  };

  const handleClear = (event) => {
    if (event === 'firstName') {
      setNewContact({
        ...newContact,
        firstName: '',
        lastName: ''
      });
    } else if (event === 'phone') {
      setNewContact({
        ...newContact,
        phone: ''
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const random = Math.floor(Math.random() * contactColors.length);
      const color = contactColors[random];

      const formData = new FormData();
      formData.append('contact[first_name]', newContact.firstName);
      formData.append('contact[last_name]', newContact.lastName);
      formData.append('contact[phone]', newContact.phone);
      formData.append('contact[color]', color);
      formData.append('contact[contact_image]', newContact.contactImage);

      let result = await dispatch(
        createNewContact({ user, formData })
      );

      if (result.payload.status === 201) {
        navigate(-1);
        toast.success('Contact created successfully');
      } else {
        toast.error('Something went wrong. Please try again later!');
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const handleBackNavigate = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <div className='contact-image-and-save-btn-div'>
        <div className='contact-image-div'>
          <IconButton
            onClick={handleBackNavigate}
          >
            <CloseOutlinedIcon />
          </IconButton>
          <Avatar src={imageUrl} onClick={handleImageClick} className='contact-image-upload-button'>
            <IconButton color='#000000' aria-label='upload picture' className='contact-image-upload-button' component='label'>
              <AddPhotoAlternateOutlinedIcon className='upload-icon' />
            </IconButton>
          </Avatar>
          <input
            hidden
            id='contactImage'
            name='contactImage'
            accept="image/*"
            type='file'
            ref={contactImageRef}
            onChange={handleChange}
          />
        </div>
        <div className='save-btn-div'>
          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={newContact.firstName === '' && newContact.lastName === '' && newContact.phone === ''}
          >
            Save
          </Button>
        </div>
      </div>
      <div className='horizontal-line' />
      <div className='new-contact-form'>
        <Grid container>
          <Grid item xs={0.5} className='new-contact-grid-item'>
            <Person2OutlinedIcon className='gray-font-color new-font-size' />
          </Grid>
          <Grid item xs={6} className='new-contact-grid-item'>
            <TextField
              id='firstName'
              name='firstName'
              label='First name'
              variant='standard'
              className='form-text-field'
              inputProps={{style: { fontSize: 14, color: '#5F6368' }}}
              value={newContact.firstName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={0.5} className='new-contact-grid-item'>
            <button
              className='clear-text-btn'
              onClick={() => handleClear('firstName')}
            >
              <CloseOutlinedIcon />
            </button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={0.5} className='new-contact-grid-item'>
          </Grid>
          <Grid item xs={6} className='new-contact-grid-item'>
            <TextField
              id='lastName'
              name='lastName'
              label='Last name'
              variant='standard'
              value={newContact.lastName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={0.5} className='new-contact-grid-item'>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={0.5} className='new-contact-grid-item'>
            <PhoneOutlinedIcon className='gray-font-color new-font-size' />
          </Grid>
          <Grid item xs={6} className='new-contact-grid-item'>
            <TextField
              id='phone'
              name='phone'
              label='Phone'
              variant='standard'
              className='form-text-field'
              value={newContact.phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={0.5} className='new-contact-grid-item'>
            <button
              className='clear-text-btn'
              onClick={() => handleClear('phone')}
            >
              <CloseOutlinedIcon />
            </button>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default NewContact;
