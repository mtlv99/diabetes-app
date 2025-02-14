import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
  onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents,
} from '../store';
import { diabetesApi } from '../api';

export const useDiabetesStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // Recordar que la manera de saber si debe crear un evento nuevo, o actualizar
    // uno existente, es por medio de la existentia de un `id`.
    // eslint-disable-next-line no-underscore-dangle
    try {
      if (calendarEvent.id) {
        // Actualizando
        await diabetesApi.put(`/events/${calendarEvent.id}`, calendarEvent);

        // se usa spread para romper la referencia al objeto (crea uno nuevo).
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      // TODO: poner activeEvent en null?????
      const { data } = await diabetesApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data?.msg, 'error');
    }
  };

  const startDeletingEvent = async () => {
    try {
      await diabetesApi.delete(`/events/${activeEvent.id}`, activeEvent);

      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error al borrar', error.response.data?.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await diabetesApi.get('/events');
      const foundEvents = data.eventos;

      dispatch(onLoadEvents(foundEvents));
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }
  };

  return {
    // Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
