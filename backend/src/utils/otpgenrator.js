import {User} from "../models/user.models"

export const  optGenrator =  async (email) =>{
const user =  await User.findOne({email})
const otp = Math.floor(100000 + Math.random() * 900000).toString();

// save in DB
user.resetOtp = otp;
user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min
await user.save();
}






