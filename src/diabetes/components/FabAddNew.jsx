import { addHours } from 'date-fns';
import { useDiabetesStore, useUiStore } from '../../hooks';

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveDiagnosis } = useDiabetesStore();

  const handleClickNew = () => {
    setActiveDiagnosis({
      // Si no tiene un id, significa que es un diagnosis nuevo.
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
