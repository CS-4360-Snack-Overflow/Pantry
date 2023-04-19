export async function checkAuth(recipe_user_id){
    let data = await fetch("/user-id")
    data = await data.json()
    return data.userId === recipe_user_id
}

export async function addFavoriteRecipe(recipe_id){
    await fetch("/user/favorite/" + recipe_id, {method: "POST"})
}

export async function getUser(){
    const res = await fetch("/user/userRead")
    return await res.json()
}