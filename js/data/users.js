// User:
//  id (key): string (e.g. peter, tiffany, fiona)
//  firstName: string
//  lastName: string
//  role: string = Patient / Therapist / Family
//
// Patient: extends User
//  exerciseIDs: Array of foreignKeys

const makeUser = (
  id,
  firstName,
  lastName,
  role) => ({ id, firstName, lastName, role });


const users = [
  {
    ...makeUser('peter', 'Peter', 'Chung', 'Patient'),
    exerciseIDs: [0, 1, 2, 3],
  },
  makeUser('tiffany', 'Tiffany', 'Lee', 'Therapist'),
  makeUser('fiona', 'Fiona', 'Chung', 'Family'),
];

export default users;
