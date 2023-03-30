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
	await fetch("/recipes", {
		method: "POST", 
		headers: {
			"Content-Type": "application/json",
		  },
		body: JSON.stringify(data)
	}).then((res) => {
		return res;
	})
}