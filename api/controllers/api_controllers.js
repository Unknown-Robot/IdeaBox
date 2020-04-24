const mongoose = require("mongoose");
const sharp = require("sharp");
const fs = require("fs-extra");
const randomString = require("randomstring");
const { formatName, handleAPIError, Log, CleanPublicData } = require(__basedir + "/utils/helpers");

exports.create = Schema => {
    const Schema_Name = formatName(Schema.collection.collectionName);

    return async (req, res) => {
        let IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        Log(IP, `API Request : Create new ${Schema_Name["singular"]}.`);
        if(!req.body.create) return res.status(400).send({success: false, message: "Create object is null."});

        Schema.create(req.body.create, (err, Data) => {
            if(err) return handleAPIError(res, err);
            return res.status(201).send({success: true, _id: Data._id});
        });
    }
};

exports.get = Schema => {
    const Schema_Name = formatName(Schema.collection.collectionName);

    return async (req, res) => {
        let IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        Log(IP, `API Request : Get ${Schema_Name["singular"]}.`);

        if(!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)
        ) return res.status(400).send({success: false, message: `${Schema_Name["singular"]} id is not valid.`});

        Schema.findById(req.params.id, (err, Data) => {
            if(err) return handleAPIError(res, err);
            if(!Data) return res.status(404).send({success: false, message: `${Schema_Name["singular"]} doesn"t exist.`});
            return res.status(200).send({success: true, data: CleanPublicData(Data)});
        })
        .populate("comment.comments.user")
        .populate("user");
    }
};

exports.list = Schema => {
    const Schema_Name = formatName(Schema.collection.collectionName);

    return async (req, res) => {
        let IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        Log(IP, `API Request : Get ${Schema_Name["plural"]} list.`);
        try {
            let selector = req.body.selector;
            if(!selector) return res.status(400).send({success: false, message: "Selector object is null."});
            let limit = (req.body.limit) ? parseInt(req.body.limit) : 100,
                offset = (req.body.offset) ? req.body.offset : 0,
                sort = (req.body.sort) ? req.body.sort : {createdAt: -1},
                isDeleted = (req.body.isdeleted) ? req.body.isdeleted : false;

            Schema.find(selector, (err, List_Data) => {
                if(err) return handleAPIError(res, err);
                if(List_Data.length === 0) return res.status(404).send({success: false, message: `${Schema_Name["plural"]} list is empty.`});
                return res.status(200).send({success: true, data: CleanPublicData(List_Data)});
            })
            .sort(sort)
            .isDeleted(isDeleted)
            .skip(offset)
            .limit(limit)
            .populate("comment.comments.user")
            .populate("user");
        }
        catch(error) {
            console.log(error);
            if(error) return handleAPIError(res, error);
        }
    }
};

exports.update = Schema => {
    const Schema_Name = formatName(Schema.collection.collectionName);

    return async (req, res) => {
        let IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        Log(IP, `API Request : Update ${Schema_Name["singular"]}.`);
        if(!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)
        ) return res.status(400).send({success: false, message: `${Schema_Name["singular"]} id is not valid.`});
    
        if(req.body.profile_pic && req.body.profile_pic.uri) {
            let Image = req.body.profile_pic;
            Image.name = Create_ID(10) + ".jpeg";
            let _ID = Create_ID(32);
            Create_Directory( __basedir + "/public/images/profile-pic/" + _ID);
            if(WriteImage(Image, __basedir + "/public/images/profile-pic/" + _ID + "/")) {
                Schema.findById(req.params.id, (err, Data) => {
                    if(err) return handleAPIError(res, err);
                    if(!Data) return res.status(404).send({success: false, message: `${Schema_Name["singular"]} doesn"t exist.`});

                    if(Data["profile_pic"] !== "images/profile-pic/user-default.png") Delete_Directory( __basedir + "/public/" + Data["profile_pic"].slice(0, -15));
                    Data["profile_pic"] = "images/profile-pic/" + _ID + "/" + Image.name;
                    Data.save((err) => {
                        if(err) return handleAPIError(res, err);
                        return res.status(200).send({success: true, data: CleanPublicData(Data)});
                    });
                });
            }
        }
        else {
            if(!req.body.update || Object.entries(req.body.update).length === 0
            ) return res.status(400).send({success: false, message: "Update object is null."});

            let selector = (req.body.selector)? req.body.selector: {_id: req.params.id},
                options = (req.body.options)? req.body.options: {};

            Schema.findByIdAndUpdate(selector, req.body.update, options, (err, Data) => {
                if (err) return handleAPIError(res, err);
                if (!Data) return res.status(404).send({success: false, message: `${Schema_Name["singular"]} doesn't exist.`});
                return res.status(200).send({success: true, data: CleanPublicData(Data)});
            })
            .populate("comment.comments.user")
            .populate("user");
        }
    }
};

exports.delete = Schema => {
    const Schema_Name = formatName(Schema.collection.collectionName);

    return async (req, res) => {
        let IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        Log(IP, `API Request : Delete ${Schema_Name["singular"]}.`);
        if(!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)
        ) return res.status(400).send({success: false, message: `${Schema_Name["singular"]} id is not valid.`});

        Schema.findById(req.params.id, (err, Data) => {
            if(err) return handleAPIError(res, err);
            if(!Data) return res.status(404).send({success: false, message: `${Schema_Name["singular"]} doesn"t exist.`});

            Data.softdelete(err => {
                if(err) return handleAPIError(res, err);
                return res.status(200).send({success: true});
            });
        });
    }
};

exports.restore = Schema => {
    const Schema_Name = formatName(Schema.collection.collectionName);

    return async (req, res) => {
        let IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        Log(IP, `API Request : Restore ${Schema_Name["singular"]}.`);
        if(!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)
        ) return res.status(400).send({success: false, message: `${Schema_Name["singular"]} id is not valid.`});

        Schema.findById(req.params.id, (err, Data) => {
            if(err) return handleAPIError(res, err);
            if(!Data) return res.status(404).send({success: false, message: `${Schema_Name["singular"]} doesn"t exist.`});

            Data.restore(err => {
                if(err) return handleAPIError(res, err);
                return res.status(200).send({success: true});
            });
        });
    }
};

/**
 * Only specific 'post' controllers
 * 
 */

exports.action = Schema => {
    const Schema_Name = formatName(Schema.collection.collectionName);

    return async (req, res) => {
        let IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        Log(IP, `API Request : Action ${Schema_Name["singular"]}.`);
        if(!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)
        ) return res.status(400).send({success: false, message: `${Schema_Name["singular"]} id is not valid.`});
        if(!req.body.user_id) return res.status(400).send({success: false, message: `'user_id' is null.`});
        if(!req.body.action) return res.status(400).send({success: false, message: `'action' is null.`});

        Schema.findById(req.params.id, (err, Data) => {
            if(err) return handleAPIError(res, err);
            if(!Data) return res.status(404).send({success: false, message: `${Schema_Name["singular"]} doesn"t exist.`});

            let user_id = req.body.user_id,
                action = req.body.action;

            if(action === "like") {
                if(Data["like"]["users"].indexOf(user_id) !== -1) return res.status(400).send({success: false, message: "user already like this post"});
                Data["like"]["count"] = Data["like"]["count"] + 1;
                Data["like"]["users"].push(user_id);
            }
            else if(action === "dislike") {
                if(Data["dislike"]["users"].indexOf(user_id) !== -1) return res.status(400).send({success: false, message: "user already dislike this post"});
                Data["dislike"]["count"] = Data["dislike"]["count"] + 1;
                Data["dislike"]["users"].push(user_id);
            }
            else if(action === "reset-like") {
                if(Data["like"]["users"].indexOf(user_id) === -1) return res.status(400).send({success: false, message: "user doesn't already like this post"});
                if(Data["like"]["count"] > 0) Data["like"]["count"] = Data["like"]["count"] - 1;
                Data["like"]["users"].splice(Data["like"]["users"].indexOf(user_id), 1);
            }
            else if(action === "reset-dislike") {
                if(Data["dislike"]["users"].indexOf(user_id) === -1) return res.status(400).send({success: false, message: "user doesn't already dislike this post"});
                if(Data["dislike"]["count"] > 0) Data["dislike"]["count"] = Data["dislike"]["count"] - 1;
                Data["dislike"]["users"].splice(Data["dislike"]["users"].indexOf(user_id), 1);
            }
            else if(action === "like-dislike") {
                if(Data["like"]["users"].indexOf(user_id) === -1) return res.status(400).send({success: false, message: "user doesn't already like this post"});
                if(Data["like"]["count"] > 0) Data["like"]["count"] = Data["like"]["count"] - 1;
                Data["dislike"]["count"] = Data["dislike"]["count"] + 1;
                Data["like"]["users"].splice(Data["like"]["users"].indexOf(user_id), 1);
                Data["dislike"]["users"].push(user_id);
            }
            else if(action === "dislike-like") {
                if(Data["dislike"]["users"].indexOf(user_id) === -1) return res.status(400).send({success: false, message: "user doesn't already dislike this post"});
                if(Data["dislike"]["count"] > 0) Data["dislike"]["count"] = Data["dislike"]["count"] - 1;
                Data["like"]["count"] = Data["like"]["count"] + 1;
                Data["dislike"]["users"].splice(Data["dislike"]["users"].indexOf(user_id), 1);
                Data["like"]["users"].push(user_id);
            }

            Data.save((err) => {
                if(err) return handleAPIError(res, err);
                return res.status(200).send({success: true, data: CleanPublicData(Data)});
            });
        })
        .populate("comment.comments.user")
        .populate("user");
    }
}

/**
 * 
 * Write image file with base64 data.
 * 
*/

async function WriteImage(Image, Path) {
    let resize = {width: 150, height: 150};
    /* if(Image.size.width > 0 && Image.size.height > 0) resize = {width: 150, height: 150}; */
    let imageBuffer = Buffer.from(Image.uri.split(";base64,").pop(), "base64");
    sharp(imageBuffer).resize(resize).jpeg({quality: 100}).toFile(Path + Image.name, function(error) {
        if(error) {
            console.error(error);
            return false;
        }
        return true;
    });
}

/**
 * 
 * Delete directory with path.
 * 
*/

async function Delete_Directory(Directory_Path) {
    fs.remove(Directory_Path, function(Directory_Error) {
        if(Directory_Error) {
            console.error(Directory_Error);
            return false;
        }
        return true;
    });
}

/**
 * 
 * Create directory with path if is not exist.
 * 
*/

function Create_Directory(Path) {
    if(!fs.existsSync(Path)) {
        fs.mkdirSync(Path, 0755, function(Directory_Error){
            if(Directory_Error) throw Directory_Error;
        });
    }
}

/**
 * 
 * Generate id with length argument.
 * 
*/

function Create_ID(length) { // Create 'unique' random string.
    return randomString.generate({
        length: length,
        charset: "alphanumeric",
        capitalization: "lowercase"
    });
}