const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

//@desc Register a user
//@route POST /api/users/register
//@access public
const createUser = asyncHandler(async (req, res) => {
    const { username, mail, password } = req.body;
    if(!username || !mail || !password ){
        res.status(404);
        throw new Error("All field are mandatory");
    }
    const userAvailable = await Users.findOne({ mail });
    if (userAvailable){
        res.status(400);
        throw new Error("User already exist");
    }

    //hashPassword
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password: ", hashedPassword);
    const user = await Users.create({
        username,
        mail,
        password: hashedPassword,
    });
    console.log(`User Created:  ${user}`);
    if(user){
        res.status(201).json({ _id: user.id, mail:user.mail });
    }else{
        res.status(400);
        throw new Error("user data not valid");
    }
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {mail, password} = req.body;
    if(!mail || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await Users.findOne({ mail });
    //compare password with hashedpassword
    const comparePassword = await bcrypt.compare(password, user.password);
    if(user && comparePassword ){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                mail: user.mail,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SEC,
        {expiresIn: "5m"}
        );
        res.status(200).json({ accessToken });
    }else{
        res.status(401)
        throw new Error("email or password not correct")
    }
});

//@desc get a user
//@route GET /api/users/current
//@access private
const getUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})
module.exports = { createUser, loginUser, getUser }