import mongoose from "mongoose";
import User from "../models/user.model.js";
import Session from "../models/session.model.js";

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

export const getAllUsers = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      role,
      isActive,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const pageNumber = Math.max(Number(page), 1);

    const limitNumber = Math.min(Math.max(Number(limit), 1), 100);

    const skip = (pageNumber - 1) * limitNumber;

    const filter = {};

    // Search by name or email
    if (search.trim()) {
      filter.$or = [
        {
          name: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          email: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    // Role filter
    if (role) {
      filter.role = role;
    }

    // Active/inactive filter
    if (isActive !== undefined) {
      if (isActive === "true") {
        filter.isActive = true;
      }

      if (isActive === "false") {
        filter.isActive = false;
      }
    }

    // Allowed sorting fields
    const allowedSortFields = ["name", "email", "role", "createdAt"];

    const sortField = allowedSortFields.includes(sort) ? sort : "createdAt";

    const sortOrder = order === "asc" ? 1 : -1;

    const [users, totalUsers] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({
          [sortField]: sortOrder,
        })
        .skip(skip)
        .limit(limitNumber),

      User.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalUsers / limitNumber);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",

      data: {
        users,

        pagination: {
          currentPage: pageNumber,
          limit: limitNumber,
          totalUsers,
          totalPages,
          hasNextPage: pageNumber < totalPages,
          hasPreviousPage: pageNumber > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------------ Get-Users-By-Id ---------------------------------- //

export const getUserById = async (req, res, next) => {
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

export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role",
      });
    }

    user.role = role;

    await user.save();

    // Revoke existing sessions after role change
    await Session.deleteMany({
      user: user._id,
    });

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------------ Delete-User ------------------------------------- //

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Prevent admin from deleting themselves
    if (id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    // Find and delete user
    const user = await User.findByIdAndDelete(id);

    // User not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// -------------------------------- BLOCK / UNBLOCK USER -------------------------------- //

export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be a boolean",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent admin from blocking their own account
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own account status",
      });
    }

    user.isActive = isActive;

    await user.save();

    // If blocking user, revoke all their sessions
    if (!isActive) {
      await Session.deleteMany({
        user: user._id,
      });
    }

    return res.status(200).json({
      success: true,
      message: isActive
        ? "User activated successfully"
        : "User blocked successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    next(error);
  }
};
