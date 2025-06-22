const user = require ("../Models/userSchema")
const bcrypt = require("bcryptjs")


exports.signup = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const existing = await user.findOne({$or: [{email}]});
        if (existing) return res.status(400).json({msg: "Email already exists"});

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new user({email, name, password:hashed})

        await newUser.save();
        res.status(200).json({msg: "User registered successfully"})
    }
    catch(err){
        res.status(500).json({msg: "Server error", error:err.message})
    }
}