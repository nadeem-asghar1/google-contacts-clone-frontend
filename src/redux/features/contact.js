import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../Constants";

const initialState = {
  contacts: null
};

export const createNewContact = createAsyncThunk(
  'api/contacts',
  async ({ user, formData }) => {
    const url = apiUrl + '/api/contacts';
    return axios.post(url, formData , {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Authorization': "Bearer " + user.user.auth_token,
      },
    }).then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
  }
);

export const getAllContacts = createAsyncThunk(
  "api/contacts",
  async (user) => {
    const url = apiUrl + '/api/contacts';
    return axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': "Bearer " + user.user.auth_token,
        },
      }).then((response) => {
        return response;
      }).catch((error) => {
        throw error;
    });
  }
);

export const addContactToFavorites = createAsyncThunk(
  '/api/handle-favorites/:id',
  async ({ user, id }) => {
    const url = apiUrl + `/api/handle-favorites/${id}`;
    return axios.patch(url, { }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': "Bearer " + user.user.auth_token,
      },
    }).then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
  }
);

export const moveContactToTrash = createAsyncThunk(
  '/api/move-to-trash/:id',
  async ({ user, id }) => {
    const url = apiUrl + `/api/move-to-trash/${id}`;
    return axios.patch(url, { }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': "Bearer " + user.user.auth_token,
      },
    }).then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
  }
);

export const getFavoriteContacts = createAsyncThunk(
  "api/favorite-contacts",
  async (user) => {
    const url = apiUrl + '/api/favorite-contacts';
    return axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': "Bearer " + user.user.auth_token,
        },
      }).then((response) => {
        return response;
      }).catch((error) => {
        throw error;
    });
  }
);

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllContacts.fulfilled, (state, action) => {
      state.contacts = action.payload.data;
    });
  }
});

export default contactSlice.reducer;
