import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/*registerController*/
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // 4️⃣ Response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "User registered successfully",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*loginController*/
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // 2️⃣ Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Compare password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 5️⃣ Send response
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
