import request from "request";

export async function loginUser(Email, Password) {
    if(!Email || !Password) return null;
    return new Promise((resolve, reject) => {
        request({
            headers: {"content-type" : "application/json; charset=utf-8"},
            url: "http://localhost:3000/login",
            method: "POST",
            body: JSON.stringify({email: Email, password: Password})
        }, (err, response, body) => {
            if(err) reject(err);
            if(body) resolve(JSON.parse(body));
            else resolve(null);
        });
    });
}

export async function createUser(User) {
    if(!User) return null;
    return new Promise((resolve, reject) => {
        request({
            headers: {"content-type" : "application/json; charset=utf-8"},
            url: "http://localhost:3000/users/create",
            method: "POST",
            body: JSON.stringify({create: User})
        }, (err, response, body) => {
            if(err) reject(err);
            if(body) resolve(JSON.parse(body));
            else resolve(null);
        });
    });
}