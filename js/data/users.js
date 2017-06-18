
const makeUser = (
  id,
  firstName,
  lastName,
  role) => ({ id, firstName, lastName, role });


const users = [
  {
    ...makeUser('peter', 'Peter', 'Chung', 'Patient'),
    exerciseIDs: [0, 1],
  },
  makeUser('tiffany', 'Tiffany', 'Lee', 'Therapist'),
  makeUser('fiona', 'Fiona', 'Chung', 'Family'),
];

export default users;
