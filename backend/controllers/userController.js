import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";


// registerController......................................................................
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

// loginController................................................................
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
    // Google account cannot login with password
    if (!user.password) {
      return res.status(400).json({
        message: "This account uses Google Sign-In. Please continue with Google.",
      });
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


// google login .....................................................
export const googleLogin = async (req, res) => {

  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture, sub } = payload;

    let user = await User.findOne({ email });

    // if user doesn't exist → create
    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        googleId: sub,
        password: null,
      });
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token,
    });

  } catch (error) {
    console.error("Google Login Error:", error);

    res.status(401).json({
      message: error.message,
    });
  }
};


// Forgot Password................................................
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email",
      });
    }

    // Google users cannot reset password
    if (!user.password) {
      return res.status(400).json({
        message:
          "This account uses Google Sign-In. Please continue with Google.",
      });
    }

    // Generate Reset Token
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    console.log("=================================");
    console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("Current Directory:", process.cwd());
    console.log("=================================");
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const html = `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>Password Reset Request</h2>

        <p>Hello <strong>${user.name}</strong>,</p>

        <p>
          We received a request to reset your password.
        </p>

        <p>
          Click the button below to reset your password.
        </p>

        <a
          href="${resetLink}"
          style="
            display:inline-block;
            padding:12px 25px;
            background:#2563eb;
            color:white;
            text-decoration:none;
            border-radius:6px;
            font-weight:bold;
          "
        >
          Reset Password
        </a>

        <p style="margin-top:20px;">
          This link will expire in <strong>15 minutes</strong>.
        </p>

        <p>
          If you didn't request this, simply ignore this email.
        </p>

        <hr/>

        <p style="color:gray;">
          Task Manager Team
        </p>
      </div>
    `;

    await sendEmail(
      user.email,
      "Reset Your Password",
      html
    );

    res.status(200).json({
      message: "Password reset link sent successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// Reset Password...................................................................
export const resetPassword = async (req, res) => {
  try {

    const { token } = req.params;

    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Google users cannot reset password
    if (!user.password) {
      return res.status(400).json({
        message:
          "This account uses Google Sign-In. Please continue with Google.",
      });
    }

    // DON'T hash here.
    // User model will hash automatically.

    user.password = password;

    await user.save();

    res.status(200).json({
      message: "Password reset successful.",
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: "Invalid or expired reset link.",
    });

  }
};