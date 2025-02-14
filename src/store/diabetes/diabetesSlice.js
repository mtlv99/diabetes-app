/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const eventsMock = {
//   _id: new Date().getTime(),
//   title: 'Evento de Prueba', // required
//   notes: 'Esto es una prueba, hola mundo!',
//   start: new Date(), // required
//   end: addHours(new Date(), 2), // required
//   bgColor: '#fafafa',
//   user: {
//     _id: '123',
//     name: 'Marco',
//   },
// };


/* eslint-disable no-param-reassign */
export const diabetesSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: [
      // eventsMock
    ],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onClearActiveEvent: (state) => {
      state.activeEvent = null;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        // Si el evento coincide, entonces retorna lo que viene en el payload,
        // en vez de lo que está actualmente en el store.
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      // Acá filtra por todos los elementos que NO tengan el id del evento activo,
      // por que basicamente termina excluyendo/borrando el evento activo.
      // También se debe comprobar si hay un evento activo para poder borrar:
      // si no, tratará de leer un 'id' de una propiedad en null.
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event.id !== state.activeEvent.id);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;

      // state.events = payload;'
      // Se podria dejar como arriba, pero aqui se optimiza para que solo agregue eventos que no han sido cargados.
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});


// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent, onClearActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar,
} = diabetesSlice.actions;
