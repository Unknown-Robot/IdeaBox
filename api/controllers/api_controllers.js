const mongoose = require("mongoose");
const { Update_Data, formatName, handleAPIError, Log } = require("../utils/helpers");

exports.create = Schema => {
    const Schema_Name = formatName(Schema.collection.collectionName);

    return async (req, res) => {
        let IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        Log(IP, `API Request : Create new ${Schema_Name["singular"]}.`);
        if (!req.body.create) return res.status(400).send({success: false, message: "Create object is null."});

        Schema.create(req.body.create, (err, Data) => {
            if (err) return handleAPIError(res, err);
            return res.status(201).send({success: true, _id: Data._id});
        });
    }
};

exports.get = Schema => {
    const Schema_Name = formatName(Schema.collection.collectionName);

    return async (req, res) => {
        let IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        Log(IP, `API Request : Get ${Schema_Name["singular"]}.`);
        if (
            !req.params.id ||
            !mongoose.Types.ObjectId.isValid(req.params.id)
        ) return res.status(400).send({success: false, message: `${Schema_Name["singular"]} id is not valid.`});

        Schema.findById(req.params.id, (err, Data) => {
            if (err) return handleAPIError(res, err);
            if (!Data) return res.status(404).send({success: false, message: `${Schema_Name["singular"]} doesn"t exist.`});

            return res.status(200).send({success: true, data: Data});
        });
    }
};

exports.list = Schema => {
    const Schema_Name = formatName(Schema.collection.collectionName);

    return async (req, res) => {
        let IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        Log(IP, `API Request : Get ${Schema_Name["plural"]} list.`);
        try {
            let selector = (req.query.selector) ? JSON.parse(req.query.selector) : {};
            if (!selector) return res.status(400).send({success: false, message: "Selector object is null."});

            let limit = (req.query.limit) ? parseInt(req.query.limit) : 100,
                offset = (req.query.offset) ? req.query.offset : 0,
                sort = (req.query.sort) ? JSON.parse(req.query.sort) : {createdAt: -1},
                isDeleted = (req.query.isDeleted) ? req.query.isDeleted : false;

            Schema.find(selector, (err, List_Data) => {
                if (err) return handleAPIError(res, err);
                if (List_Data.length === 0) return res.status(404).send({success: false, message: `${Schema_Name["plural"]} list is empty.`});
                return res.status(200).send({success: true, data: List_Data});
            })
            .sort(sort)
            .isDeleted(isDeleted)
            .skip(offset)
            .limit(limit);
        }
        catch(error) {
            if (error) return handleAPIError(res, error);
            console.log(error);
        }
    }
};

exports.update = Schema => {
    const Schema_Name = formatName(Schema.collection.collectionName);

    return async (req, res) => {
        let IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        Log(IP, `API Request : Update ${Schema_Name["singular"]}.`);
        if (
            !req.params.id ||
            !mongoose.Types.ObjectId.isValid(req.params.id)
        ) return res.status(400).send({success: false, message: `${Schema_Name["singular"]} id is not valid.`});
        if (
            !req.body.update ||
            Object.entries(req.body.update).length === 0
        ) return res.status(400).send({success: false, message: "Update object is null."});

        Schema.findById(req.params.id, (err, Data) => {
            if (err) return handleAPIError(res, err);
            if (!Data) return res.status(404).send({success: false, message: `${Schema_Name["singular"]} doesn"t exist.`});

            Data = Update_Data(Data, req.body.update);
            Data.save((err) => {
                if (err) return handleAPIError(res, err);
                return res.status(200).send({success: true, _id: Data._id});
            });
        });
    }
};

exports.delete = Schema => {
    const Schema_Name = formatName(Schema.collection.collectionName);

    return async (req, res) => {
        let IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        Log(IP, `API Request : Delete ${Schema_Name["singular"]}.`);
        if (
            !req.params.id ||
            !mongoose.Types.ObjectId.isValid(req.params.id)
        ) return res.status(400).send({success: false, message: `${Schema_Name["singular"]} id is not valid.`});

        Schema.findById(req.params.id, (err, Data) => {
            if (err) return handleAPIError(res, err);
            if (!Data) return res.status(404).send({success: false, message: `${Schema_Name["singular"]} doesn"t exist.`});

            Data.softdelete(err => {
                if (err) return handleAPIError(res, err);
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
        if (
            !req.params.id ||
            !mongoose.Types.ObjectId.isValid(req.params.id)
        ) return res.status(400).send({success: false, message: `${Schema_Name["singular"]} id is not valid.`});

        Schema.findById(req.params.id, (err, Data) => {
            if (err) return handleAPIError(res, err);
            if (!Data) return res.status(404).send({success: false, message: `${Schema_Name["singular"]} doesn"t exist.`});

            Data.restore(err => {
                if (err) return handleAPIError(res, err);
                return res.status(200).send({success: true});
            });
        });
    }
};