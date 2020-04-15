const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require(__basedir + "/models/users.js");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_KEY;
opts.passReqToCallback = true;

module.exports = function(passport) {
    passport.use(new JwtStrategy(opts, (req, jwt_payload, done) => {
        User.findById(jwt_payload.id, function(err, _User) {
            if(err) return done(null, false);
            return done(null, true);
        }).isDeleted(false);
    }));
};