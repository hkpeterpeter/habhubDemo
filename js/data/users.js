const makeUser = (id, firstName, lastName, role) => ({ id, firstName, lastName, role });

const users = [
  makeUser('peter', 'Peter', 'Chung', 'Patient'),
  makeUser('tom', 'Tom', 'Lee', 'Therapist'),
  makeUser('fiona', 'Fiona', 'Chung', 'Family'),
];

export default users;
