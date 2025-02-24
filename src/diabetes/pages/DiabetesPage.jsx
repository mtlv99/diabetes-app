import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Navbar } from '../components/Navbar';

import { DiabetesModal } from '../components/DiabetesModal';
import { FabAddNew } from '../components/FabAddNew';

import { useUiStore, useDiabetesStore, useAuthStore } from '../../hooks';
import { DiabetesTable } from '../components/DiabetesTable';
import { LayoutBase } from '../components/LayoutBase';

export const DiabetesPage = () => {
  const { user } = useAuthStore();
  const { openDiagnosisModal, isDiagnosisModalOpen } = useUiStore();
  const { diagnoses, setActiveDiagnosis, startLoadingDiagnoses } = useDiabetesStore();

  useEffect(() => {
    startLoadingDiagnoses();
  }, []);

  return (
    <LayoutBase>
      {/* <Navbar /> */}

      <Typography variant="h4">Lista de Diagnósticos</Typography>

      <DiabetesTable data={diagnoses} />

      <DiabetesModal />
      <FabAddNew />
    </LayoutBase>
  );
};
