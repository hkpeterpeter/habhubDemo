// User:
//  id (key): string (e.g. peter, tiffany, fiona)
//  firstName: string
//  lastName: string
//  role: string = Patient / Therapist / Family
//
// Patient: extends User
//  exerciseIDs: Array of foreignKeys
//
// Therapist: extends User
//  patientIDs: Array of patientIDs

const makeUser = (
  id,
  firstName,
  lastName,
  role) => ({ id, firstName, lastName, role });


const users = [
  {
    ...makeUser('peter', 'Peter', 'Chung', 'Patient'),
    exerciseIDs: [0, 1, 2, 3, 4, 5],
  },
  {
    ...makeUser('tiffany', 'Tiffany', 'Lee', 'Therapist'),
    patientIDs: ['peter', 'john'],
  },
  makeUser('fiona', 'Fiona', 'Chung', 'Family'),
  {
    ...makeUser('john', 'John', 'Tsang', 'Patient'),
    exerciseIDs: [],
  },
];

export default users;
