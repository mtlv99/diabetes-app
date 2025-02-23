/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDiabetesStore, useUiStore } from '../../hooks';
import { getEnvVariables } from '../../helpers';

registerLocale('es', es);

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

// Evita un error en la parte de testing (en el unit test no existe un elemento llamado "#root").
if (getEnvVariables().VITE_MODE !== 'test') {
  // El root del App de React.
  Modal.setAppElement('#root');
}

export const DiabetesModal = () => {
  const { closeDateModal, isDateModalOpen } = useUiStore();
  const { activeDiagnosis, startSavingDiagnosis } = useDiabetesStore();

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const isValid = useMemo(() => {
    if (!formSubmitted) return '';
    return (formValues.title.length > 0)
      ? ''
      : 'is-invalid';
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    // Hay un punto donde está en null: al cargar la aplicación.
    // Por eso es necesaria esta validación.
    if (activeDiagnosis !== null) {
      setFormValues({ ...activeDiagnosis });
    }
  }, [activeDiagnosis]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  // `changing` emite de valores: 'start', 'end'
  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setFormSubmitted(true);

    // Si la diferencia es negativa, no deberia permitir guardar el evento.
    const difference = differenceInSeconds(formValues.end, formValues.start);

    // Si es un NaN, significa que no se ha seleccionado la fecha.
    if (Number.isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Las fechas ingresadas no son válidas.', 'warning');
      console.log('Error en fechas');
      return;
    }

    if (formValues.title.length <= 0) return;

    await startSavingDiagnosis(formValues);
    closeDateModal();

    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      // onRequestClose={() => closeDateModal()}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>Nuevo evento</h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event) => onDateChange(event, 'start')}
            className="form-control"
            dateFormat="Pp"
            locale="es"
            showTimeSelect
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDateChange(event, 'end')}
            className="form-control"
            dateFormat="Pp"
            locale="es"
            showTimeSelect
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${isValid}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save" />
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  );
};
