import User from "../models/user.model.js";
import mongoose from "mongoose";

// ------------------------------ Admin-Dashboard ------------------------------------- //

export const adminDashboard = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Welcome Admin",
      data: {
        user: {
          id: req.user.id,
          email: req.user.email,
          role: req.user.role,
        },
      },
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ------------------------------ Get-All-Users ------------------------------------- //

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      message: "Users Fetched Successfully",
      data: users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ------------------------------ Get-Users-By-Id ---------------------------------- //

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      data: user,
    });
  } catch (error) {
    console.error("Get User By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ------------------------------ Update-User-Role ------------------------------------- //

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Validate role
    const allowedRoles = ["user", "admin", "restaurant"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    // User not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Update User Role Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};