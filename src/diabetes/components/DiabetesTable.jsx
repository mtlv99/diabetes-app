import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

function createData(name, calories, fat, carbs, protein) {
  return {
    name, calories, fat, carbs, protein,
  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const getDiabetesStatus = (hasDiabetes) => {
  const hasDiabetesColor = hasDiabetes ? 'error' : 'success';
  const hasDiabetesLabel = hasDiabetes ? 'Tiene diabetes' : 'No tiene diabetes';
  return <Chip label={hasDiabetesLabel} color={hasDiabetesColor} />;
};

export const DiabetesTable = ({ data = [] }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell align="right">Embarazos</TableCell>
          <TableCell align="right">Glucosa</TableCell>
          <TableCell align="right">Presión Sanguínea</TableCell>
          <TableCell align="right">Grosor piel</TableCell>
          <TableCell align="right">Insulina</TableCell>
          <TableCell align="right">IMC</TableCell>
          <TableCell align="right">Pedigree</TableCell>
          <TableCell align="right">Edad</TableCell>
          <TableCell align="right">Creado</TableCell>
          <TableCell align="right">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="right">{row.pregnancies}</TableCell>
            <TableCell align="right">{row.glucose}</TableCell>
            <TableCell align="right">{row.blood_pressure}</TableCell>
            <TableCell align="right">{row.skin_thickness}</TableCell>
            <TableCell align="right">{row.insulin}</TableCell>
            <TableCell align="right">{row.bmi}</TableCell>
            <TableCell align="right">{row.diabetes_pedigree_function}</TableCell>
            <TableCell align="right">{row.age}</TableCell>
            <TableCell align="right">{new Date(row.created).toLocaleDateString()}</TableCell>
            <TableCell align="right">{getDiabetesStatus(row.has_diabetes)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
