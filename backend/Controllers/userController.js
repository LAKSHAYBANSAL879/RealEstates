const User = require('../Models/userModel.js');
const emailValidator = require("email-validator");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const multer = require('multer');

// User signup
exports.signup = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);
    const { name, email, password, phone, address, builderFirm } = req.body;
    if (!name || !email || !password || !phone) {
      throw new Error("All fields are required");
    }

    const validateEmail = emailValidator.validate(email);
    if (!validateEmail) {
      throw new Error("Please enter a valid email address");
    }

    let user;
    const profileImageUrl = req.file.filename;
    user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      builderFirm,
      profileImageUrl
    });

    res.status(201).json({
      success: true,
      message: "User signup successfully",
      data: { user }
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'User already registered with this email',
      });
    } else {
      console.log(error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

// User signin
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      token,
      user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User already registered with this email',
      });
    } else {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

// Get user
exports.getuser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Unable to get current user",
      error,
    });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, address, builderFirm } = req.body;
    const user = await User.findOne({ _id: req.body.userId });

    let profileImageUrl;
    if (req.file) {
      profileImageUrl = req.file.filename;
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.builderFirm = builderFirm || user.builderFirm;

    if (profileImageUrl) {
      user.profileImageUrl = profileImageUrl;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'User details updated successfully',
      data: { user },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// User logout
exports.userLogout = (req, res) => {
  try {
    const cookieOptions = {
      expires: new Date(0),
      httpOnly: true,
    };

    res.cookie("token", null, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    const forgotPasswordToken = user.getForgotPasswordToken();
    await user.save();

    return res.status(200).json({
      success: true,
      token: forgotPasswordToken
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "New password is required"
    });
  }

  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    const user = await User.findOne({
      forgotPasswordToken: hashToken,
      forgotPasswordExpiryDate: {
        $gt: new Date()
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token or token is expired"
      });
    }

    user.password = password;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Successfully reset the password"
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
