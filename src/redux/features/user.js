import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../Constants";

const initialState = {
  user: null
};

initialState.user = JSON.parse(localStorage.getItem('user'));

export const signUpUser = createAsyncThunk(
  'api/users',
  async (newUser) => {
    const url = apiUrl + '/api/users';
    return axios.post(url, { user: newUser }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    }).then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
  }
);

export const checkEmailAvailability = createAsyncThunk(
  '/api/check-email-availability',
  async (email) => {
    const url = apiUrl + '/api/check-email-availability';
    return axios.post(url, { email: email }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
  }
);

export const loginUser = createAsyncThunk(
  '/api/authenticate',
  async (session) => {
    const url = apiUrl + '/api/authenticate';
    return axios.post(url, { session: session }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
      localStorage.setItem('user', JSON.stringify(state.user));
    });
  }
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
