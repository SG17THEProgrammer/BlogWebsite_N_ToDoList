const User = require("../models/userSchema")
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    try {
        const { name, email, phone, password, image, age } = req.body;
        // console.log(req.body);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: ['Email already exists'] });
        }

        const existingPhoneNumber = await User.findOne({ phone });
        if (existingPhoneNumber) {
            return res.status(400).json({ message: ['Phone Number already exists'] });
        }

        
            const hashPassword = await bcrypt.hash(password,10)
            // password = hashPassword


        const registerUser = new User({
            name, email, phone, password:hashPassword, image, age
        });

        try {

            await registerUser.save();

            return res.status(200).json({
                message: ['Registered successfully'],
                userData: registerUser,
                token: await registerUser.generateToken(),
                userID: registerUser._id.toString()
            });
        } catch (error) {
            return res.status(500).json({
                message: ['Error occurred while registering user'],
                error: error.message
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: ['Unexpected error occurred'], error: error.message });
    }
};



const login = async (req, res) => {
    try {
        const {email , password}= req.body
        // //console.log(req.body)
        // //console.log("email"+ email)
        // //console.log(password)

        const userExist = await User.findOne({ email })
        // //console.log("user" + userExist)

        if (!userExist) {
            res.status(404).json({ message: ["Invalid password or email "] })
            return ; 
        }

        //directly password match krwa liya 
        const isMatch = await bcrypt.compare(password,userExist.password )


        if (isMatch) {
            res.status(200).json({
                message: ['login successful'],
                // data: user,
                token: await userExist.generateToken(),
                userID: userExist._id.toString()
            });

        }
        else {
            res.status(404).json({ message: ["Invalid password or email "] })

        }

    } catch (error) {
        console.log(error)
        // res.status(404).send(error)
        // // res.status(404).json({ message: "Server prblm" })


    }
}

const getUser = async (req, res) => {
    try {

        const userData = req.user;
        // console.log(userData);

        return res.status(200).json({ userData })


    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({}) ; 
        return res.status(200).json({message:"All users found" , 
            allusers : allUsers
        })

    } catch (error) {
        console.log(error)
    }
}

const updateProfile = async (req, res) => {
    try {
        const { userId, userInfo } = req.body;
        const {name, email, phone, age, password, image , confirmPassword} = userInfo 


        const user = await User.findById(userId); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: ['Email already exists'] });
            }
        }
    
        if (password != confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (phone && phone !== user.phone) {
        const existingPhoneNumber = await User.findOne({ phone });
        if (existingPhoneNumber) {
            return res.status(400).json({ message: ['Phone Number already exists'] });
        }
    }

        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (age) user.age = age;
        if (image) user.image = image;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await User.findByIdAndUpdate(userId, user, { new: true });
        
        res.status(200).json({
            message:["Profile updated successfully"],
            updatedUser: user,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating profile" });
    }
}

module.exports = {register,getAllUsers,login,getUser,updateProfile}