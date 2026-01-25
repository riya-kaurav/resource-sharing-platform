import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

//Signup controller
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;


    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate password
    const isValid = await user.isPasswordCorrect(password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    // Generate tokens
    const accessToken = user.methodsAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token in DB
    user.refreshTokens = refreshToken;
    await user.save();

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// logout controller
export const logout = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.refreshTokens = null;
    await user.save();

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error: error.message });
  }
};

// refresh access token controller
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) 
    return res.status(401).json({ message: "Refresh token required" });

    // Verify refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });

      const user = await User.findById(decoded._id);
      if (!user || user.refreshTokens !== refreshToken) {
        return res.status(403).json({ message: "Refresh token not valid" });
      }

      // Generate new access token
      const newAccessToken = user.methodsAccessToken();

      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ message: "Error refreshing token", error: error.message });
  }
};
