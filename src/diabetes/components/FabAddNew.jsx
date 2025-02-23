import { addHours } from 'date-fns';
import { useDiabetesStore, useUiStore } from '../../hooks';

export const FabAddNew = () => {
  const { openDiagnosisModal } = useUiStore();
  const { setActiveDiagnosis } = useDiabetesStore();

  const handleClickNew = () => {
    setActiveDiagnosis({
      // Si no tiene un id, significa que es un diagnosis nuevo.
      pregnancies: 0,
      glucose: 0,
      blood_pressure: 0,
      skin_thickness: 0,
      insulin: 0,
      bmi: 0,
      diabetes_pedigree_function: 0,
      age: 0,
      created: new Date(),
      has_diabetes: null,
    });
    openDiagnosisModal();
  };

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      className="btn btn-primary fab"
      onClick={handleClickNew}
    >
      <i className="fas fa-plus" />
    </button>
  );
};
