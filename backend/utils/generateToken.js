import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// // generateToken.js
// jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//   expiresIn: "7d"
// });

export default generateToken;
