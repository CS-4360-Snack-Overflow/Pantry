export async function getRecipes () {
	let recipes = []
	await fetch("/recipes")
	.then((res) => {
	  recipes = res.json()
	})
	  return recipes
}