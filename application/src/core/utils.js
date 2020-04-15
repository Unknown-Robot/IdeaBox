import { Dimensions } from "react-native";

export function emailValidator(Email) {
    if(isNullorEmpty(Email)) return false;
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(String(Email).toLowerCase())) return true;
    return false;
};

export function phoneValidator(Phone_Number) {
    if(isNullorEmpty(Phone_Number)) return false;
    let regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if(regex.test(String(Phone_Number).toLowerCase())) return true;
    return false;
}

export function zipcodeValidator(Zip_Code) {
    if(isNullorEmpty(Zip_Code)) return false;
    let regex = /[0-9]{5}/;
    if(regex.test(String(Zip_Code).toLowerCase())) return true;
    return false;
}

export function isNullorEmpty(_Object) {
    if(typeof (_Object) == "string") {
        if(_Object.length === 0 || _Object === null || _Object.trim() === "") return true;
    }
    else {
        if(typeof (_Object) === "undefined" || _Object.length === 0 || _Object === null) return true;
    }
    return false;
}

export function isEmptyArray(_Object) {
    if(isNullorEmpty(_Object)) return true;
    let Array_Values = Object.values(_Object);
    let Array_Keys = Object.keys(_Object);
    for (let i = 0; i < Array_Values.length; i++) {
        if(Array_Keys[i] != "error") {
            if(isNullorEmpty(Array_Values[i])) return true;
        }
    }
    return false;
}

export async function getCityByPostalCode(PostalCode) {
    const result = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${PostalCode}`);;
    if(!result.ok) throw new HttpError(jsonData, result.statusCode);
    return result.json();
}

export async function getPostalCodeByCity(City) {
    const result = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${City}`);;
    if(!result.ok) throw new HttpError(jsonData, result.statusCode);
    return result.json();
}

export function screenWidth() {
    return Math.round(Dimensions.get("window").width);
}

export function screenHeight() {
    return Math.round(Dimensions.get("window").height);
}