import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { DiabetesModal } from '../components/DiabetesModal';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';

import { useUiStore, useDiabetesStore, useAuthStore } from '../../hooks';

export const DiabetesPage = () => {
  const { user } = useAuthStore();
  const { openDateModal, isDateModalOpen } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useDiabetesStore();

  useEffect(() => {
    startLoadingEvents();
  }, []);


  return (
    <>
      <Navbar />

      <p>Diabetes Home</p>

      <DiabetesModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
