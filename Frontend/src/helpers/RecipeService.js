export async function getRecipes(url) {
	let recipes = []
	console.log("/recipes?"+url)
	await fetch("/recipes?" + url)
	.then((res) => {
	  recipes = res.json()
	})
	  return recipes
}