const User = require("../models/users.js");
const jwt = require("jsonwebtoken");
const { handleAPIError } = require('../utils/helpers.js');

exports.login = async (req, res) => {
    console.log("API Request : Login");
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send({success: false, message: "Login data is null."});
    User.findOne({"email": email}, async function(err, _User) {
        if(err) return handleAPIError(res, err);
        if(!_User || !await _User.ValidPassword(password)) return res.status(400).send({success: false, message: "Incorrect email or password."});
        const payload = {
            id: _User._id
        };
        jwt.sign(payload, process.env.TOKEN_KEY, {expiresIn: 31556926}, function(err, Token) {
            if(err) return handleAPIError(res, err);
            if(Token) return res.status(200).json({success: true, token: Token, data: _User});
        });
    });
};