const helpers = require(__basedir + "/utils/helpers");
const mongoose = require("mongoose");
const uniqueMongoose = require("mongoose-unique-validator");
const softDelete = require(__basedir + "/utils/soft-delete.js");
const Schema = mongoose.Schema;

const Post_Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "users", required: true},
    localisation: {
        city: {type: String},
        zip_code: {type: String, trim: true}
    },
    like: {
        count : {type: Number, default: 0},
        users : [String]
    },
    dislike: {
        count : {type: Number, default: 0},
        users : [String]
    },
    comment: {
        count : {type: Number, default: 0},
        comments: [{
            user: {type: Schema.Types.ObjectId, ref: "users"},
            message: {type: String},
            createdAt: { type: Date, default: Date.now }
        }]
    }
});

Post_Schema.plugin(uniqueMongoose);
Post_Schema.plugin(softDelete);
Post_Schema.set("timestamps", true);

module.exports = mongoose.model("posts", Post_Schema);