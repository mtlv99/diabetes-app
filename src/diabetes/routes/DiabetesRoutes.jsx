import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Navbar } from '../../ui';
import {
  DiagnosePage, SearchPage,
} from '../pages';

// eslint-disable-next-line arrow-body-style
export const DiabetesRoutes = () => {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Routes>

          <Route path="search" element={<SearchPage />} />
          <Route path="/diagnoses" element={<DiagnosePage />} />

          <Route path="/" element={<Navigate to="/diagnoses" />} />
        </Routes>
      </div>
    </>
  );
};
