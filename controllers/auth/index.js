const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const user = require("../../models/user");
const generateToken = (user) => {
  const token = jsonwebtoken.sign(
    {
      username: user.username,
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return token;
};
const register = async (req, res) => {
  const { username, password, email, phone, fullname } = req.body;
  try {
    const oldUser = await user.getUserByUsername(username);
    if (oldUser.rows[0]) {
      res.status(401).send({
        message: "Username already exist",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = await user.createUser({
        ...req.body,
        password: hashPassword,
      });
      console.log(newUser.id, "userid");
      const token = generateToken(newUser);
      res.status(200).send({
        token,
      });
    }
  } catch (error) {
    res.status(404).send({
      message: "something went wrong!",
    });
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const oldUser = await user.getUserByUsername(username);
    if (oldUser.rows[0]) {
      const data = oldUser.rows[0];
      const checkPassword = await bcrypt.compare(
        password,
        oldUser.rows[0].password
      );
      if (checkPassword) {
        const token = generateToken(data);
        res.status(200).send({
          token,
        });
      } else {
        res.status(401).send({
          message: "Invalid password",
        });
      }
    }
  } catch (error) {
    res.status(404).send({
      message: "something went wrong!",
    });
  }
};
module.exports = {
  login,
  register,
};
