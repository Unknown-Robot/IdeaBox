const helpers = require("../utils/helpers");
const mongoose = require("mongoose");
const uniqueMongoose = require("mongoose-unique-validator");
const softDelete = require("../utils/soft-delete.js");
const Schema = mongoose.Schema;

const Post_Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    up: {type: Number, default: 0},
    down: {type: Number, default: 0},
    user_id: {type: Schema.Types.ObjectId, ref: "users", required: true},
    localisation: {
        city: {type: String},
        zip_code: {type: String, trim: true}
    },
    comments: [
        {
            user_id: {type: Schema.Types.ObjectId, ref: "users", required: true},
            message: {type: String, required: true}
        }
    ]
});

// Automatic convert clear password to bcrypt hash on save.
Post_Schema.pre("save", async function(next) {
    let post = this;

    next();
});

Post_Schema.plugin(uniqueMongoose);
Post_Schema.plugin(softDelete);
Post_Schema.set("timestamps", true);

module.exports = mongoose.model("posts", Post_Schema);