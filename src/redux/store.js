import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from './features/user';
import contactReducer from './features/contact';
import utilityReducer from './features/utility';

export const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactReducer,
    utility: utilityReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false
    })
  ]
});
