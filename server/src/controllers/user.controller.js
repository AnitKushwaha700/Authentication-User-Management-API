import User from "../models/user.model.js";
import Session from "../models/session.model.js";
import bcrypt from "bcrypt";

// -------------------------------- GET MY PROFILE -------------------------------- //

export const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------------- UPDATE MY PROFILE -------------------------------- //

export const updateMyProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    // Check whether another user already owns this email
    const existingUser = await User.findOne({ email });

    if (
      existingUser &&
      existingUser._id.toString() !== req.user.id
    ) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------------- DELETE MY ACCOUNT -------------------------------- //

export const deleteMyAccount = async (req, res, next) => {
  try {
    const { password } = req.body;

    // 1. Validate password
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // 2. Find logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Verify password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // 4. Delete all user sessions
    await Session.deleteMany({
      user: user._id,
    });

    // 5. Delete user
    await User.findByIdAndDelete(user._id);

    // 6. Clear authentication cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------------- GET MY SESSIONS -------------------------------- //

export const getMySessions = async (req, res, next) => {
  try {
    const sessions = await Session.find({
      user: req.user.id,
    })
      .select("-refreshToken")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Sessions fetched successfully",
      data: sessions,
    });
  } catch (error) {
    next(error);
  }
};