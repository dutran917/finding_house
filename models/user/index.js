const { pool } = require("../../database");
const createUser = async (data) => {
  const result =
    await pool.query(`INSERT INTO "User" (username, password, phone, email, fullname) 
    VALUES ('${data.username}','${data.password}','${data.phone}','${data.email}','${data.fullname}');`);

  return result;
};
const getUserById = async (id) => {
  const result = await pool.query(`SELECT * FROM "User" WHERE id = '${id}';`);
  return result;
};
const getUserByUsername = async (username) => {
  const result = await pool.query(
    `SELECT * FROM "User" WHERE username = '${username}';`
  );
  return result;
};
const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM "User";`);
  return result;
};
const updateUserInfoById = async (data) => {
  const updatePhone = data.phone ? `phone = '${data.phone}',` : "";
  const updateEmail = data.email ? `email = '${data.email}',` : "";
  const updateFullname = data.fullname ? `fullname = '${data.fullname}'` : "";
  const result = await pool.query(
    `UPDATE "User" SET ${updatePhone} ${updateEmail} ${updateFullname};`
  );
  return result;
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  getUserByUsername,
  updateUserInfoById,
};
