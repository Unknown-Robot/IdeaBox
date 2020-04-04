const helpers = require("../utils/helpers");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueMongoose = require("mongoose-unique-validator");
const softDelete = require("../utils/soft-delete.js");
const Schema = mongoose.Schema;

const User_Schema = new Schema({
    username: {type: String, required: true, unique: true, trim: true},
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
    password: {type: String, required: true, trim: true},
    localisation: {
        city: {type: String},
        zip_code: {type: String, trim: true}
    },
    liked_posts: [
        {
            post_id: {type: Schema.Types.ObjectId, ref: "posts", required: true},
            action: {type: String, enum: ["LIKE", "DISLIKE"], required: true}
        }, {_id: false}
    ]
});

// Automatic convert clear password to bcrypt hash on save.
User_Schema.pre("save", async function(next) {
    let user = this;

    // Get city or postal code with gouv API.
    if(user.isModified("localisation")) {
        if(!user.localisation.city && user.localisation.zip_code) {
            let result = await helpers.getGeographicData(user.localisation.zip_code);
            user.localisation.city = (result !== null)? result["city"] : null;
        }
        if(user.localisation.city && !user.localisation.zip_code) {
            let result = await helpers.getGeographicData(user.localisation.city);
            user.localisation.zip_code = (result !== null)? result["postcode"] : null;
        }
    }

    // only hash the password if it has been modified (or is new)
    if(user.isModified("password")) {
        // generate a salt
        console.log("password modified !");
        bcrypt.genSalt(10, function(err, salt) {
            if(err) return next(err);
            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                // override the cleartext password with the hashed one
                console.log(hash);
                user.password = (hash !== null)? hash: null;
                return next();
            });
        });
    }
    else return next();
});

// Compare the clear password with the crypted password
User_Schema.methods.ValidPassword = async function(clearPassword) {
    return await bcrypt.compare(clearPassword, this.password);
};

User_Schema.plugin(uniqueMongoose);
User_Schema.plugin(softDelete);
User_Schema.set("timestamps", true);

module.exports = mongoose.model("users", User_Schema);