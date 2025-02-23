/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { useDiabetesStore, useUiStore } from '../../hooks';

// Customize the modal styles as needed
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const DiabetesModal = () => {
  const { closeDiagnosisModal, isDiagnosisModalOpen } = useUiStore();
  const { activeDiagnosis, startSavingDiagnosis } = useDiabetesStore();

  // Initialize react-hook-form with default values
  // You can add or remove default values as needed.
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      pregnancies: 0,
      glucose: 0,
      blood_pressure: 0,
      skin_thickness: 0,
      insulin: 0,
      bmi: 0,
      diabetes_pedigree_function: 0,
      age: 0,
    },
  });

  /**
   * If `activeDiagnosis` is not null, use it as the
   * form’s default values. Otherwise, reset to the defaults.
   */
  useEffect(() => {
    if (activeDiagnosis) {
      reset({
        pregnancies: activeDiagnosis.pregnancies ?? 0,
        glucose: activeDiagnosis.glucose ?? 0,
        blood_pressure: activeDiagnosis.blood_pressure ?? 0,
        skin_thickness: activeDiagnosis.skin_thickness ?? 0,
        insulin: activeDiagnosis.insulin ?? 0,
        bmi: activeDiagnosis.bmi ?? 0,
        diabetes_pedigree_function: activeDiagnosis.diabetes_pedigree_function ?? 0,
        age: activeDiagnosis.age ?? 0,
      });
    } else {
      // Reset to default if no active diagnosis
      reset({
        pregnancies: 0,
        glucose: 0,
        blood_pressure: 0,
        skin_thickness: 0,
        insulin: 0,
        bmi: 0,
        diabetes_pedigree_function: 0,
        age: 0,
      });
    }
  }, [activeDiagnosis, reset]);

  /**
   * Called when form is submitted successfully
   */
  const onSubmit = async (data) => {
    await startSavingDiagnosis(data);
    closeDiagnosisModal();
  };

  /**
   * Closes the modal
   */
  const onCloseModal = () => {
    closeDiagnosisModal();
  };

  return (
    <Modal
      isOpen={isDiagnosisModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>Nuevo Diagnóstico</h1>
      <hr />

      {/*
        Use `handleSubmit(onSubmit)` from react-hook-form
        instead of manually handling form data
      */}
      <form className="container" onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group mb-2">
          <label htmlFor="">Embarazos</label>
          <input
            type="number"
            className="form-control"
            {...register('pregnancies', {
              required: 'Este campo es requerido',
              min: { value: 0, message: 'No puede ser negativo' },
            })}
          />
          {errors.pregnancies && (
            <small className="text-danger">{errors.pregnancies.message}</small>
          )}
        </div>

        <div className="form-group mb-2">
          <label>Glucosa</label>
          <input
            type="number"
            className="form-control"
            {...register('glucose', {
              required: 'Este campo es requerido',
              min: { value: 0, message: 'No puede ser negativo' },
            })}
          />
          {errors.glucose && (
            <small className="text-danger">{errors.glucose.message}</small>
          )}
        </div>

        <div className="form-group mb-2">
          <label>Presión Sanguínea</label>
          <input
            type="number"
            className="form-control"
            {...register('blood_pressure', {
              required: 'Este campo es requerido',
              min: { value: 0, message: 'No puede ser negativo' },
            })}
          />
          {errors.blood_pressure && (
            <small className="text-danger">{errors.blood_pressure.message}</small>
          )}
        </div>

        <div className="form-group mb-2">
          <label>Grosor de la Piel</label>
          <input
            type="number"
            className="form-control"
            {...register('skin_thickness', {
              required: 'Este campo es requerido',
              min: { value: 0, message: 'No puede ser negativo' },
            })}
          />
          {errors.skin_thickness && (
            <small className="text-danger">{errors.skin_thickness.message}</small>
          )}
        </div>

        <div className="form-group mb-2">
          <label>Insulina</label>
          <input
            type="number"
            className="form-control"
            {...register('insulin', {
              required: 'Este campo es requerido',
              min: { value: 0, message: 'No puede ser negativo' },
            })}
          />
          {errors.insulin && (
            <small className="text-danger">{errors.insulin.message}</small>
          )}
        </div>

        <div className="form-group mb-2">
          <label>Índice de Masa Corporal</label>
          <input
            type="number"
            step="any"
            className="form-control"
            {...register('bmi', {
              required: 'Este campo es requerido',
              min: { value: 0, message: 'No puede ser negativo' },
            })}
          />
          {errors.bmi && (
            <small className="text-danger">{errors.bmi.message}</small>
          )}
        </div>

        <div className="form-group mb-2">
          <label>Función Pedigree</label>
          <input
            type="number"
            step="any"
            className="form-control"
            {...register('diabetes_pedigree_function', {
              required: 'Este campo es requerido',
              min: { value: 0, message: 'No puede ser negativo' },
            })}
          />
          {errors.diabetes_pedigree_function && (
            <small className="text-danger">
              {errors.diabetes_pedigree_function.message}
            </small>
          )}
        </div>

        <div className="form-group mb-2">
          <label>Edad</label>
          <input
            type="number"
            className="form-control"
            {...register('age', {
              required: 'Este campo es requerido',
              min: { value: 0, message: 'No puede ser negativo' },
            })}
          />
          {errors.age && (
            <small className="text-danger">{errors.age.message}</small>
          )}
        </div>

        <hr />

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save" />
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  );
};
