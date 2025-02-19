/* eslint-disable camelcase */
export const DiabetesItem = ({
  id,
  pregnancies,
  glucose,
  blood_pressure,
  skin_thickness,
  insulin,
  bmi,
  diabetes_pedigree_function,
  age,
  created,
  has_diabetes,
}) => {
  // eslint-disable-next-line no-console
  console.log(
    'Item',
    id,
    pregnancies,
    glucose,
    blood_pressure,
    skin_thickness,
    insulin,
    bmi,
    diabetes_pedigree_function,
    age,
    created,
    has_diabetes,
  );

  return (
    <div className="col">
      <div className="card animate__animated animate__fadeIn">
        <div className="row no-gutters">
          <p>{pregnancies}</p>
        </div>
      </div>
    </div>
  );
};
