import { useDiabetesStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useDiabetesStore();

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      type="button"
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{ display: hasEventSelected ? '' : 'none', zIndex: 5000 }}
      aria-label="btn-delete"
    >
      <i className="fas fa-trash-alt" />
    </button>
  );
};
