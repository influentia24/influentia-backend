const jwt = require('jsonwebtoken');
const UserDao = require('../dao/user_dao.js');
const { default: mongoose } = require('mongoose');


const userAuthentication = async function (req, res, next) {
    try {
        let authorizationHeader = req.headers['authorization'];

        let decodedLocalStorageData = authorizationHeader && authorizationHeader !== 'undefined' ? JSON.parse(authorizationHeader) : null;
                let JWTtoken =decodedLocalStorageData? decodedLocalStorageData?.jwtToken:'';
        let decodedTokenData = null
        const res = jwt.verify(JWTtoken, process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err){
                return res.status(401).json({ message: 'Invalid Token' })
            }
            else{
                if (Date.now() >= decoded.exp*1000) {
                    console.log(':( Token expired....');
                    return res.status(401).json({ message: 'Token expired' });
                }
                // If token is valid, attach the decoded user ID to the request object
                decodedTokenData = decoded
            }
        });
        let userIdJWT = decodedTokenData?.uid;
        let userIdLocalStorage = decodedLocalStorageData?.userId;
        /**
         * Check whether the token is provided in header
         * else return response with 401.
         */
        if (!JWTtoken) return res.status(401).json({ message: 'No token provided.' })
        const userId = new mongoose.Types.ObjectId(decodedLocalStorageData?.userId);
        const user = await UserDao.getUserById(userId)
        if(!user) return res.status(201).json({ message: 'User Not Found' });

        if (userIdJWT.toString() === userIdLocalStorage){
            next()
        }

        else if ((userIdJWT !== userIdLocalStorage)) {
            return res.status(401).json({ message: 'LocalStorage Tampered' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' })
    }
}


module.exports = {
    userAuthentication
}