import { addHours } from 'date-fns';
import { useDiabetesStore, useUiStore } from '../../hooks';

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useDiabetesStore();

  const handleClickNew = () => {
    setActiveEvent({
      // Si no tiene un id, significa que es un evento nuevo.
      title: '', // required
      notes: '',
      start: new Date(), // required
      end: addHours(new Date(), 2), // required
      bgColor: '#fafafa',
      user: {
        // id: '123',
        // name: 'Marco',
      },
    });
    openDateModal();
  };

  return (
    <button
      type="button"
      className="btn btn-primary fab"
      onClick={handleClickNew}
    >
      <i className="fas fa-plus" />
    </button>
  );
};
