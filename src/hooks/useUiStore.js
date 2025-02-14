import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onClearActiveEvent, onCloseDateModal, onOpenDateModal } from '../store';

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state) => state.ui);


  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
    dispatch(onClearActiveEvent());
  };

  const toggleDateModal = () => {
    // eslint-disable-next-line no-unused-expressions
    isDateModalOpen ? closeDateModal() : openDateModal();
  };

  return {
    // Propiedades
    isDateModalOpen,

    // Metodos
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
