import request from "request";

export function getAllPost(Token, City) {
    return new Promise((resolve, reject) => {
        request({
            headers: {"content-type" : "application/json; charset=utf-8", "Authorization": "Bearer " + Token},
            url: "http://localhost:3000/posts/list",
            method: "GET",
            body: JSON.stringify({
                selector: {
                    localisation: {
                        city: City
                    },
                },
                sort: {
                    up: -1
                },
                limit: 25
            })
        }, (err, response, body) => {
            if(err) reject(err);
            if(body) resolve(JSON.parse(body));
            else resolve(null);
        });
    }); 
}