import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';

import { DiabetesModal } from '../components/DiabetesModal';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';

import { useUiStore, useDiabetesStore, useAuthStore } from '../../hooks';
import { DiabetesTable } from '../components/DiabetesTable';

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDiagnosisModal, isDiagnosisModalOpen } = useUiStore();
  const { diagnoses, setActiveDiagnosis, startLoadingDiagnoses } = useDiabetesStore();

  useEffect(() => {
    startLoadingDiagnoses();
  }, []);

  return (
    <>
      <Navbar />

      <h1>Diabetes</h1>

      <DiabetesTable data={diagnoses} />

      <DiabetesModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
