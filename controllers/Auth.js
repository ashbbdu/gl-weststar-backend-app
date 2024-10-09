const User = require("../models/User");
const bcrypt = require("bcrypt");
module.exports.signup = async (req , res) => {
    try {
        const { email, firstName, lastName, password, } = req.body;
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(411).json({
                success: false,
                msg: "User already exist"
            })
        }
        if (!email || !firstName || !lastName || !password) {
                return res.status(411).json({
                    success: false,
                    msg: "Please fill the required fields"
                })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const userCreation = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        userCreation.password = "";
        return res.status(200).json({
            msg: "User created successfully !",
            user: userCreation
        })

    } catch (e) {
        console.log(e);
        return res.status(404).json({
            success: false,
            msg: "Something went wrong !",
        })
    }
}