import Post_Data from "../../data/post.json";

export function getAllPost() {
    return Post_Data.sort(function(a, b) { return b["up"] - a["up"]});   
}

export function getAllPostByCity(value) {
    let result = [];
    for(let i = 0; i < Post_Data.length; i++) {
        if(Post_Data[i]["city"].includes(value) || Post_Data[i]["zip_code"] == value) result.push(Post_Data[i]);
    }
    return result.sort(function(a, b) { return b["up"] - a["up"]});
}

export function getPostById(id) {
    for(let i = 0; i < Post_Data.length; i++) {
        if(Post_Data[i]["id"] == id) return Post_Data[i];
    }
    return null;
}

export function getPostByCity(value) {
    for(let i = 0; i < Post_Data.length; i++) {
        if(Post_Data[i]["city"].includes(value) || Post_Data[i]["zip_code"] == value) return Post_Data[i];
    }
    return null;
}

export function createPost(Post) {
    console.log(Post);
    console.log("Post created !");
}

export function updatePost(Post) {
    console.log(Post);
    console.log("Post updated !");
}

export function deletePostById(id) {
    console.log("Post n°" + id + " deleted !");
}
