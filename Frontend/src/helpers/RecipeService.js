
export async function getRecipes () {
	let recipes = []
	fetch("/recipes")
	.then((res) => {
		recipes = res.json();
	})
	.catch((err) => {
		console.log(err)
	})
	return recipes
}
