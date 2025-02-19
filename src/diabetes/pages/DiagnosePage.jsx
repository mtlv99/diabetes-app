import React, { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getAllDiagnoses } from '../helpers';
import { DiabetesList } from '../components/DiabetesList';

/* eslint-disable react/jsx-one-expression-per-line */
export const DiagnosePage = () => (
  <div className="row mt-5">

    <h3>Diagnose Page</h3>

    <DiabetesList />

  </div>
);
