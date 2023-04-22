export async function getRecipes(url) {
	let recipes = []
	await fetch("/recipes?"+url)
	.then((res) => {
	  recipes = res.json()
	})
	  return recipes
}

export async function getCreatedRecipes() {
	let created = await fetch("/recipes/created")
	created = await created.json()
	return created
}

export async function getFavoritedRecipes() {
	let favorites = await fetch("/recipes/favorited")
	favorites = await favorites.json()
	return favorites
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
	return await fetch("/recipes/create", {
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
	console.log(data)
	await fetch("/recipes/"+data._id, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		  },
		body: JSON.stringify(data)
	})
}

export async function deleteRecipe(id) {
	await fetch("/recipes/"+id, {
		method: "DELETE"
	}).catch((err) => {console.log(err)})
}