const UserDao = require('../dao/user_dao.js')
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
    try {
        const { username, password,email } = req.body;
        console.log(req.body)
        const existingUser = await UserDao.findByUserName(username)
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        console.log('Username is unique :)')
        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be atleast 6 characters" });
        }
        console.log('password is valid :)')
        const existingEmail = await UserDao.findByEmail(email)
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        console.log('email is unique :)')
        const newUser = await UserDao.createUser(req.body);
        console.log('user created :)')
        const token = jwt.sign({ username: username, id: newUser._id }, 'test');
        res.status(201).json({  token: token });
    }
    catch (err) {
        res.status(500).json({ err });
    }
}

const login = async (req, res) => {
    try {
        const { user, password } = req.body;
        const existingUser = await UserDao.findByUserNameOrMail(user)
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exists" });
        }
        if (password !== existingUser.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, SECRET_KEY);
        res.status(200).json({ username: existingUser.username, token: token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error)
    }
}

module.exports ={
    signup,
    login
}