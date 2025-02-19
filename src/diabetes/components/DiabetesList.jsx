import React, { useMemo } from 'react';
import { getAllDiagnoses } from '../helpers';

// Nota: asi se evita un dependency cycle, no lo importé del archivo de barril.
// Lo hice yo, no es parte del curso (no sé si es la mejor solución??)
import { DiabetesItem } from './DiabetesItem';

export const DiabetesList = () => {
  const diagnoses = getAllDiagnoses();

  console.log('diagnoses', diagnoses);

  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {diagnoses.map((diagnose) => <DiabetesItem key={diagnose.id} {...diagnose} />)}
    </div>
  );
};
