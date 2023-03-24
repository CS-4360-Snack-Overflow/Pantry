export async function getRecipes(url) {
	let recipes = []
	console.log(url)
	await fetch("/recipes?"+url)
	.then((res) => {
	  recipes = res.json()
	})
	  return recipes
}