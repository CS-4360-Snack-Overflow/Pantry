export async function getRecipes(url) {
	let recipes = []
	await fetch("/recipes?"+url)
	.then((res) => {
	  recipes = res.json()
	})
	  return recipes
}

export async function addRecipe(data){
	await fetch("/recipes", {
		method: "POST", 
		body: JSON.stringify(data)
	}).then((res) => {
		return res;
	})
}