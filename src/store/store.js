import { configureStore } from '@reduxjs/toolkit';

import { diabetesSlice } from './diabetes/diabetesSlice';
import { uiSlice } from './ui/uiSlice';
import { authSlice } from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    diabetes: diabetesSlice.reducer,
  },
  // Este middleware es necesario para ignorar el error que muestra el toolkit por defecto
  // al usar valores que no son serializables, en este caso las fechas.
  /*
    Error original:
    A non-serializable value was detected in the state, in the path: ``.
    Value: Mon Mar 13 2023 00:47:16 GMT-0600 (hora estándar central)
    Take a look at the reducer(s) handling this action type: ui/onCloseDateModal.
    (See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)
  */
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
