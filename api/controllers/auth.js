const User = require(__basedir + "/models/users.js");
const jwt = require("jsonwebtoken");
const { handleAPIError, Log, CleanPublicData } = require(__basedir + "/utils/helpers.js");

exports.login = async (req, res) => {
    let IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    Log(IP, "API Request : Login");
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send({success: false, message: "Login data is null."});
    User.findOne({"email": email}, async function(err, _User) {
        if(err) return handleAPIError(res, err);
        if(!_User || !await _User.ValidPassword(password)) return res.status(400).send({success: false, message: "Incorrect email or password."});
        const payload = {
            id: _User._id
        };
        jwt.sign(payload, process.env.TOKEN_KEY, {expiresIn: "7 days"}, function(err, Token) {
            if(err) return handleAPIError(res, err);
            if(Token) {
                return res.status(200).json({success: true, token: Token, data: CleanPublicData(_User)});
            }
        });
    });
};