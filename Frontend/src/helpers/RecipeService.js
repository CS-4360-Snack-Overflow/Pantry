export async function getRecipes(url) {
	let recipes = []
	await fetch("/recipes?"+url)
	.then((res) => {
	  recipes = res.json()
	})
	  return recipes
}

export async function getOneRecipe(id) {
	let recipe = null
	await fetch("/recipes/"+id)
	.then((res) => {
	  recipe = res.json()
	})
	  return recipe
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

export async function editRecipe(data) {
	await fetch("/recipes/"+data.id, {
		method: "PATCH",
		body: JSON.stringify(data)
	})
}

export async function deleteRecipe(id) {
	await fetch("/recipes/"+id, {
		method: "DELETE"
	}).catch((err) => {console.log(err)})
}