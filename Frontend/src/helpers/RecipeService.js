export async function getRecipes(url) {
	let recipes = []
	await fetch("/recipes?"+url)
	.then((res) => {
	  recipes = res.json()
	})
	  return recipes
}

export async function addRecipe(data){
	console.log(data)
	return await fetch("/recipes", {
		method: "POST", 
		headers: {
			"Content-Type": "application/json",
		  },
		body: JSON.stringify(data)
	})
}

export async function uploadImage(form){
	if(!form) {
		return 
	}
	return await fetch("/recipes/upload", {
		method: "POST",
		body: form
	})
}