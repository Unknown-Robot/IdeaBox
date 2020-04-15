const mongoose = require("mongoose");
const request = require("request");
const moment = require("moment");

const formatSingular = pluralCollectionName => pluralCollectionName.substring(0, pluralCollectionName.length - 1);

const formatCapitalize = pluralCollectionName => pluralCollectionName.charAt(0).toUpperCase() + pluralCollectionName.slice(1);

const formatName = collectionName => {
    return {
        "singular": formatSingular(formatCapitalize(collectionName)),
        "plural": formatCapitalize(collectionName)
    }
};

const checkEmail = (email) => {
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !!email.match(regex);
};

const handleAPIError = (res, error) => {
    let status = 500;
    let APIErrors = {};
    // Handle types of errors
    if(error instanceof mongoose.Error.ValidationError) {
        for(const [field, fieldError] of Object.entries(error.errors)) {
            APIErrors[field] = {
                path: fieldError.path,
                value: fieldError.value,
                kind: fieldError.properties.kind ? fieldError.properties.kind : fieldError.kind
            };
        }
        status = 400;
    }
    else APIErrors = error;
    console.log(APIErrors);
    // Return errors
    return res.status(status).send({
        success: false,
        errors: APIErrors
    })
};

const getGeographicData = async (data) => {
    if(!data) return null;
    return new Promise((resolve, reject) => {
        let Request = "https://api-adresse.data.gouv.fr/search/?q=" + encodeURIComponent(data);
        request(Request, {json: true}, (err, response, body) => {
            if(err) reject(err);
            if(body.features.length > 0) resolve(body.features[0]["properties"]);
            else resolve(null);
        });
    });
}

function CleanPublicData(User) {
    if(!Array.isArray(User)) {
        if("user" in User) {
            User.user.password = undefined;
            User.user._v = undefined;
        }
        else {
            User.password = undefined;
            User._v = undefined;
        }
    }
    else {
        for(let i = 0; i < User.length; i++) {
            User[i] = CleanPublicData(User[i]);
        }
    }
    return User;
}

function Log(IP=null, Message) {
    let Now = moment();
    let Datetime_String = Now.format("DD/MM/YYYY H:mm:ss");
    if(IP !== null) console.log(Datetime_String + " [" + IP + "] => " + Message);
    else console.log(Datetime_String + " => " + Message);
}

module.exports = {
    formatSingular,
    formatCapitalize,
    formatName,
    checkEmail,
    handleAPIError,
    getGeographicData,
    Log,
    CleanPublicData
};