const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
     
    },
    phone: {
      type: String,
      
    },
    role: {
      type: String,
      enum: ['owner', 'builder'],
      default: 'owner',
    },
    address:{
        type:String,
    },
    builderFirm:{
      type:String,
    },
    forgotPasswordToken: {
      type: String
    },
    profileImageUrl: {
      type: String,
    },
    forgotPasswordExpiryDate: {
      type: Date
    },
    
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods = {
  jwtToken() {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        role: this.role
      },
      process.env.SECRET,
      { expiresIn: '96h' }
    );
  },
  getForgotPasswordToken() {
    const forgotToken = crypto.randomBytes(20).toString('hex');
    // Step 1 - save to DB
    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(forgotToken)
      .digest('hex');

    // Forgot password expiry date
    this.forgotPasswordExpiryDate = Date.now() + 120 * 60 * 1000;

    // Step 2 - return values to user
    return forgotToken;
  }
};



module.exports = mongoose.model("User", userSchema);
