const UserDao = require('../dao/user_dao.js')
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const passport = require('passport');
const { generateResetToken } = require('../utils/authentication.js');
const { passwordResetLinkTemplate } = require('../templates/email-templates.js');
const { HTTP_STATUS, MESSAGE_STATUS } = require('../helper/constants.js');
const { transporter } = require('../utils/transpoerter.js');
const { encryptPassword } = require('../helper/helper-function.js');

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
            return res.status(409).json({ message: "Email already exists" });
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
        existingUser.password = null;
        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, SECRET_KEY);
        res.status(200).json({ user:existingUser, token: token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error)
    }
}

const authGoogle = passport.authenticate('google', {
    scope: ['profile', 'email']
  });
  

// Middleware to handle Google OAuth callback
const authGoogleCallback = passport.authenticate('google', {
    failureRedirect: '/'
});

// This is the actual callback function after Google has authenticated the user
const handleRedirect = (req, res) => {
    // If authentication was successful, redirect to the profile page
    res.redirect('/profile');
};
  
  const getProfile = (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.redirect('/');
    }
  };


  const storeResetToken = async (userId, token, expiration) => {
    try {
      await UserDao.storeResetToken(userId, token, expiration);
      return true;
    } catch (error) {
    //   log('storeResetToken',error)
    //   loggermail.sendLoggerMail('storeResetToken',error)

      return false;
    }
  };


  const forgetResetLink = async (req, res) => {
    try {
      const userEmail = req.body.email;
      console.log(userEmail);
      
      const user = await UserDao.findByEmail(userEmail);
      console.log(user);

      if (!user || user.length==0) {
        return res.status(404).json({ error: 'User not found.' });
      }
      
      const resetToken = generateResetToken();
      const expiration = Date.now() + 3600000;
      let userName = user[0]?.firstName ;
      console.log(resetToken);

      let  template = await passwordResetLinkTemplate(resetToken,userName)
      
   if (await storeResetToken(user.id, resetToken, expiration)) {
      
      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: userEmail,
        subject: 'Password Reset OTP',
        html: template,
      };
      
      
      await transporter.sendMail(mailOptions,);
      return res.status(HTTP_STATUS.OK).json({ message:MESSAGE_STATUS.PASSWORD_LINK_SEND_SUCCESSFULY });
    } else {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGE_STATUS.FAILED_TO_GENERATE });
    }
  } catch (error) {
    // log('forgotPassword',error)
    // loggermail.sendLoggerMail('forgotPassword',error)
    console.log(error);
    
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGE_STATUS.ERROR });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.body;
    // Step 1: Validate the token and check its expiration time from the ResetTokens table
    let resetTokenData = await UserDao.getResetTokenByToken(token);
    resetTokenData = JSON.parse(JSON.stringify(resetTokenData))
    console.log(resetTokenData,'resterb ');
    
    if (!resetTokenData || resetTokenData.length==0 || Date.now() > new Date(resetTokenData.expiration).toLocaleString) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGE_STATUS.EXPIRED_LINK });
    }
    // let newPassword  = await encryptPassword(req.body.newPassword)
    let newPassword = await req.body.password;
    // Step 2: Update the user's password in the User table
    const isPasswordUpdated = await UserDao.updatePassword(resetTokenData.userId, newPassword);

    if (!isPasswordUpdated) {
      return res.status(HTTP_STATUS.SERVER_ERROR).json({ error: MESSAGE_STATUS.FAILED_TO_CHANGE });
    }

    // Step 3: Delete the used token from the ResetTokens table
    await UserDao.deleteResetTokenByToken(token);

    return res.status(HTTP_STATUS.OK).json({ message: 'Password changed successfuly' });
  } catch (error) {
//   log('resetPassword',error)
    // loggermail.sendLoggerMail('resetPassword',error)
    return res.status(HTTP_STATUS.SERVER_ERROR).json({ error: MESSAGE_STATUS.ERROR });
  }
};

  
module.exports ={
    signup,
    login,
    authGoogle,
    getProfile,
    authGoogleCallback,
    handleRedirect,
    forgetResetLink,
    resetPassword,
}