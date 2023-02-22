
export async function getRecipes () {
	let recipes = []
	fetch("/recipes")
	.then((res) => {
		res.json();
		recipes = res;
		console.log(res)})
	.catch((err) => {
		console.log(err)
	})
	return recipes
}
