import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';

import { DiabetesModal } from '../components/DiabetesModal';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';

import { useUiStore, useDiabetesStore, useAuthStore } from '../../hooks';

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal, isDateModalOpen } = useUiStore();
  const { diagnoses, setActiveDiagnosis, startLoadingDiagnoses } = useDiabetesStore();

  useEffect(() => {
    startLoadingDiagnoses();
  }, []);

  return (
    <>
      <Navbar />

      <h1>Diabetes</h1>

      {diagnoses && diagnoses.map((diagnosis) => (
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div key={diagnosis.id} onClick={() => setActiveDiagnosis(diagnosis)}>
          {diagnosis.id}
        </div>
      ))}

      <DiabetesModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
