const helpers = require(__basedir + "/utils/helpers");
const mongoose = require("mongoose");
const uniqueMongoose = require("mongoose-unique-validator");
const softDelete = require(__basedir + "/utils/soft-delete.js");
const Schema = mongoose.Schema;

const Post_Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    up: {type: Number, default: 0},
    down: {type: Number, default: 0},
    user: {type: Schema.Types.ObjectId, ref: "users", required: true},
    localisation: {
        city: {type: String},
        zip_code: {type: String, trim: true}
    },
    comments: [{
        user: {type: Schema.Types.ObjectId, ref: "users", required: true},
        message: {type: String, required: true}
    }, {timestamps: true}]
});

Post_Schema.plugin(uniqueMongoose);
Post_Schema.plugin(softDelete);
Post_Schema.set("timestamps", true);

module.exports = mongoose.model("posts", Post_Schema);