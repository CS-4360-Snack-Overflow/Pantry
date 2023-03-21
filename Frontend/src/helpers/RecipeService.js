export async function getRecipes(url) {
	let recipes = []
	await fetch("/recipes?" + url)
	.then((res) => {
	  recipes = res.json()
	})
	  return recipes
}