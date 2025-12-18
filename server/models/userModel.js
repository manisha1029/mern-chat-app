import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { 
        type: String, 
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
   },
}, {
    timestamps: true,
});

// Pre-save hook: hash password only if it was modified or is new
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    try {
      const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });

  userSchema.methods.comparePassword = async function (userPassword){
    return bcrypt.compare(userPassword, this.password)
  }

const User = mongoose.model("User", userSchema);

export default User;