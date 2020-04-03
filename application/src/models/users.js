import Users_Data from "../../data/users.json";

export function loginUser(Email, Password) {
    for(let i = 0; i < Users_Data.length; i++) {
        if(Users_Data[i]["email"] == Email && Users_Data[i]["password"] == Password) {
            return Users_Data[i];
        }
    }
    return null;
}

export function getUserById(id) {
    for(let i = 0; i < Users_Data.length; i++) {
        if(Users_Data[i]["id"] == id) return Users_Data[i];
    }
    return null;
}

export function createUser(User) {
    console.log(User);
    console.log("User created !");
}

export function updateUser(User) {
    console.log(User);
    console.log("User updated !");
}

export function deleteUserById(id) {
    console.log("User n°" + id + " deleted !");
}

export function duplicateUsername(Username) {
    for(let i = 0; i < Users_Data.length; i++) {
        if(Users_Data[i]["username"] == Username) return true;
    }
    return false;
}

export function duplicateEmail(Email) {
    for(let i = 0; i < Users_Data.length; i++) {
        if(Users_Data[i]["email"] == Email) return true;
    }
    return false;
}