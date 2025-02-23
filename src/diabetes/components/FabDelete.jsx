import { useDiabetesStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingDiagnosis, hasDiagnosisSelected } = useDiabetesStore();

  const handleDelete = () => {
    startDeletingDiagnosis();
  };

  return (
    <button
      type="button"
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{ display: hasDiagnosisSelected ? '' : 'none', zIndex: 5000 }}
      aria-label="btn-delete"
    >
      <i className="fas fa-trash-alt" />
    </button>
  );
};
