import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
  onAddNewDiagnosis, onDeleteDiagnosis, onSetActiveDiagnosis, onUpdateDiagnosis, onLoadDiagnoses,
} from '../store';
import { calendarApi } from '../api';

export const useDiabetesStore = () => {
  const dispatch = useDispatch();
  const { diagnoses, activeDiagnosis } = useSelector((state) => state.diabetes);
  const { user } = useSelector((state) => state.auth);

  const setActiveDiagnosis = (diagnosis) => {
    dispatch(onSetActiveDiagnosis(diagnosis));
  };

  const startSavingDiagnosis = async (diagnosis) => {
    // Recordar que la manera de saber si debe crear un diagnosis nuevo, o actualizar
    // uno existente, es por medio de la existencia de un `id`.
    // eslint-disable-next-line no-underscore-dangle
    try {
      // if (diagnosis.id) {
      //   // Actualizando
      //   await calendarApi.put(`/diagnoses/${diagnosis.id}`, diagnosis);

      //   // se usa spread para romper la referencia al objeto (crea uno nuevo).
      //   dispatch(onUpdateDiagnosis({ ...diagnosis, user }));
      //   return;
      // }

      const { data } = await calendarApi.post('/diagnoses/', diagnosis);
      dispatch(onAddNewDiagnosis({
        ...diagnosis,
        id: data.id,
        user_id: data.user_id,
        created: data.created,
        has_diabetes: data.has_diabetes,
        user,
      }));
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data?.msg, 'error');
    }
  };

  const startDeletingDiagnosis = async (id) => {
    console.log('deletion', { id });

    try {
      await calendarApi.delete('/diagnoses/', {
        data: { id },
      });

      dispatch(onDeleteDiagnosis({ id }));

      // Show a success toast when deletion is complete
      Swal.fire({
        icon: 'success',
        title: 'Diagnóstico eliminado con éxito',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.log(error);
      Swal.fire('Error al borrar', error.response.data?.msg, 'error');
    }
  };

  const startLoadingDiagnoses = async () => {
    try {
      const { data } = await calendarApi.get('/diagnoses');
      const foundDiagnoses = data.Diagnosis;

      dispatch(onLoadDiagnoses(foundDiagnoses));
    } catch (error) {
      console.log('Error cargando diagnosticos');
      console.log(error);
    }
  };

  return {
    // Propiedades
    diagnoses,
    activeDiagnosis,
    hasDiagnosisSelected: !!activeDiagnosis,

    // Metodos
    setActiveDiagnosis,
    startSavingDiagnosis,
    startDeletingDiagnosis,
    startLoadingDiagnoses,
  };
};
