const helpers = require(__basedir + "/utils/helpers");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueMongoose = require("mongoose-unique-validator");
const softDelete = require(__basedir + "/utils/soft-delete.js");
const Schema = mongoose.Schema;

const User_Schema = new Schema({
    first_name: {type: String, required: true, trim: true},
    last_name: {type: String, required: true, trim: true},
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: helpers.checkEmail,
            message: props => `${props.value} is not a valid email!`,
            kind: "not valid email"
        }
    },
    profile_pic: {type: String, required: true, default: "images/profile-pic/user-default.png"},
    password: {type: String, required: true, trim: true},
    localisation: {
        city: {type: String},
        zip_code: {type: String, trim: true}
    }
});

 // Get city or postal code with gouv API.
User_Schema.pre("save", async function(next) {
    let user = this;
    if(!user.isModified("localisation")) return next();
    
    if(!user.localisation.city && user.localisation.zip_code) {
        let result = await helpers.getGeographicData(user.localisation.zip_code);
        user.localisation.city = (result !== null)? result["city"] : null;
    }
    if(user.localisation.city && !user.localisation.zip_code) {
        let result = await helpers.getGeographicData(user.localisation.city);
        user.localisation.zip_code = (result !== null)? result["postcode"] : null;
    }
    next()
});

// Automatic convert clear password to bcrypt hash on save.
User_Schema.pre("save", function(next){
    let user = this;
    if(!user.isModified("password")) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Compare the clear password with the crypted password
User_Schema.methods.ValidPassword = async function(clearPassword) {
    return await bcrypt.compare(clearPassword, this.password);
};

User_Schema.plugin(uniqueMongoose);
User_Schema.plugin(softDelete);
User_Schema.set("timestamps", true);

module.exports = mongoose.model("users", User_Schema);